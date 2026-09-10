"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Armchair,
  Sparkles,
  Shield,
  Factory,
  Wrench,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  X,
  Ruler,
  Sliders,
  Maximize2
} from "lucide-react";

interface FurnitureItem {
  id: string;
  title: string;
  category: "bedroom" | "wardrobes" | "living" | "dining" | "office";
  categoryLabel: string;
  specs: string;
  material: string;
  description: string;
  image: string;
  customizableOptions: string[];
}

const FURNITURE_CATALOG: FurnitureItem[] = [
  {
    id: "bed-01",
    title: "Fluted Velvet King Platform Bed",
    category: "bedroom",
    categoryLabel: "Bedroom Sanctuary",
    specs: "Floor-to-Ceiling Headboard • Floating Nightstands",
    material: "Century Club Prime BWP 710 • D'Decor Velvet • Warm Brass Sconces",
    description: "Floor-to-ceiling vertical fluted headboard with acoustic back-padding, integrated warm reading sconces, and German hydraulic under-bed lift storage.",
    image: "/generated/furniture_bed.png",
    customizableOptions: ["King / Queen / Super King", "50+ Velvet & Leatherette Colors", "Integrated Wireless Chargers"]
  },
  {
    id: "wardrobe-01",
    title: "Full-Height Fluted Glass & Walnut Wardrobe",
    category: "wardrobes",
    categoryLabel: "Modular Storage",
    specs: "Floor-to-Ceiling • Walk-in or Wall-Mount Layout",
    material: "Smoked Toughened Glass • American Walnut • Sensor Lighting",
    description: "Modular wardrobe system with custom pull-out accessory trays, internal hanger sensor illumination, and soft-damped sliding panels.",
    image: "/generated/furniture_wardrobe.png",
    customizableOptions: ["Custom Wall Heights (8ft - 11ft)", "Bronze / Charcoal Aluminum Frames", "Digital Vault Integration"]
  },
  {
    id: "sofa-01",
    title: "Emerald Velvet Architectural Sectional",
    category: "living",
    categoryLabel: "Living Salons",
    specs: "Made to Floor Plan • Deep Ergonomic Seating",
    material: "Seasoned Teak Frame • D'Decor Velvet • Fluted Carrera Base",
    description: "Bespoke contemporary sectional sofa handcrafted with kiln-dried teak wood subframe, brass stiletto feet, and 45D feather-touch foam layers.",
    image: "/generated/furniture_sofa.png",
    customizableOptions: ["L-Shape / U-Shape / Linear Layout", "High-Performance Stain-Repellent Fabrics", "Marble Side Plinth Extension"]
  },
  {
    id: "dining-01",
    title: "Bookmatched Italian Marble Dining Table",
    category: "dining",
    categoryLabel: "Dining Suites",
    specs: "8-Seater Custom • Beveled Edge Detail",
    material: "Italian Statuario Marble • Sculpted Solid Walnut • Brass Accents",
    description: "Statuesque dining centrepiece featuring 20mm seamless Italian marble with rounded bullnose edges resting upon hand-carved solid walnut pedestal bases.",
    image: "/generated/furniture_dining_table.png",
    customizableOptions: ["6-Seater, 8-Seater or 10-Seater", "Bottochino, Statuario or Black Marquina", "Solid Teak or Brushed Brass Base"]
  },
  {
    id: "coffee-01",
    title: "Cantilevered Glass & Solid Walnut Coffee Table",
    category: "living",
    categoryLabel: "Living Salons",
    specs: "Multi-Level Display • Integrated Storage Plinth",
    material: "12mm Toughened Crystal Glass • Natural American Walnut",
    description: "Architectural coffee table with intersecting geometry, brushed champagne brass vertical supports, and dual-level surface for art books.",
    image: "/generated/furniture_coffee_table.png",
    customizableOptions: ["Square / Rectangular / Organic Oval", "Smoked or Clear Crystal Glass", "Concealed Drawer Option"]
  },
  {
    id: "library-01",
    title: "Built-In Floor-to-Ceiling Oak Library Wall",
    category: "office",
    categoryLabel: "Executive Study",
    specs: "Full Wall Integration • Adjustable Shelving Grid",
    material: "Natural White Oak Veneer • Century BWP • Satin Brass Dividers",
    description: "Custom architectural shelving wall designed to match room ceiling height, featuring concealed cable chases, accent display niches, and lower credenza.",
    image: "/generated/furniture_bookshelf.png",
    customizableOptions: ["Full Room Length Matching", "Integrated LED Strip Shelves", "Lockable File Credenza"]
  },
  {
    id: "desk-01",
    title: "Executive Walnut & Leather Writing Desk",
    category: "office",
    categoryLabel: "Executive Study",
    specs: "Concealed Wire Chases • Soft-Close Drawers",
    material: "Solid Walnut • Italian Saddle Leather Pad • Hettich Hardware",
    description: "Minimalist executive desk designed for private libraries and home offices, featuring wireless charging integration and concealed cable management.",
    image: "/generated/fur_desk_1776429583007.png",
    customizableOptions: ["Custom Desk Width (5ft - 8ft)", "Left or Right Pedestal Drawers", "Integrated USB-C Power Ports"]
  },
  {
    id: "chair-01",
    title: "Ergonomic Synchronized Executive Armchair",
    category: "office",
    categoryLabel: "Executive Study",
    specs: "3D Adjustable Arms • Dynamic Lumbar Support",
    material: "High-Tensile Breathable Mesh • Die-Cast Aluminum Base",
    description: "Commercial-grade ergonomic seating engineered for posture alignment during long working sessions, with class-4 gas lift and Italian tilt mechanism.",
    image: "/generated/fur_office_chair_1776429602527.png",
    customizableOptions: ["Black Mesh or Top-Grain Leather", "Polished Aluminum or Matte Black Frame", "Headrest Option"]
  }
];

export default function FurniturePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<FurnitureItem | null>(null);

  // Custom sizing modal state
  const [customDimensions, setCustomDimensions] = useState({
    length: "",
    width: "",
    height: "",
    finishNote: ""
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Filtered collection
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return FURNITURE_CATALOG;
    return FURNITURE_CATALOG.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-[#0c121e] text-[#faf8f5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/furniture_dining_table.png"
            alt="Galaxy Interior Custom Artisanal Furniture"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Artisanal Joinery &bull; Made to Dimensions
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            Handcrafted Furniture <br />
            <span className="italic font-light text-[#c89d28]">Built Around Your Floor Plan</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Every piece is custom-fabricated in our dedicated CNC woodworking facility using Century Club Prime BWP 710 marine plywood, seasoned teakwood, and German Hettich hardware.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=furniture"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20"
            >
              Commission Custom Furniture
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5 backdrop-blur-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#c89d28]" />
              Helpline: +91 70044 65611
            </a>
          </div>

          {/* Standards strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/10 max-w-4xl mx-auto text-center">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">10 Years</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Timber Warranty</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">100% BWP</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Marine Grade Core</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Hettich</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">German Soft-Close</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">White-Glove</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">On-Site Assembly</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS */}
      <section className="sticky top-16 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-black/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2 shrink-0 hidden md:inline">
            Category:
          </span>
          {(
            [
              { id: "all", label: "All Furniture" },
              { id: "bedroom", label: "Beds & Nightstands" },
              { id: "wardrobes", label: "Wardrobes & Storage" },
              { id: "living", label: "Sofas & Tables" },
              { id: "dining", label: "Marble Dining" },
              { id: "office", label: "Desks & Libraries" }
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0c121e] text-[#faf8f5] shadow-sm"
                  : "bg-white text-gray-600 hover:text-black border border-black/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FURNITURE SHOWCASE GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden bg-black/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />

                  <div className="absolute top-4 left-4 bg-[#0c121e]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#c89d28] border border-[#c89d28]/30">
                    {item.categoryLabel}
                  </div>
                </div>

                {/* Body */}
                <div className="p-7">
                  <h3 className="font-serif text-2xl font-normal text-[#0c121e] mb-2 leading-snug group-hover:text-[#c89d28] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-gray-400 mb-4">
                    {item.specs}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Material callout */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-black/5 mb-6 text-xs text-gray-700">
                    <strong className="text-[#0c121e] font-semibold block mb-1">Materials:</strong>
                    {item.material}
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="p-7 pt-0">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setInquirySubmitted(false);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#0c121e] hover:bg-black text-[#faf8f5] text-center font-semibold text-xs tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Custom Dimensions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CUSTOM DIMENSIONS INTAKE MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-black/10 relative p-6 sm:p-10">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-gray-600 hover:text-black transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-3xl text-[#0c121e]">Custom Sizing Request Received</h3>
                <p className="text-gray-600 font-light text-sm max-w-md mx-auto">
                  Our joinery engineers will review your dimensions for <strong>{selectedItem.title}</strong> and contact you with a 3D cut-sheet and itemized quote within 24 hours.
                </p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="mt-6 px-8 py-3 rounded-full bg-[#0c121e] text-[#faf8f5] text-xs font-semibold tracking-widest uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c89d28] block mb-1">
                  Bespoke Fabrication Inquiry
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0c121e] mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-light">
                  Built to fit your exact room proportions. Fill in approximate measurements or leave blank for a site visit.
                </p>

                {/* Custom Options Pill */}
                <div className="mb-6 p-4 rounded-xl bg-[#faf8f5] border border-black/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    Available Customizations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.customizableOptions.map((opt, oIdx) => (
                      <span key={oIdx} className="px-3 py-1 rounded-full bg-white border border-black/5 text-xs text-gray-700 font-light">
                        &bull; {opt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dimensions Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                        Length (ft/in)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6.5 ft"
                        value={customDimensions.length}
                        onChange={(e) => setCustomDimensions({ ...customDimensions, length: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                        Width (ft/in)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6.0 ft"
                        value={customDimensions.width}
                        onChange={(e) => setCustomDimensions({ ...customDimensions, width: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                        Height (ft/in)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 9.5 ft"
                        value={customDimensions.height}
                        onChange={(e) => setCustomDimensions({ ...customDimensions, height: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Fabric / Veneer / Special Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Emerald green velvet fabric, walnut timber finish, soft LED sensor lighting..."
                      value={customDimensions.finishNote}
                      onChange={(e) => setCustomDimensions({ ...customDimensions, finishNote: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/contact?furniture=${encodeURIComponent(selectedItem.title)}&L=${encodeURIComponent(customDimensions.length)}&W=${encodeURIComponent(customDimensions.width)}`}
                      className="flex-1 py-3.5 rounded-full bg-[#0c121e] hover:bg-black text-[#faf8f5] text-center font-semibold text-xs tracking-widest uppercase transition-all"
                    >
                      Proceed to Consultation Desk
                    </Link>
                    <a
                      href="tel:+917004465611"
                      className="px-6 py-3.5 rounded-full border border-black/15 hover:border-black/30 text-[#0c121e] text-center font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-4 h-4 text-[#c89d28]" />
                      Direct Call
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. CRAFTSMANSHIP GUARANTEE BANNER */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Factory Precision &bull; Lifetime Care
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-8 leading-tight">
            Furniture Built to Last a <br />
            <span className="italic text-[#c89d28]">Generation</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            All custom millwork comes protected by our 10-Year Written Anti-Termite and Anti-Borer Warranty with lifetime mechanical support on German hinges and drawer slides.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=furniture"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Order Fabric &amp; Wood Swatches
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Helpline: +91 70044 65611
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
