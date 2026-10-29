import { Property, Inquiry } from "./types";
import { initialProperties } from "./initial-data";
import { getSupabaseAdmin } from "./supabase";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const propertiesFile = path.join(dataDir, "properties.json");
const inquiriesFile = path.join(dataDir, "inquiries.json");

// Ensure local JSON storage directory & files exist for fallback
function ensureLocalStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(propertiesFile)) {
    fs.writeFileSync(propertiesFile, JSON.stringify(initialProperties, null, 2));
  }
  if (!fs.existsSync(inquiriesFile)) {
    fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2));
  }
}

function readLocalProperties(): Property[] {
  ensureLocalStore();
  try {
    const raw = fs.readFileSync(propertiesFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return initialProperties;
  }
}

function writeLocalProperties(props: Property[]) {
  ensureLocalStore();
  fs.writeFileSync(propertiesFile, JSON.stringify(props, null, 2));
}

function readLocalInquiries(): Inquiry[] {
  ensureLocalStore();
  try {
    const raw = fs.readFileSync(inquiriesFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocalInquiries(inqs: Inquiry[]) {
  ensureLocalStore();
  fs.writeFileSync(inquiriesFile, JSON.stringify(inqs, null, 2));
}

// ================= PROPERTY CRUD ================= //

export async function getProperties(params?: { category?: string; search?: string }): Promise<Property[]> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      let query = supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (params?.category && params.category !== "all") {
        query = query.eq("category", params.category);
      }
      if (params?.search) {
        query = query.ilike("title", `%${params.search}%`);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          title: row.title,
          slug: row.slug || row.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          price: row.price,
          priceNum: Number(row.price_num || 0),
          category: row.category,
          location: row.location,
          landArea: Number(row.land_area || 0),
          buildingArea: Number(row.building_area || 0),
          bedrooms: Number(row.bedrooms || 0),
          bathrooms: Number(row.bathrooms || 0),
          image: row.image,
          badge: row.badge,
          description: row.description,
          features: row.features || [],
          isFeatured: Boolean(row.is_featured),
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local storage:", e);
    }
  }

  // Fallback to local store
  let props = readLocalProperties();
  if (params?.category && params.category !== "all") {
    props = props.filter((p) => p.category === params.category);
  }
  if (params?.search) {
    const s = params.search.toLowerCase();
    props = props.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
    );
  }
  return props;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          price: data.price,
          priceNum: Number(data.price_num || 0),
          category: data.category,
          location: data.location,
          landArea: Number(data.land_area || 0),
          buildingArea: Number(data.building_area || 0),
          bedrooms: Number(data.bedrooms || 0),
          bathrooms: Number(data.bathrooms || 0),
          image: data.image,
          badge: data.badge,
          description: data.description,
          features: data.features || [],
          isFeatured: Boolean(data.is_featured),
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.warn("Supabase getById failed, using local store:", e);
    }
  }

  const props = readLocalProperties();
  return props.find((p) => p.id === id) || null;
}

export async function createProperty(data: Omit<Property, "id" | "createdAt" | "slug">): Promise<Property> {
  const id = `prop-${Date.now()}`;
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const createdAt = new Date().toISOString();

  const newProperty: Property = {
    ...data,
    id,
    slug,
    createdAt,
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("properties")
        .insert({
          id,
          title: newProperty.title,
          slug,
          price: newProperty.price,
          price_num: newProperty.priceNum,
          category: newProperty.category,
          location: newProperty.location,
          land_area: newProperty.landArea,
          building_area: newProperty.buildingArea,
          bedrooms: newProperty.bedrooms,
          bathrooms: newProperty.bathrooms,
          image: newProperty.image,
          badge: newProperty.badge,
          description: newProperty.description,
          features: newProperty.features,
          is_featured: newProperty.isFeatured,
          created_at: createdAt,
        })
        .select()
        .single();

      if (!error && inserted) {
        return newProperty;
      }
    } catch (e) {
      console.warn("Supabase insert error, using local fallback:", e);
    }
  }

  // Local fallback
  const props = readLocalProperties();
  props.unshift(newProperty);
  writeLocalProperties(props);
  return newProperty;
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const dbUpdates: any = {};
      if (updates.title) {
        dbUpdates.title = updates.title;
        dbUpdates.slug = updates.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }
      if (updates.price) dbUpdates.price = updates.price;
      if (updates.priceNum !== undefined) dbUpdates.price_num = updates.priceNum;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.location) dbUpdates.location = updates.location;
      if (updates.landArea !== undefined) dbUpdates.land_area = updates.landArea;
      if (updates.buildingArea !== undefined) dbUpdates.building_area = updates.buildingArea;
      if (updates.bedrooms !== undefined) dbUpdates.bedrooms = updates.bedrooms;
      if (updates.bathrooms !== undefined) dbUpdates.bathrooms = updates.bathrooms;
      if (updates.image) dbUpdates.image = updates.image;
      if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
      if (updates.description) dbUpdates.description = updates.description;
      if (updates.features) dbUpdates.features = updates.features;
      if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;

      const { data, error } = await supabase.from("properties").update(dbUpdates).eq("id", id).select().single();
      if (!error && data) {
        return await getPropertyById(id);
      }
    } catch (e) {
      console.warn("Supabase update error, using local fallback:", e);
    }
  }

  // Local fallback
  const props = readLocalProperties();
  const index = props.findIndex((p) => p.id === id);
  if (index === -1) return null;

  props[index] = {
    ...props[index],
    ...updates,
    slug: updates.title ? updates.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : props[index].slug,
  };
  writeLocalProperties(props);
  return props[index];
}

export async function deleteProperty(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete error, using local fallback:", e);
    }
  }

  // Local fallback
  const props = readLocalProperties();
  const filtered = props.filter((p) => p.id !== id);
  if (filtered.length !== props.length) {
    writeLocalProperties(filtered);
    return true;
  }
  return false;
}

// ================= INQUIRIES ================= //

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          name: row.name,
          phone: row.phone,
          villa: row.villa,
          preferredDate: row.preferred_date,
          notes: row.notes,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase getInquiries error, using local fallback:", e);
    }
  }

  return readLocalInquiries();
}

export async function createInquiry(data: Omit<Inquiry, "id" | "createdAt" | "status">): Promise<Inquiry> {
  const id = `inq-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const status = "new";

  const newInquiry: Inquiry = {
    ...data,
    id,
    status,
    createdAt,
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("inquiries").insert({
        id,
        name: data.name,
        phone: data.phone,
        villa: data.villa,
        preferred_date: data.preferredDate,
        notes: data.notes,
        status,
        created_at: createdAt,
      });
      return newInquiry;
    } catch (e) {
      console.warn("Supabase createInquiry error:", e);
    }
  }

  const inqs = readLocalInquiries();
  inqs.unshift(newInquiry);
  writeLocalInquiries(inqs);
  return newInquiry;
}
