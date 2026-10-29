"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, Phone, SlidersHorizontal, Database, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenAdmin?: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenSearch }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between relative">
        
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

        {/* Center: Iconic Black Curved Notch Navigation */}
        <nav className="header-notch px-5 sm:px-7 py-2 flex items-center gap-4 sm:gap-6 shadow-md">
          <Link
            href="#hero"
            className="px-3.5 py-1 rounded-full bg-white text-black text-xs font-bold tracking-wider uppercase transition-transform hover:scale-105 shadow-sm"
          >
            MAIN
          </Link>
          <Link
            href="#catalog"
            className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            CATALOG
          </Link>
          <Link
            href="#consult"
            className="text-white/80 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            CONSULT
          </Link>
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black text-[11px] font-extrabold tracking-wider uppercase hover:bg-amber-300 transition-colors shadow-sm"
            title="Buka Sistem CRUD Properti"
          >
            <Database className="w-3 h-3" />
            <span>CRUD ADMIN</span>
          </button>
        </nav>

        {/* Right: Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Cari Properti"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-black flex items-center justify-center text-slate-700 hover:text-black transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Direct Admin CRUD Trigger Button */}
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Management"
            className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 hover:border-black text-xs font-bold text-slate-800 transition-colors bg-white hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
            <span>Kelola Properti</span>
          </button>

          {/* Contact Pill Button with Phone Circle */}
          <Link
            href="#consult"
            className="hidden sm:inline-flex items-center pl-4 pr-1 py-1 rounded-full border border-slate-200 hover:border-black text-xs font-bold text-slate-800 transition-colors gap-2 bg-white"
          >
            <span>Contact</span>
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-black hover:opacity-70 focus:outline-none ml-1 sm:hidden"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="sm:hidden px-6 py-4 bg-slate-50 border-t border-slate-200 space-y-3 animate-in slide-in-from-top-2">
          <Link
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-900 py-1 border-b border-slate-200"
          >
            Main Overview
          </Link>
          <Link
            href="#catalog"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-900 py-1 border-b border-slate-200"
          >
            Property Catalog
          </Link>
          <Link
            href="#philosophy"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-900 py-1 border-b border-slate-200"
          >
            Architecture & Craft
          </Link>
          <Link
            href="#amenities"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-900 py-1 border-b border-slate-200"
          >
            Amenities & Enclave
          </Link>
          <Link
            href="#simulator"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-900 py-1 border-b border-slate-200"
          >
            Financial Simulator
          </Link>
          <Link
            href="#consult"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-900 py-1 border-b border-slate-200"
          >
            Contact & Consult
          </Link>
          <button
            onClick={() => {
              setMobileOpen(false);
              if (onOpenAdmin) onOpenAdmin();
            }}
            className="w-full py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <Database className="w-4 h-4" />
            <span>Buka Admin CRUD Properti</span>
          </button>
        </div>
      )}
    </header>
  );
};
