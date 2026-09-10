"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sofa,
  Palette,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  PhoneCall,
  Scissors,
  Hammer,
  Crown,
  Lightbulb,
  Check
} from "lucide-react";

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Aesthetic Moodboarding & Client Brief",
    desc: "Understanding your lifestyle rituals, preferred textures, color harmony, and functional storage requirements across every room.",
    icon: <Palette className="text-[#c89d28]" size={26} />
  },
  {
    step: "02",
    title: "3D Photorealistic Interior Walkthroughs",
    desc: "Raytraced 4K visuals for living areas, modular kitchen, and master suites displaying exact laminates, veneers, and lighting before fabrication.",
    icon: <Lightbulb className="text-[#c89d28]" size={26} />
  },
  {
    step: "03",
    title: "Material Boards & Hardware Vetting",
    desc: "Tactile sample verification of Century Club Prime marine ply, German soft-close hinges (Hettich/Hafele), and quartz/granite countertops.",
    icon: <Scissors className="text-[#c89d28]" size={26} />
  },
  {
    step: "04",
    title: "Factory CNC Joinery & Zero-Bubble Press",
    desc: "Millimeter-precision modular cutting, PUR hot-melt edge banding, and hydraulic hot-press veneer application in our dedicated facility.",
    icon: <Hammer className="text-[#c89d28]" size={26} />
  },
  {
    step: "05",
    title: "On-Site Installation & False Ceilings",
    desc: "Saint-Gobain Gyproc ceilings, concealed magnetic track lighting, acoustic wall paneling, and dust-controlled modular carcass assembly.",
    icon: <Layers className="text-[#c89d28]" size={26} />
  },
  {
    step: "06",
    title: "Diamond Polish & White-Glove Handover",
    desc: "Italian marble diamond polishing, PU lacquer coating, soft furnishings staging, deep vacuuming, and 10-year warranty handover.",
    icon: <Crown className="text-[#c89d28]" size={26} />
  }
];

const CRAFTSMANSHIP_STANDARDS = [
  {
    title: "10-Year Timber Warranty",
    desc: "Every cabinet and carcass is fabricated exclusively from 100% boiling-water-proof (BWP 710) marine plywood treated against termites and borers.",
    icon: <Shield className="text-[#c89d28]" size={22} />
  },
  {
    title: "German Soft-Close Hardware",
    desc: "Standard inclusion of Hettich Sensys hinges, Quadro soft-close runners, and Hafele lift-up flap fittings tested for 200,000 opening cycles.",
    icon: <Crown className="text-[#c89d28]" size={22} />
  },
  {
    title: "Zero-Edge PUR Banding",
    desc: "Factory edge-banding using moisture-resistant polyurethane glue prevents peeling and water seepage in wet kitchen and vanity areas.",
    icon: <Layers className="text-[#c89d28]" size={22} />
  },
  {
    title: "Architectural Lighting Design",
    desc: "Layered illumination: ambient cove lighting (3000K warm white), high CRI (>90) anti-glare COB spotlights, and sleek magnetic track profiles.",
    icon: <Lightbulb className="text-[#c89d28]" size={22} />
  },
  {
    title: "Anti-Stain Quartz & Italian Marble",
    desc: "Countertops fitted with non-porous engineered quartz (Caesarstone / KalingaStone) and bookmatched natural Italian marble with nano-coating.",
    icon: <Sparkles className="text-[#c89d28]" size={22} />
  },
  {
    title: "Dust-Free Modular On-Site Assembly",
    desc: "Pre-drilled and pre-finished modular flat-packs assembled on-site with minimal noise, zero indoor sawing dust, and rapid turnaround.",
    icon: <CheckCircle2 className="text-[#c89d28]" size={22} />
  }
];

const INTERIOR_PACKAGES = [
  {
    name: "Essential Luxury Fitout",
    price: "₹850",
    unit: "per sq.ft carpet",
    desc: "Complete interior essentials for modern apartments and builder floors.",
    features: [
      "Century Sainik 710 Grade BWP Plywood",
      "1.0mm Premium Matte/Gloss Laminates",
      "Hettich / Ebco Soft-Close Drawer Systems",
      "Saint-Gobain Gyproc False Ceilings (Cove & Halogen)",
      "Asian Paints Royale Luxury Emulsion on Walls",
      "Full Modular Kitchen with Tandem Boxes",
      "Wardrobes with Loft Storage in 2 Bedrooms"
    ],
    recommended: false
  },
  {
    name: "Signature Residence Grade",
    price: "₹1,350",
    unit: "per sq.ft carpet",
    desc: "Our most acclaimed interior package for duplexes, penthouses, and luxury villas.",
    features: [
      "CenturyPly Club Prime 710 Marine Plywood (Lifetime Tier)",
      "Natural Teak / Walnut Veneer with Melamine / PU Polish",
      "Full German Hettich Sensys & Hafele Hardware Suite",
      "Acrylic / Anti-Scratch Glass Acrylic Modular Kitchen",
      "Acoustic Fluted Wall Louvers & Charcoal Louver Paneling",
      "Concealed Magnetic Track Profile Lighting with Smart Dimming",
      "Designer Vanity Units with Backlit Anti-Fog Mirrors",
      "10-Year Comprehensive Woodwork Warranty"
    ],
    recommended: true
  },
  {
    name: "Haute Bespoke Masterpiece",
    price: "₹1,950",
    unit: "per sq.ft carpet",
    desc: "Uncompromising ultra-luxury with imported marble, bespoke upholstery, and home automation.",
    features: [
      "Everything in Signature Residence Tier",
      "Bookmatched Italian Bottochino / Statuario Marble Flooring",
      "Custom Leatherette / Velvet Upholstered Beds & Sofas",
      "Smart Home Automation (Lights, Curtains, Climate via iPad)",
      "High-Gloss Polyester (Lacquered Glass) Kitchen Finishes",
      "Walk-In Dressing Rooms with Tinted Fluted Glass Profiles",
      "Dedicated Senior Interior Decorator & Styling Director"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "Are the modular kitchens and wardrobes manufactured on-site or in a factory?",
    a: "All modular cabinetry, drawer carcasses, and shutter panels are precision-cut, CNC-drilled, and PUR-edgebanded in our factory facility. Only the assembly and precision anchoring occur on your site, keeping your residence free of toxic airborne sawdust and loud machinery."
  },
  {
    q: "What warranty does Galaxy Interior offer on interior woodwork?",
    a: "We provide a 10-Year Written Warranty against termite infestation, borer attacks, and manufacturing delamination on all Century Club Prime marine ply installations, and lifetime mechanical warranties on Hettich and Hafele German hardware."
  },
  {
    q: "Can you execute custom furniture pieces tailored to our room sizes?",
    a: "Yes. In addition to modular storage, our skilled in-house master craftsmen fabricate custom dining tables, bespoke upholstered headboards, curved sofas, and statement consoles exactly scaled to your room's architectural proportions."
  },
  {
    q: "What is the typical execution time for a 3BHK interior project?",
    a: "From 3D design freeze and material sign-off to final white-glove handover, a comprehensive 3BHK interior execution requires approximately 45 to 60 calendar days."
  },
  {
    q: "Do you handle false ceilings, electrical rewiring, and painting as well?",
    a: "Yes. Galaxy Interior offers true turnkey interior execution. We manage Gyproc false ceilings, concealed electrical wiring, sanitary plumbing fixtures, wall paneling, and Asian Paints Royale painting under a single unified supervisor."
  }
];

const GALLERY_ITEMS = [
  {
    src: "/services/service_interior_1787300041689.jpg",
    title: "Double-Height Luxury Living Room",
    category: "Living Spaces"
  },
  {
    src: "/generated/interior_gallery_1.png",
    title: "Modern Dining & Ambient Lighting",
    category: "Dining & Lounges"
  },
  {
    src: "/generated/interior_gallery_2.png",
    title: "Bespoke Master Suite & Paneling",
    category: "Master Bedrooms"
  },
  {
    src: "/generated/inspiration_modular_kitchen.jpg",
    title: "Handleless Acrylic Modular Kitchen",
    category: "Kitchen & Storage"
  },
  {
    src: "/generated/inspiration_tv_unit.jpg",
    title: "Fluted Louver TV Media Console",
    category: "Entertainment Walls"
  },
  {
    src: "/generated/inspiration_false_ceiling.jpg",
    title: "Indirect Cove Architectural Ceiling",
    category: "Lighting & Ceilings"
  }
];

export default function InteriorProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#0c121e]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/service_interior_1787300041689.jpg"
            alt="Galaxy Interior Luxury Residential Interior Execution"
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
              Discipline 03 &bull; Luxury Residential Interiors
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#faf8f5] tracking-tight leading-[1.1] mb-6">
            Bespoke Luxury Interiors &amp; <br />
            <span className="italic font-light text-[#c89d28]">Artisanal Joinery</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Factory-grade CNC woodwork, Century Club Prime marine plywood, German soft-close fittings, and hand-selected Italian marble. Crafted for a lifetime of beauty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=interior"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20"
            >
              Consult an Interior Designer
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
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">100% BWP</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Marine Grade 710 Ply</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Hettich</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">German Hardware Standard</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">10 Years</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Written Timber Warranty</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">45 Days</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Guaranteed Handover</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERIOR PROCESS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
            Artisan Precision
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e] tracking-tight">
            The 6-Stage Interior Transformation
          </h2>
          <p className="text-gray-600 font-light mt-4 text-base sm:text-lg">
            From preliminary material swatches to dust-free factory modular assembly and diamond-grade marble polishing.
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

      {/* 3. CRAFTSMANSHIP STANDARDS */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                Material Excellence
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                Our Craftsmanship Benchmarks
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-md text-sm sm:text-base">
              We eliminate cheap particle boards, noisy hinges, and bubbled laminates through strict factory tolerances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CRAFTSMANSHIP_STANDARDS.map((std, index) => (
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
              Spaces That Inspire
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Interior Design Portfolio
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
              Itemized Quotations
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Interior Specifications &amp; Packages
            </h2>
            <p className="text-gray-600 font-light mt-3 text-base">
              Transparent per-square-foot carpet rates with legally binding material schedules and zero surprise bills.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {INTERIOR_PACKAGES.map((pkg, idx) => (
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
                  href="/contact?service=interior"
                  className={`w-full py-4 rounded-full text-center text-xs font-semibold tracking-widest uppercase transition-all ${
                    pkg.recommended
                      ? "bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e]"
                      : "bg-[#0c121e] hover:bg-black text-[#faf8f5]"
                  }`}
                >
                  Book Interior Consultation
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

      {/* 7. INTERIOR CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Curate Your Sanctuary
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight">
            Design a Home That Feels Like a <br />
            <span className="italic text-[#c89d28]">Work of Art</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Reserve a 1-on-1 design consultation with our interior styling directors. We review your floor plans and present customized 3D moodboards.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=interior"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Book Interior Consultation
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              Direct Helpline: +91 70044 65611
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
