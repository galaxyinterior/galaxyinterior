"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Check,
  X,
  ArrowRight,
  Shield,
  PhoneCall,
  Calculator,
  Layers,
  Building,
  Crown
} from "lucide-react";

interface SpecRow {
  category: string;
  feature: string;
  standard: string;
  signature: string;
  haute: string;
}

const SPEC_COMPARISON: SpecRow[] = [
  {
    category: "Architecture & Design",
    feature: "2D Floor Plans & Vastu Audit",
    standard: "2D Plan with Vastu zoning",
    signature: "Detailed 2D + Electrical/Plumbing sets",
    haute: "Full 2D Master Blueprints + Vastu Certification"
  },
  {
    category: "Architecture & Design",
    feature: "3D Visualizations & Walkthrough",
    standard: "Basic 3D Exterior Elevation",
    signature: "4K Photorealistic Day/Night Elevations",
    haute: "360° Virtual Reality + Complete Interior 4K Renders"
  },
  {
    category: "Architecture & Design",
    feature: "Municipal Sanction Dossier",
    standard: "Standard drawing set",
    signature: "Compliant local municipal set",
    haute: "Complete liaison-ready sanction booklet"
  },
  {
    category: "Civil & Superstructure",
    feature: "Structural Steel Reinforcement",
    standard: "Fe 500/550D TMT (Secondary/Primary)",
    signature: "Tata Tiscon / Jindal Panther Fe 550D",
    haute: "Tata Tiscon Fe 550D Super Ductile (SD)"
  },
  {
    category: "Civil & Superstructure",
    feature: "Concrete Mix & Testing",
    standard: "M20 Site Mix",
    signature: "M25 Tested Design-Mix (7 & 28-day cube tests)",
    haute: "M30 High-Performance Mix with NABL lab certs"
  },
  {
    category: "Civil & Superstructure",
    feature: "Brickwork / Masonry",
    standard: "Traditional Red Clay Bricks",
    signature: "First-Class Kiln Red Bricks or AAC Blocks",
    haute: "High-Density Autoclaved Aerated Concrete / Red Bricks"
  },
  {
    category: "Civil & Superstructure",
    feature: "Anti-Termite Treatment",
    standard: "Plinth-level spray",
    signature: "Multi-stage subterranean chemical injection",
    haute: "Comprehensive 10-year chemical perimeter barrier"
  },
  {
    category: "MEP & Electrical",
    feature: "Wiring & Conduits",
    standard: "ISI Mark Copper Wires",
    signature: "Havells / Finolex FRLS Fire-Retardant Copper",
    haute: "Polycab / Havells Zero-Halogen FRLS with RCBO DB"
  },
  {
    category: "MEP & Electrical",
    feature: "Plumbing Pipes & Loops",
    standard: "Standard CPVC/UPVC pipes",
    signature: "Astral / Ashirvad SDR 11 Pressure Tested",
    haute: "Astral Silencio Low-Noise Acoustic Plumbing"
  },
  {
    category: "Surfaces & Flooring",
    feature: "Living & Dining Flooring",
    standard: "Vitrified Tiles (2x2 ft)",
    signature: "Double-Charged Glazed Vitrified (4x2 ft)",
    haute: "Imported Italian Bottochino / Statuario Marble (20mm)"
  },
  {
    category: "Surfaces & Flooring",
    feature: "Bathrooms & Sanitary",
    standard: "Cera / Hindware Sanitaryware",
    signature: "Jaguar / Kohler Wall-Hung WCs & Diverters",
    haute: "Kohler / Grohe Thermostatic Rain Showers & Vanities"
  },
  {
    category: "Interior Millwork",
    feature: "Modular Kitchen",
    standard: "Commercial MR Grade Plywood",
    signature: "Century Sainik 710 BWP Marine Plywood",
    haute: "Century Club Prime Lifetime BWP Marine Plywood"
  },
  {
    category: "Interior Millwork",
    feature: "Hinges & Hardware",
    standard: "Standard Soft-Close Hinges",
    signature: "Hettich Sensys Soft-Close System",
    haute: "Full German Hettich & Hafele Architectural Hardware"
  },
  {
    category: "Supervision & Warranty",
    feature: "On-Site Engineering Oversight",
    standard: "Weekly Senior Supervisor Visits",
    signature: "Dedicated Resident Civil Engineer Daily",
    haute: "Full-Time Resident Civil Lead + Quality Auditor"
  },
  {
    category: "Supervision & Warranty",
    feature: "Structural Stability Warranty",
    standard: "3 Years",
    signature: "10 Years Written Stability Certificate",
    haute: "10 Years Structural + 10 Years Timber Warranty"
  }
];

export default function TurnkeyPackagesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "civil" | "mep" | "finishes">("all");

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen pb-24 pt-28">
      {/* 1. HERO SECTION */}
      <section className="bg-[#0c121e] text-[#faf8f5] pt-16 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden mb-12">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Transparent Specification Matrix
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            Turnkey Construction <br />
            <span className="italic font-light text-[#c89d28]">Specification Packages</span>
          </h1>

          <p className="text-gray-300 font-light text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Compare material grades, structural engineering tolerances, and luxury finishes side-by-side. Every package is bound by our zero-escalation Master BOQ contract.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20 flex items-center gap-2"
            >
              <Calculator size={16} /> Open Rate Calculator
            </Link>
            <Link
              href="/pricing/supervision"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              Explore Site Supervision Plans
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES COMPARISON HEADER CARDS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Standard */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                Tier 01 &bull; Structural Shell
              </span>
              <h3 className="font-serif text-2xl text-[#0c121e] mb-1">Standard Civil Build</h3>
              <p className="text-xs text-gray-500 font-light mb-6">
                Engineered for plot owners seeking solid RCC foundation, frame, and masonry without interior fitout.
              </p>
              <div className="mb-6 pb-6 border-b border-black/5">
                <span className="font-serif text-4xl text-[#0c121e]">₹1,650</span>
                <span className="text-xs text-gray-500"> / sq.ft built-up</span>
              </div>
            </div>
            <Link
              href="/contact?package=standard"
              className="w-full py-3.5 rounded-full border border-black/15 hover:border-black/40 text-[#0c121e] text-center font-semibold text-xs tracking-widest uppercase transition-all"
            >
              Select Standard Tier
            </Link>
          </div>

          {/* Card 2: Signature */}
          <div className="bg-[#0c121e] text-[#faf8f5] rounded-3xl p-8 shadow-xl ring-2 ring-[#c89d28] relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c89d28] text-[#0c121e] text-[9px] font-bold tracking-widest uppercase">
              Most Popular Turnkey
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c89d28] block mb-2">
                Tier 02 &bull; Move-In Ready
              </span>
              <h3 className="font-serif text-2xl mb-1">Signature Turnkey Villa</h3>
              <p className="text-xs text-gray-300 font-light mb-6">
                All-inclusive conception-to-key build: blueprints, Fe 550D steel, modular kitchen, and false ceilings.
              </p>
              <div className="mb-6 pb-6 border-b border-white/10">
                <span className="font-serif text-4xl text-[#c89d28]">₹2,450</span>
                <span className="text-xs text-gray-400"> / sq.ft built-up</span>
              </div>
            </div>
            <Link
              href="/contact?package=signature"
              className="w-full py-3.5 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] text-center font-semibold text-xs tracking-widest uppercase transition-all shadow-md"
            >
              Select Signature Tier
            </Link>
          </div>

          {/* Card 3: Haute */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                Tier 03 &bull; Ultra Luxury
              </span>
              <h3 className="font-serif text-2xl text-[#0c121e] mb-1">Haute Bespoke Residence</h3>
              <p className="text-xs text-gray-500 font-light mb-6">
                Uncompromising luxury with imported Italian marble, M30 concrete, and custom teak millwork.
              </p>
              <div className="mb-6 pb-6 border-b border-black/5">
                <span className="font-serif text-4xl text-[#0c121e]">₹2,950</span>
                <span className="text-xs text-gray-500"> / sq.ft built-up</span>
              </div>
            </div>
            <Link
              href="/contact?package=haute"
              className="w-full py-3.5 rounded-full border border-black/15 hover:border-black/40 text-[#0c121e] text-center font-semibold text-xs tracking-widest uppercase transition-all"
            >
              Select Haute Tier
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DETAILED SPECIFICATION MATRIX TABLE */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-black/5">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0c121e]">
              Complete Technical Specification Schedule
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              Every item is verified by resident civil engineers on site and logged in your digital project portal.
            </p>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-[#faf8f5] text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                  <th className="p-5 font-semibold">Scope &bull; Discipline</th>
                  <th className="p-5 font-semibold text-gray-700">Standard Civil (₹1,650)</th>
                  <th className="p-5 font-semibold text-[#c89d28]">Signature Turnkey (₹2,450)</th>
                  <th className="p-5 font-semibold text-gray-900">Haute Bespoke (₹2,950)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 font-light">
                {SPEC_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.01] transition-colors">
                    <td className="p-5">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[#c89d28] block mb-0.5">
                        {row.category}
                      </span>
                      <span className="font-medium text-[#0c121e]">{row.feature}</span>
                    </td>
                    <td className="p-5 text-gray-600 leading-relaxed">{row.standard}</td>
                    <td className="p-5 text-gray-900 font-normal leading-relaxed bg-[#c89d28]/5">
                      {row.signature}
                    </td>
                    <td className="p-5 text-gray-900 leading-relaxed font-normal">{row.haute}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="bg-[#0c121e] text-[#faf8f5] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-4">
            Need a Tailored Commercial or Custom Spec?
          </h2>
          <p className="text-gray-300 font-light text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Our principal architects and structural directors can customize any line item in your Bill of Quantities to meet your exact budget envelope.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg"
            >
              Schedule Private Technical Review
            </Link>
            <a
              href="tel:+919631980881"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Call +91 96319 80881
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
