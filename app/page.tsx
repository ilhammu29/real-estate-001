"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyCatalog } from "@/components/PropertyCatalog";
import { Philosophy } from "@/components/Philosophy";
import { Amenities } from "@/components/Amenities";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { ConsultationForm } from "@/components/ConsultationForm";
import Footer from "@/components/Footer";
import FloorPlanModal from "@/components/FloorPlanModal";
import { Property } from "@/lib/types";

export default function HomePage() {
  const [selectedPlanProperty, setSelectedPlanProperty] = useState<Property | null>(null);
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);
  const [selectedVillaName, setSelectedVillaName] = useState<string>("The OXID Cantilever Villa");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleOpenPlan = (prop: Property) => {
    setSelectedPlanProperty(prop);
    setIsPlanOpen(true);
  };

  const handleSelectBooking = (prop: Property) => {
    setSelectedVillaName(prop.title);
    const consultElem = document.getElementById("consult");
    if (consultElem) {
      consultElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Top Refined Navbar */}
      <Navbar 
        onOpenSearch={() => {
          const catElem = document.getElementById("catalog");
          if (catElem) catElem.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Modernist Hero Section with Depth (Text BEHIND House & Nano Banana Image) */}
        <Hero onOpenConsult={() => {
          const consultElem = document.getElementById("consult");
          if (consultElem) consultElem.scrollIntoView({ behavior: "smooth" });
        }} />

        {/* Live Dynamic Catalog Preview */}
        <div id="catalog" className="w-full">
          <PropertyCatalog
            onSelectPlan={handleOpenPlan}
            onSelectBooking={handleSelectBooking}
            refreshTrigger={refreshKey}
          />
        </div>

        {/* Architectural Philosophy & Sustainable Craft */}
        <div id="philosophy" className="w-full">
          <Philosophy />
        </div>

        {/* Exclusive Living Amenities */}
        <div id="amenities" className="w-full">
          <Amenities />
        </div>

        {/* Dynamic Financial Mortgage Simulator */}
        <div id="calculator" className="w-full">
          <MortgageCalculator />
        </div>

        {/* Consultation & Private Tour Reservation */}
        <div id="consult" className="w-full">
          <ConsultationForm selectedVilla={selectedVillaName} />
        </div>
      </main>

      {/* Global Minimalist Luxury Footer */}
      <Footer />

      {/* Interactive CAD Floor Plan Blueprint Modal */}
      <FloorPlanModal
        isOpen={isPlanOpen}
        property={selectedPlanProperty}
        onClose={() => setIsPlanOpen(false)}
      />
    </div>
  );
}
