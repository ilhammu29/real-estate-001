"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAutofillDemo = () => {
    setEmail("admin@oxidlabs.com");
    setPassword("admin123");
    setErrorMessage("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Login gagal. Silakan periksa kredensial Anda.");
      }
    } catch (err) {
      setErrorMessage("Koneksi gagal saat menghubungi server autentikasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"
      />
      
      {/* Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="group flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 p-2 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xl">
              <img
                src="/images/logo_oxid_white.png"
                alt="OXID Labs"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">OXID Labs</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Admin Portal
            </span>
          </div>
          <p className="text-stone-400 text-xs mt-1">
            Sistem Autentikasi Internal Pengelolaan Properti & Leads
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-stone-900/80 backdrop-blur-xl border border-stone-800 rounded-3xl p-7 shadow-2xl">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@oxidlabs.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-white hover:bg-stone-200 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? "Mengautentikasi..." : "Masuk ke Control Room"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Autofill Hint */}
          <div className="mt-6 pt-5 border-t border-stone-800/80 text-center">
            <p className="text-[11px] text-stone-500 mb-2">Akun Demo Administrator Default:</p>
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 hover:border-emerald-500/40 text-[11px] text-stone-300 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Autofill: <strong>admin@oxidlabs.com</strong> / <strong>admin123</strong></span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Kembali ke Beranda Publik OXID Labs
          </Link>
        </div>
      </div>
    </div>
  );
}
