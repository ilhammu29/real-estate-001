"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, Sparkles, Compass, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenConsult?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsult }) => {
  return (
    <section id="hero" className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-12 flex flex-col justify-start relative overflow-hidden">
      
      {/* Eyebrow & Social Pill Ribbon */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 pb-2 pl-1 sm:pl-2 relative z-30"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-slate-500 font-bold">
            Nano Banana Architectural Series // Vol. 01
          </span>
        </div>

        {/* Floating Capsule Thumbnail */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] text-slate-700 font-semibold tracking-wide">
              Generative Architecture by Nano Banana
            </span>
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          HERO STAGE: GIANT TEXT "OXID LABS" DIRECTLY BEHIND THE HERO VILLA IMAGE
          ========================================================================= */}
      <div className="relative w-full mt-2 sm:mt-4 flex flex-col items-center">
        
        {/* BEHIND LAYER: Giant Modernist Text "OXID LABS" in Plus Jakarta Sans */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-4 sm:-top-8 lg:-top-12 inset-x-0 w-full flex justify-center items-center pointer-events-none select-none z-0"
        >
          <span className="font-extrabold text-[15.5vw] sm:text-[14vw] lg:text-[12.8vw] leading-[0.82] tracking-[-0.045em] text-slate-200 uppercase text-center block w-full drop-shadow-xs">
            OXID LABS
          </span>
        </motion.div>

        {/* FOREGROUND LAYER: Floating Central Villa Container (Overlaps the Text) */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full z-20 mt-12 sm:mt-16 lg:mt-20"
        >
          {/* Animated Float Container */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="w-full relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-stone-900 border border-slate-200 shadow-2xl group"
          >
            {/* The Nano Banana Generated Hero Image */}
            <div className="relative w-full aspect-[16/9] max-h-[660px] overflow-hidden">
              <Image
                src="/images/nano-banana-hero-villa.webp"
                alt="OXID Labs Nano Banana Modern Cantilever Luxury Villa"
                fill
                priority
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />

              {/* Subtle Ambient Film Grain / Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Top Left Floating Spec Pill */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute top-4 sm:top-7 left-4 sm:left-7 z-30"
              >
                <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-black shadow-lg border border-white/80 transition-transform hover:scale-105">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                    The Nano Sanctuary Villa
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                    • Type 420 m²
                  </span>
                </div>
              </motion.div>

              {/* Bottom Left Starburst Compass Wireframe */}
              <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 z-30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <Compass className="w-5 h-5 text-white/90 animate-[spin_24s_linear_infinite]" />
                </div>
                <div className="text-white drop-shadow-md hidden sm:block">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/90">South Ridge Facing</p>
                  <p className="text-[10px] text-white/70">360° Panoramic Light</p>
                </div>
              </div>

              {/* Bottom Right Floating Stats Cards (Exact Reference Style) */}
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2 sm:gap-3.5">
                {/* Card 1: Reviews with Avatar Stack */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                    <span className="text-amber-500 text-xs">★★★★★</span>
                    <span className="text-[10px] font-bold text-slate-500">4.9 / 5.0</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xl sm:text-2xl text-black leading-none mb-1">+350</h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">Ulasan Pemilik Villa</p>
                  </div>
                </motion.div>

                {/* Card 2: 274 Cottages Built with Action Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl flex flex-col justify-between min-w-[130px] sm:min-w-[160px]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Terbangun
                    </span>
                    <Link
                      href="/catalog"
                      className="w-6 h-6 rounded-full bg-black text-white hover:bg-emerald-600 flex items-center justify-center transition-colors"
                      title="Lihat Semua Properti"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xl sm:text-2xl text-black leading-none mb-1">274</h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">Unit Hunian Terkurasi</p>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Center Curved Notch */}
              <div className="bottom-cutout hidden md:block" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Specs Ribbon Directly Below House */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-6 sm:mt-8 w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
      >
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Desain Struktur</p>
          <p className="text-sm font-extrabold text-black mt-1">Cantilever Wood & Glass</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Efisiensi Energi</p>
          <p className="text-sm font-extrabold text-black mt-1">Smart Solar Array 12kW</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sertifikasi Hijau</p>
          <p className="text-sm font-extrabold text-black mt-1">Platinum Eco-Living</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Akses Kawasan</p>
          <p className="text-sm font-extrabold text-black mt-1">Private Gated Estate</p>
        </div>
      </motion.div>
    </section>
  );
};
