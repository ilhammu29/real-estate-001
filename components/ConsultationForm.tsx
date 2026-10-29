"use client";

import React, { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

interface ConsultationFormProps {
  selectedVilla?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ selectedVilla }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [villa, setVilla] = useState(selectedVilla || "The OXID Cantilever Villa");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          villa,
          preferredDate: date,
          notes,
        }),
      });

      setSubmitted(true);
      const waText = encodeURIComponent(
        `Halo OXID Labs,\nSaya ingin konsultasi arsitektur & private tour:\n- Nama: ${name}\n- WhatsApp: ${phone}\n- Pilihan Unit: ${villa}\n- Tanggal Kunjungan: ${date}\n- Catatan: ${notes}`
      );

      setTimeout(() => {
        window.open(`https://wa.me/6281234567890?text=${waText}`, "_blank");
      }, 800);
    } catch (err) {
      console.error("Inquiry error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consult" className="w-full py-20 bg-slate-50/80 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 block mb-2">
            Dedicated Personalized Service
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
            Konsultasi & Kunjungan Privat
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Dapatkan layanan pendampingan arsitek secara langsung serta konsultasi denah dan penataan interior kustom.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-[36px] p-6 sm:p-10 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <h4 className="font-bold text-lg text-black mb-2">Permintaan Kunjungan Terkirim!</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                Terima kasih {name}. Tim konsultan arsitektur OXID Labs akan segera menghubungi Anda melalui WhatsApp {phone}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase"
              >
                Kirim Permintaan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Bapak / Ibu ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-black placeholder:text-slate-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-black placeholder:text-slate-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Pilihan Koleksi Villa
                  </label>
                  <select
                    value={villa}
                    onChange={(e) => setVilla(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
                  >
                    <option value="The OXID Cantilever Villa">The OXID Cantilever Villa (Rp 4,85 M)</option>
                    <option value="The OXID Timber Ridge Cottage">The OXID Timber Ridge Cottage (Rp 2,85 M)</option>
                    <option value="The OXID Brutalist Sanctuary">The OXID Brutalist Sanctuary (Rp 6,20 M)</option>
                    <option value="The OXID Glass Horizon Pavilion">The OXID Glass Horizon Pavilion (Rp 5,45 M)</option>
                    <option value="The OXID Cliffside Haven Villa">The OXID Cliffside Haven Villa (Rp 7,80 M)</option>
                    <option value="The OXID Zen Mountain Residence">The OXID Zen Mountain Residence (Rp 3,95 M)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rencana Kunjungan
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Catatan Tambahan / Preferensi Khusus
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan jika ada kebutuhan spesifik mengenai denah, orientasi hadap, atau waktu penjemputan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-black placeholder:text-slate-400 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Mengirim..." : "Kirim Permintaan Konsultasi"}</span>
                </button>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    "Halo OXID Labs, saya ingin konsultasi arsitektur dan jadwalkan private tour"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 hover:border-black text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Langsung</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
