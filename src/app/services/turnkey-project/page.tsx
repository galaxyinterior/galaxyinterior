"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  ClipboardList,
  Building2,
  Users,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  PhoneCall,
  Sparkles,
  Award,
  Wallet,
  Check
} from "lucide-react";

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Master Discovery & Fixed-Price BOQ",
    desc: "We analyze your lifestyle goals, plot topography, and family requirements, binding the entire build into a zero-escalation Master BOQ.",
    icon: <Wallet className="text-[#c89d28]" size={26} />
  },
  {
    step: "02",
    title: "Architectural & Municipal Sanctions",
    desc: "Our architects draft Vastu-compliant blueprints and 3D elevations while our liaison team secures all municipal sanctions and approvals.",
    icon: <ClipboardList className="text-[#c89d28]" size={26} />
  },
  {
    step: "03",
    title: "Seismic Civil Superstructure Build",
    desc: "Heavy Fe 550D TMT foundation, M25 concrete casting, and precision masonry executed with daily resident engineer supervision.",
    icon: <Building2 className="text-[#c89d28]" size={26} />
  },
  {
    step: "04",
    title: "Concealed MEP & Advanced Conduits",
    desc: "Complete concealed fire-retardant electrical wiring (Havells/Finolex) and pressure-tested plumbing loops before plastering.",
    icon: <ShieldCheck className="text-[#c89d28]" size={26} />
  },
  {
    step: "05",
    title: "Bespoke Interiors & Custom Millwork",
    desc: "Factory-finished Century Club Prime woodwork, false ceilings, Italian marble flooring, and modular kitchen seamlessly installed.",
    icon: <Users className="text-[#c89d28]" size={26} />
  },
  {
    step: "06",
    title: "120-Point Inspection & Key Handover",
    desc: "Professional deep cleaning, electrical load testing, water pressure audits, and handover of your fully furnished home with all keys and warranties.",
    icon: <KeyRound className="text-[#c89d28]" size={26} />
  }
];

const TURNKEY_ADVANTAGES = [
  {
    title: "Single Point of Accountability",
    desc: "No contractor blaming the architect, and no carpenter blaming the mason. One unified studio contract handles design, civil, and interiors.",
    icon: <Award className="text-[#c89d28]" size={22} />
  },
  {
    title: "Legally Binding Zero-Escalation BOQ",
    desc: "The cost in your contract is the cost at handover. We absorb raw material fluctuations (steel, cement) so you never face surprise bills.",
    icon: <ShieldCheck className="text-[#c89d28]" size={22} />
  },
  {
    title: "Milestone-Based Escrow Payments",
    desc: "Funds are released in 7 transparent stages upon verified engineering sign-offs, keeping you in full financial control throughout.",
    icon: <Wallet className="text-[#c89d28]" size={22} />
  },
  {
    title: "Dedicated Resident Civil Engineer",
    desc: "A full-time engineer is stationed exclusively on your site from day one to enforce drawing tolerances and manage daily labor crews.",
    icon: <Building2 className="text-[#c89d28]" size={22} />
  },
  {
    title: "Complete Municipal & Utility Liaison",
    desc: "We manage local development authority paperwork, building sanction clearances, water borings, and electric meter applications.",
    icon: <ClipboardList className="text-[#c89d28]" size={22} />
  },
  {
    title: "10-Year Comprehensive Warranty",
    desc: "Backed by a written 10-year structural stability bond and 10-year anti-termite marine timber warranty on all interior joinery.",
    icon: <Shield className="text-[#c89d28]" size={22} />
  }
];

const TURNKEY_PACKAGES = [
  {
    name: "Classic Turnkey Residence",
    price: "₹2,450",
    unit: "per sq.ft built-up",
    desc: "Complete architectural conception, civil frame, and modern interior fitout ready for living.",
    features: [
      "Complete 2D Architectural & 3D Elevation Suite",
      "Seismic Fe 550D TMT & Grade 43/53 Concrete Mix",
      "Vitrified 4x2 Tiles / Polished Granite Flooring",
      "Century Sainik 710 Grade BWP Modular Kitchen",
      "Saint-Gobain False Ceilings with LED Downlights",
      "Jaguar / Kohler Sanitary & CP Bathroom Fittings",
      "Asian Paints Royale Luxury Emulsion Finishing"
    ],
    recommended: false
  },
  {
    name: "Signature Luxury Villa Turnkey",
    price: "₹2,950",
    unit: "per sq.ft built-up",
    desc: "Our most popular turnkey tier for high-end duplexes, lavish bungalows, and family estates.",
    features: [
      "Everything in Classic Turnkey Tier",
      "Tata Tiscon Fe 550D Steel & Ultratech Concrete",
      "Imported Italian Bottochino Marble in Living/Dining",
      "Century Club Prime 710 Plywood with Hettich German Hardware",
      "Full Modular Kitchen with Built-in Chimney & Hob",
      "Fluted Charcoal Louver Paneling & Designer Wardrobes",
      "Complete Driveway Paving, Boundary Wall & MS Gates",
      "Dedicated Resident Site Engineer & Daily Video Logs",
      "10-Year Structural & Timber Warranty Bond"
    ],
    recommended: true
  },
  {
    name: "Royal Estate Bespoke Turnkey",
    price: "₹3,850",
    unit: "per sq.ft built-up",
    desc: "Ultra-luxury mansion build with full home automation, curated landscaping, and bespoke luxury furniture.",
    features: [
      "Everything in Signature Villa Tier",
      "High-Performance M30 Grade Reinforced Concrete",
      "Full Smart Home Automation (Lighting, Curtains & Security)",
      "Bookmatched Italian Statuario Marble Throughout",
      "Architectural Landscape Garden with Gazebo & Water Body",
      "Walk-In Dressing Suites with Glass Aluminum Profiles",
      "Solar Water Heating & Rooftop Rainwater Harvesting",
      "Custom Handcrafted Teak Furniture Package Included"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "What does 'Turnkey' mean at Galaxy Interior?",
    a: "Turnkey means you hand us an empty plot and we hand you a fully finished, professionally cleaned home ready to live in—complete with architectural blueprints, municipal sanctions, civil frame, MEP lines, luxury modular interiors, Italian marble flooring, and light fixtures. You just turn the key and walk in."
  },
  {
    q: "How does Galaxy Interior guarantee zero budget escalation?",
    a: "Before breaking ground, we execute a legally binding Master BOQ contract that fixes every material specification, brand, and dimensional allowance down to the exact unit. We absorb standard material inflation across the construction period, meaning your contracted price is final."
  },
  {
    q: "How are turnkey payments scheduled?",
    a: "Payments are linked to 7 verifiable physical milestones: 1) Contract & Architectural Sanction (10%), 2) Excavation & Plinth Beam (15%), 3) Ground Floor Slab (15%), 4) Upper Floor Slab & Masonry (20%), 5) Plastering & MEP Conduits (15%), 6) Interior Joinery & Flooring (15%), and 7) Final Handover Audit & Keys (10%)."
  },
  {
    q: "Can I monitor daily construction progress if I live out of town or abroad?",
    a: "Yes. Many of our clients are NRIs or working professionals in Bangalore, Delhi, or abroad. Your dedicated project manager uploads daily photo logs, 360-degree site walkthrough videos, and material delivery challans to your secure Client Portal and WhatsApp group."
  },
  {
    q: "What is the typical completion timeframe for a 3,500 sq.ft turnkey villa?",
    a: "A 3,500 sq.ft duplex villa typically takes 9 to 11 months from architectural design sanction to final turnkey key handover, strictly tracked through our Gantt chart project management schedule."
  }
];

const GALLERY_ITEMS = [
  {
    src: "/services/service_turnkey_1787300070398.jpg",
    title: "The Mayfair Landmark Residence",
    category: "Turnkey Bungalow"
  },
  {
    src: "/generated/legacy_villa.png",
    title: "The Imperial Villa & Grounds",
    category: "Turnkey Estate"
  },
  {
    src: "/generated/3d_split_villa_exterior.png",
    title: "3D Conception to As-Built Reality",
    category: "Conception to Key"
  },
  {
    src: "/generated/interior_gallery_1.png",
    title: "Delivered Living & Dining Salon",
    category: "Turnkey Interiors"
  },
  {
    src: "/generated/project_ongoing_1.png",
    title: "Ongoing Civil Superstructure Phase",
    category: "Milestone Execution"
  },
  {
    src: "/generated/elevation_gallery_1.png",
    title: "Modern Architectural Facade Handover",
    category: "Delivered Masterpiece"
  }
];

export default function TurnkeyProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#0c121e]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services/service_turnkey_1787300070398.jpg"
            alt="Galaxy Interior Turnkey Project Management & Build"
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
              Discipline 04 &bull; End-to-End Turnkey Handover
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#faf8f5] tracking-tight leading-[1.1] mb-6">
            Conception-to-Key <br />
            <span className="italic font-light text-[#c89d28]">Turnkey Home Building</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            One contract. Zero headaches. From raw plot to fully furnished architectural residence with legally guaranteed zero budget escalation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=turnkey"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#c89d28]/20"
            >
              Commission a Turnkey Residence
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
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">Zero</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Cost Escalation</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">1 Single</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Unified Contract</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">100%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Move-In Ready</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl text-[#faf8f5]">10 Years</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Written Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TURNKEY PROCESS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
            Conception to Key
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e] tracking-tight">
            The 6-Phase Turnkey Lifecycle
          </h2>
          <p className="text-gray-600 font-light mt-4 text-base sm:text-lg">
            We handle design, municipal approvals, civil foundation, MEP infrastructure, and interior joinery under strict milestone governance.
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

      {/* 3. TURNKEY ADVANTAGES */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                Complete Peace of Mind
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                Why Turnkey with Galaxy Interior?
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-md text-sm sm:text-base">
              Eliminate the chaos of coordinating 15 different unvetted local vendors. Experience absolute contractual transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TURNKEY_ADVANTAGES.map((adv, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#c89d28]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c89d28]/10 flex items-center justify-center mb-5">
                  {adv.icon}
                </div>
                <h3 className="font-serif text-xl text-[#faf8f5] mb-2">{adv.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{adv.desc}</p>
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
              Turnkey Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Delivered Turnkey Residences
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0c121e] hover:text-[#c89d28] transition-colors"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
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
              Complete Living Solutions
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#0c121e]">
              Turnkey Specification Packages
            </h2>
            <p className="text-gray-600 font-light mt-3 text-base">
              All-inclusive per-square-foot built-up pricing covering architectural drawings, civil construction, luxury interiors, and MEP systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TURNKEY_PACKAGES.map((pkg, idx) => (
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
                    Signature Choice
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
                  href="/contact?service=turnkey"
                  className={`w-full py-4 rounded-full text-center text-xs font-semibold tracking-widest uppercase transition-all ${
                    pkg.recommended
                      ? "bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e]"
                      : "bg-[#0c121e] hover:bg-black text-[#faf8f5]"
                  }`}
                >
                  Request Turnkey Proposal
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

      {/* 7. TURNKEY CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Turnkey Certainty
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight">
            Hand Us Your Plot. <br />
            <span className="italic text-[#c89d28]">We Hand You The Keys.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a comprehensive turnkey consultation. We analyze your plot, outline a custom Master BOQ, and guarantee zero budget escalation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?service=turnkey"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Commission Turnkey Home
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              Direct Turnkey Helpline: +91 70044 65611
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
