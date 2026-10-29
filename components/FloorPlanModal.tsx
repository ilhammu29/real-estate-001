"use client";

import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, Maximize2, Layers, CheckCircle2, Ruler, BedDouble, Bath } from "lucide-react";
import { Property } from "@/lib/types";

interface FloorPlanModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FloorPlanModal({ property, isOpen, onClose }: FloorPlanModalProps) {
  const [activeLevel, setActiveLevel] = useState<"level1" | "level2" | "master">("level1");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              Blueprints & Space Planning
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{property.title}</h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">{property.location} • Luas: {property.buildingArea} m²</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors"
            aria-label="Tutup blueprint"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blueprint Tabs & Zoom Controls */}
        <div className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveLevel("level1")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeLevel === "level1"
                  ? "bg-stone-800 text-white shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Lantai 1 Ground
            </button>
            <button
              onClick={() => setActiveLevel("level2")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeLevel === "level2"
                  ? "bg-stone-800 text-white shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Lantai 2 Mezzanine
            </button>
            <button
              onClick={() => setActiveLevel("master")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeLevel === "master"
                  ? "bg-stone-800 text-white shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Master Suite 3D
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 text-xs hidden sm:inline">Zoom: {Math.round(zoomLevel * 100)}%</span>
            <div className="flex items-center bg-stone-950 rounded-xl border border-stone-800 p-1">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2 text-[11px] text-stone-400 hover:text-white"
                title="Reset Zoom"
              >
                100%
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
                className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Blueprint Canvas View */}
        <div className="p-6 overflow-auto flex-1 flex items-center justify-center bg-[#0d131a] relative min-h-[350px]">
          {/* Blueprint Grid pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          <div 
            className="relative transition-transform duration-200 ease-out origin-center select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* SVG Schematic Drawing */}
            <svg
              viewBox="0 0 700 420"
              className="w-[640px] max-w-full h-auto drop-shadow-[0_0_25px_rgba(56,189,248,0.15)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Boundary Wall */}
              <rect
                x="30"
                y="30"
                width="640"
                height="360"
                rx="14"
                fill="#131b26"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />

              {/* Main Living / Courtyard Space */}
              <rect x="50" y="50" width="380" height="220" rx="8" fill="#182333" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="70" y="85" fill="#e0f2fe" fontSize="14" fontWeight="bold">Living & Dining Hall</text>
              <text x="70" y="105" fill="#94a3b8" fontSize="11">12.5m × 6.8m • High Ceiling (4.2m)</text>

              {/* Sunken Lounge / Infinity Pool Terrace */}
              <rect x="65" y="130" width="160" height="110" rx="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
              <text x="80" y="185" fill="#38bdf8" fontSize="12" fontWeight="600">Infinity Pool Deck</text>
              <text x="80" y="205" fill="#7dd3fc" fontSize="10">Heated & UV Filtered</text>

              {/* Designer Kitchen & Bar */}
              <rect x="250" y="130" width="160" height="110" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <text x="265" y="180" fill="#f8fafc" fontSize="12" fontWeight="600">Island Dry Kitchen</text>
              <text x="265" y="200" fill="#94a3b8" fontSize="10">Quartz Stone Counter</text>

              {/* Master Suite / Private Wing */}
              <rect x="450" y="50" width="200" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="465" y="85" fill="#e0f2fe" fontSize="13" fontWeight="bold">
                {activeLevel === "level1" ? "Guest Suite 01" : "Master Sanctuary"}
              </text>
              <text x="465" y="105" fill="#94a3b8" fontSize="10">En-suite Bath & Walk-in</text>
              <circle cx="550" cy="145" r="28" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
              <text x="532" y="150" fill="#38bdf8" fontSize="11">King Bed</text>

              {/* Zen Garden & Open Lightwell */}
              <rect x="450" y="250" width="200" height="120" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="465" y="295" fill="#6ee7b7" fontSize="12" fontWeight="600">Zen Courtyard / Lightwell</text>
              <text x="465" y="315" fill="#a7f3d0" fontSize="10">Indoor Bonsai & Skylight</text>

              {/* Garage / Carport */}
              <rect x="50" y="290" width="220" height="80" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="65" y="335" fill="#cbd5e1" fontSize="12" fontWeight="600">Double EV Carport</text>
              <text x="65" y="352" fill="#94a3b8" fontSize="10">22kW Wallbox Fast Charger</text>

              {/* Entry Foyer */}
              <rect x="290" y="290" width="140" height="80" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <text x="305" y="335" fill="#cbd5e1" fontSize="12" fontWeight="600">Entry Foyer</text>
              <text x="305" y="352" fill="#94a3b8" fontSize="10">Smart Keyless Gate</text>

              {/* Dimension Callouts */}
              <line x1="30" y1="15" x2="670" y2="15" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="330" y="18" fill="#94a3b8" fontSize="11" textAnchor="middle">24.50 METERS</text>
            </svg>
          </div>
        </div>

        {/* Footer specs */}
        <div className="p-6 bg-stone-950/90 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300">
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-emerald-400" />
              <strong>{property.bedrooms}</strong> Kamar Tidur
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-emerald-400" />
              <strong>{property.bathrooms}</strong> Kamar Mandi
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-emerald-400" />
              <strong>{property.buildingArea} m²</strong> Bangunan
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-emerald-500 text-stone-950 hover:bg-emerald-400 font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/20"
            >
              Request High-Res CAD (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
