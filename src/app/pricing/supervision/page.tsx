"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  ChevronRight,
  Activity,
  Clock,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  HardHat,
  FileCheck,
  Check,
  Building,
  Ruler
} from "lucide-react";

const SUPERVISION_TIERS = [
  {
    name: "Milestone Audit & Structural Testing",
    rate: "₹15,000",
    unit: "per key milestone inspection",
    desc: "Targeted critical-stage engineering vetting for plot owners employing their own local labor contractors.",
    features: [
      "Soil bearing capacity & footing depth verification",
      "Rebar diameter, spacing & lap length checking before slab casting",
      "On-site concrete slump test & cube casting for 7/28-day lab crushing",
      "Plinth, Ground Slab & First Floor Slab Pour sign-offs",
      "Written structural defect notice & rectification checklist"
    ],
    recommended: false
  },
  {
    name: "Resident Quality Assurance (QA) Oversight",
    rate: "₹28,000",
    unit: "per month (3 site visits / week)",
    desc: "Rigorous ongoing oversight monitoring material quality, wastage prevention, and contractor compliance.",
    features: [
      "3 Comprehensive on-site engineering visits weekly",
      "Digital daily photo register & WhatsApp status updates",
      "Verification of cement grades, sand cleanliness & steel mill certs",
      "Sunken slab & terrace crystalline waterproofing audits",
      "Contractor bill verification against actual millimeter site measurements",
      "Direct phone escalation line with Principal Structural Consultant"
    ],
    recommended: true
  },
  {
    name: "Full-Time Resident Civil Engineer",
    rate: "₹48,000",
    unit: "per month (Daily 8-hour on-site presence)",
    desc: "A dedicated B.Tech Civil Engineer stationed permanently on your site from foundation groundbreaking to key handover.",
    features: [
      "Full-time 8-hour resident civil engineer on site every working day",
      "Real-time enforcement of CAD architectural drawings & bar bending schedules",
      "100% Zero-compromise quality assurance on all masonry, MEP & plastering",
      "Daily digital labor log, material stock register, and CCTV coordination",
      "Comprehensive 120-point pre-handover architectural punchlist audit",
      "Included complimentary with all Galaxy Interior Turnkey Build Contracts"
    ],
    recommended: false
  }
];

const CHECKLIST_ITEMS = [
  {
    title: "1. Soil & Footing Depth Validation",
    desc: "Validating soil strata firmness and footing depths against structural blueprints before concrete blinding."
  },
  {
    title: "2. Rebar Spacing & Cover Block Audit",
    desc: "Checking rebar overlaps, stirrup spacing, hook angles (135°), and 25mm/40mm cover block placement."
  },
  {
    title: "3. Concrete Slump & Cube Crush Testing",
    desc: "Conducting standard slump cone tests on every batch and casting 150mm cubes for 7-day and 28-day NABL testing."
  },
  {
    title: "4. Masonry Alignment & Curing Registry",
    desc: "Ensuring 1:4 mortar ratio, true vertical plumb line alignment, and mandatory 14-day water pond curing."
  },
  {
    title: "5. Concealed MEP Hydrotesting",
    desc: "Testing concealed plumbing loops at 10-bar hydraulic pressure for 24 hours to guarantee zero post-handover leaks."
  },
  {
    title: "6. Bill Verification & Quantity Surveying",
    desc: "Auditing local contractor invoices against exact laser-measured quantities, preventing fraudulent material claims."
  }
];

export default function SupervisionPackagesPage() {
  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen pb-24 pt-28">
      {/* 1. HERO SECTION */}
      <section className="bg-[#0c121e] text-[#faf8f5] pt-16 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden mb-12">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Independent Engineering Oversight
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            Resident Engineering &amp; <br />
            <span className="italic font-light text-[#c89d28]">Quality Supervision</span>
          </h1>

          <p className="text-gray-300 font-light text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Even if you are building with your own contractor, protect your life savings. Station certified Galaxy Interior civil engineers on your site to audit materials, verify rebar cages, and prevent costly construction errors.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?service=supervision"
              className="px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20 flex items-center gap-2"
            >
              Book Site Feasibility Audit
            </Link>
            <a
              href="tel:+919631980881"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Helpline: +91 96319 80881
            </a>
          </div>
        </div>
      </section>

      {/* 2. SUPERVISION PACKAGES CARDS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUPERVISION_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all ${
                tier.recommended
                  ? "bg-[#0c121e] text-[#faf8f5] shadow-2xl ring-2 ring-[#c89d28] relative"
                  : "bg-white text-[#0c121e] border border-black/5 shadow-sm"
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c89d28] text-[#0c121e] text-[9px] font-bold tracking-widest uppercase">
                  Most Chosen Plan
                </div>
              )}

              <div>
                <h3 className="font-serif text-2xl mb-2">{tier.name}</h3>
                <p className={`text-xs mb-6 ${tier.recommended ? "text-gray-400" : "text-gray-500"}`}>
                  {tier.desc}
                </p>

                <div className="mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                  <span className="font-serif text-4xl text-[#c89d28]">{tier.rate}</span>
                  <span className={`text-xs block mt-1 ${tier.recommended ? "text-gray-400" : "text-gray-500"}`}>
                    {tier.unit}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-light">
                      <Check className="w-4 h-4 text-[#c89d28] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?supervision=${encodeURIComponent(tier.name)}`}
                className={`w-full py-4 rounded-full text-center text-xs font-semibold tracking-widest uppercase transition-all ${
                  tier.recommended
                    ? "bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e]"
                    : "bg-[#0c121e] hover:bg-black text-[#faf8f5]"
                }`}
              >
                Retain Engineer
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 30-POINT ENGINEERING AUDIT CHECKLIST */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-2">
              Systematic Protocol
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0c121e]">
              Core Inspection Checkpoints
            </h2>
            <p className="text-gray-500 font-light text-sm mt-2">
              Every on-site visit follows our 30-point civil inspection checklist. Defects are photographed and halted before concrete is poured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHECKLIST_ITEMS.map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-[#faf8f5] border border-black/5">
                <FileCheck className="w-6 h-6 text-[#c89d28] mb-3" />
                <h4 className="font-serif text-lg text-[#0c121e] font-medium mb-1.5">{item.title}</h4>
                <p className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0c121e] text-[#faf8f5] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-4">
            Protect Your Lifetime Investment
          </h2>
          <p className="text-gray-300 font-light text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            A single unnoticed column honeycomb or improper rebar lap can compromise the structural safety of your family residence. Speak with our principal structural team today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=supervision"
              className="px-10 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg"
            >
              Book Site Assessment
            </Link>
            <a
              href="tel:+919631980881"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Engineering Desk: +91 96319 80881
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
