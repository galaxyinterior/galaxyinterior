"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  KeyRound, 
  MapPin, 
  CalendarCheck, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  ClipboardList,
  Wallet,
  TrendingUp,
  BadgeCheck
} from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Budgeting",
    desc: "We analyze your entire requirements—from architectural design to the final interior finish—and establish a comprehensive, non-escalating budget.",
    icon: <Wallet size={32} />
  },
  {
    step: "02",
    title: "Master Planning",
    desc: "Our architects, interior designers, and structural engineers collaborate to create a unified master plan, ensuring zero design clashes.",
    icon: <ClipboardList size={32} />
  },
  {
    step: "03",
    title: "Permits & Approvals",
    desc: "We take the legal headaches away. Our liaison team handles all municipal approvals, fire safety NOCs, and utility connections on your behalf.",
    icon: <ShieldCheck size={32} />
  },
  {
    step: "04",
    title: "Core Construction",
    desc: "Groundbreaking to superstructure. Our civil team builds the core shell utilizing premium materials and strictly adhering to the approved timeline.",
    icon: <TrendingUp size={32} />
  },
  {
    step: "05",
    title: "Interior Execution",
    desc: "As soon as the civil work completes, our interior team takes over. False ceilings, bespoke woodwork, and premium flooring are seamlessly integrated.",
    icon: <Users size={32} />
  },
  {
    step: "06",
    title: "Handover (Just turn the key)",
    desc: "We do a final deep clean, test all electricals and plumbing, stage the furniture, and hand you the keys to a house that is fully ready to live in.",
    icon: <KeyRound size={32} />
  }
];

const FEATURES = [
  {
    title: "Single Point of Contact",
    desc: "No more dealing with 10 different contractors. You get one dedicated Project Manager who handles architects, masons, carpenters, and electricians.",
    icon: <Users className="text-brand-yellow" size={24} />
  },
  {
    title: "Guaranteed Timeline",
    desc: "Because all teams (civil, interior, MEP) work under one roof, there is zero friction or waiting time between phases. We deliver on time.",
    icon: <CalendarCheck className="text-brand-yellow" size={24} />
  },
  {
    title: "Zero Cost Escalation",
    desc: "Our Turnkey contracts lock in the material prices. You are shielded from market fluctuations in steel, cement, or wood prices during the project.",
    icon: <Wallet className="text-brand-yellow" size={24} />
  },
  {
    title: "End-to-End Warranty",
    desc: "If a pipe leaks or a hinge breaks, you don't have to figure out who is at fault. Our comprehensive Turnkey warranty covers everything.",
    icon: <ShieldCheck className="text-brand-yellow" size={24} />
  },
  {
    title: "Quality Control",
    desc: "We use a 100-point checklist at every major phase. The interior team audits the civil team's work, ensuring absolute perfection before proceeding.",
    icon: <ClipboardList className="text-brand-yellow" size={24} />
  },
  {
    title: "Peace of Mind",
    desc: "You can live in another city or country. We provide weekly video updates and a live dashboard tracking every inch of progress.",
    icon: <MapPin className="text-brand-yellow" size={24} />
  }
];

const PRICING_TIERS = [
  {
    name: "Classic Turnkey",
    price: "₹2,500",
    unit: "per sq.ft",
    desc: "Complete A-to-Z construction and basic interiors. Perfect for rental investments or minimalist living.",
    features: [
      "Architectural & Structural Design",
      "Standard Civil Construction",
      "Modular Kitchen & Wardrobes",
      "Basic Electrical & Plumbing",
      "Standard Painting & Flooring"
    ],
    recommended: false
  },
  {
    name: "Premium Turnkey",
    price: "₹3,800",
    unit: "per sq.ft",
    desc: "Our flagship package. High-end construction paired with luxurious, bespoke interior design.",
    features: [
      "Everything in Classic",
      "3D Interior Walkthroughs",
      "Premium Italian Marble",
      "Custom Bespoke Furniture",
      "Advanced False Ceilings & Lighting"
    ],
    recommended: true
  },
  {
    name: "Signature Villa",
    price: "₹5,500+",
    unit: "per sq.ft",
    desc: "Unbridled luxury. From the foundation to the imported chandeliers, everything is world-class.",
    features: [
      "Everything in Premium",
      "Full Home Automation (IoT)",
      "Imported Materials & Artifacts",
      "Landscaping & Pool Construction",
      "Centralized VRV Air Conditioning",
      "White-glove Moving Assistance"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "What exactly does 'Turnkey' mean?",
    a: "Turnkey means we handle everything from the empty plot to the final coat of paint and furniture arrangement. You literally just 'turn the key' and start living."
  },
  {
    q: "Is a Turnkey project more expensive than hiring separate contractors?",
    a: "No, it is actually more cost-effective. Since we handle both civil and interiors, we optimize material sourcing and eliminate the 15-20% wastage that occurs when separate contractors clash."
  },
  {
    q: "How do you ensure transparency in materials used?",
    a: "We attach a detailed Material Specification Annexure to the contract. It lists the exact brand, grade, and model of every material (e.g., Tata Tiscon Fe550D steel, Asian Paints Royale, etc.)."
  },
  {
    q: "What if I want to change a design mid-way?",
    a: "Minor aesthetic changes can be accommodated easily. However, structural changes post-foundation or major interior changes post-fabrication will incur additional costs and timeline extensions."
  },
  {
    q: "Can I monitor the progress if I don't live in the same city?",
    a: "Absolutely. Many of our Turnkey clients are NRIs or live in different states. We provide a dedicated WhatsApp group, weekly drone/video footage, and a project management dashboard."
  },
  {
    q: "Do I need to deal with municipal authorities?",
    a: "No. Our liaison officers will submit the plans, handle the paperwork, and secure all necessary building permits and electrical/water connections."
  },
  {
    q: "What is the payment schedule?",
    a: "Payments are strictly milestone-based. You pay 10% for design, 15% at plinth level, 15% per slab, and so on. You only pay for the work that has been completed."
  }
];

const GALLERY_IMAGES = [
  "/services/service_turnkey_1787300070398.jpg",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600566753086-00f18efc2294?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200"
];

// ==========================================
// COMPONENT
// ==========================================

export default function TurnkeyProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/services/service_turnkey_1787300070398.jpg" 
            alt="Turnkey Projects" 
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
            Turnkey <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Solutions</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            From an empty plot of land to a fully furnished luxury home. We handle every single detail so you don&apos;t have to.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105 w-full sm:w-auto">
              Start Your Journey
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors w-full sm:w-auto">
              How It Works
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
                The Turnkey Promise
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Absolute peace of mind.
              </h2>
              <div className="w-24 h-2 bg-brand-yellow mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
                Building a house is notoriously stressful. Dealing with architects, chasing masons, arguing with carpenters, and managing budgets can quickly turn a dream into a nightmare.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10">
                Our Turnkey solution eliminates all of that. We take complete ownership of the project from day one. You sign the contract, choose your designs, and then sit back. We hand you the keys when it&apos;s completely ready.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">0</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Contractor Disputes</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">100%</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Hassle Free</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Turnkey Home" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply"></div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-[250px] border border-gray-100 hidden md:block">
                <BadgeCheck className="text-brand-yellow w-12 h-12 mb-4" />
                <h4 className="text-brand-navy font-black text-xl mb-2">Single Contract</h4>
                <p className="text-gray-500 text-sm font-medium">One company accountable for design, construction, and interiors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-navy text-sm font-bold tracking-widest uppercase mb-4">Why Turnkey?</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">The Smart Way to Build</h2>
            <p className="text-gray-600 text-lg font-medium">
              Discover why 80% of our clients choose our end-to-end Turnkey solutions over traditional contracts.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">The Master Plan</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">End-to-End Execution</h2>
              <p className="text-gray-600 text-lg font-medium">
                A seamless transition from architectural planning, to civil construction, and finally to interior styling.
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
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">All-Inclusive Pricing</h4>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Turnkey Packages</h2>
            <p className="text-gray-400 text-lg font-medium">
              Combine construction and interior styling into one streamlined, cost-effective package.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Complete Projects</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Turnkey Portfolio</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl group cursor-target ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[290px]'}`}>
                <Image 
                  src={img} 
                  alt={`Turnkey image ${index + 1}`} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-white text-brand-navy px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase">
                      View Project
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
          <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY TO RELAX?</h4>
          <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
            Let us build it. You just move in.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
              Book Turnkey Consultation
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
