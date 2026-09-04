"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sofa, 
  Lightbulb, 
  Paintbrush, 
  Scissors, 
  Layout, 
  CheckCircle2, 
  ChevronDown, 
  Droplets,
  Wind,
  Sun,
  Crown,
  Box,
  Palette,
  Hammer
} from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Moodboarding & Theme Selection",
    desc: "We begin by understanding your personal taste. Do you prefer Minimalist, Bohemian, Industrial, or Neo-Classical? We create moodboards to lock in the aesthetic.",
    icon: <Palette size={32} />
  },
  {
    step: "02",
    title: "Spatial Planning & Zoning",
    desc: "Optimizing the flow of the room. We map out exactly where the furniture, lighting fixtures, and decor will sit to maximize both space and utility.",
    icon: <Layout size={32} />
  },
  {
    step: "03",
    title: "3D Interior Rendering",
    desc: "Before buying a single piece of furniture, you will see exactly what your room will look like through our hyper-realistic 3D walkthroughs.",
    icon: <Box size={32} />
  },
  {
    step: "04",
    title: "Material & Fabric Selection",
    desc: "We help you select premium upholstery, curtains, wallpapers, and floorings. Touch and feel the samples before they go onto your walls.",
    icon: <Scissors size={32} />
  },
  {
    step: "05",
    title: "Custom Furniture Fabrication",
    desc: "Our in-house carpenters craft bespoke furniture that fits your space perfectly. No compromises on size, color, or ergonomics.",
    icon: <Hammer size={32} />
  },
  {
    step: "06",
    title: "Styling & Final Reveal",
    desc: "The magic touch. We bring in the artifacts, rugs, plants, and lighting to style the space. You walk into a fully finished, magazine-ready home.",
    icon: <Crown size={32} />
  }
];

const FEATURES = [
  {
    title: "Bespoke Furniture",
    desc: "We don't rely solely on ready-made catalogs. We design and manufacture custom furniture tailored specifically to the dimensions of your room.",
    icon: <Sofa className="text-brand-yellow" size={24} />
  },
  {
    title: "Smart Lighting Design",
    desc: "Lighting changes everything. We layer ambient, task, and accent lighting to create different moods for different times of the day.",
    icon: <Lightbulb className="text-brand-yellow" size={24} />
  },
  {
    title: "Color Psychology",
    desc: "We utilize color theory to evoke specific emotions. Calming blues for bedrooms, energetic yellows for kitchens, and sophisticated neutrals for living areas.",
    icon: <Paintbrush className="text-brand-yellow" size={24} />
  },
  {
    title: "Acoustic Treatment",
    desc: "For home theaters and studios, we integrate acoustic paneling to ensure perfect sound absorption without ruining the room's aesthetic.",
    icon: <Wind className="text-brand-yellow" size={24} />
  },
  {
    title: "Premium Textures",
    desc: "From Venetian plaster and fluted wooden panels to metallic accents, we add layers of texture to make the space feel rich and multidimensional.",
    icon: <Droplets className="text-brand-yellow" size={24} />
  },
  {
    title: "Natural Light Optimization",
    desc: "We manipulate mirrors, sheer curtains, and reflective surfaces to bounce natural sunlight deep into the darkest corners of your home.",
    icon: <Sun className="text-brand-yellow" size={24} />
  }
];

const PRICING_TIERS = [
  {
    name: "Essential Decor",
    price: "₹800",
    unit: "per sq.ft",
    desc: "Perfect for quick makeovers. Focuses on painting, basic lighting, and readymade furniture sourcing.",
    features: [
      "2D Furniture Layout",
      "Color Consultation",
      "Basic False Ceiling",
      "Standard Lighting Setup",
      "Furniture Sourcing Assistance"
    ],
    recommended: false
  },
  {
    name: "Complete Makeover",
    price: "₹1,500",
    unit: "per sq.ft",
    desc: "Our most popular interior package. Complete transformation with custom modular woodwork.",
    features: [
      "Everything in Essential",
      "3D Renderings (All Rooms)",
      "Custom Modular Kitchen",
      "Bespoke Wardrobes",
      "Premium False Ceiling Design"
    ],
    recommended: true
  },
  {
    name: "Ultra Luxury",
    price: "₹3,000+",
    unit: "per sq.ft",
    desc: "For those who want magazine-cover aesthetics with imported materials and home automation.",
    features: [
      "Everything in Complete",
      "Imported Italian Furniture",
      "Smart Home Integration",
      "Acoustic Home Theater Setup",
      "Custom Art & Artifact Sourcing",
      "Dedicated Interior Stylist"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "Do you only do complete homes or can you design a single room?",
    a: "While we specialize in complete home interiors, we do take up single-room projects (like a kitchen remodel or home theater setup) depending on the scope of work."
  },
  {
    q: "Do you manufacture the furniture yourselves?",
    a: "Yes! We have our own manufacturing unit where our skilled carpenters and craftsmen build bespoke furniture, wardrobes, and modular kitchens to ensure perfect finishing."
  },
  {
    q: "Can I keep my old furniture?",
    a: "Absolutely. We are experts at upcycling. We can refurbish, polish, or reupholster your existing vintage or sentimental furniture to blend seamlessly into the new design."
  },
  {
    q: "How long does the interior execution take?",
    a: "For a standard 3BHK apartment, it typically takes 45 to 60 days from the moment the 3D designs are finalized and approved."
  },
  {
    q: "Do you handle civil changes inside the apartment?",
    a: "Yes. If a wall needs to be knocked down to expand the living room, or if bathrooms need complete re-tiling and new plumbing, our civil team handles it."
  },
  {
    q: "What is your warranty policy on interiors?",
    a: "We offer a 5-year warranty on all custom woodwork (wardrobes, kitchens) against manufacturing defects, and standard brand warranties on hardware (like Hettich or Hafele hinges)."
  },
  {
    q: "How do you charge for interior projects?",
    a: "We charge either on a per-square-foot basis or as a percentage of the total project cost, depending on the scale and complexity. The BOQ is shared transparently before execution."
  }
];

const GALLERY_IMAGES = [
  "/services/service_interior_1787300041689.jpg",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200"
];

// ==========================================
// COMPONENT
// ==========================================

export default function InteriorProjectPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/services/service_interior_1787300041689.jpg" 
            alt="Interior Projects" 
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
            Interior <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Design</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            Transforming bare walls into living art. We curate spaces that reflect your personality, utilizing premium materials and bespoke furniture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105 w-full sm:w-auto">
              Book a Stylist
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors w-full sm:w-auto">
              Explore Portfolio
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
                The Aesthetics
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Spaces that speak before you do.
              </h2>
              <div className="w-24 h-2 bg-brand-yellow mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
                Your home is your ultimate sanctuary. Our interior design philosophy is built around one simple rule: The space must serve the people in it. We balance jaw-dropping aesthetics with extreme functional comfort.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10">
                From the moment you turn the key, every texture, every light beam, and every piece of furniture has been meticulously planned to create an atmosphere of pure luxury and deep relaxation.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">150+</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Homes Styled</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">100%</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Bespoke Furniture</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" 
                  alt="Luxury Interior" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply"></div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-[250px] border border-gray-100 hidden md:block">
                <Crown className="text-brand-yellow w-12 h-12 mb-4" />
                <h4 className="text-brand-navy font-black text-xl mb-2">Premium Finish</h4>
                <p className="text-gray-500 text-sm font-medium">Only the finest imported materials and laminates used in our execution.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-navy text-sm font-bold tracking-widest uppercase mb-4">Interior Elements</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">The Magic is in the Details</h2>
            <p className="text-gray-600 text-lg font-medium">
              A beautifully designed room is a sum of hundreds of micro-decisions. We obsess over all of them.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">The Process</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">From Bare Shell to Beautiful</h2>
              <p className="text-gray-600 text-lg font-medium">
                Our interior design journey is collaborative, exciting, and completely stress-free for you.
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
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Interior Pricing</h4>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Styling Packages</h2>
            <p className="text-gray-400 text-lg font-medium">
              Choose a package that fits your budget. We bring luxury to every tier.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Inspiration</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Interior Gallery</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl group cursor-target ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[290px]'}`}>
                <Image 
                  src={img} 
                  alt={`Interior image ${index + 1}`} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-white text-brand-navy px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase">
                      View Design
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
          <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY TO DECORATE?</h4>
          <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
            Let&apos;s make your home beautiful.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
              Book a Designer
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
