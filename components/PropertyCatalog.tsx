"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Property } from "@/lib/types";

interface PropertyCatalogProps {
  onSelectPlan: (property: Property) => void;
  onSelectBooking: (property: Property) => void;
  refreshTrigger?: number;
}

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  onSelectPlan,
  onSelectBooking,
  refreshTrigger,
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let url = "/api/properties";
      const params = new URLSearchParams();
      if (category !== "all") params.append("category", category);
      if (search) params.append("search", search);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [category, search, refreshTrigger]);

  return (
    <section id="catalog" className="w-full py-16 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 block mb-2">
              Curated Architectural Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
              Koleksi Hunian Arsitektur
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg">
              Dirancang presisi dengan material kayu alami, kaca termal, dan lanskap teras terbuka yang menyatu dengan alam.
            </p>
          </div>

          {/* Catalog Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  category === "all" ? "bg-black text-white" : "text-slate-600 hover:text-black"
                }`}
              >
                Semua Tipe
              </button>
              <button
                onClick={() => setCategory("cantilever")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === "cantilever" ? "bg-black text-white" : "text-slate-600 hover:text-black"
                }`}
              >
                Cantilever Villa
              </button>
              <button
                onClick={() => setCategory("cottage")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === "cottage" ? "bg-black text-white" : "text-slate-600 hover:text-black"
                }`}
              >
                Modern Cottage
              </button>
              <button
                onClick={() => setCategory("mansion")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === "mansion" ? "bg-black text-white" : "text-slate-600 hover:text-black"
                }`}
              >
                Grand Residence
              </button>
            </div>
          </div>
        </div>

        {/* Search bar inside catalog */}
        <div className="mb-8 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama unit atau lokasi..."
            className="w-full bg-white border border-slate-200 rounded-full px-5 py-2.5 text-xs text-black placeholder:text-slate-400 focus:outline-none focus:border-black transition-colors shadow-sm"
          />
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[32px] p-4 border border-slate-200 animate-pulse h-96"></div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[32px] border border-dashed border-slate-300">
            <h4 className="font-bold text-black text-lg mb-1">Belum Ada Properti</h4>
            <p className="text-xs text-slate-500">Gunakan tombol CRUD Admin di navbar untuk menambahkan properti pertama Anda.</p>
          </div>
        ) : (
          /* Property Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-[32px] overflow-hidden p-3.5 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 sm:h-72 rounded-[24px] overflow-hidden bg-slate-100">
                    <Image
                      src={prop.image || "/images/house-container-hd.webp"}
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                    {prop.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold">
                        {prop.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-black text-[10px] font-bold shadow-sm">
                      {prop.location}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        Type {prop.landArea} / {prop.buildingArea} m²
                      </span>
                      <span className="text-xs font-bold text-black">{prop.price}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-amber-800 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-normal line-clamp-2 mb-5">
                      {prop.description}
                    </p>

                    {/* Micro Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-2xl text-center text-xs mb-5 border border-slate-100">
                      <div>
                        <strong className="block text-black text-sm">{prop.landArea} m²</strong>
                        <span className="text-[10px] text-slate-400">Tanah</span>
                      </div>
                      <div className="border-x border-slate-200">
                        <strong className="block text-black text-sm">{prop.buildingArea} m²</strong>
                        <span className="text-[10px] text-slate-400">Bangunan</span>
                      </div>
                      <div>
                        <strong className="block text-black text-sm">{prop.bedrooms} KT / {prop.bathrooms} KM</strong>
                        <span className="text-[10px] text-slate-400">Kamar</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectPlan(prop)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-black text-black font-semibold text-xs tracking-wider uppercase transition-colors"
                  >
                    Denah CAD
                  </button>
                  <button
                    onClick={() => onSelectBooking(prop)}
                    className="flex-1 py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase text-center transition-colors"
                  >
                    Reservasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
