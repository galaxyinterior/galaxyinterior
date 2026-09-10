"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Layers,
  Compass,
  Wrench,
  Home,
  Hammer,
  Clock,
  FileCheck2,
  PhoneCall,
  Check
} from 'lucide-react';

interface ServiceDiscipline {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

const CORE_SERVICES: ServiceDiscipline[] = [
  {
    id: 'design',
    number: '01',
    slug: '/services/design-facilities',
    title: 'Architectural & 3D Design',
    category: 'Conception & Visualization',
    tagline: 'Experience and walk through every millimeter of your residence before construction begins.',
    description: 'Our architectural studio integrates Vastu compliance, climate-responsive orientation, and spatial ergonomics into actionable CAD blueprints and photorealistic 3D renders. We remove all guesswork from the building process.',
    image: '/services/service_design_1787300013035.jpg',
    deliverables: [
      'Vastu-Compliant 2D Floor Plans & Furniture Layouts',
      'Photorealistic 3D Exterior Elevation & Day/Night Lighting Studies',
      '4K Interior 3D Walkthrough Renders for All Living Zones',
      'Municipal Submission & Working Architectural Blueprints',
      'Complete Electrical, Plumbing (MEP) & HVAC Conduit Schemes'
    ],
    specs: [
      { label: 'Deliverable Timeframe', value: '10–14 Days' },
      { label: 'Revisions Policy', value: 'Uncapped Initial Phase' },
      { label: 'Software Stack', value: 'AutoCAD • 3ds Max • V-Ray' }
    ]
  },
  {
    id: 'construction',
    number: '02',
    slug: '/services/construction-project',
    title: 'Civil Construction & Engineering',
    category: 'Structural Foundation & RCC',
    tagline: 'Engineered foundations and RCC frameworks built with laboratory-tested Tier-1 materials.',
    description: 'We execute private villa and duplex civil construction with uncompromising structural engineering. Our on-site resident engineers oversee soil testing, steel reinforcement binding, and concrete pour tests to ensure generational longevity.',
    image: '/services/service_construction_1787300029220.jpg',
    deliverables: [
      'Soil Testing, Topographical Survey & Seismic Foundation Design',
      'Tata Tiscon / Jindal Fe-550 TMT Steel Framework',
      'UltraTech 53-Grade Concrete Pouring with On-Site Slump & Cube Tests',
      'Sub-Structure Waterproofing (Dr. Fixit Chemical Membrane Barriers)',
      'Daily Resident Site Engineer Supervision with Photographic Progress Logs'
    ],
    specs: [
      { label: 'Structural Warranty', value: 'Generational RCC' },
      { label: 'Supervision', value: 'Dedicated On-Site Engineer' },
      { label: 'Testing Frequency', value: 'Every Concrete Pour' }
    ]
  },
  {
    id: 'interior',
    number: '03',
    slug: '/services/interior-project',
    title: 'Luxury Residential Interiors',
    category: 'Custom Joinery & Finishes',
    tagline: 'Factory-crafted modular joinery, fluted wall accents, and Italian stone integration.',
    description: 'We elevate residential living through bespoke interiors that balance acoustic comfort, tactile natural materials, and precision woodwork. Manufactured in clean factory conditions to protect your home from messy site carpentry.',
    image: '/services/service_interior_1787300041689.jpg',
    deliverables: [
      'In-House Factory Joinery (Precision German CNC edge-banding)',
      'CenturyPly Club Prime & Greenply BWP Marine Core (Borer & Termite Proof)',
      'German Concealed Hardware Integration (Häfele, Hettich, Blum)',
      'Italian Marble, Granite & Quartz Precision Bookmatching',
      'Acoustic False Ceiling Buffers & Concealed Warm Profile Lighting'
    ],
    specs: [
      { label: 'Timber Warranty', value: '10-Year Certified' },
      { label: 'Hardware Standard', value: 'German Soft-Close' },
      { label: 'Production Facility', value: 'Clean Factory Environment' }
    ]
  },
  {
    id: 'turnkey',
    number: '04',
    slug: '/services/turnkey-project',
    title: 'Turnkey Build & Handover',
    category: 'End-to-End Conception to Key',
    tagline: 'One master contract, one accountable point of contact, from raw land to move-in.',
    description: 'Our signature turnkey service eliminates the chaos of juggling multiple subcontractors. Galaxy Interior takes unified responsibility for architectural planning, civil construction, interior fit-out, and final handover.',
    image: '/services/service_turnkey_1787300070398.jpg',
    deliverables: [
      'Single Legally Bound Master Contract with Zero Cost Escalation',
      'Seamless Integration of Architecture, Civil, MEP & Interior Design',
      'Transparent Milestone-Based Escrow Release Schedule',
      'Dedicated Project Manager & Real-Time Client Communication Dashboard',
      'Handover Dossier with OEM Brand Guarantees, CAD As-Builts & Keys'
    ],
    specs: [
      { label: 'Contract Type', value: 'Itemised BOQ Guarantee' },
      { label: 'Point of Contact', value: 'Single Accountable Studio' },
      { label: 'Escrow Stages', value: 'Verified Milestone Releases' }
    ]
  },
  {
    id: 'renovation',
    number: '05',
    slug: '/services/renovation-project',
    title: 'Structural Renovation & Upgrades',
    category: 'Modernization & Restoration',
    tagline: 'Breathe contemporary architectural luxury into aging residential structures.',
    description: 'Whether modernizing a generational ancestral home or reconfiguring an existing layout for open-concept living, our civil and interior teams reinforce load-bearing frameworks while installing state-of-the-art modern comforts.',
    image: '/services/service_renovation_1787300085173.jpg',
    deliverables: [
      'Structural Load-Bearing Feasibility Audit by Licensed Civil Engineers',
      'Internal Wall Reconfiguration & Open-Plan Spatial Optimization',
      'Complete Replacement of Aging Plumbing Conduits & Concealed Wiring',
      'Modern Modular Kitchen & Luxury Bathroom Wet-Area Rejuvenation',
      'Chemical Anti-Termite & Deep Dampness Moisture Rehabilitation'
    ],
    specs: [
      { label: 'Feasibility Audit', value: 'Compulsory Pre-Demolition' },
      { label: 'Rewiring Standard', value: 'Fire-Retardant HRFR' },
      { label: 'Damp Barrier', value: 'Polymer-Modified Crystalline' }
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Discover',
    tagline: 'Requirements & Feasibility',
    desc: 'On-site land survey, lifestyle consultation, budget parameters, and initial feasibility assessment.'
  },
  {
    step: '02',
    name: 'Design',
    tagline: '2D & 3D Photorealism',
    desc: 'Vastu-aligned space planning, structural calculations, and 4K photorealistic walkthroughs.'
  },
  {
    step: '03',
    name: 'Specify',
    tagline: 'Itemised BOQ Contract',
    desc: 'Transparent line-item material schedules with Tier-1 specifications and zero-escalation pricing.'
  },
  {
    step: '04',
    name: 'Build',
    tagline: 'Civil & In-House Joinery',
    desc: 'Daily resident engineer site supervision, laboratory concrete pour tests, and factory woodwork fabrication.'
  },
  {
    step: '05',
    name: 'Handover',
    tagline: 'Quality Audit & Key Delivery',
    desc: 'Comprehensive 150-point PDI quality audit, warranty dossier with OEM guarantees, and move-in celebration.'
  }
];

const STUDIO_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Zero Escalation Contract',
    desc: 'Your approved BOQ is legally binding. We absorb material market fluctuations so your budget remains constant.'
  },
  {
    icon: Layers,
    title: '3D Before Civil Build',
    desc: 'You see exactly what your home looks like down to lighting color temperature before any physical work starts.'
  },
  {
    icon: Building2,
    title: 'Resident Site Engineers',
    desc: 'Our full-time graduate civil engineers supervise daily execution, testing materials and enforcing tolerances.'
  },
  {
    icon: FileCheck2,
    title: '10-Year Timber Warranty',
    desc: 'All custom woodwork is backed by a 10-year anti-borer and anti-termite guarantee with authentic manufacturer certifications.'
  }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [servicesList, setServicesList] = useState<ServiceDiscipline[]>(CORE_SERVICES);

  useEffect(() => {
    try {
      const q = query(collection(db, 'services'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched: ServiceDiscipline[] = [];
        let idx = 6;
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as any;
          if (data.status === 'inactive') return;

          // Check if already in CORE_SERVICES by slug/title
          const existing = CORE_SERVICES.find(c => c.slug === data.slug || c.title.toLowerCase() === data.title?.toLowerCase());
          if (existing) return;

          fetched.push({
            id: docSnap.id,
            number: String(idx).padStart(2, '0'),
            slug: data.slug ? `/services/${data.slug}` : '/contact',
            title: data.title || 'Specialized Studio Discipline',
            category: data.category || 'Architectural Services',
            tagline: data.shortDescription || 'Bespoke architectural execution managed under a single studio contract.',
            description: data.fullDescription || data.shortDescription || 'Full turnkey execution with resident engineering supervision and zero cost escalation.',
            image: data.image || '/services/service_design_1787300013035.jpg',
            deliverables: Array.isArray(data.deliverables) ? data.deliverables : [
              'Custom CAD Blueprints & Vastu Floor Plans',
              'Itemised Master BOQ Specification Contract',
              'Resident Site Engineer Supervision',
              '10-Year Timber & Structural Warranty'
            ],
            specs: [
              { label: 'Starting Rate', value: data.startingPrice ? `₹${data.startingPrice}/sq.ft` : 'Quote On Request' },
              { label: 'Contract Type', value: 'Zero Escalation Master BOQ' },
              { label: 'Supervision', value: 'Dedicated Site Engineer' }
            ]
          });
          idx++;
        });

        if (fetched.length > 0) {
          setServicesList([...CORE_SERVICES, ...fetched]);
        }
      }, (err) => {
        console.warn('Firestore services listener notice:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Fallback to core discipline catalog');
    }
  }, []);

  const filteredServices = servicesList.filter(
    (s) => activeTab === 'all' || s.id === activeTab
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#111622] pt-28 md:pt-36">

      {/* 1. HERO SECTION */}
      <section className="relative px-6 pb-20 md:pb-28 max-w-[1400px] mx-auto border-b border-[#eee7db]">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.25em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Integrated Studio Disciplines • Eastern India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.08] mb-8">
            Architecture. Civil Build. <br />
            <span className="italic font-editorial text-brand-charcoal">Bespoke Interiors.</span>
          </h1>

          <p className="text-gray-600 font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12">
            Galaxy Interior brings all residential disciplines under a single accountable roof. No fragmented local contractors, no shifting responsibilities — from raw earth and architectural blueprints to final turnkey move-in.
          </p>

          {/* Quick Discipline Jump Navigator */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === 'all'
                  ? 'bg-[#111622] text-white shadow-sm'
                  : 'bg-white hover:bg-gray-50 text-gray-600 border border-[#ded8cb]'
                }`}
            >
              All Disciplines
            </button>
            {servicesList.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setActiveTab(srv.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === srv.id
                    ? 'bg-[#111622] text-white shadow-sm'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-[#ded8cb]'
                  }`}
              >
                {srv.number} {srv.title.split('&')[0]}
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* 2. DETAILED SERVICE DISCIPLINES SHOWCASE */}
      <section className="py-24 md:py-32 max-w-[1400px] mx-auto px-6 border-b border-[#eee7db]">
        <div className="space-y-24">
          {filteredServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-3xl border border-[#ded8cb] p-6 md:p-12 lg:p-14 shadow-sm hover:shadow-luxury-hover transition-all duration-500 scroll-mt-36"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}>

                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#ded8cb] shadow-md group">
                      <Image
                        src={service.image}
                        alt={`${service.title} — Galaxy Interior`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest font-bold">
                        Discipline {service.number}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold font-bold">
                        {service.category}
                      </span>
                      <span className="h-px flex-grow bg-gray-200" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-brand-charcoal mb-4 leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed mb-3">
                      {service.tagline}
                    </p>

                    <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="mb-8 p-5 rounded-2xl bg-[#faf8f5] border border-[#ded8cb]">
                      <div className="text-xs uppercase tracking-wider font-bold text-brand-charcoal mb-3 flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-brand-gold" />
                        <span>Key Engineering Deliverables:</span>
                      </div>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-light">
                            <Check className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specs Tags */}
                    <div className="grid grid-cols-3 gap-3 mb-8 pt-4 border-t border-gray-100">
                      {service.specs.map((spec) => (
                        <div key={spec.label}>
                          <div className="text-[10px] uppercase font-mono text-gray-400">{spec.label}</div>
                          <div className="text-xs font-bold text-brand-charcoal mt-0.5">{spec.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={service.slug}
                        className="px-6 py-3.5 rounded-full bg-[#111622] hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 group cursor-target shadow-sm"
                      >
                        <span>Deep-Dive Service Guide</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>

                      <Link
                        href="/contact"
                        className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-brand-charcoal border border-[#ded8cb] text-xs font-bold uppercase tracking-wider transition-colors cursor-target"
                      >
                        <span>Inquire For This Service</span>
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. 5-STEP UNIFIED EXECUTION JOURNEY */}
      <section className="py-24 md:py-32 bg-white border-b border-[#eee7db]">
        <div className="max-w-[1400px] mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>Predictable Execution Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              From Concept To Handover. <br />
              <span className="italic font-editorial text-brand-charcoal">The 5-Stage Customer Journey.</span>
            </h2>
            <p className="mt-4 text-gray-600 font-light text-base md:text-lg leading-relaxed">
              Every project follows an audited, milestone-governed workflow designed to give you clarity and complete financial transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-7 rounded-3xl bg-[#faf8f5] border border-[#ded8cb] hover:border-brand-gold/40 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-editorial font-bold text-brand-gold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-brand-charcoal mb-1">
                    {step.name}
                  </h3>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 font-semibold mb-3">
                    {step.tagline}
                  </div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200/60 flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                  <CheckCircle2 className="w-3 h-3 text-brand-gold" />
                  <span>Documented Sign-Off</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 4. STUDIO GUARANTEES & TRUST PILLARS */}
      <section className="py-24 bg-[#faf8f5] border-b border-[#eee7db]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-brand-gold font-bold">
              Contractual Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-brand-charcoal mt-2">
              Why Homeowners Choose Our Single-Studio Model
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-3xl p-8 border border-[#ded8cb] shadow-sm flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-[#ded8cb] flex items-center justify-center text-brand-gold mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-editorial font-bold text-brand-charcoal mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed flex-grow">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 5. FINAL ARCHITECTURAL CTA */}
      <section className="py-28 md:py-36 bg-[#080d17] text-white relative overflow-hidden">

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-gold/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Plan Your Residence?</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-white leading-[1.08] mb-6">
            Consult With Our <br />
            <span className="text-gold-gradient font-editorial italic">Architectural Team.</span>
          </h2>

          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Tell us about your plot location, space requirements, and design preferences. We will prepare an initial feasibility layout and transparent BOQ estimate.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-brand-gold hover:bg-yellow-400 text-brand-charcoal font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-[0_10px_30px_rgba(241,184,33,0.25)] hover:scale-105 flex items-center justify-center gap-2 cursor-target"
            >
              <span>Book Studio Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pricing/packages"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Pricing Packages</span>
            </Link>

            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-mono text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span>+91 70044 65611</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
