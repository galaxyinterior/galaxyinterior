'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Target, 
  Rocket, 
  CheckCircle2, 
  Compass, 
  Layout, 
  Palette, 
  Zap, 
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  MapPin,
  Users,
  Quote,
  Clock,
  PhoneCall,
  Award,
  Layers
} from 'lucide-react';

const PHILOSOPHY_ITEMS = [
  {
    title: 'Functional Flow',
    subtitle: 'Human-Centered Planning',
    desc: 'Every layout begins with daily movement rituals, natural cross-ventilation, and Vastu orientation — ensuring beauty never compromises usability.',
    icon: Layout,
  },
  {
    title: 'Tactile Elegance',
    subtitle: 'Enduring Materiality',
    desc: 'We select authentic natural stone, fluted timbers, and architectural finishes that age gracefully under everyday living conditions.',
    icon: Palette,
  },
  {
    title: 'Bespoke Precision',
    subtitle: 'Zero Template Duplication',
    desc: 'Every family is unique. We never deploy off-the-shelf catalog templates — every millimetre is calibrated to your specific lifestyle.',
    icon: Compass,
  },
  {
    title: 'Engineered For Tomorrow',
    subtitle: 'Integrated Smart Infrastructure',
    desc: 'From concealed conduit routing and acoustic ceiling buffers to IoT smart-switching, our residences are built future-proof.',
    icon: Zap,
  }
];

const TIMELINE = [
  {
    year: '2021',
    title: 'The Foundation in Bihar',
    highlight: 'Bridging Design & Integrity',
    desc: 'Galaxy Interior was founded by Shivashish Ranjan with a singular conviction: homeowners in Eastern India deserve transparent contracts, itemised BOQs, and world-class architectural rigor without local contractor uncertainties.',
    location: 'Bhagalpur, Bihar'
  },
  {
    year: '2023',
    title: 'Central Design Studio & Production HQ',
    highlight: 'Industrializing Quality Control',
    desc: 'Established our flagship operational studio and production facility in Bhagalpur. Introduced in-house factory joinery to eliminate site-level carpentry dust and ensure precision German CNC cutting.',
    location: 'Zero Mile, Bhagalpur'
  },
  {
    year: '2024',
    title: 'Jharkhand Regional Hub in Ranchi',
    highlight: 'Multi-Story Villa & Turnkey Expansion',
    desc: 'Expanded capital operations to Ranchi. Scaled resident engineering teams to manage large-scale turnkey villa construction and luxury penthouse commissions across Ranchi, Deoghar, and Dumka.',
    location: 'Ranchi, Jharkhand'
  },
  {
    year: '2025',
    title: 'Kishanganj & North Bengal Corridor',
    highlight: 'Connecting Regional Centers',
    desc: 'Opened our Kishanganj studio, extending our residential construction and design management network across the eastern border corridors into North Bengal with dedicated local site supervisors.',
    location: 'Kishanganj Hub'
  },
  {
    year: '2026+',
    title: 'Patna Executive Studio & Kolkata Consultancy',
    highlight: 'Eastern India Benchmark',
    desc: 'Expanding executive residential practices into Patna and design consultancy in Kolkata — operating across 11 integrated regional hubs with a unified standard of architectural excellence.',
    location: 'Patna • Kolkata • Purnea'
  }
];

const EXECUTIVE_LEADERSHIP = [
  {
    name: 'Kumkum Ranjan',
    role: 'Chief Executive Officer',
    department: 'Operations & Delivery',
    bio: 'Directs multi-district execution standards, resource mobilization, and client satisfaction benchmarks across all 11 operational studios.',
    initials: 'KR',
  },
  {
    name: 'Ratan Kumar',
    role: 'General Manager',
    department: 'Site Engineering & Quality',
    bio: 'Oversees day-to-day civil construction compliance, vendor audits, and resident engineering protocols across all active building sites.',
    initials: 'RK',
  },
  {
    name: 'Anjula Devi',
    role: 'Managing Director',
    department: 'Governance & Partnerships',
    bio: 'Spearheads strategic governance, Tier-1 manufacturer relationships, and long-term studio expansion throughout Eastern India.',
    initials: 'AD',
  }
];

const STUDIO_METRICS = [
  { value: '5+', label: 'Years of Excellence', sub: 'Est. 2021' },
  { value: '120+', label: 'Completed Residences', sub: 'Villas & Penthouses' },
  { value: '11', label: 'Operational Hubs', sub: 'JH • BR • WB' },
  { value: '20+', label: 'In-House Specialists', sub: 'Architects & Engineers' },
];

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState('2021');

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#111622] pt-28 md:pt-36">
      
      {/* 1. HERO SECTION: CINEMATIC STUDIO NARRATIVE */}
      <section className="relative px-6 pb-20 md:pb-28 max-w-[1400px] mx-auto border-b border-[#eee7db]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.25em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>A Studio Dedicated to Residential Craftsmanship</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.08] mb-8">
            Architecture Built With Rigor. <br />
            <span className="italic font-editorial text-brand-charcoal">Spaces Crafted For Life.</span>
          </h1>

          <p className="text-gray-600 font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Galaxy Interior is an integrated residential architecture, turnkey construction, and luxury interior studio. Founded in 2021, we exist to deliver architectural certainty — transforming bare land and empty shells into enduring homes through transparent contracts, 3D photorealism, and daily site accountability.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#111622] hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-target"
            >
              <span>Begin Your Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-brand-gold" />
            </Link>
            <Link 
              href="/projects"
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-brand-charcoal border border-[#ded8cb] text-xs font-bold uppercase tracking-[0.18em] transition-all cursor-target flex items-center gap-2"
            >
              <span>View Delivered Works</span>
            </Link>
          </div>
        </div>

        {/* Studio Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
          {STUDIO_METRICS.map((stat) => (
            <div 
              key={stat.label}
              className="p-6 md:p-8 rounded-3xl bg-white border border-[#ded8cb] shadow-sm text-center"
            >
              <div className="text-3xl md:text-5xl font-editorial font-bold text-brand-charcoal mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-charcoal mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-gray-500 font-mono mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Feature: Blueprint to As-Built Reality */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-[#ded8cb] shadow-luxury">
          <Image
            src="/about.jpeg"
            alt="Galaxy Interior — From Architectural Blueprint to Luxury Handover"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold mb-2 block font-mono">
              From Wireframe To Handover
            </span>
            <p className="text-lg md:text-2xl font-editorial font-normal leading-snug">
              Every detail is engineered on CAD and simulated in 3D photorealism before a single mason enters your site.
            </p>
          </div>
        </div>
      </section>


      {/* 2. VISION & MISSION: CONTRACTUAL CERTAINTY */}
      <section className="py-24 md:py-32 bg-white border-b border-[#eee7db]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Target className="w-3.5 h-3.5 text-brand-gold" />
              <span>Studio Purpose</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-brand-charcoal">
              A Mission Rooted in Transparency
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Vision Card */}
            <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-14 border border-[#eee7db] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-charcoal mb-8">
                  <Target className="w-7 h-7 text-brand-gold" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 font-semibold">
                  Our Vision
                </span>
                <h3 className="text-2xl md:text-4xl font-editorial font-normal text-brand-charcoal mt-2 mb-6 leading-snug">
                  To be Eastern India&apos;s benchmark residential architecture studio.
                </h3>
                <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
                  We believe luxury is not merely decorative excess; it is absolute peace of mind during the construction journey. Our vision is to eliminate the stress, cost escalations, and broken timelines that traditionally plague private home building.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#eee7db] flex items-center gap-3 text-xs font-mono text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Operating across Jharkhand, Bihar, and West Bengal</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[#0c121e] text-white rounded-3xl p-8 md:p-14 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-8">
                  <Rocket className="w-7 h-7 text-brand-gold" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-brand-gold font-semibold">
                  Our Mission
                </span>
                <h3 className="text-2xl md:text-4xl font-editorial font-normal text-white mt-2 mb-6 leading-snug">
                  Delivering end-to-end homes with engineering integrity.
                </h3>

                <ul className="space-y-4">
                  {[
                    'Enforce legally binding BOQ contracts with zero post-signature cost escalation.',
                    'Produce millimetric 3D photorealistic visualization before civil works commence.',
                    'Deploy certified resident site engineers for daily execution audits.',
                    'Manufacture custom woodwork in-house to protect sites from carpentry dust.',
                    'Procure exclusively from certified Tier-1 manufacturers (CenturyPly, Havells, UltraTech).'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                      <span className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-3 text-xs font-mono text-brand-gold">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>100% Itemised BOQ &amp; 10-Year Timber Warranty</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. PHILOSOPHY: THE 4 CORE CONVICTIONS */}
      <section className="py-24 md:py-32 bg-[#faf8f5] border-b border-[#eee7db]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>Design Principles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Design Beyond <br />
              <span className="italic font-editorial text-brand-charcoal">Surface Decoration.</span>
            </h2>
            <p className="mt-4 text-gray-600 font-light text-base md:text-lg leading-relaxed">
              We reject cosmetic fixes. Every project is approached as an architectural ecosystem where engineering rigor, light, flow, and material durability unite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="bg-white rounded-3xl p-8 border border-[#ded8cb] shadow-sm hover:shadow-luxury-hover transition-all duration-300 flex flex-col group cursor-target"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-[#ded8cb] flex items-center justify-center text-brand-charcoal group-hover:bg-brand-gold group-hover:text-[#111622] group-hover:border-brand-gold transition-colors mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-gray-400 font-semibold mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-editorial font-bold text-brand-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 4. GROWTH JOURNEY: 2021 TO PRESENT */}
      <section className="py-24 md:py-36 bg-[#0c121e] text-white border-b border-white/10 relative overflow-hidden">
        
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-gold/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Our Growth Journey</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-white leading-[1.1]">
                From One Studio to <br />
                <span className="text-gold-gradient font-editorial italic">11 Regional Hubs.</span>
              </h2>
            </div>
            <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed max-w-md">
              A chronological testament to client trust. What started as a focused architectural practice in Bihar has expanded across Eastern India.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={item.year}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-brand-gold/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Year Column */}
                  <div className="lg:col-span-3 flex items-baseline gap-4">
                    <span className="text-4xl md:text-6xl font-editorial font-normal text-brand-gold">
                      {item.year}
                    </span>
                    <span className="text-xs uppercase font-mono tracking-wider text-gray-400 block lg:hidden">
                      {item.location}
                    </span>
                  </div>

                  {/* Narrative Column */}
                  <div className="lg:col-span-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-gold font-semibold block mb-1">
                      {item.highlight}
                    </span>
                    <h3 className="text-xl md:text-2xl font-editorial font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Location Tag */}
                  <div className="lg:col-span-3 hidden lg:flex justify-end">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-gray-300">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 5. FOUNDER & EXECUTIVE LEADERSHIP */}
      <section className="py-24 md:py-32 bg-white border-b border-[#eee7db]">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Users className="w-3.5 h-3.5 text-brand-gold" />
              <span>Studio Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              The People Behind The Spaces
            </h2>
            <p className="mt-3 text-gray-600 font-light text-base">
              Guided by experienced studio leadership and backed by 20+ full-time in-house specialists.
            </p>
          </div>

          {/* Full-Width Founder Feature */}
          <div className="bg-[#faf8f5] rounded-3xl border border-[#ded8cb] overflow-hidden shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Founder Image */}
              <div className="lg:col-span-5 relative h-[420px] lg:h-auto min-h-[460px] bg-[#f0ece3]">
                <Image
                  src="/ceo.png"
                  alt="Shivashish Ranjan — Founder & Chairman, Galaxy Interior"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              {/* Founder Narrative */}
              <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-brand-gold font-bold">
                    Founder &amp; Chairman
                  </span>
                  <span className="h-px flex-grow bg-gray-200" />
                  <span className="text-xs font-mono text-gray-500">Est. 2021</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-editorial font-normal text-brand-charcoal mb-6 leading-tight">
                  Shivashish Ranjan
                </h3>

                <div className="relative mb-8 bg-white p-6 rounded-2xl border border-[#ded8cb] shadow-sm">
                  <Quote className="w-8 h-8 text-brand-gold/30 absolute -top-3 -left-3" />
                  <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed italic pl-6">
                    &ldquo;Every family dreams of a home that truly reflects who they are. We exist to make that dream a documented, transparent, and joyful reality — not a stressful gamble with local contractors.&rdquo;
                  </p>
                </div>

                <p className="text-sm text-gray-600 font-light leading-relaxed mb-8">
                  Shivashish founded Galaxy Interior with a vision to professionalize residential architecture, construction, and bespoke interior execution across Eastern India. Under his leadership, the studio has grown to 11 operational hubs — maintaining strict zero-escalation contracts, daily resident engineer supervision, and authentic Tier-1 material procurement for more than 120 completed residential commissions.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-editorial font-bold text-brand-charcoal">120+</div>
                    <div className="text-[10px] uppercase font-mono text-gray-500">Homes Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-editorial font-bold text-brand-charcoal">11</div>
                    <div className="text-[10px] uppercase font-mono text-gray-500">Regional Hubs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-editorial font-bold text-brand-charcoal">10-Year</div>
                    <div className="text-[10px] uppercase font-mono text-gray-500">Timber Warranty</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Executive Leadership Trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {EXECUTIVE_LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="bg-[#faf8f5] rounded-3xl p-8 border border-[#ded8cb] shadow-sm hover:shadow-luxury-hover transition-all duration-300 flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#ded8cb] flex items-center justify-center text-brand-charcoal font-editorial text-2xl font-bold mb-6 shadow-sm">
                  {leader.initials}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold">
                  {leader.department}
                </span>
                <h4 className="text-2xl font-editorial font-bold text-brand-charcoal mt-1 mb-1">
                  {leader.name}
                </h4>
                <div className="text-xs uppercase font-medium tracking-wider text-gray-500 mb-4">
                  {leader.role}
                </div>
                <p className="text-xs text-gray-600 font-light leading-relaxed flex-grow">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>

          {/* In-House Disciplines Breakdown */}
          <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-10 border border-[#ded8cb]">
            <h4 className="text-lg font-editorial font-bold text-brand-charcoal mb-6 text-center">
              Our 20+ In-House Specialists Cover Every Discipline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              {[
                { title: 'Architectural Planning', desc: 'Vastu & Municipal Approvals' },
                { title: '3D Photorealism', desc: '3ds Max, V-Ray & Lumion' },
                { title: 'Civil Engineering', desc: 'RCC & Structural Calculations' },
                { title: 'Electrical & MEP', desc: 'Concealed Conduit & Smart IoT' },
                { title: 'Master Joinery', desc: 'Factory CNC & German Hardware' },
              ].map((spec) => (
                <div key={spec.title} className="p-4 rounded-2xl bg-white border border-[#eee7db]">
                  <div className="text-xs font-bold text-brand-charcoal">{spec.title}</div>
                  <div className="text-[10px] text-gray-500 font-light mt-0.5">{spec.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 6. OPERATIONAL HUBS: 11 VERIFIED LOCATIONS */}
      <section className="py-24 bg-[#faf8f5] border-b border-[#eee7db]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-brand-gold font-bold">
              Regional Accessibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-brand-charcoal mt-2">
              Where You Can Meet Our Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light mt-3">
              Headquartered at Zero Mile, Bhagalpur with regional operational studios across Jharkhand, Bihar, and West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#ded8cb]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">State Hub</span>
              <h3 className="text-xl font-editorial font-bold text-brand-charcoal mt-1 mb-2">Jharkhand</h3>
              <p className="text-xs text-gray-600 font-light mb-3">Ranchi (Experience Hub), Deoghar, Dumka, Godda, Hazaribagh</p>
              <div className="text-[11px] text-gray-500 font-mono">Resident Site Engineers On-Duty</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#ded8cb]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">Founding Hub &amp; HQ</span>
              <h3 className="text-xl font-editorial font-bold text-brand-charcoal mt-1 mb-2">Bihar</h3>
              <p className="text-xs text-gray-600 font-light mb-3">Bhagalpur (Central Studio &amp; Factory), Patna, Banka, Kishanganj, Purnea</p>
              <div className="text-[11px] text-gray-500 font-mono">Zero Mile HQ &amp; Executive Studio</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#ded8cb]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">Consultancy Hub</span>
              <h3 className="text-xl font-editorial font-bold text-brand-charcoal mt-1 mb-2">West Bengal</h3>
              <p className="text-xs text-gray-600 font-light mb-3">Kolkata (Design Consultancy &amp; Material Procurement Hub)</p>
              <div className="text-[11px] text-gray-500 font-mono">Metro Residential Architecture</div>
            </div>
          </div>
        </div>
      </section>


      {/* 7. FINAL CONVERSION CTA */}
      <section className="py-28 md:py-36 bg-[#080d17] text-white relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-gold/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Schedule A Studio Consultation</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-white leading-[1.08] mb-6">
            Ready To Build Your <br />
            <span className="text-gold-gradient font-editorial italic">Signature Residence?</span>
          </h2>

          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Speak directly with our architectural and engineering teams. We will review your plot dimensions, lifestyle requirements, and deliver a transparent feasibility assessment.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-brand-gold hover:bg-yellow-400 text-brand-charcoal font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-[0_10px_30px_rgba(241,184,33,0.25)] hover:scale-105 flex items-center justify-center gap-2 cursor-target"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+919631980881"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span>+91 96319 80881</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
