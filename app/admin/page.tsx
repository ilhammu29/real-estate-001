"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminCrudModal from "@/components/AdminCrudModal";
import { ArrowLeft, LogOut, ShieldCheck, Database, Layers } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Check auth session
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          setUserEmail(data.user?.email || "admin@oxidlabs.com");
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-stone-400">Memverifikasi otorisasi admin OXID Labs...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="w-full bg-stone-950 border-b border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/10 p-1 flex items-center justify-center">
            <img
              src="/images/logo_oxid_white.png"
              alt="OXID Labs"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">OXID Labs</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Control Room
              </span>
            </div>
            <p className="text-[11px] text-stone-500">{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lihat Website Publik</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/10 p-2 flex items-center justify-center mb-6 shadow-2xl">
          <img
            src="/images/logo_oxid_white.png"
            alt="OXID Labs"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">OXID Labs Admin Control Panel</h1>
        <p className="text-stone-400 max-w-md mt-2 text-xs sm:text-sm">
          Kelola portofolio listing properti real estate, upload media ke Cloudflare R2 / S3 storage, dan tangani inquiry dari pembeli.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Buka Panel CRUD & Leads</span>
          </button>
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-full bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-200 text-xs uppercase tracking-wider font-semibold transition-all"
          >
            Buka Halaman Katalog
          </Link>
        </div>

        {/* Embedded Full CRUD Modal */}
        <AdminCrudModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </main>
    </div>
  );
}
