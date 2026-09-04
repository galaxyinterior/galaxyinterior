"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Wrench, 
  PaintRoller, 
  Home, 
  Trash2, 
  RefreshCcw, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  HeartHandshake,
  Clock,
  ThumbsUp,
  Droplets
} from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Structural Assessment",
    desc: "Before swinging a sledgehammer, our engineers assess the load-bearing walls, existing plumbing, and electrical lines to determine what can safely be altered.",
    icon: <Home size={32} />
  },
  {
    step: "02",
    title: "Design & Remodeling Plan",
    desc: "We draft a new floor plan and 3D renders that merge your existing structure with modern aesthetics and improved spatial utility.",
    icon: <RefreshCcw size={32} />
  },
  {
    step: "03",
    title: "Safe Demolition & Disposal",
    desc: "We meticulously tear down walls, rip out old flooring, and safely dispose of all debris without damaging the integrity of the remaining structure.",
    icon: <Trash2 size={32} />
  },
  {
    step: "04",
    title: "Upgrading MEP Systems",
    desc: "Old houses have old pipes and wires. We completely rip out and replace outdated plumbing and electricals to meet modern safety and load standards.",
    icon: <Wrench size={32} />
  },
  {
    step: "05",
    title: "Rebuilding & Plastering",
    desc: "New walls go up, fresh plaster is applied, and the canvas is prepared. We focus heavily on waterproofing during this stage, especially for older homes.",
    icon: <PaintRoller size={32} />
  },
  {
    step: "06",
    title: "Finishes & Handover",
    desc: "The final layer of polish. Tiles, paint, lighting, and custom millwork are installed. The old house is now a brand-new home.",
    icon: <Sparkles size={32} />
  }
];

const FEATURES = [
  {
    title: "Zero Damage Guarantee",
    desc: "Our demolition is surgical. We ensure that shared walls (in apartments) or structural columns are never compromised during the teardown.",
    icon: <HeartHandshake className="text-brand-yellow" size={24} />
  },
  {
    title: "Modern Waterproofing",
    desc: "Old homes suffer from seepage. We use advanced chemical waterproofing (like Dr. Fixit PIDIFIN) to ensure your renovated walls stay dry forever.",
    icon: <Droplets className="text-brand-yellow" size={24} />
  },
  {
    title: "Preserving Heritage",
    desc: "If your home has vintage elements (like antique arches or Burma teak beams), we integrate them beautifully into the new modern design rather than destroying them.",
    icon: <Home className="text-brand-yellow" size={24} />
  },
  {
    title: "Fast-Track Execution",
    desc: "We know renovations disrupt your life. We deploy extra manpower and work on strict timelines to get you back into your home as fast as possible.",
    icon: <Clock className="text-brand-yellow" size={24} />
  },
  {
    title: "Smart Replanning",
    desc: "We don't just paint walls. We knock down unnecessary partitions to create open-plan living spaces that completely change the feel of a 20-year-old home.",
    icon: <RefreshCcw className="text-brand-yellow" size={24} />
  },
  {
    title: "Complete Cleanup",
    desc: "Post-renovation, we don't leave you with a dusty mess. We do a massive deep clean so you walk into a spotless, fresh-smelling home.",
    icon: <ThumbsUp className="text-brand-yellow" size={24} />
  }
];

const PRICING_TIERS = [
  {
    name: "Surface Refresh",
    price: "₹600",
    unit: "per sq.ft",
    desc: "A quick facelift. Perfect for properties that need to be rented out or sold quickly.",
    features: [
      "Complete Repainting",
      "Minor Woodwork Polish",
      "Basic Electrical Repair",
      "Deep Cleaning & Grout Fixing",
      "No Demolition Involved"
    ],
    recommended: false
  },
  {
    name: "Deep Remodel",
    price: "₹1,200",
    unit: "per sq.ft",
    desc: "Our most requested package. Modernizes older homes with new layouts and finishes.",
    features: [
      "Everything in Surface Refresh",
      "Bathroom & Kitchen Teardown",
      "New Plumbing & Electricals",
      "New Flooring & Tiles",
      "Custom Modular Kitchen"
    ],
    recommended: true
  },
  {
    name: "Structural Overhaul",
    price: "₹2,000+",
    unit: "per sq.ft",
    desc: "Tearing the house down to its bones and rebuilding it as a modern masterpiece.",
    features: [
      "Everything in Deep Remodel",
      "Wall Demolition & Layout Change",
      "Advanced Waterproofing",
      "New Premium Windows/Doors",
      "Smart Home Wiring & Setup",
      "Premium Interior Styling"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "Can I live in the house while you renovate?",
    a: "If it's a minor surface refresh, yes. However, for a deep remodel involving civil work, plumbing, and flooring, we strongly advise moving out temporarily due to dust, noise, and safety hazards."
  },
  {
    q: "How do you handle debris from the demolition?",
    a: "We bring our own trucks and labor to cart away all debris safely. We dispose of it in municipal-approved dumping grounds and never clutter your society premises."
  },
  {
    q: "My apartment is very old, is it safe to knock down walls?",
    a: "We never touch a wall until our structural engineer has evaluated the building's blueprints. We only remove non-load-bearing partition walls to open up the space."
  },
  {
    q: "Do you renovate bathrooms and kitchens only?",
    a: "Yes. Bathrooms and kitchens are the most common renovation requests. We offer specialized packages to rip out and rebuild these highly functional spaces in just 2-3 weeks."
  },
  {
    q: "What if there is existing water leakage from the upper floor?",
    a: "We address the root cause first. We coordinate with your neighbors or the society to fix the external leakage, apply robust internal waterproofing, and then proceed with the renovation."
  },
  {
    q: "Can you reuse my old doors and windows?",
    a: "Yes! If the wood is of good quality (like old Teak or Sal), we highly recommend refurbishing, polishing, and reusing them. It saves money and adds character."
  },
  {
    q: "How accurate is the renovation estimate?",
    a: "Renovations can sometimes reveal hidden issues (like rusted pipes behind walls). We provide a 90% accurate estimate, but we always advise clients to keep a 10% contingency budget for unforeseen structural surprises."
  }
];

const GALLERY_IMAGES = [
  "/services/service_renovation_1787300085173.jpg",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1599619351208-6e6a20028742?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200"
];

// ==========================================
// COMPONENT
// ==========================================

export default function RenovationProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/services/service_renovation_1787300085173.jpg" 
            alt="Renovation Projects" 
            fill
            priority
            className="object-cover animate-ken-burns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-16">
          <div className="inline-block px-6 py-2 border border-brand-yellow/50 rounded-full mb-6 backdrop-blur-sm bg-black/20">
            <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Service Overview</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
            Space <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Renovation</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            Breathing new life into old spaces. We strip down outdated structures and rebuild them into modern, functional, and stunning environments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105 w-full sm:w-auto">
              Get an Estimate
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors w-full sm:w-auto">
              View Before & Afters
            </button>
          </div>
        </div>

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
                The Transformation
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Out with the old. <br/>In with the bold.
              </h2>
              <div className="w-24 h-2 bg-brand-yellow mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
                Renovating an old space is often more complex than building a new one from scratch. You have to work within existing structural constraints, deal with decades-old plumbing, and navigate delicate demolitions.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10">
                Our renovation experts love this challenge. Whether it&apos;s a 30-year-old ancestral home that needs modernizing or a newly bought resale apartment that needs your personal touch, we strip it to the bones and resurrect it into something spectacular.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">300+</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Spaces Revamped</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">45</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Avg. Days to Handover</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
                  alt="Renovation Work" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply"></div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-[250px] border border-gray-100 hidden md:block">
                <RefreshCcw className="text-brand-yellow w-12 h-12 mb-4" />
                <h4 className="text-brand-navy font-black text-xl mb-2">Modern Upgrades</h4>
                <p className="text-gray-500 text-sm font-medium">We upgrade hidden MEP systems before focusing on aesthetics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-navy text-sm font-bold tracking-widest uppercase mb-4">The Renovation Edge</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Why Choose Us to Remodel?</h2>
            <p className="text-gray-600 text-lg font-medium">
              We handle the dust, the noise, and the heavy lifting, delivering a pristine new home to you in record time.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">How We Remodel</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Controlled Demolition to Final Polish</h2>
              <p className="text-gray-600 text-lg font-medium">
                Our surgical approach to renovation ensures absolute safety for the remaining structure and zero hassle for your neighbors.
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
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Renovation Pricing</h4>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Remodel Packages</h2>
            <p className="text-gray-400 text-lg font-medium">
              From minor touch-ups to massive teardowns, we have a package scaled for your project.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Before & Afters</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Renovation Gallery</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl group cursor-target ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[290px]'}`}>
                <Image 
                  src={img} 
                  alt={`Renovation image ${index + 1}`} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-white text-brand-navy px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase">
                      View Transformation
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
          <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY FOR A CHANGE?</h4>
          <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
            Let&apos;s rebuild it better.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
              Schedule Site Visit
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
