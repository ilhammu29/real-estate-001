"use client";

import React, { useState, useEffect } from "react";
import { 
  X, Plus, Edit, Trash2, Upload, CheckCircle2, AlertCircle, 
  RefreshCw, Home, Mail, Image as ImageIcon, ExternalLink, Search,
  Layers, BedDouble, Bath, Ruler, Check
} from "lucide-react";
import { Property, Inquiry } from "@/lib/types";

interface AdminCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertiesUpdated?: () => void;
}

export default function AdminCrudModal({ isOpen, onClose, onPropertiesUpdated }: AdminCrudModalProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "inquiries">("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State for Create / Edit
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "cantilever" as "cantilever" | "cottage" | "mansion" | "penthouse",
    price: "Rp 4.850.000.000",
    priceNum: 4850000000,
    location: "South Ridge Boulevard, Enclave A-01",
    landArea: 380,
    buildingArea: 420,
    bedrooms: 4,
    bathrooms: 4,
    image: "/images/house-container-hd.webp",
    badge: "Signature Masterpiece",
    description: "",
    features: "Cedar Wood Cantilever, Panoramic Glass, Private Plunge Pool",
    isFeatured: true,
  });

  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Fetch properties & inquiries
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [propsRes, inqRes] = await Promise.all([
        fetch("/api/properties"),
        fetch("/api/inquiries"),
      ]);
      const propsData = await propsRes.json();
      const inqData = await inqRes.json();
      
      if (propsData.data) setProperties(propsData.data);
      if (inqData.data) setInquiries(inqData.data);
    } catch (err) {
      console.error("Gagal memuat data admin:", err);
      showNotice("Gagal memuat data dari API", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const showNotice = (text: string, type: "success" | "error") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleResetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: "",
      category: "cantilever",
      price: "Rp 4.850.000.000",
      priceNum: 4850000000,
      location: "South Ridge Boulevard, Enclave A-01",
      landArea: 380,
      buildingArea: 420,
      bedrooms: 4,
      bathrooms: 4,
      image: "/images/house-container-hd.webp",
      badge: "Signature Masterpiece",
      description: "",
      features: "Cedar Wood Cantilever, Panoramic Glass, Private Plunge Pool",
      isFeatured: true,
    });
  };

  const handleEditClick = (prop: Property) => {
    setIsEditing(true);
    setEditId(prop.id);
    setFormData({
      title: prop.title,
      category: (prop.category === "all" ? "cantilever" : prop.category) as any,
      price: prop.price,
      priceNum: prop.priceNum,
      location: prop.location,
      landArea: prop.landArea,
      buildingArea: prop.buildingArea,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      image: prop.image,
      badge: prop.badge || "",
      description: prop.description,
      features: prop.features.join(", "),
      isFeatured: Boolean(prop.isFeatured),
    });
  };

  const handleDeleteClick = async (id: string, title: string) => {
    if (!confirm(`Hapus properti "${title}"?`)) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        showNotice(`Properti "${title}" berhasil dihapus.`, "success");
        fetchData();
        if (onPropertiesUpdated) onPropertiesUpdated();
      } else {
        showNotice(data.error || "Gagal menghapus properti", "error");
      }
    } catch (err) {
      console.error(err);
      showNotice("Terjadi kesalahan saat menghapus properti", "error");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const bodyData = new FormData();
    bodyData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: bodyData,
      });
      const result = await res.json();
      if (res.ok && result.url) {
        setFormData((prev) => ({ ...prev, image: result.url }));
        showNotice(`Gambar berhasil diunggah ke ${result.storage}!`, "success");
      } else {
        showNotice(result.error || "Gagal mengunggah gambar", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showNotice("Koneksi gagal saat mengunggah", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      showNotice("Harap isi field utama (Judul, Harga, Lokasi)", "error");
      return;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      price: formData.price,
      priceNum: Number(formData.priceNum),
      location: formData.location,
      landArea: Number(formData.landArea),
      buildingArea: Number(formData.buildingArea),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      image: formData.image,
      badge: formData.badge,
      description: formData.description,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      isFeatured: formData.isFeatured,
    };

    try {
      if (isEditing && editId) {
        // UPDATE
        const res = await fetch(`/api/properties/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const resJson = await res.json();
        if (res.ok) {
          showNotice(`Properti "${formData.title}" berhasil diperbarui!`, "success");
          handleResetForm();
          fetchData();
          if (onPropertiesUpdated) onPropertiesUpdated();
        } else {
          showNotice(resJson.error || "Gagal memperbarui properti", "error");
        }
      } else {
        // CREATE
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const resJson = await res.json();
        if (res.ok) {
          showNotice(`Properti "${formData.title}" berhasil ditambahkan!`, "success");
          handleResetForm();
          fetchData();
          if (onPropertiesUpdated) onPropertiesUpdated();
        } else {
          showNotice(resJson.error || "Gagal menambahkan properti", "error");
        }
      }
    } catch (err) {
      console.error(err);
      showNotice("Terjadi kesalahan koneksi database", "error");
    }
  };

  if (!isOpen) return null;

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 p-1.5 flex items-center justify-center border border-white/10">
              <img
                src="/images/logo_oxid_white.png"
                alt="OXID Labs"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                OXID Labs Control Room
                <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                  Full CRUD & Leads
                </span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Kelola listing properti real estate OXID Labs, upload media ke R2 / Cloudflare, dan monitor leads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-emerald-400" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
              title="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`px-6 py-3 text-xs sm:text-sm flex items-center gap-2 border-b transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-950/60 border-emerald-800/80 text-emerald-200"
                : "bg-rose-950/60 border-rose-800/80 text-rose-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="px-6 py-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("properties")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "properties"
                  ? "bg-stone-100 text-stone-950 shadow-md"
                  : "bg-stone-950 text-stone-400 hover:text-white border border-stone-800"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Kelola Properti ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "inquiries"
                  ? "bg-stone-100 text-stone-950 shadow-md"
                  : "bg-stone-950 text-stone-400 hover:text-white border border-stone-800"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Inquiries Masuk ({inquiries.length})
            </button>
          </div>

          {activeTab === "properties" && (
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari properti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-stone-600"
              />
            </div>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === "properties" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form (Create or Edit) */}
              <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Edit className="w-4 h-4 text-amber-400" />
                        Edit Properti #{editId?.slice(0, 6)}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-emerald-400" />
                        Tambah Listing Baru
                      </>
                    )}
                  </h3>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs text-stone-400 hover:text-white underline"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Judul Properti *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. The OXID Cantilever Villa"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-400 mb-1 font-medium">Kategori</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="cantilever">Cantilever</option>
                        <option value="cottage">Cottage</option>
                        <option value="mansion">Mansion</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1 font-medium">Badge</label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="e.g. Signature Masterpiece"
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-400 mb-1 font-medium">Format Harga (Teks)</label>
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Rp 4.850.000.000"
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1 font-medium">Nominal Angka (IDR)</label>
                      <input
                        type="number"
                        required
                        value={formData.priceNum}
                        onChange={(e) => setFormData({ ...formData, priceNum: Number(e.target.value) })}
                        placeholder="4850000000"
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Lokasi Properti *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. South Ridge Boulevard, Enclave A-01"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Image input & Cloudflare R2 / Local file uploader */}
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Gambar (URL / Upload ke R2 Storage)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/images/house-container-hd.webp atau https://..."
                        className="flex-1 px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      />
                      <label className="cursor-pointer px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl flex items-center gap-1.5 transition-colors font-medium">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploading ? "Uploading..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-stone-400 text-[10px] mb-1">Kamar Tidur</label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 text-[10px] mb-1">Kamar Mandi</label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 text-[10px] mb-1">Luas Tanah (m²)</label>
                      <input
                        type="number"
                        value={formData.landArea}
                        onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 text-[10px] mb-1">Bangunan (m²)</label>
                      <input
                        type="number"
                        value={formData.buildingArea}
                        onChange={(e) => setFormData({ ...formData, buildingArea: Number(e.target.value) })}
                        className="w-full px-2 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Fitur Utama (Pisahkan koma)</label>
                    <input
                      type="text"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Cedar Wood Cantilever Roof, Panoramic Glass, Heated Plunge Pool"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Deskripsi Singkat</label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Villa ikonik 2 lantai berkonsep kantilever kayu cedar hangat..."
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded bg-stone-900 border-stone-800 text-emerald-500 focus:ring-0"
                    />
                    <label htmlFor="isFeatured" className="text-stone-300 text-xs">
                      Tandai sebagai Unit Pilihan Utama (Featured)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
                  >
                    {isEditing ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span>{isEditing ? "Simpan Perubahan Properti" : "Tambah Properti ke Database"}</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Listing Table / Cards */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                  <span>Menampilkan {filteredProperties.length} dari {properties.length} properti</span>
                  <span className="text-[11px] text-stone-500">Live Supabase / Local Dual Sync</span>
                </div>

                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {filteredProperties.length === 0 ? (
                    <div className="text-center py-12 bg-stone-950 border border-stone-800 rounded-2xl text-stone-500 text-xs">
                      Tidak ada properti ditemukan. Silakan tambahkan properti baru di formulir.
                    </div>
                  ) : (
                    filteredProperties.map((prop) => (
                      <div
                        key={prop.id}
                        className="p-3.5 bg-stone-950/70 border border-stone-800/80 rounded-2xl flex items-center justify-between gap-4 hover:border-stone-700 transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-800 border border-stone-800"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/house-container-hd.webp";
                            }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 uppercase">
                                {prop.category}
                              </span>
                              {prop.badge && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {prop.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-white truncate mt-1">{prop.title}</h4>
                            <p className="text-xs text-stone-400 truncate">{prop.location} • <strong className="text-emerald-400">{prop.price}</strong></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleEditClick(prop)}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 transition-colors"
                            title="Edit Properti"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(prop.id, prop.title)}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-rose-950/80 text-rose-400 hover:text-rose-300 transition-colors"
                            title="Hapus Properti"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Inquiries Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Daftar konsultasi & booking private tour masuk:</span>
                <span>Total: {inquiries.length} Inquiries</span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-16 bg-stone-950 border border-stone-800 rounded-2xl text-stone-500 text-xs">
                  Belum ada pesan inquiry baru dari formulir konsultasi web.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 bg-stone-950 border border-stone-800 rounded-2xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                          <p className="text-xs text-stone-400">{inq.phone}</p>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                          {inq.status}
                        </span>
                      </div>

                      <div className="p-3 bg-stone-900 rounded-xl text-xs space-y-1 text-stone-300">
                        <p><strong className="text-stone-400">Unit Villa:</strong> {inq.villa}</p>
                        {inq.preferredDate && (
                          <p><strong className="text-stone-400">Tanggal Kunjungan:</strong> {inq.preferredDate}</p>
                        )}
                        {inq.notes && (
                          <p className="pt-1 text-stone-300 italic border-t border-stone-800 mt-2">
                            "{inq.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                        <span>{new Date(inq.createdAt).toLocaleString("id-ID")}</span>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Halo%20${encodeURIComponent(inq.name)},%20terima%20kasih%20telah%20menghubungi%20OXID%20Labs%20mengenai%20${encodeURIComponent(inq.villa)}...`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                        >
                          Hubungi via WhatsApp
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
