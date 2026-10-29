"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloorPlanModal from "@/components/FloorPlanModal";
import { Property } from "@/lib/types";
import { 
  Search, SlidersHorizontal, BedDouble, Bath, Maximize2, 
  MapPin, ArrowUpRight, CheckCircle2, Sparkles, Filter, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CatalogPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBeds, setSelectedBeds] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  // Blueprint Modal State
  const [selectedPlanProperty, setSelectedPlanProperty] = useState<Property | null>(null);
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        if (data.data) {
          setProperties(data.data);
          setFilteredProperties(data.data);
        }
      } catch (err) {
        console.error("Gagal memuat katalog properti:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  // Filter & Sort Logic
  useEffect(() => {
    let result = [...properties];

    // Filter Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter Beds
    if (selectedBeds !== "all") {
      const beds = Number(selectedBeds);
      result = result.filter((p) => p.bedrooms >= beds);
    }

    // Filter Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceNum - a.priceNum);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProperties(result);
  }, [properties, selectedCategory, selectedBeds, searchTerm, sortBy]);

  const handleOpenPlan = (property: Property) => {
    setSelectedPlanProperty(property);
    setIsPlanOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      <Navbar onOpenSearch={() => {
        const searchInput = document.getElementById("catalog-search");
        if (searchInput) searchInput.focus();
      }} />

      <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-20">
        
        {/* Header Title Section */}
        <div className="pb-8 border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Katalog Lengkap Portofolio Properti
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
              Koleksi Mahakarya OXID Labs
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Eksplorasi villa arsitektural tropis kontemporer berbalut kayu cedar alami, fasad kaca panoramik, dan kolam renang infinity privat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              Menampilkan {filteredProperties.length} Unit
            </span>
          </div>
        </div>

        {/* Filter Toolbar (Cardbox Controller) */}
        <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Semua Koleksi" },
              { id: "cantilever", label: "Cantilever Villa" },
              { id: "cottage", label: "Modern Cottage" },
              { id: "mansion", label: "Grand Estate" },
              { id: "penthouse", label: "Skyline Pavilion" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-black text-white shadow-md scale-102"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search, Beds & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-search"
                type="text"
                placeholder="Cari lokasi, tipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-black placeholder-slate-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Bedrooms Filter */}
            <select
              value={selectedBeds}
              onChange={(e) => setSelectedBeds(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700 font-semibold focus:outline-none focus:border-black transition-colors cursor-pointer"
            >
              <option value="all">Kamar: Semua</option>
              <option value="3">Min. 3 Kamar</option>
              <option value="4">Min. 4 Kamar</option>
              <option value="5">Min. 5 Kamar</option>
            </select>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700 font-semibold focus:outline-none focus:border-black transition-colors cursor-pointer"
            >
              <option value="featured">Urutan: Unggulan</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
            </select>
          </div>
        </div>

        {/* =========================================================================
            PROPERTIES GRID: ELEGANT MINIMALIST CARDBOXES
            ========================================================================= */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
            <p className="text-xs">Memuat katalog properti arsitektural...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="py-24 text-center bg-slate-50 rounded-3xl border border-slate-100 p-8">
            <p className="text-sm font-bold text-slate-700">Tidak ada properti yang cocok dengan filter Anda.</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau reset filter kategori.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedBeds("all");
              }}
              className="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProperties.map((prop, idx) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={prop.id}
                  className="cardbox group bg-white rounded-[32px] overflow-hidden p-3.5 border border-slate-200/90 hover:border-black shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Top Image Container with Badges */}
                  <div>
                    <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-100">
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          {prop.badge || prop.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-black text-[10px] font-extrabold shadow-sm">
                          {prop.price}
                        </span>
                      </div>

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Property Content Details */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-black tracking-tight mb-2 group-hover:text-amber-800 transition-colors">
                        {prop.title}
                      </h3>

                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                        {prop.description}
                      </p>

                      {/* Micro Specs Grid (Cardbox Feature) */}
                      <div className="grid grid-cols-4 gap-1 py-3 px-2 bg-slate-50 rounded-2xl text-center text-xs mb-4 border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Tanah</span>
                          <strong className="text-black text-xs font-bold">{prop.landArea}m²</strong>
                        </div>
                        <div className="border-l border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-medium">Bangunan</span>
                          <strong className="text-black text-xs font-bold">{prop.buildingArea}m²</strong>
                        </div>
                        <div className="border-l border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-medium">Kamar</span>
                          <strong className="text-black text-xs font-bold">{prop.bedrooms} KT</strong>
                        </div>
                        <div className="border-l border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-medium">Mandi</span>
                          <strong className="text-black text-xs font-bold">{prop.bathrooms} KM</strong>
                        </div>
                      </div>

                      {/* Key Features Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {prop.features.slice(0, 3).map((feat, fidx) => (
                          <span
                            key={fidx}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cardbox Action Bottom */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenPlan(prop)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-black bg-white text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Denah CAD</span>
                    </button>
                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                        `Halo OXID Labs, saya ingin reservasi private tour dan konsultasi mengenai ${prop.title} (${prop.price})...`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Reservasi</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <Footer />

      {/* CAD Floor Plan Blueprint Modal */}
      <FloorPlanModal
        isOpen={isPlanOpen}
        property={selectedPlanProperty}
        onClose={() => setIsPlanOpen(false)}
      />
    </div>
  );
}
