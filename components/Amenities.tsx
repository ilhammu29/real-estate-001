"use client";

import React from "react";
import { Waves, Cpu, ShieldCheck, Sparkles } from "lucide-react";

export const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="w-full py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 block mb-2">
              Modern Living Privileges
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
              Fasilitas Privat Komunitas
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg">
              Kenyamanan resor bintang lima terintegrasi penuh di dalam enklave hunian privat Anda.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[28px] p-6 border border-slate-200 hover:border-black transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-black mb-5 group-hover:bg-black group-hover:text-white transition-colors">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Heated Infinity Pool</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kolam renang air hangat dengan tepi kaca tanpa batas menghadap panorama lembah hijau.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 border border-slate-200 hover:border-black transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-black mb-5 group-hover:bg-black group-hover:text-white transition-colors">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Smart Living AI</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Integrasi penuh pencahayaan sirkadian, tirai otomatis, dan tata suara B&O multi-zona.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 border border-slate-200 hover:border-black transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-black mb-5 group-hover:bg-black group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">24/7 Private Security</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pengenalan plat nomor otomatis, biometrik gerbang utama, dan patroli keamanan bersertifikasi.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 border border-slate-200 hover:border-black transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-black mb-5 group-hover:bg-black group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Cedar Sauna & Spa</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Paviliun kesehatan privat dengan sauna kayu cedar Finlandia dan area meditasi yoga.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
