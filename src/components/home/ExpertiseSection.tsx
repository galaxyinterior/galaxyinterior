'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Layers, 
  Building2, 
  Palette, 
  Hammer, 
  KeyRound,
  FileCheck2,
  Eye,
  ShieldAlert
} from 'lucide-react';

interface JourneyStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  ctaText: string;
  ctaLink: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    phase: 'DISCOVER',
    title: 'Architectural Consultation & Lifestyle Brief',
    description: 'We meet on-site or in our studios to study your plot topography, family routines, aesthetic aspirations, and budget parameters.',
    deliverables: ['Site Topography Analysis', 'Bylaw Feasibility Check', 'Preliminary Budget Matrix'],
    ctaText: 'Book Consultation',
    ctaLink: '/contact'
  },
  {
    number: '02',
    phase: 'DESIGN',
    title: '2D Floor Plans & Photorealistic 3D Walkthroughs',
    description: 'Our licensed architects develop Vastu-compliant structural blueprints and 360° photorealistic 3D visual walkthroughs before execution begins.',
    deliverables: ['Vastu 2D Floor Plans', '3D Exterior & Interior Renders', 'Electrical & Plumbing Layouts'],
    ctaText: 'Explore Design Facilities',
    ctaLink: '/services/design-facilities'
  },
  {
    number: '03',
    phase: 'SELECT',
    title: 'Materials, Finishes & Guaranteed Itemised BOQ',
    description: 'You select materials at our experience centers. We prepare an itemised Bill of Quantities with specified brands (CenturyPly, UltraTech, Havells).',
    deliverables: ['100% Transparent Itemised BOQ', 'Brand Specification Schedule', 'Fixed-Cost Legal Agreement'],
    ctaText: 'View Turnkey Packages',
    ctaLink: '/pricing/packages'
  },
  {
    number: '04',
    phase: 'BUILD',
    title: 'Civil Construction & Bespoke Interior Crafting',
    description: 'Dedicated resident civil engineers supervise soil compacting, RCC slab pours, brickwork, custom millwork, and electrical conduits with daily photo reports.',
    deliverables: ['Resident Engineer Supervision', 'Daily Digital Progress Logs', 'Material Quality Lab Tests'],
    ctaText: 'View Construction Process',
    ctaLink: '/services/construction-project'
  },
  {
    number: '05',
    phase: 'HANDOVER',
    title: '150-Point Quality Audit & White-Glove Move-In',
    description: 'A comprehensive 150-point snagging audit, deep cleaning, electrical balancing, and handover of your keys alongside manufacturer warranty binders.',
    deliverables: ['150-Point Quality Audit Signoff', 'Manufacturer Warranty Binder', 'As-Built Architectural Drawings'],
    ctaText: 'Turnkey Handover Scope',
    ctaLink: '/services/turnkey-project'
  }
];

interface Discipline {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  features: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'turnkey',
    title: 'Turnkey Architectural & Civil Build',
    tagline: 'Concept to Keys Handover',
    description: 'Complete single-source responsibility. We manage structural engineering, excavation, RCC framing, and finishes with zero subcontractor passing.',
    image: '/generated/srv_construction.png',
    href: '/services/turnkey-project',
    features: ['Structural RCC Execution', 'Daily Site Supervision', 'Strict Milestone Payments']
  },
  {
    id: 'design',
    title: 'Architectural Blueprint & 3D Visualization',
    tagline: 'Vastu & Photorealism',
    description: 'Immersive 3D architectural renders, structural civil drawings, municipal approval sets, and detailed electrical/plumbing engineering schematics.',
    image: '/generated/srv_3d_design.png',
    href: '/services/design-facilities',
    features: ['Photorealistic 3D Renders', 'Vastu-Compliant 2D Plans', 'Detailed Working Drawings']
  },
  {
    id: 'interior',
    title: 'Bespoke Luxury Residential Interiors',
    tagline: 'Crafted Around Your Lifestyle',
    description: 'Custom modular kitchens, walk-in closets, acoustic wall panelling, bespoke millwork, and automated mood lighting schemes tailored for luxury residences.',
    image: '/generated/srv_interior.png',
    href: '/services/interior-project',
    features: ['Häfele & Hettich Hardware', 'Century Ply BWP Core', 'Concealed Profile Lighting']
  },
  {
    id: 'renovation',
    title: 'Structural Renovation & Modernization',
    tagline: 'Heritage & Modern Overhauls',
    description: 'Transforming aging properties into contemporary residences with structural reinforcement, layout expansion, modern piping, and luxury finishes.',
    image: '/generated/project_ongoing_1.png',
    href: '/services/renovation-project',
    features: ['Load-Bearing Alterations', 'Full MEP Overhaul', 'Facade Modernization']
  }
];

export default function ExpertiseSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section className="py-24 md:py-32 bg-white text-[#111622] border-b border-[#eeeae2] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f1ea] border border-[#e5dfd2] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>Disciplines &amp; Methodology</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Architectural Mastery. <br />
              <span className="italic font-editorial text-brand-charcoal">From Idea to Keys Handover.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
              We eliminate contractor disputes, hidden escalations, and design compromises by uniting architectural vision, civil engineering, and bespoke interior execution.
            </p>
          </div>
        </div>

        {/* Part 1: The 4 Core Disciplines Grid (Real Verified Routes) */}
        <div className="mb-28">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
              Core Specialized Disciplines
            </span>
            <Link 
              href="/services" 
              className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-gold hover:text-brand-navy transition-colors inline-flex items-center gap-1 cursor-target"
            >
              <span>View All Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISCIPLINES.map((d) => (
              <div
                key={d.id}
                data-cursor-tooltip={`service-${d.id}`}
                className="group relative bg-[#fbfaf6] rounded-2xl border border-[#ded8cb] overflow-hidden shadow-sm hover:shadow-luxury-hover hover:border-brand-gold/60 transition-all duration-300 flex flex-col cursor-target"
              >
                {/* Visual Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                    {d.tagline}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-editorial font-bold text-brand-charcoal mb-2 group-hover:text-brand-navy transition-colors">
                      {d.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed mb-4">
                      {d.description}
                    </p>
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-gray-100">
                      {d.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Link */}
                  <Link
                    href={d.href}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-bold text-brand-navy group-hover:text-brand-gold transition-colors pt-3 border-t border-gray-100"
                  >
                    <span>Explore Discipline</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: The 5-Step Customer Journey ("From Idea to Reality") */}
        <div className="bg-[#111622] rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 pb-6 border-b border-white/10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
                <span>The 5-Step Protocol</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-editorial font-normal text-white">
                How Your Project Progresses
              </h3>
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-md leading-relaxed">
              Every milestone follows a structured engineering workflow. You never pay for uninspected stages, and you always have complete visibility.
            </p>
          </div>

          {/* Progress Step Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  data-cursor-tooltip={`journey-step-${step.number}`}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-target ${
                    isActive
                      ? 'bg-brand-gold/15 border-brand-gold text-white shadow-md'
                      : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-brand-gold' : 'text-gray-500'}`}>
                      {step.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                      {step.phase}
                    </span>
                  </div>
                  <div className="text-xs font-medium truncate">
                    {step.title.split('&')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-brand-gold font-mono font-bold text-lg">
                    Phase {activeStep.number}
                  </span>
                  <span className="h-1 w-8 bg-brand-gold/40 rounded-full" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">
                    {activeStep.phase}
                  </span>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-editorial text-white mb-4">
                  {activeStep.title}
                </h4>
                
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6">
                  {activeStep.description}
                </p>

                <div className="space-y-2 mb-8">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
                    Verified Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeStep.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={activeStep.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-gold-light text-[#111622] text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-lg cursor-target"
                >
                  <span>{activeStep.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right Side Visual Cue */}
              <div className="lg:col-span-5 flex flex-col justify-center bg-white/[0.02] border border-white/5 rounded-xl p-6 text-center">
                <div className="text-6xl md:text-7xl font-editorial font-bold text-white/10 mb-2 select-none">
                  {activeStep.number}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold mb-2">
                  Standard Operating Procedure
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Every step is documented in your client dashboard with milestones, structural sign-offs, and high-resolution photo logs.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
