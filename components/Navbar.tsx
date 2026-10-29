"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Phone, Menu, X, ArrowUpRight, Compass, Shield, Building2, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between relative">
          
          {/* Left: Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl border border-black/10 bg-black/5 flex items-center justify-center p-1 group-hover:scale-105 transition-transform shadow-sm overflow-hidden">
              <img
                src="/images/logo_oxid_mark.png"
                alt="OXID Labs Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-xl tracking-tight text-black">OXID</span>
              <span className="font-medium text-xl tracking-tight text-black">Labs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold ml-1.5 hidden md:inline">Estates</span>
            </div>
          </Link>

          {/* Center: Iconic Black Curved Notch Navigation (Desktop) */}
          <nav className="header-notch px-6 sm:px-8 py-2 hidden sm:flex items-center gap-5 sm:gap-7 shadow-md">
            <Link
              href="/"
              className="px-4 py-1 rounded-full bg-white text-black text-xs font-bold tracking-wider uppercase transition-transform hover:scale-105 shadow-sm"
            >
              MAIN
            </Link>
            <Link
              href="/catalog"
              className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              KATALOG
            </Link>
            <Link
              href="/#philosophy"
              className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              FILOSOFI
            </Link>
            <Link
              href="/#consult"
              className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              KONSULTASI
            </Link>
          </nav>

          {/* Right: Action Cluster (NO ADMIN BUTTON HERE) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Cari Properti"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-black flex items-center justify-center text-slate-700 hover:text-black transition-colors"
              title="Cari Properti"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct WhatsApp Concierge Phone Pill */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20OXID%20Labs,%20saya%20tertarik%20dengan%20koleksi%20properti%20arsitektur..."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 pl-3 sm:pl-3.5 pr-1.5 py-1.5 rounded-full border border-slate-200 hover:border-black bg-white text-black font-semibold text-xs transition-all shadow-sm group hover:scale-[1.02]"
            >
              <span className="hidden md:inline font-bold uppercase tracking-wider text-[11px]">
                Concierge
              </span>
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Enhanced Sidebar Drawer Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Buka Menu"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-black flex items-center justify-center text-slate-700 hover:text-black transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Refined Sliding Sidebar Drawer */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="fixed top-0 right-0 h-full w-[85vw] max-w-md bg-stone-950 text-white border-l border-stone-800 shadow-2xl flex flex-col justify-between p-6 sm:p-8 transform transition-transform duration-300 ease-out z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand & Close */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 p-1 flex items-center justify-center">
                    <img
                      src="/images/logo_oxid_white.png"
                      alt="OXID Labs"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-extrabold text-base tracking-tight text-white">OXID Labs</span>
                    <span className="text-[10px] text-stone-400 block tracking-wider uppercase">Architecture & Estates</span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Tutup Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 space-y-3">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/60 text-white font-bold text-sm tracking-wide transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-mono">01</span>
                    <span>Halaman Utama (Main)</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  href="/catalog"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/60 text-white font-bold text-sm tracking-wide transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-mono">02</span>
                    <span>Katalog Lengkap Properti</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  href="/#philosophy"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/60 text-white font-bold text-sm tracking-wide transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-mono">03</span>
                    <span>Filosofi & Material Craft</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  href="/#amenities"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/60 text-white font-bold text-sm tracking-wide transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-mono">04</span>
                    <span>Fasilitas Unggulan</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  href="/#calculator"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/60 text-white font-bold text-sm tracking-wide transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-mono">05</span>
                    <span>Simulasi Finansial KPR</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link
                  href="/#consult"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800/60 text-white font-bold text-sm tracking-wide transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-stone-500 font-mono">06</span>
                    <span>Booking Private Tour</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </Link>
              </nav>
            </div>

            {/* Bottom Footer Info */}
            <div className="pt-6 border-t border-stone-800/80 space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Jam Layanan Concierge</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open 24/7
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-medium">
                  SCBD Equity Tower, Jakarta Selatan & Pantai Bingin, Uluwatu Bali
                </p>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20OXID%20Labs..."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi Concierge WhatsApp</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
