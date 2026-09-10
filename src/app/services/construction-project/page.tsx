"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  HardHat,
  Hammer,
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  Layers,
  FileCheck,
  PhoneCall,
  Sparkles,
  Truck,
  Droplets,
  Check
} from "lucide-react";

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Geotechnical Soil Testing & Boring",
    desc: "Scientific plate load testing and standard penetration tests (SPT) to assess bearing capacity before foundation design.",
    icon: <Truck className="text-[#c89d28]" size={26} />
  },
  {
    step: "02",
    title: "Excavation & Subterranean Treatment",
    desc: "Precision mechanized excavation, PCC blinding layer, and multi-stage anti-termite subterranean chemical soil barrier injection.",
    icon: <Layers className="text-[#c89d28]" size={26} />
  },
  {
    step: "03",
    title: "Seismic Raft / Footing & Plinth",
    desc: "Heavy Fe 550D TMT steel cage binding, plinth beam casting, and vibrator-compacted M25 grade foundation concrete.",
    icon: <Building2 className="text-[#c89d28]" size={26} />
  },
  {
    step: "04",
    title: "Superstructure Framing & Slabs",
    desc: "Rigorous alignment of columns, cantilever beams, and monolithic roof slab casting with continuous 21-day pond curing.",
    icon: <Hammer className="text-[#c89d28]" size={26} />
  },
  {
    step: "05",
    title: "Brick Masonry & Double Plastering",
    desc: "High-density kiln-burnt red clay bricks or AAC blocks with 1:4 cement-sand mortar and double-coat exterior weather plaster.",
    icon: <HardHat className="text-[#c89d28]" size={26} />
  },
  {
    step: "06",
    title: "Waterproofing & Quality Audit",
    desc: "Elastomeric crystalline membrane waterproofing for sunken slabs, terraces, and basement retaining walls with 10-year warranty.",
    icon: <Droplets className="text-[#c89d28]" size={26} />
  }
];

const ENGINEERING_STANDARDS = [
  {
    title: "Certified Fe 550D TMT Rebar",
    desc: "Exclusive use of primary steel manufacturers (Tata Tiscon, Jindal Panther, SAIL) with mill test certificates verifying yield strength and ductility.",
    icon: <Shield className="text-[#c89d28]" size={22} />
  },
  {
    title: "Design-Mix M25/M30 Concrete",
    desc: "Accurately batched cement-sand-aggregate ratios with mandatory 7-day, 14-day, and 28-day compressive cube crush testing on every pour.",
    icon: <Building2 className="text-[#c89d28]" size={22} />
  },
  {
    title: "Resident Site Civil Engineer",
    desc: "A full-time, dedicated civil engineering graduate stationed on your site daily to enforce drawing specs and oversee pour quality.",
    icon: <HardHat className="text-[#c89d28]" size={22} />
  },
  {
    title: "Seismic Zone IV & V Compliance",
    desc: "Ductile detailing of beam-column joints and column ties strictly adhering to Indian Standard Code IS 13920 and IS 456.",
    icon: <ShieldAlert className="text-[#c89d28]" size={22} />
  },
  {
    title: "Crystalline Terrace Waterproofing",
    desc: "3-layer waterproofing system: polymer-modified slurry coat, geo-textile reinforcement, and protective screed bed preventing terrace seepage.",
    icon: <Droplets className="text-[#c89d28]" size={22} />
  },
  {
    title: "Milestone-Linked Escrow Escapes",
    desc: "Payments are strictly released upon engineering sign-off at plinth, slab 1, slab 2, masonry, and plastering stages with zero cost escalation.",
    icon: <FileCheck className="text-[#c89d28]" size={22} />
  }
];

const CONSTRUCTION_PACKAGES = [
  {
    name: "Standard Civil Structural Frame",
    price: "₹1,650",
    unit: "per sq.ft built-up",
    desc: "Heavy-duty RCC skeleton, foundation, brick masonry, and internal/external double-coat plastering.",
    features: [
      "Seismic Compliant Fe 500/550D TMT Reinforcement",
      "Ultratech / ACC / Ambuja Grade 43/53 Cement",
      "First-Class Red Clay Brickwork (9-inch & 4.5-inch)",
      "PCC Foundation & Plinth Beam with Anti-Termite",
      "Smooth Internal Neeru Finish Plastering",
      "External Sand-Faced Sponge Plastering",
      "Daily Site Supervision by Junior Engineer"
    ],
    recommended: false
  },
  {
    name: "Premium Engineered Residence",
    price: "₹1,950",
    unit: "per sq.ft built-up",
    desc: "Our most chosen construction grade. Includes MEP conduits, boundary wall, and waterproofing guarantees.",
    features: [
      "Tata Tiscon / Jindal Panther Fe 550D High Ductility Steel",
      "M25 Machine-Batched Ready/Site Concrete with Cube Tests",
      "AAC Blockwork or Premium Kiln Red Bricks",
      "Complete Conduiting (Finolex / Havells FRLS Wires)",
      "Astral / Ashirvad CPVC & UPVC Concealed Plumbing",
      "3-Tier Sunken Slab & Terrace Waterproofing (Fosroc/Dr. Fixit)",
      "Full-Time Resident Civil Engineer In-Charge",
      "Digital Daily Progress Logs & WhatsApp Video Updates"
    ],
    recommended: true
  },
  {
    name: "Luxury Turnkey Villa Build",
    price: "₹2,450",
    unit: "per sq.ft built-up",
    desc: "Comprehensive structure with high-spec thermal insulation, rainwater harvesting, and landscape civil works.",
    features: [
      "Everything in Premium Engineered Tier",
      "M30 High-Performance Grade Concrete Mix",
      "Thermal Insulation Screed on Rooftop Terrace",
      "Integrated Rainwater Harvesting & Groundwater Recharge Pit",
      "Heavy MS / Stainless Steel Architectural Boundary Gates",
      "Porch Paving, Driveway Kerbs & Drainage Inlets",
      "10-Year Comprehensive Structural Warranty Bond"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "How does Galaxy Interior ensure the structural strength of the building?",
    a: "We never compromise on structural discipline. Every project undergoes soil testing, structural vetting by registered senior structural consultants, and cast-in-place concrete cube testing at 7 and 28 days in NABL-accredited test laboratories. We strictly adhere to IS 456 (Plain and Reinforced Concrete) and IS 1893 (Earthquake Resistant Design)."
  },
  {
    q: "Which brands of cement and steel reinforcement are deployed on site?",
    a: "We exclusively specify primary steel: Tata Tiscon Fe 550D, Jindal Panther Fe 550D, or SAIL. For cement, we partner with UltraTech, ACC, and Ambuja 43/53 Grade. All delivery challans and test certificates are documented in your client project portal."
  },
  {
    q: "What is the typical timeframe for a 3,000 sq.ft duplex civil construction?",
    a: "A standard G+1 or G+2 residential building (approx. 3,000 sq.ft built-up area) requires 6 to 8 months for complete foundation, superstructure casting, masonry, internal/external plastering, and waterproofing curing."
  },
  {
    q: "How are construction payments structured?",
    a: "Payments are milestone-based, dividing the contract into 6 transparent stages: Booking & Mobilization (10%), Foundation & Plinth (20%), Ground Floor Slab (20%), First Floor Slab (20%), Brick Masonry & Plaster (20%), and Final Handover Audit (10%). You never pay in advance for uncompleted phases."
  },
  {
    q: "Do you build outside metro cities across Bihar and Jharkhand?",
    a: "Yes. Our civil engineering teams and equipment depots actively manage projects in Ranchi, Bhagalpur, Patna, Deoghar, Dumka, Godda, Hazaribagh, Kishanganj, Banka, and Purnea with local site engineers permanently stationed on-site."
  }
];

const GALLERY_ITEMS = [
  {
    src: "/services/service_construction_1787300029220.jpg",
    title: "Superstructure RCC Slabs & Beams",
    category: "Structural Engineering"
  },
  {
    src: "/generated/project_ongoing_1.png",
    title: "Ground-Up Duplex Villa Construction",
    category: "Ongoing Build"
  },
  {
    src: "/generated/legacy_villa.png",
    title: "Completed Turnkey Luxury Residence",
    category: "Delivered Masterpiece"
  },
  {
    src: "/generated/srv_construction.png",
    title: "Foundation & Plinth Reinforcement",
    category: "Site Execution"
  },
  {
    src: "/generated/elevation_gallery_1.png",
    title: "Contemporary Multi-Level Bungalow",
    category: "Completed Landmark"
  },
  {
    src: "/generated/elevation_gallery_2.png",
    title: "Modern Facade & Structural Detailing",
    category: "Architectural Civil"
  }
];

export default function ConstructionProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#0c121e]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/service_construction_1787300029220.jpg"
            alt="Galaxy Interior Civil Construction & Structural Engineering"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Discipline 02 &bull; Civil Construction &amp; Engineering
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#faf8f5] tracking-tight leading-[1.1] mb-6">
            Civil Construction &amp; <br />
            <span className="italic font-light text-[#c89d28]">Structural Engineering</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Engineered with primary Fe 550D TMT steel, lab-tested M25/M30 concrete, and resident civil engineers on-site daily. Zero compromise on structural integrity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=construction"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20"
            >
              Request Construction Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5 backdrop-blur-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#c89d28]" />
              Helpline +91 70044 65611
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Fe 550D</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Primary TMT Steel</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">M25 / M30</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Tested Concrete Mix</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">100%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Resident Site Engineer</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">10 Years</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Structural Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CIVIL PROCESS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
            Execution Standards
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e] tracking-tight">
            The 6-Stage Civil Engineering Workflow
          </h2>
          <p className="text-gray-600 font-light mt-4 text-base sm:text-lg">
            From geotechnical soil boring to final elastomeric roof waterproofing, every phase is recorded in daily digital site logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-3xl font-light text-[#c89d28]">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#faf8f5] flex items-center justify-center border border-black/5 group-hover:bg-[#c89d28]/10 transition-colors">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-serif text-xl font-medium text-[#0c121e] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ENGINEERING RIGOR */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                Structural Integrity
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                Our Engineering Safeguards
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-md text-sm sm:text-base">
              We eliminate common contracting hazards like sand bulking, honeycombing, and damp seepage through uncompromised protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGINEERING_STANDARDS.map((std, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#c89d28]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c89d28]/10 flex items-center justify-center mb-5">
                  {std.icon}
                </div>
                <h3 className="font-serif text-xl text-[#faf8f5] mb-2">{std.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SHOWCASE */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
              On-Site Execution
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Civil Construction Showcase
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0c121e] hover:text-[#c89d28] transition-colors"
          >
            Explore Completed Residences <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-2xl overflow-hidden border border-black/5 bg-black/5 shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c89d28] block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg text-white font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRANSPARENT PACKAGES */}
      <section className="py-24 bg-white border-y border-black/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
              Fixed-Rate Specifications
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Civil Construction Packages
            </h2>
            <p className="text-gray-600 font-light mt-3 text-base">
              Transparent per-square-foot built-up pricing with legal BOQ guarantee and zero mid-project price escalation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CONSTRUCTION_PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all ${
                  pkg.recommended
                    ? "bg-[#0c121e] text-[#faf8f5] shadow-2xl ring-2 ring-[#c89d28]"
                    : "bg-[#faf8f5] text-[#0c121e] border border-black/5"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c89d28] text-[#0c121e] text-[10px] font-bold tracking-widest uppercase">
                    Recommended Spec
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl mb-2">{pkg.name}</h3>
                  <p className={`text-xs mb-6 ${pkg.recommended ? "text-gray-400" : "text-gray-500"}`}>
                    {pkg.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                    <span className="font-serif text-4xl sm:text-5xl font-normal text-[#c89d28]">
                      {pkg.price}
                    </span>
                    <span className={`text-xs uppercase tracking-wider ${pkg.recommended ? "text-gray-400" : "text-gray-500"}`}>
                      {pkg.unit}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm font-light">
                        <Check className="w-4 h-4 text-[#c89d28] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact?service=construction"
                  className={`w-full py-4 rounded-full text-center text-xs font-semibold tracking-widest uppercase transition-all ${
                    pkg.recommended
                      ? "bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e]"
                      : "bg-[#0c121e] hover:bg-black text-[#faf8f5]"
                  }`}
                >
                  Request Detailed BOQ
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
            Common Inquiries
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-7 py-6 text-left flex justify-between items-center gap-4 cursor-pointer"
              >
                <span className="font-serif text-lg text-[#0c121e] font-medium">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`text-[#c89d28] shrink-0 transition-transform duration-300 ${
                    activeFaq === index ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              {activeFaq === index && (
                <div className="px-7 pb-6 pt-2 border-t border-black/5 text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. CIVIL CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Groundbreaking Certainty
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight">
            Build Your Residence on <br />
            <span className="italic text-[#c89d28]">Uncompromising Foundations</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Get an itemized civil estimate backed by certified structural calculations and fixed completion milestones.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=construction"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Book Site Feasibility Visit
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              Direct Civil Helpline: +91 70044 65611
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
