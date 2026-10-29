"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminCrudModal from "@/components/AdminCrudModal";
import { ArrowLeft, Database, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const [isAdminOpen, setIsAdminOpen] = useState(true);

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col font-sans">
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/10 p-2 flex items-center justify-center mb-6">
          <img
            src="/images/logo_oxid_white.png"
            alt="OXID Labs"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">OXID Labs Admin Control Panel</h1>
        <p className="text-stone-400 max-w-md mt-2 text-sm">
          Akses CRUD properti real estate OXID Labs, upload media Cloudflare R2 / S3 storage, dan kelola inquiry prospek.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            Buka Panel CRUD & Leads
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-200 text-sm font-semibold flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Landing Page
          </Link>
        </div>

        <AdminCrudModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </main>

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}
