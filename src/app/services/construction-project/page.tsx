"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  HardHat, 
  Hammer, 
  Truck, 
  Building2, 
  CheckCircle2, 
  ChevronDown, 
  ShieldAlert,
  Clock,
  Briefcase,
  FileText,
  Zap,
  Box
} from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Preparation & Excavation",
    desc: "We begin with deep soil testing and site clearing. Precision excavation ensures the foundation is laid exactly according to the structural engineer's blueprints.",
    icon: <Truck size={32} />
  },
  {
    step: "02",
    title: "Foundation & Footing",
    desc: "The most critical phase. We use high-grade TMT bars and premium cement to lay a foundation that can withstand seismic activities and environmental stress.",
    icon: <Building2 size={32} />
  },
  {
    step: "03",
    title: "Superstructure Framing",
    desc: "Erecting the skeleton of your building. Our skilled masons and ironworkers build out the columns, beams, and slabs with absolute structural integrity.",
    icon: <Hammer size={32} />
  },
  {
    step: "04",
    title: "Brickwork & Plastering",
    desc: "Walls are constructed using top-tier red bricks or AAC blocks for superior thermal insulation. This is followed by perfectly leveled interior and exterior plastering.",
    icon: <Box size={32} />
  },
  {
    step: "05",
    title: "MEP Rough-in",
    desc: "Mechanical, Electrical, and Plumbing lines are laid out. We use fire-retardant cables and high-pressure UPVC/CPVC pipes to ensure zero future leakages or faults.",
    icon: <Zap size={32} />
  },
  {
    step: "06",
    title: "Finishing & Handover",
    desc: "From flooring and painting to final fixture installations, we obsess over the finishing touches. A massive quality check precedes the final handover of the keys.",
    icon: <CheckCircle2 size={32} />
  }
];

const FEATURES = [
  {
    title: "Seismic Resistant Structures",
    desc: "All our buildings are structurally engineered to resist earthquakes, keeping you and your family safe against unpredictable natural events.",
    icon: <ShieldAlert className="text-brand-yellow" size={24} />
  },
  {
    title: "Premium Raw Materials",
    desc: "We never cut corners. We partner strictly with brands like Tata Tiscon, Ultratech, and Asian Paints to ensure longevity.",
    icon: <Building2 className="text-brand-yellow" size={24} />
  },
  {
    title: "Zero Hidden Costs",
    desc: "Our itemized BOQ (Bill of Quantities) details every grain of sand. The price we agree on is the price you pay. No nasty surprises.",
    icon: <FileText className="text-brand-yellow" size={24} />
  },
  {
    title: "On-site Supervision",
    desc: "Every project is assigned a dedicated Site Engineer who monitors daily progress and enforces strict quality control parameters.",
    icon: <HardHat className="text-brand-yellow" size={24} />
  },
  {
    title: "Strict Timeline Adherence",
    desc: "Time overruns cost money. Our robust supply chain and labor management guarantee that your project is completed within the promised timeframe.",
    icon: <Clock className="text-brand-yellow" size={24} />
  },
  {
    title: "Labor Compliance",
    desc: "We ensure safe working conditions and strictly adhere to all labor laws. A happy, secure workforce translates to a better built home.",
    icon: <Briefcase className="text-brand-yellow" size={24} />
  }
];

const PRICING_TIERS = [
  {
    name: "Standard Build",
    price: "₹1,800",
    unit: "per sq.ft",
    desc: "Ideal for robust, durable family homes with high-quality standard finishes.",
    features: [
      "Ultratech / ACC Cement",
      "Tata / Jindal Steel (Fe 500)",
      "Standard Vitrified Tiles",
      "Branded CP Fittings (Jaquar)",
      "Asian Paints Tractor Emulsion"
    ],
    recommended: false
  },
  {
    name: "Premium Build",
    price: "₹2,200",
    unit: "per sq.ft",
    desc: "Our most popular choice. Upgraded finishes and superior aesthetics.",
    features: [
      "Everything in Standard",
      "Premium Italian Marble Flooring",
      "Kohler / Grohe CP Fittings",
      "Teak Wood Main Door",
      "Asian Paints Royale Play"
    ],
    recommended: true
  },
  {
    name: "Luxury Estate",
    price: "₹3,500+",
    unit: "per sq.ft",
    desc: "Uncompromising luxury. Smart home integration and imported materials.",
    features: [
      "Everything in Premium",
      "Full Smart Home Automation",
      "Imported Onyx Marble",
      "Centralized HVAC System",
      "Custom Landscaping & Pool",
      "Concierge Management"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "Do you construct both residential and commercial buildings?",
    a: "Yes, we have deep expertise in constructing both luxury private residences and large-scale commercial complexes. The core engineering principles remain the same, scaled appropriately."
  },
  {
    q: "How do you handle soil testing?",
    a: "Before laying the foundation, we mandate a geo-technical soil test to determine the bearing capacity of the soil. This dictates the depth and type of footing required."
  },
  {
    q: "Can I supply my own materials?",
    a: "We highly recommend our Turnkey model where we handle material procurement to ensure quality and warranty validity. However, we are open to labor-only contracts in specific scenarios."
  },
  {
    q: "What happens if material prices increase during construction?",
    a: "Our contracts have clear clauses regarding market escalation. Minor fluctuations are absorbed by us, but significant market crashes/hikes in primary materials like steel and cement are discussed transparently."
  },
  {
    q: "How often can I visit the site?",
    a: "It's your home! You are welcome to visit anytime. However, for safety reasons, we recommend visiting during designated hours when the Site Engineer can safely walk you through the progress."
  },
  {
    q: "Do you provide a warranty on construction?",
    a: "Absolutely. We provide a structural warranty against major cracks or foundational settling, along with standard warranties on plumbing and electrical work (typically 1-5 years depending on the tier)."
  },
  {
    q: "How long does a typical 2-story house take to build?",
    a: "A standard 2-story, 3000 sq.ft home takes approximately 8 to 12 months from excavation to handover, assuming no extreme weather delays or supply chain disruptions."
  },
  {
    q: "Who handles the municipal permits?",
    a: "We do. Our liaison officers work closely with local municipal bodies in Jharkhand and Bihar to ensure all building permits and NOCs are legally secured before construction begins."
  }
];

const GALLERY_IMAGES = [
  "/services/service_construction_1787300029220.jpg",
  "https://images.unsplash.com/photo-1541888081297-c819dc788916?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
];

// ==========================================
// COMPONENT
// ==========================================

export default function ConstructionProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/services/service_construction_1787300029220.jpg" 
            alt="Construction Projects" 
            fill
            priority
            className="object-cover animate-ken-burns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-16">
          <div className="inline-block px-6 py-2 border border-brand-yellow/50 rounded-full mb-6 backdrop-blur-sm bg-black/20">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Service Overview</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
            Construction <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Execution</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            Built on a foundation of trust and steel. We execute complex structural engineering with uncompromising quality and safety standards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105 w-full sm:w-auto">
              Get an Estimate
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors w-full sm:w-auto">
              View Our Builds
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white/50 text-xs tracking-widest uppercase font-bold mb-2">Scroll</span>
          <ChevronDown className="text-brand-yellow" />
        </div>
      </section>

      {/* 2. EXECUTIVE OVERVIEW */}
      <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full border-[1px] border-white/5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4 flex items-center">
                <span className="w-12 h-px bg-brand-yellow mr-4"></span>
                The Execution
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Concrete results. <br/>Zero compromises.
              </h2>
              <div className="w-24 h-2 bg-brand-yellow mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
                Construction is chaotic, but our management is clinical. We bring order to the site through rigorous planning, daily progress tracking, and strict adherence to structural engineering codes.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10">
                From securing local permits to pouring the last slab of concrete, we manage the entire lifecycle of the build. We source materials directly from top-tier manufacturers, ensuring that your building stands tall for generations.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">2M+</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Sq.Ft Built</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">0</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Structural Failures</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1541888086925-0c773228965c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Construction Site" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply"></div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-[250px] border border-gray-100 hidden md:block">
                <ShieldAlert className="text-brand-yellow w-12 h-12 mb-4" />
                <h4 className="text-brand-navy font-black text-xl mb-2">Safety First</h4>
                <p className="text-gray-500 text-sm font-medium">100% compliant with OHSA standards for construction site safety.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-navy text-sm font-bold tracking-widest uppercase mb-4">Engineering Excellence</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Why We Stand Out</h2>
            <p className="text-gray-600 text-lg font-medium">
              We don&apos;t just stack bricks. We engineer structures that defy time, weather, and wear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow group cursor-target">
                <div className="w-16 h-16 bg-brand-navy rounded-xl flex items-center justify-center mb-8 group-hover:bg-brand-yellow transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-4">{feature.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY / PROCESS TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Construction Process</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Built Step-by-Step</h2>
              <p className="text-gray-600 text-lg font-medium">
                Our rigid step-by-step framework guarantees that no detail is overlooked, from the first dig to the final sweep.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2"></div>
            
            <div className="space-y-12 lg:space-y-0 relative">
              {PROCESS_STEPS.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`flex flex-col lg:flex-row items-center w-full ${isEven ? 'lg:flex-row-reverse' : ''} mb-12 lg:mb-24 relative`}>
                    <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-16' : 'lg:pr-16 text-left lg:text-right'} relative z-10`}>
                      <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow cursor-target group">
                        <div className={`text-brand-yellow font-black text-6xl opacity-20 mb-[-2rem] select-none ${isEven ? 'text-left' : 'lg:text-right text-left'}`}>
                          {step.step}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-brand-navy mb-4 relative z-10 group-hover:text-brand-yellow transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-navy rounded-full items-center justify-center border-8 border-white shadow-lg z-20 text-brand-yellow">
                      {step.icon}
                    </div>
                    <div className="hidden lg:block w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & PACKAGES */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Construction Rates</h4>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Build Packages</h2>
            <p className="text-gray-400 text-lg font-medium">
              Transparent, square-foot-based pricing blocks that scale according to your material preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, index) => (
              <div 
                key={index} 
                className={`relative bg-[#101e38] rounded-3xl p-10 border transition-all cursor-target flex flex-col ${
                  tier.recommended 
                    ? 'border-brand-yellow shadow-[0_0_30px_rgba(241,184,33,0.15)] transform lg:-translate-y-4' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-brand-navy px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 font-medium mb-8 h-12">{tier.desc}</p>
                
                <div className="mb-8 flex items-baseline">
                  <span className="text-5xl font-black text-brand-yellow">{tier.price}</span>
                  <span className="text-gray-400 ml-2 font-medium">/{tier.unit}</span>
                </div>
                
                <div className="w-full h-px bg-white/10 mb-8"></div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="text-brand-yellow mr-3 shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-300 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-colors ${
                  tier.recommended 
                    ? 'bg-brand-yellow hover:bg-yellow-400 text-brand-navy' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Site Photos</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Build Gallery</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl group cursor-target ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[290px]'}`}>
                <Image 
                  src={img} 
                  alt={`Construction image ${index + 1}`} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-white text-brand-navy px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQS */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Got Questions?</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 cursor-target faq-item ${activeFaq === index ? 'border-brand-yellow shadow-md' : 'border-gray-200 hover:border-brand-yellow/50'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-bold text-brand-navy pr-8">{faq.q}</span>
                  <ChevronDown 
                    className={`text-brand-yellow shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                    size={24} 
                  />
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 font-medium leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-32 bg-brand-yellow relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
           <div className="w-[800px] h-[800px] border-[100px] border-brand-navy rounded-full absolute"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY TO BUILD?</h4>
          <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
            Let&apos;s lay the foundation of your dream.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
              Request Quotation
            </button>
            <button className="w-full sm:w-auto bg-transparent hover:bg-white/30 text-brand-navy border-2 border-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors cursor-target">
              Call +91 96319 80881
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
