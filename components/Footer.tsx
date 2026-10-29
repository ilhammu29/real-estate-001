"use client";

import React from "react";
import { Compass, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="w-full bg-[#0a0a0a] text-stone-300 border-t border-stone-800/80 pt-16 pb-12 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 p-1 flex items-center justify-center">
                <img
                  src="/images/logo_oxid_white.png"
                  alt="OXID Labs"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">OXID</span>
                <span className="text-xl sm:text-2xl font-light tracking-tight text-white">Labs</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ml-0.5"></span>
              </div>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Arsitektur hunian tropis kontemporer dari OXID Labs yang menggabungkan kesederhanaan estetika minimalis, efisiensi energi terbarukan, dan kenyamanan hidup tingkat tinggi.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-stone-700 hover:border-emerald-500/50 hover:bg-stone-800 text-xs font-semibold text-stone-200 transition-all"
              >
                <span>Buka Admin CRUD</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Navigasi Portfolio */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-bold">Koleksi Properti</h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><a href="#properties" className="hover:text-emerald-400 transition-colors">Cliffside Villas</a></li>
              <li><a href="#properties" className="hover:text-emerald-400 transition-colors">Private Sanctuaries</a></li>
              <li><a href="#properties" className="hover:text-emerald-400 transition-colors">Skyline Penthouses</a></li>
              <li><a href="#properties" className="hover:text-emerald-400 transition-colors">Eco-Living Enclaves</a></li>
            </ul>
          </div>

          {/* Eksplorasi & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-bold">Navigasi</h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><a href="#philosophy" className="hover:text-emerald-400 transition-colors">Filosofi & Craft</a></li>
              <li><a href="#amenities" className="hover:text-emerald-400 transition-colors">Fasilitas Unggulan</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Simulasi KPR Bank</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Jadwalkan Private Tour</a></li>
            </ul>
          </div>

          {/* Kontak & Galeri Studio */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-bold">Studio & Gallery</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              SCBD Equity Tower, Lt. 28, Sudirman, Jakarta Selatan
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Jalan Pantai Bingin No. 88, Uluwatu, Bali
            </p>
            <div className="space-y-1 pt-1 text-xs text-stone-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                +62 821-4567-8900
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                concierge@oxidlabs.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} OXID Labs Real Estate & Architecture. Dilindungi Hak Cipta.</p>
          <div className="flex items-center gap-6">
            <span>Next.js 16 • Tailwind CSS • Supabase • Cloudflare R2</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-emerald-400 transition-colors"
            >
              Control Panel
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
