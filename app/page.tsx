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
import AdminCrudModal from "@/components/AdminCrudModal";
import { Property } from "@/lib/types";

export default function HomePage() {
  const [selectedPlanProperty, setSelectedPlanProperty] = useState<Property | null>(null);
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
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

  const handlePropertiesUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenSearch={() => {
          const catElem = document.getElementById("catalog");
          if (catElem) catElem.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <Hero onOpenConsult={() => {
          const consultElem = document.getElementById("consult");
          if (consultElem) consultElem.scrollIntoView({ behavior: "smooth" });
        }} />

        {/* Live Dynamic Catalog (Backend CRUD-connected) */}
        <div id="catalog" className="w-full">
          <PropertyCatalog
            onSelectPlan={handleOpenPlan}
            onSelectBooking={handleSelectBooking}
            refreshTrigger={refreshKey}
          />
        </div>

        {/* Philosophy & Craft */}
        <div id="philosophy" className="w-full">
          <Philosophy />
        </div>

        {/* Exclusive Amenities */}
        <div id="amenities" className="w-full">
          <Amenities />
        </div>

        {/* Financial & Mortgage Simulator */}
        <div id="calculator" className="w-full">
          <MortgageCalculator />
        </div>

        {/* Consultation & Private Tour Booking */}
        <div id="consult" className="w-full">
          <ConsultationForm selectedVilla={selectedVillaName} />
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* CAD Floor Plan Blueprint Modal */}
      <FloorPlanModal
        isOpen={isPlanOpen}
        property={selectedPlanProperty}
        onClose={() => setIsPlanOpen(false)}
      />

      {/* Admin CRUD Modal (Direct Database Management) */}
      <AdminCrudModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onPropertiesUpdated={handlePropertiesUpdated}
      />
    </div>
  );
}
