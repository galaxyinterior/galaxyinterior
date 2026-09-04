"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
  Clock,
  Shield,
  Award,
  Zap
} from 'lucide-react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "We begin with a deep dive into your vision, requirements, and budget constraints. This involves site visits and extensive discussions to align our architectural goals with your personal or commercial aspirations.",
    icon: <PenTool size={32} />
  },
  {
    step: "02",
    title: "Conceptualization & Zoning",
    desc: "Our architects draft preliminary sketches and zoning plans. We analyze the spatial requirements, natural lighting, ventilation, and structural feasibility to ensure maximum efficiency.",
    icon: <Layers size={32} />
  },
  {
    step: "03",
    title: "2D Drafting & Floor Plans",
    desc: "We deliver precise, millimeter-accurate 2D floor plans. These blueprints include wall placements, door/window schedules, and basic electrical/plumbing routing for structural clarity.",
    icon: <Ruler size={32} />
  },
  {
    step: "04",
    title: "3D Modeling & Visualization",
    desc: "Watch your space come alive before a single brick is laid. We create hyper-realistic 3D renders, allowing you to walk through the space virtually and make informed design changes.",
    icon: <Box size={32} />
  },
  {
    step: "05",
    title: "Material & Finishes Selection",
    desc: "We help you select the exact materials, textures, and color palettes. Our material board presentations give you a tactile feel of what the final output will resemble.",
    icon: <Palette size={32} />
  },
  {
    step: "06",
    title: "Final Handoff & Execution Support",
    desc: "You receive a comprehensive design dossier containing all drawings, BOQs, and material specs. Our team remains available for on-site consultation during the execution phase.",
    icon: <CheckCircle2 size={32} />
  }
];

const FEATURES = [
  {
    title: "Vastu Compliant Design",
    desc: "We integrate ancient Vastu Shastra principles seamlessly with modern architecture to ensure your home brings prosperity and positive energy without compromising aesthetics.",
    icon: <Shield className="text-brand-yellow" size={24} />
  },
  {
    title: "Eco-Friendly Architecture",
    desc: "Our designs prioritize natural lighting, cross-ventilation, and sustainable materials to reduce your carbon footprint and lower long-term energy costs.",
    icon: <Zap className="text-brand-yellow" size={24} />
  },
  {
    title: "Smart Space Optimization",
    desc: "We specialize in maximizing usable carpet area. Every inch of your plot is strategically designed to eliminate dead zones and enhance functionality.",
    icon: <Ruler className="text-brand-yellow" size={24} />
  },
  {
    title: "Precision Engineering",
    desc: "Our structural designs are vetted by senior engineers, ensuring the building is safe, load-bearing, and compliant with all local safety regulations.",
    icon: <Monitor className="text-brand-yellow" size={24} />
  },
  {
    title: "Transparent Itemized BOQ",
    desc: "No hidden costs. We provide a highly detailed Bill of Quantities so you know exactly where every single rupee is being spent.",
    icon: <CheckCircle2 className="text-brand-yellow" size={24} />
  },
  {
    title: "On-time Delivery",
    desc: "We respect your time. Our project management tools ensure that all design files and revisions are delivered strictly according to the agreed timeline.",
    icon: <Clock className="text-brand-yellow" size={24} />
  }
];

const PRICING_TIERS = [
  {
    name: "Basic 2D Plan",
    price: "₹15",
    unit: "per sq.ft",
    desc: "Perfect for quick spatial planning and securing necessary municipal approvals.",
    features: [
      "Custom 2D Floor Plan",
      "Basic Furniture Layout",
      "Vastu Consultation",
      "2 Revisions",
      "Column Positioning"
    ],
    recommended: false
  },
  {
    name: "Advanced 3D Package",
    price: "₹35",
    unit: "per sq.ft",
    desc: "Our most popular package. See your home in stunning 3D before it's built.",
    features: [
      "Everything in Basic",
      "3D Exterior Elevations",
      "Detailed Structural Drawings",
      "Plumbing & Electrical Layouts",
      "Unlimited Revisions (During Concept)"
    ],
    recommended: true
  },
  {
    name: "Premium VR Experience",
    price: "₹75",
    unit: "per sq.ft",
    desc: "The ultimate design experience with immersive virtual reality walkthroughs.",
    features: [
      "Everything in Advanced",
      "3D Interior Views (All Rooms)",
      "VR Walkthrough Video",
      "Material Selection Assistance",
      "Dedicated Project Manager",
      "On-site Supervision (4 Visits)"
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "How long does the initial design process take?",
    a: "Typically, the initial conceptualization and 2D drafting take about 7-10 working days depending on the complexity of the plot and your specific requirements. Revisions may add a few extra days."
  },
  {
    q: "Do you design according to Vastu?",
    a: "Absolutely. 95% of our projects incorporate strict Vastu principles. We balance ancient guidelines with modern architectural aesthetics to ensure you get the best of both worlds."
  },
  {
    q: "What software do you use for 3D modeling?",
    a: "We utilize industry-leading software including AutoCAD for 2D drafting, SketchUp and 3ds Max for 3D modeling, and V-Ray/Lumion for hyper-realistic rendering."
  },
  {
    q: "Can I upgrade my package later?",
    a: "Yes! Many clients start with our Basic 2D plan and upgrade to the Advanced 3D package once they are satisfied with the spatial layout. The cost difference is simply adjusted."
  },
  {
    q: "Do you provide municipal approval drawings?",
    a: "Yes, we provide municipal sanction drawings that comply with local building bylaws (for Jharkhand and Bihar regions). We ensure all setbacks and FAR regulations are met."
  },
  {
    q: "Is the BOQ completely accurate?",
    a: "Our BOQs (Bill of Quantities) are highly detailed and accurate up to 90-95%. However, market fluctuations in raw material prices (like steel and cement) can cause slight variations at the time of actual execution."
  },
  {
    q: "Do you visit the site before designing?",
    a: "Yes, a site visit is mandatory for our Advanced and Premium packages. We assess soil quality, natural light direction, surrounding structures, and road access before drawing the first line."
  },
  {
    q: "What if I don't like the first draft?",
    a: "Design is a collaborative process. We provide revisions (the number depends on your package) and work closely with you to refine the concept until it perfectly matches your vision."
  }
];

const GALLERY_IMAGES = [
  "/services/service_design_1787300013035.jpg",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1541888081297-c819dc788916?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
];

// ==========================================
// COMPONENT
// ==========================================

export default function DesignFacilitiesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/services/service_design_1787300013035.jpg" 
            alt="Design Facilities" 
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
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Facilities</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            Bridging the gap between imagination and reality. We deliver millimeter-accurate blueprints and hyper-realistic 3D visualizations for your dream space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105 w-full sm:w-auto">
              Book Consultation
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors w-full sm:w-auto">
              View Floor Plans
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
        {/* Background abstract elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full border-[1px] border-white/5"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full border-[1px] border-white/5"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4 flex items-center">
                <span className="w-12 h-px bg-brand-yellow mr-4"></span>
                The Philosophy
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Great architecture begins long before the first brick is laid.
              </h2>
              <div className="w-24 h-2 bg-brand-yellow mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
                At Galaxy Interior, we believe that design is not just about how a space looks, but how it functions and feels. Our architectural design facilities are rooted in a deep understanding of human psychology, spatial geometry, and environmental sustainability.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10">
                Whether you are building a cozy 2BHK residence in Ranchi or a massive commercial complex in Patna, our team of seasoned architects approaches every project with the same level of obsessive precision. We do not just draw lines; we engineer lifestyles.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">99%</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Precision Rate</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-brand-yellow mb-2">500+</div>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">Plans Drafted</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Architectural Planning" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-[250px] border border-gray-100 hidden md:block">
                <Award className="text-brand-yellow w-12 h-12 mb-4" />
                <h4 className="text-brand-navy font-black text-xl mb-2">Award Winning</h4>
                <p className="text-gray-500 text-sm font-medium">Recognized for excellence in spatial planning and sustainable architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-navy text-sm font-bold tracking-widest uppercase mb-4">Why Choose Us</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">The Galaxy Advantage</h2>
            <p className="text-gray-600 text-lg font-medium">
              We leverage cutting-edge technology and decades of collective experience to deliver designs that are visually stunning and technically flawless.
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
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Our Methodology</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">How We Work</h2>
              <p className="text-gray-600 text-lg font-medium">
                A systematic, transparent, and highly collaborative process that keeps you in the loop at every stage of the design journey.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2"></div>
            
            <div className="space-y-12 lg:space-y-0 relative">
              {PROCESS_STEPS.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`flex flex-col lg:flex-row items-center w-full ${isEven ? 'lg:flex-row-reverse' : ''} mb-12 lg:mb-24 relative`}>
                    
                    {/* Content Half */}
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

                    {/* Center Icon */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-navy rounded-full items-center justify-center border-8 border-white shadow-lg z-20 text-brand-yellow">
                      {step.icon}
                    </div>
                    
                    {/* Empty Space for Desktop layout balance */}
                    <div className="hidden lg:block w-1/2"></div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY STACK */}
      <section className="py-24 bg-brand-navy text-white text-center border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6">
           <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Technology Stack</h4>
           <h2 className="text-3xl md:text-5xl font-black mb-16">Powered by Industry Standards</h2>
           
           <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
              {/* Mocking tech logos with text for now, can be replaced with actual SVGs */}
              <div className="text-3xl font-black tracking-tighter">AutoCAD</div>
              <div className="text-3xl font-black tracking-tighter">SketchUp</div>
              <div className="text-3xl font-black tracking-tighter">3ds Max</div>
              <div className="text-3xl font-black tracking-tighter">Lumion</div>
              <div className="text-3xl font-black tracking-tighter">V-Ray</div>
           </div>
        </div>
      </section>

      {/* 6. PRICING & PACKAGES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Transparent Pricing</h4>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Design Packages</h2>
            <p className="text-gray-600 text-lg font-medium">
              Flexible design packages tailored to your specific needs and budget. No hidden costs, ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-3xl p-10 border-2 transition-all cursor-target flex flex-col ${
                  tier.recommended 
                    ? 'border-brand-yellow shadow-2xl transform lg:-translate-y-4' 
                    : 'border-gray-100 shadow-lg hover:border-gray-300'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-brand-navy px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-black text-brand-navy mb-2">{tier.name}</h3>
                <p className="text-gray-500 font-medium mb-8 h-12">{tier.desc}</p>
                
                <div className="mb-8 flex items-baseline">
                  <span className="text-5xl font-black text-brand-navy">{tier.price}</span>
                  <span className="text-gray-500 ml-2 font-medium">/{tier.unit}</span>
                </div>
                
                <div className="w-full h-px bg-gray-100 mb-8"></div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="text-brand-yellow mr-3 shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-600 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-colors ${
                  tier.recommended 
                    ? 'bg-brand-navy hover:bg-[#162442] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-brand-navy'
                }`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Portfolio</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Design Gallery</h2>
            </div>
            <button className="hidden md:flex items-center text-brand-navy font-bold tracking-widest uppercase text-sm hover:text-brand-yellow transition-colors cursor-target">
              View Full Portfolio <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <div key={index} className={`relative overflow-hidden rounded-xl group cursor-target ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[290px]'}`}>
                <Image 
                  src={img} 
                  alt={`Design image ${index + 1}`} 
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

      {/* 8. FAQS */}
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

      {/* 9. CTA */}
      <section className="py-32 bg-brand-yellow relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
           <div className="w-[800px] h-[800px] border-[100px] border-brand-navy rounded-full absolute"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY TO DESIGN?</h4>
          <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
            Let&apos;s sketch your future together.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
              Consult an Architect
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
