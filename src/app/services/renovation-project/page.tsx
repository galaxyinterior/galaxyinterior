"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  PaintRoller,
  Home,
  Trash2,
  RefreshCcw,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  PhoneCall,
  Sparkles,
  Droplets,
  Layers,
  Building,
  Check
} from "lucide-react";

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Structural Assessment & Rebound Hammer Test",
    desc: "Non-destructive testing of existing RCC columns, load-bearing brickwork, and moisture scanning to determine feasibility.",
    icon: <Home className="text-[#c89d28]" size={26} />
  },
  {
    step: "02",
    title: "Reimagined Spatial Layout & 3D Renders",
    desc: "Opening cramped spaces, knocking down non-structural walls, and generating 4K 3D renders of the modern transformed layout.",
    icon: <RefreshCcw className="text-[#c89d28]" size={26} />
  },
  {
    step: "03",
    title: "Barricaded Demolition & Safe Debris Removal",
    desc: "Meticulous dust-barricaded demolition of old tiles, outdated plumbing, and partitions with responsible municipal waste disposal.",
    icon: <Trash2 className="text-[#c89d28]" size={26} />
  },
  {
    step: "04",
    title: "Chemical DPC & Anti-Damp Rehabilitation",
    desc: "Pressure grouting, damp-proof course (DPC) chemical injection, and crystalline waterproofing to eliminate persistent wall seepage forever.",
    icon: <Droplets className="text-[#c89d28]" size={26} />
  },
  {
    step: "05",
    title: "Complete MEP Rewiring & Modern Plumbing",
    desc: "Ripping out corroded GI pipes and vintage wiring; installing concealed CPVC/UPVC piping and FRLS fire-retardant copper circuits.",
    icon: <Wrench className="text-[#c89d28]" size={26} />
  },
  {
    step: "06",
    title: "New Finishes, Custom Joinery & Reveal",
    desc: "Laying Italian tiles, fresh false ceilings, custom modular woodwork, Asian Paints Royale coat, and final immaculate handover.",
    icon: <Sparkles className="text-[#c89d28]" size={26} />
  }
];

const RENOVATION_PILLARS = [
  {
    title: "Structural Integrity First",
    desc: "We never touch a column or beam without calculating load redistribution. Every wall removal is backed by certified civil engineering.",
    icon: <Building className="text-[#c89d28]" size={22} />
  },
  {
    title: "Permanent Damp & Seepage Cure",
    desc: "Our structural rehabilitation uses polymer-modified crystalline barrier coats and pressure grouting that solves capillary water rise permanently.",
    icon: <Droplets className="text-[#c89d28]" size={22} />
  },
  {
    title: "Complete MEP Modernization",
    desc: "Eliminates circuit overloads and hidden pipe corrosion. We replace all concealed wiring and plumbing to handle modern HVAC and appliance loads.",
    icon: <Wrench className="text-[#c89d28]" size={22} />
  },
  {
    title: "Dust-Controlled Phased Execution",
    desc: "If you are residing on a different floor or wing during renovation, we erect airtight dust barriers and maintain strict daily cleanups.",
    icon: <Layers className="text-[#c89d28]" size={22} />
  },
  {
    title: "Modern Facelift & Energy Upgrades",
    desc: "Upgrade old single-glazed wood windows to airtight double-glazed UPVC / thermal-break aluminum fenestration for acoustic tranquility.",
    icon: <PaintRoller className="text-[#c89d28]" size={22} />
  },
  {
    title: "5-Year Seepage & Craft Warranty",
    desc: "Every renovated space is protected by a 5-year written guarantee covering waterproofing, plumbing joints, and false ceiling integrity.",
    icon: <Shield className="text-[#c89d28]" size={22} />
  }
];

const RENOVATION_PACKAGES = [
  {
    name: "Cosmetic Modernization & Refresh",
    price: "₹450",
    unit: "per sq.ft built-up",
    desc: "Ideal for modernizing finishes, fresh paints, flooring overlays, and bathroom upgrades without structural demolition.",
    features: [
      "Tile-on-Tile Vitrified Flooring / Anti-Skid Overlays",
      "Asian Paints Royale Luxury Emulsion on All Walls",
      "Sanitary Fixture Upgrades (Kohler / Jaguar Fittings)",
      "Switchplate & Lighting Modernization (Schneider / Legrand)",
      "Gyproc False Ceiling Addition in Living & Master Suite",
      "Deep Door & Window Woodwork Re-Polishing",
      "Comprehensive Post-Renovation Chemical Cleaning"
    ],
    recommended: false
  },
  {
    name: "Complete Structural & Interior Overhaul",
    price: "₹850",
    unit: "per sq.ft built-up",
    desc: "Our most popular renovation tier. Complete plumbing, electrical, damp-proofing, and modular joinery revamp.",
    features: [
      "Removal of Non-Load-Bearing Partitions for Open Plan",
      "Complete Stripping & Re-Laying of Concealed MEP Lines",
      "Deep Chemical DPC Pressure Grouting for Damp Elimination",
      "Brand New Designer Bathrooms with Concealed Diverters",
      "Custom Modular Kitchen with Acrylic/Veneer Shutters",
      "New 4x2 Vitrified Glazed Tiles / Wooden Laminate Flooring",
      "Full Interior Painting with Water-Based Putty Primer",
      "5-Year Waterproofing & Workmanship Warranty"
    ],
    recommended: true
  },
  {
    name: "Heritage Manor & Facade Reimagining",
    price: "₹1,350",
    unit: "per sq.ft built-up",
    desc: "Comprehensive structural restoration, exterior elevation remodeling, and luxury turnkey interior transformation.",
    features: [
      "Everything in Complete Overhaul Tier",
      "Exterior Facade Facelift (Stone Cladding & Texture Plaster)",
      "Double-Glazed Soundproof UPVC / Aluminum Fenestration",
      "Italian Statuario / Bottochino Marble Flooring Restoration",
      "Terrace Waterproofing with Heat-Reflective Thermal Screed",
      "Smart Electrical DB Panel with Individual RCBO Protection",
      "Architectural Boundary Wall & Gate Modernization"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "Can you remove internal walls to create a modern open-concept living area?",
    a: "Yes. Our senior structural engineers inspect the existing building blueprints and perform rebound tests on-site. Non-load-bearing partition walls can be safely removed, and load-bearing spans can be supported with concealed steel I-beams (RSJ) to create expansive open-plan living and dining spaces."
  },
  {
    q: "How does Galaxy Interior treat persistent wall dampness and efflorescence (shora)?",
    a: "We do not simply apply superficial putty over damp walls. We chip the plaster down to the bare brickwork, inject polymer-modified waterproofing chemicals into the base masonry to create an artificial damp-proof course (DPC), apply crystalline barrier slurry, and replaster with waterproof additive mortar."
  },
  {
    q: "Do we need to vacate the property during renovation?",
    a: "For comprehensive structural and MEP overhauls, vacating the property for 30 to 45 days is recommended for safety and speed. For cosmetic refreshes or single-floor renovations, we create heavy-duty airtight dust barricades and execute in coordinated phases so you can continue residing comfortably."
  },
  {
    q: "Will you upgrade our old electrical wiring to support multiple air conditioners?",
    a: "Yes. We replace outdated aluminium or thin gauge wires with heavy copper fire-retardant (FRLS) wires, install dedicated 16A/25A AC circuits, and install a modern Miniature Circuit Breaker (MCB) and Residual Current Breaker with Overcurrent (RCBO) distribution board."
  },
  {
    q: "What is the typical timeframe for a full home renovation?",
    a: "A cosmetic refresh requires 15 to 25 working days. A complete structural, MEP, and interior overhaul of a 2,500 sq.ft home typically requires 40 to 60 calendar days."
  }
];

const GALLERY_ITEMS = [
  {
    src: "/services/service_renovation_1787300085173.jpg",
    title: "Old Residence Transformed to Modern Villa",
    category: "Structural Facelift"
  },
  {
    src: "/generated/interior_gallery_2.png",
    title: "Cramped Master Bedroom Reimagined",
    category: "Interior Modernization"
  },
  {
    src: "/generated/fac_tiles_flooring.png",
    title: "Precision Tile Laying & Expansion Joints",
    category: "Flooring Upgrades"
  },
  {
    src: "/generated/fac_wall_panelling.png",
    title: "Damp-Treated Acoustic Wall Paneling",
    category: "Wall Rehabilitation"
  },
  {
    src: "/generated/inspiration_italian_tiles.jpg",
    title: "Restored Italian Marble & Custom Vanity",
    category: "Bath Remodeling"
  },
  {
    src: "/generated/fac_wooden_work.png",
    title: "Custom Modern Wardrobe Installation",
    category: "Millwork Overhaul"
  }
];

export default function RenovationProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#0c121e]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/service_renovation_1787300085173.jpg"
            alt="Galaxy Interior Structural Modernization & Home Renovation"
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
              Discipline 05 &bull; Structural Modernization &amp; Upgrades
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#faf8f5] tracking-tight leading-[1.1] mb-6">
            Structural Modernization &amp; <br />
            <span className="italic font-light text-[#c89d28]">Home Renovation</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Breathing new life into aging structures. Non-destructive scanning, open-concept re-planning, permanent damp elimination, and luxury modern interiors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=renovation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20"
            >
              Book Structural Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919631980881"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5 backdrop-blur-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#c89d28]" />
              Helpline +91 96319 80881
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">100%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Damp Elimination</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Zero</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Structural Compromise</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Complete</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">MEP Modernization</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">5 Years</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Written Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RENOVATION PROCESS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
            Systematic Transformation
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e] tracking-tight">
            The 6-Step Renovation Workflow
          </h2>
          <p className="text-gray-600 font-light mt-4 text-base sm:text-lg">
            From rebound hammer structural assessment to dust-controlled barricading, MEP stripping, and final bespoke finishes.
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

      {/* 3. RENOVATION PILLARS */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                Rigor &amp; Craft
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                Our Renovation Standards
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-md text-sm sm:text-base">
              Unlike local contractors who paint over moisture and ignore faulty wiring, we resolve root engineering issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RENOVATION_PILLARS.map((pil, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#c89d28]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c89d28]/10 flex items-center justify-center mb-5">
                  {pil.icon}
                </div>
                <h3 className="font-serif text-xl text-[#faf8f5] mb-2">{pil.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{pil.desc}</p>
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
              Transformation Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Before &amp; After Masterpieces
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0c121e] hover:text-[#c89d28] transition-colors"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
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
              Transparent Estimates
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Renovation Packages
            </h2>
            <p className="text-gray-600 font-light mt-3 text-base">
              Clear per-square-foot benchmarks covering demolition, structural repair, MEP replacement, and luxury modern finishes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {RENOVATION_PACKAGES.map((pkg, idx) => (
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
                    Most Popular Choice
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
                  href="/contact?service=renovation"
                  className={`w-full py-4 rounded-full text-center text-xs font-semibold tracking-widest uppercase transition-all ${
                    pkg.recommended
                      ? "bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e]"
                      : "bg-[#0c121e] hover:bg-black text-[#faf8f5]"
                  }`}
                >
                  Request Site Audit
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

      {/* 7. RENOVATION CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Reimagine Your Space
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight">
            Transform Your Existing Home into a <br />
            <span className="italic text-[#c89d28]">Modern Architectural Marvel</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule an on-site structural and damp assessment. Our engineers inspect load-bearing walls and provide an itemized modernization plan.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=renovation"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Book Renovation Assessment
            </Link>
            <a
              href="tel:+919631980881"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              Direct Renovation Line: +91 96319 80881
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
