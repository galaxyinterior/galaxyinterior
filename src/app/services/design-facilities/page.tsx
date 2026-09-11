"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PenTool,
  Ruler,
  Box,
  Layers,
  Monitor,
  Palette,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  Compass,
  FileCheck,
  PhoneCall,
  Sparkles,
  Building,
  Check
} from "lucide-react";

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Survey & Vastu Orientation",
    desc: "Comprehensive plot measurement, solar orientation analysis, and authentic Vastu Shastra alignment before drafting the first line.",
    icon: <Compass className="text-[#c89d28]" size={26} />
  },
  {
    step: "02",
    title: "Spatial Zoning & Circulation",
    desc: "Drafting room hierarchies, functional zones, and natural cross-ventilation pathways to maximize usable carpet area without dead zones.",
    icon: <Layers className="text-[#c89d28]" size={26} />
  },
  {
    step: "03",
    title: "Millimeter-Accurate 2D CAD Plans",
    desc: "Detailed working floor plans, column placement, wall thicknesses, door/window schedules, and municipal sanction drawings.",
    icon: <Ruler className="text-[#c89d28]" size={26} />
  },
  {
    step: "04",
    title: "4K Photorealistic 3D Elevations",
    desc: "Hyper-realistic exterior elevations and interior perspectives with precise natural day/night lighting and true-to-life textures.",
    icon: <Box className="text-[#c89d28]" size={26} />
  },
  {
    step: "05",
    title: "MEP & Structural Engineering",
    desc: "Vetted electrical conduits, plumbing schematics, structural load calculations, and beam-column reinforcement schedules.",
    icon: <PenTool className="text-[#c89d28]" size={26} />
  },
  {
    step: "06",
    title: "Master BOQ & Construction Dossier",
    desc: "Complete bound construction booklet with exact itemized quantities, material specifications, and contractor execution guidelines.",
    icon: <FileCheck className="text-[#c89d28]" size={26} />
  }
];

const DELIVERABLES = [
  {
    title: "Vastu-Compliant Master Floor Plans",
    desc: "Room orientations, entrance alignment, kitchen Agni placement, and master suite Southwest zoning verified by certified consultants.",
    icon: <Shield className="text-[#c89d28]" size={22} />
  },
  {
    title: "Municipal Sanction & Approval Sets",
    desc: "Strict adherence to regional building bylaws across Jharkhand (RMC, Deoghar, Dumka) and Bihar (Patna, Bhagalpur) for hassle-free sanction.",
    icon: <Building className="text-[#c89d28]" size={22} />
  },
  {
    title: "Structural Engineering Blueprints",
    desc: "Seismic Zone IV/V structural analysis, footing designs, column reinforcement, and slab detail drawings signed off by licensed civil engineers.",
    icon: <Layers className="text-[#c89d28]" size={22} />
  },
  {
    title: "Detailed MEP Schematics",
    desc: "Plumbing piping loops, storm-water drainage, electrical circuit distribution, earthing layout, and AC line routings to avoid site alterations.",
    icon: <Monitor className="text-[#c89d28]" size={22} />
  },
  {
    title: "3D Photorealistic Exterior & Interior Renders",
    desc: "Ultra-HD raytraced visual walkthroughs showing exact paint codes, cladding stones, Italian marbles, and custom joinery before breaking ground.",
    icon: <Palette className="text-[#c89d28]" size={22} />
  },
  {
    title: "Legally Binding Itemized BOQ",
    desc: "Comprehensive Bill of Quantities breaking down cement, Fe 550D TMT, brickwork, joinery, and fittings down to the exact rupee.",
    icon: <CheckCircle2 className="text-[#c89d28]" size={22} />
  }
];

const PRICING_TIERS = [
  {
    name: "Architectural 2D Blueprint",
    price: "₹15",
    unit: "per sq.ft",
    desc: "Essential spatial planning, Vastu zoning, and municipal sanction drawings for plot owners.",
    features: [
      "Custom 2D Architectural Floor Plan",
      "Vastu Shastra Orientation Audit",
      "Column & Wall Positioning Blueprint",
      "Door, Window & Ventilation Schedule",
      "Municipal Bylaw Sanction Drawing Set",
      "2 Iterative Revisions Included"
    ],
    recommended: false
  },
  {
    name: "Complete 3D Visualization Suite",
    price: "₹35",
    unit: "per sq.ft",
    desc: "Our signature planning package. Experience your residence in photorealistic 4K before ground is broken.",
    features: [
      "Everything in Architectural 2D Plan",
      "4K Day & Night Exterior 3D Elevations",
      "3D Interior Layouts (Living, Master Suite, Kitchen)",
      "Structural Engineering Load Calculations",
      "Full MEP (Electrical & Plumbing) Blueprints",
      "Material Board & Texture Codes Dossier",
      "Unlimited Revisions during conceptual phase"
    ],
    recommended: true
  },
  {
    name: "Comprehensive Turnkey Design Dossier",
    price: "₹65",
    unit: "per sq.ft",
    desc: "The ultimate studio design package with immersive walkthroughs and on-site architect supervision.",
    features: [
      "Everything in Complete 3D Suite",
      "360° Cinematic Virtual Reality Walkthrough",
      "Room-by-Room 3D Detailed Interior Renders",
      "Itemized Master BOQ with Market Material Benchmarks",
      "Landscape & Boundary Wall Architectural Design",
      "Dedicated Senior Architect Project Lead",
      "4 Milestone On-Site Structural Inspection Visits"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "How long does the complete architectural design phase take?",
    a: "A typical residential bungalow design (2,500 – 4,500 sq.ft) takes approximately 10 to 14 working days for preliminary 2D drafts and Vastu zoning. Following client approval, complete 3D elevations, structural engineering drawings, and MEP schematics are delivered within 21 to 25 working days."
  },
  {
    q: "Are Galaxy Interior architectural drawings compliant with Vastu Shastra?",
    a: "Yes. 100% of our residential plans are reviewed against traditional Vastu principles (Brahmasthan clearance, Ishanya/North-East water placement, Agneya/South-East kitchen positioning, and Nairutya/South-West master bedroom stability) without sacrificing modern contemporary elegance."
  },
  {
    q: "Do you deliver municipal approval drawings for Bihar and Jharkhand?",
    a: "Yes. Our senior architects prepare sanction drawing sets compliant with the municipal corporation bylaws of Ranchi, Patna, Bhagalpur, Deoghar, Dumka, and surrounding regional development authorities."
  },
  {
    q: "Can I upgrade from 2D planning to the 3D Visualization package midway?",
    a: "Absolutely. Many homeowners start with our 2D spatial layout to settle plot dimensions with family, then seamlessly upgrade to the 3D elevation and interior suite. The 2D fee is directly credited toward the upgraded tier."
  },
  {
    q: "What software and rendering engines does the studio use?",
    a: "We develop technical CAD drawings in Autodesk AutoCAD and Revit, model structural frames in SketchUp Pro and 3ds Max, and render photorealistic scenes using Lumion Pro and Chaos V-Ray."
  },
  {
    q: "Will our local contractor be able to execute directly from your blueprints?",
    a: "Yes. Every drawing sheet delivered in our Construction Dossier includes structural bar bending schedules (BBS), beam-column junction details, and millimeter-level offsets specifically structured for site masons and resident engineers."
  }
];

const GALLERY_ITEMS = [
  {
    src: "/generated/2d_floor_plan.png",
    title: "Precision 2D Master Floor Plan",
    category: "Architectural Drafting"
  },
  {
    src: "/generated/3d_elevation_hero.png",
    title: "Contemporary Villa Exterior Elevation",
    category: "3D Photorealism"
  },
  {
    src: "/generated/3d_interior_hero.png",
    title: "Luxury Living Room Volumetric Render",
    category: "Interior Visualization"
  },
  {
    src: "/generated/2d_furniture_plan.png",
    title: "Spatial Circulation & Furniture Layout",
    category: "Zoning & Vastu"
  },
  {
    src: "/generated/3d_split_villa_exterior.png",
    title: "Multi-Storey Residence 3D Perspective",
    category: "3D Architecture"
  },
  {
    src: "/generated/3d_split_living_room.png",
    title: "Double-Height Foyer & Dining Concept",
    category: "Interior Architecture"
  }
];

export default function DesignFacilitiesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#0c121e]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/service_design_1787300013035.jpg"
            alt="Galaxy Interior Architecture & 3D Design Facilities"
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
              Discipline 01 &bull; Architecture &amp; Visualization
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#faf8f5] tracking-tight leading-[1.1] mb-6">
            Architectural Planning &amp; <br />
            <span className="italic font-light text-[#c89d28]">3D Photorealistic Design</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            From millimeter-accurate Vastu floor plans to hyper-realistic 4K raytraced walkthroughs. We eliminate guesswork before a single brick is laid.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=design"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20"
            >
              Commission Architectural Design
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919631980881"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all bg-white/5 backdrop-blur-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#c89d28]" />
              Call +91 96319 80881
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">100%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Vastu Compliant</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">4K UHD</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Raytraced 3D Renders</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Zone IV/V</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Seismic Structural Vetting</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Zero Deviation</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Execution Blueprints</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL PROCESS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
            Systematic Methodology
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e] tracking-tight">
            The 6-Stage Architectural Pipeline
          </h2>
          <p className="text-gray-600 font-light mt-4 text-base sm:text-lg">
            Every residence follows our rigorous architectural sequence ensuring spatial harmony, legal clearance, and exact construction clarity.
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

      {/* 3. TECHNICAL DELIVERABLES */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                Contractual Output
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                What You Receive in Your Dossier
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-md text-sm sm:text-base">
              You receive complete, site-ready technical drawings so any structural contractor can build without ambiguity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DELIVERABLES.map((del, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#c89d28]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c89d28]/10 flex items-center justify-center mb-5">
                  {del.icon}
                </div>
                <h3 className="font-serif text-xl text-[#faf8f5] mb-2">{del.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{del.desc}</p>
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
              Blueprint to Reality
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Design &amp; Visualization Portfolio
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

      {/* 5. TRANSPARENT PRICING TIERS */}
      <section className="py-24 bg-white border-y border-black/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
              Transparent Fees
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Design Packages &amp; Investment
            </h2>
            <p className="text-gray-600 font-light mt-3 text-base">
              Clear, transparent per-square-foot architectural rates with no hidden surcharges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all ${
                  tier.recommended
                    ? "bg-[#0c121e] text-[#faf8f5] shadow-2xl ring-2 ring-[#c89d28]"
                    : "bg-[#faf8f5] text-[#0c121e] border border-black/5"
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c89d28] text-[#0c121e] text-[10px] font-bold tracking-widest uppercase">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl mb-2">{tier.name}</h3>
                  <p className={`text-xs mb-6 ${tier.recommended ? "text-gray-400" : "text-gray-500"}`}>
                    {tier.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
                    <span className="font-serif text-4xl sm:text-5xl font-normal text-[#c89d28]">
                      {tier.price}
                    </span>
                    <span className={`text-xs uppercase tracking-wider ${tier.recommended ? "text-gray-400" : "text-gray-500"}`}>
                      {tier.unit}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm font-light">
                        <Check className="w-4 h-4 text-[#c89d28] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact?service=design"
                  className={`w-full py-4 rounded-full text-center text-xs font-semibold tracking-widest uppercase transition-all ${
                    tier.recommended
                      ? "bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e]"
                      : "bg-[#0c121e] hover:bg-black text-[#faf8f5]"
                  }`}
                >
                  Book Consultation
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

      {/* 7. ARCHITECTURAL CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Ready to Begin?
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight">
            Transform Your Plot into an <br />
            <span className="italic text-[#c89d28]">Architectural Landmark</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a confidential consultation with our principal architects. We review your plot dimensions, Vastu alignment, and zoning options free of obligation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=design"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Schedule Consultation
            </Link>
            <a
              href="tel:+919631980881"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              Helpline: +91 96319 80881
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
