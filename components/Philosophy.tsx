"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Story & Craft */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 block mb-2">
              Sustainable Modernity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight mb-6">
              Penyatuan Struktur Kayu, Kaca, dan Lanskap Terbuka
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              OXID Labs didirikan atas keyakinan bahwa hunian terbaik adalah yang bernapas bersama alam. Melalui bentang kantilever kayu cedar yang lebar, kami menciptakan naungan alami dari terik matahari tropis tanpa menghalangi sirkulasi udara sejuk dan cahaya alami.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-black flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Kayu Cedar & Jati Bersertifikasi FSC</h4>
                  <p className="text-xs text-slate-500">Material kayu dipilih dari hutan lestari dengan ketahanan cuaca hingga puluhan tahun.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-black flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Kaca Akustik Low-E Double Pane</h4>
                  <p className="text-xs text-slate-500">Meredam kebisingan luar hingga 35dB dan menolak 85% radiasi panas inframerah.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-black flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Fondasi Beton Monolitik & Tangga Teras</h4>
                  <p className="text-xs text-slate-500">Struktur podium bertingkat yang tahan gempa dengan saluran drainase bawah tanah otomatis.</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                87%
              </div>
              <div className="text-xs">
                <span className="block font-bold text-black">Tingkat Okupansi & Penjualan Cepat</span>
                <span className="text-slate-500">274 unit telah terbangun sejak 2021 dengan kepuasan klien 99.4%.</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 h-[460px]">
              <Image
                src="/images/about-architecture.webp"
                alt="Interior Architecture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[28px] shadow-2xl border border-slate-200 max-w-xs">
              <p className="font-bold text-sm text-black mb-1">&quot;Bukan sekadar rumah, tapi karya seni spasial.&quot;</p>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">— Olexandr BY.SHIVA Design</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
