"use client";

import React, { useState } from "react";

export const MortgageCalculator: React.FC = () => {
  const [price, setPrice] = useState<number>(4850000000);
  const [dpPct, setDpPct] = useState<number>(20);
  const [tenor, setTenor] = useState<number>(15);
  const [rate, setRate] = useState<number>(4.5);

  const formatRupiah = (num: number) => {
    return "Rp " + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const dpVal = price * (dpPct / 100);
  const principal = price - dpVal;

  const monthlyRate = rate / 100 / 12;
  const totalMonths = tenor * 12;
  let monthlyInstallment = 0;
  if (monthlyRate > 0) {
    monthlyInstallment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyInstallment = principal / totalMonths;
  }

  return (
    <section id="simulator" className="w-full py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800 block mb-2">
            Smart Property Financing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Kalkulator Simulasi Finansial
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Dapatkan estimasi angsuran bulanan yang transparan dengan suku bunga prioritas rekanan perbankan terkemuka.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[36px] p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Harga Properti</label>
                <span className="text-base font-bold text-black">{formatRupiah(price)}</span>
              </div>
              <input
                type="range"
                min="2000000000"
                max="15000000000"
                step="100000000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Uang Muka (DP: {dpPct}%)
                </label>
                <span className="text-base font-bold text-amber-800">{formatRupiah(dpVal)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={dpPct}
                onChange={(e) => setDpPct(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Tenor (Tahun)</label>
                  <span className="text-sm font-bold text-black">{tenor} Thn</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={tenor}
                  onChange={(e) => setTenor(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Bunga Bank</label>
                  <span className="text-sm font-bold text-emerald-600">{rate.toFixed(1)}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="8.0"
                  step="0.25"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-900 text-white rounded-[28px] p-6 sm:p-7 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                Estimasi Angsuran Bulanan
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                {formatRupiah(monthlyInstallment)}
              </h3>
              <p className="text-[11px] text-slate-400 mb-6">Fixed rate 3 tahun pertama program prioritas rekanan.</p>

              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Pokok Pinjaman:</span>
                  <strong className="text-white">{formatRupiah(principal)}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimasi DP:</span>
                  <strong className="text-white">{formatRupiah(dpVal)}</strong>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <a
                href="#consult"
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-black font-bold text-xs uppercase tracking-wider text-center block transition-colors"
              >
                Ajukan Penawaran KPR
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
