"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

interface HeroProps {
  onOpenConsult?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsult }) => {
  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-3 pb-8 flex flex-col justify-start">
      
      {/* Title & Eyebrow Wrapper */}
      <div className="relative pt-1 pb-2">
        {/* Tiny Eyebrow */}
        <div className="text-left pl-1 sm:pl-2 mb-1">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-slate-400 font-semibold">
            Your · Dream · Property · Awaits
          </span>
        </div>

        {/* Giant Modernist Headline "OXIDLabs" in Plus Jakarta Sans */}
        <h1 className="font-extrabold text-[14.5vw] sm:text-[12.5vw] lg:text-[9.8vw] leading-[0.88] tracking-[-0.038em] text-black select-none pointer-events-none">
          OXIDLabs
        </h1>

        {/* Left Social Icons & Architectural Thumbnail Pill */}
        <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-2.5 pl-1 sm:pl-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-black hover:text-white transition-colors"
            >
              f
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-black hover:text-white transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter X"
              className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-black hover:text-white transition-colors"
            >
              x
            </a>
          </div>

          {/* Mini Gallery Capsule */}
          <Link
            href="#catalog"
            className="hidden sm:inline-flex items-center p-1 rounded-full border border-slate-300 bg-white shadow-sm gap-1.5 hover:border-black transition-colors"
          >
            <div className="h-6 w-16 relative rounded-full overflow-hidden">
              <Image
                src="/images/pill-thumbnails.jpg"
                alt="Architectural Previews"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="text-xs font-semibold pr-2.5 text-slate-600">3 views</span>
          </Link>
        </div>
      </div>

      {/* CENTRAL HOUSE SHOWCASE CONTAINER (EXACT HOUSE FROM REFERENCE) */}
      <div className="relative w-full rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-floating mt-3 bg-slate-100 border border-slate-200/80">
        
        <div className="relative w-full h-[46vh] sm:h-[53vh] lg:h-[58vh] min-h-[300px] max-h-[660px] overflow-hidden">
          <Image
            src="/images/house-container-hd.webp"
            alt="OXID Cantilever Architectural Villa — Warm Timber & Glass"
            fill
            priority
            className="object-cover object-center filter saturate-[1.04] contrast-[1.02]"
            unoptimized
          />

          {/* Top Left Floating Pill */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white/95 backdrop-blur-md text-black shadow-md border border-white/80 transition-transform hover:scale-102">
              <svg className="w-3.5 h-3.5 text-black flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
              </svg>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-slate-900">
                Dedicated to personalized service, finding the perfect home for your family
              </span>
            </div>
          </div>

          {/* Bottom Left Starburst Compass Wireframe */}
          <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 z-20 pointer-events-none">
            <div className="starburst-icon">
              <div className="starburst-inner"></div>
            </div>
          </div>

          {/* Bottom Right Floating Stats Cards (Side by Side - Exact Reference) */}
          <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 z-20 flex items-end gap-2.5 sm:gap-3">
            
            {/* Card 1: +300 Reviews with Avatar Stack */}
            <div className="bg-white/95 backdrop-blur-md rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 shadow-2xl border border-white/80 w-[120px] sm:w-[150px] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div>
                <h4 className="font-black text-2xl sm:text-3xl text-black leading-none mb-1">+300</h4>
                <p className="text-[9px] sm:text-[10px] text-slate-500 leading-snug font-medium mb-2.5">
                  clients have left positive reviews about our work.
                </p>
              </div>
              <div className="flex items-center -space-x-2 pt-1">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
                  <Image src="/images/avatar-dedy.webp" alt="Client 1" fill className="object-cover" unoptimized />
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
                  <Image src="/images/avatar-sari.webp" alt="Client 2" fill className="object-cover" unoptimized />
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
                  <Image src="/images/avatar-nabila.webp" alt="Client 3" fill className="object-cover" unoptimized />
                </div>
              </div>
            </div>

            {/* Card 2: 274 Cottages Built with Thumbnail & Arrow Button */}
            <div className="bg-white/95 backdrop-blur-md rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 shadow-2xl border border-white/80 w-[120px] sm:w-[150px] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div>
                <div className="w-full h-10 sm:h-12 rounded-xl overflow-hidden mb-2 border border-slate-100 relative">
                  <Image src="/images/cottage-thumb.jpg" alt="Modern Cottage" fill className="object-cover" unoptimized />
                </div>
                <h4 className="font-black text-2xl sm:text-3xl text-black leading-none mb-1">274</h4>
                <p className="text-[9px] sm:text-[10px] text-slate-500 leading-snug font-medium mb-2.5">
                  cottages have been built since 2021. 87% are already rented or sold
                </p>
              </div>
              <Link
                href="#catalog"
                aria-label="Explore Built Cottages"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center self-end hover:scale-110 transition-transform"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bottom Center Curved Cutout Notch */}
          <div className="bottom-cutout hidden sm:block"></div>
        </div>
      </div>

      {/* Quick Specs Ribbon Directly Below House */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black"></span>
          <span><strong>Architecture:</strong> Cantilevered Timber & Steel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-700"></span>
          <span><strong>Glazing:</strong> Acoustic Schüco Triple-Glazed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span><strong>Certification:</strong> Net-Zero Energy Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span><strong>Location:</strong> South Ridge Boulevard</span>
        </div>
      </div>
    </section>
  );
};
