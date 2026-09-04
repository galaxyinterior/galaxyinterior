import React from 'react';
import { 
  Sparkles, 
  Target, 
  Rocket, 
  CheckCircle2, 
  Compass, 
  Layout, 
  Palette, 
  Zap, 
  TrendingUp 
} from 'lucide-react';
import Image from 'next/image';

const PHILOSOPHY_ITEMS = [
  {
    title: "Functional",
    desc: "Spaces that work perfectly for your daily life.",
    icon: <Layout className="text-brand-yellow" size={28} />
  },
  {
    title: "Aesthetic",
    desc: "Beautiful designs that inspire every day.",
    icon: <Palette className="text-brand-yellow" size={28} />
  },
  {
    title: "Personalized",
    desc: "Reflecting your unique vision and style.",
    icon: <Compass className="text-brand-yellow" size={28} />
  },
  {
    title: "Future-ready",
    desc: "Designs built with modern & smart technology.",
    icon: <Zap className="text-brand-yellow" size={28} />
  }
];

const TIMELINE = [
  {
    year: "2021",
    desc: "Galaxy Interior was founded with a simple yet powerful vision—to transform every space into a perfect blend of luxury, comfort, and unique identity. What started as a small initiative has grown into a journey driven by creativity, dedication, and trust."
  },
  {
    year: "2023",
    desc: "Established our first office in Bhagalpur, laying a strong foundation for our professional growth."
  },
  {
    year: "2024",
    desc: "Expanded to Ranchi, marking a significant step forward in building our brand presence."
  },
  {
    year: "2025",
    desc: "Continued our journey by opening a new office in Kishanganj, further strengthening our reach."
  },
  {
    year: "2026",
    desc: "Our goal is to expand into Purnia and Patna, taking Galaxy Interior to the next level as a trusted regional brand."
  }
];


export default function AboutPage() {
  return (
    <main className="bg-brand-navy min-h-screen text-white pt-40 pb-10">
      {/* 1. HERO / COMPANY OVERVIEW */}
      <section className="relative px-6 mb-32 max-w-[1400px] mx-auto text-center z-10">
        <div className="inline-flex items-center px-6 py-2 border border-brand-yellow/30 rounded-full mb-6 backdrop-blur-sm bg-brand-navy/50">
          <Sparkles className="text-brand-yellow w-4 h-4 mr-2" />
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Who We Are</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 drop-shadow-2xl text-white">
          Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Overview</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed mb-8">
          Galaxy Interior is a full-service interior design and construction company committed to delivering luxury, functionality, and innovation in every project. We specialize in transforming residential and commercial spaces into modern, elegant, and highly efficient environments using advanced design tools, smart planning techniques, and high-quality materials.
        </p>
        <p className="text-gray-400 text-lg font-medium max-w-4xl mx-auto leading-relaxed mb-12">
          Our approach is based on detail-oriented planning, transparent execution, and client-focused customization, ensuring every project reflects the client&apos;s vision while maintaining global design standards. We work in Jharkhand, Bihar, and Bengal, offering complete solutions from concept design to final handover.
        </p>
        <a href="https://galaxyinteriorindia.com/contact" target="_blank" rel="noreferrer" className="inline-block bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105 cursor-target">
          Start Your Project
        </a>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="py-24 bg-white text-brand-navy rounded-t-[3rem] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="bg-gray-50 rounded-3xl p-10 md:p-14 border border-gray-100 shadow-xl relative overflow-hidden group cursor-target">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
              <Target className="text-brand-yellow w-12 h-12 mb-8" />
              <h2 className="text-3xl md:text-4xl font-black mb-6">Our Vision</h2>
              <p className="text-gray-600 text-xl font-medium leading-relaxed">
                To become the No.1 Interior & Construction Brand in Eastern India, known for innovation, luxury design, and trust.
              </p>
            </div>
            
            {/* Mission */}
            <div className="bg-brand-navy text-white rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden group cursor-target">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
              <Rocket className="text-brand-yellow w-12 h-12 mb-8" />
              <h2 className="text-3xl md:text-4xl font-black mb-6">Our Mission</h2>
              <ul className="space-y-4">
                {[
                  "Deliver world-class interior & construction solutions",
                  "Use modern & AI-based design technologies",
                  "Ensure timely project completion with top quality",
                  "Build long-term relationships with clients"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-brand-yellow mr-4 shrink-0 mt-1" size={24} />
                    <span className="text-gray-300 text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY */}
      <section className="py-32 bg-brand-navy relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <div className="inline-flex items-center px-6 py-2 border border-brand-yellow/30 rounded-full mb-6 backdrop-blur-md bg-white/5">
              <span className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-xs">Our Philosophy</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-tight">
              Design Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Aesthetics</span>
            </h2>
            <p className="text-gray-300 text-xl font-medium leading-relaxed">
              We combine creative brilliance, engineering precision, and smart technology to craft spaces that elevate your everyday living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_ITEMS.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#101e38]/80 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:border-brand-yellow/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(241,184,33,0.1)] group cursor-target relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-yellow/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-yellow/10 group-hover:border-brand-yellow/30 transition-all duration-500 shadow-lg">
                  <div className="text-brand-yellow transform group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-brand-yellow transition-colors">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GROWTH JOURNEY */}
      <section className="py-40 bg-[#0a1426] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-6 py-2 border border-brand-yellow/30 rounded-full mb-6 backdrop-blur-md bg-white/5">
                <TrendingUp className="text-brand-yellow w-4 h-4 mr-2" />
                <span className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-xs">Legacy & Expansion</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Our Growth <span className="italic font-light text-brand-yellow">Journey</span>
              </h2>
            </div>
            <div className="hidden md:block">
               <div className="w-24 h-px bg-gradient-to-r from-transparent to-brand-yellow"></div>
            </div>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-yellow/0 via-brand-yellow/30 to-brand-yellow/0 md:-translate-x-1/2"></div>
            
            <div className="space-y-24">
              {TIMELINE.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Glowing Dot */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-yellow shadow-[0_0_20px_rgba(241,184,33,1)] z-20 transform -translate-x-[7px] md:-translate-x-1/2 ring-4 ring-[#0a1426]"></div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}`}>
                      <div className="group cursor-target">
                        <div className={`flex items-baseline mb-6 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-yellow to-yellow-900 opacity-20 group-hover:opacity-100 transition-all duration-700 tracking-tighter">
                            {item.year}
                          </span>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl group-hover:border-brand-yellow/30 transition-all duration-500 group-hover:bg-[#101e38]">
                          <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Empty side for layout balance */}
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM */}
      <section className="py-32 bg-white text-brand-navy">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Founder */}
            <div className="w-full lg:w-5/12 flex flex-col items-center">
              <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-3xl overflow-hidden border-8 border-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-8 bg-gray-100">
                <Image 
                  src="/ceo.png" 
                  alt="Shivashish Ranjan" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-3xl font-black mb-3 text-brand-navy text-center">Shivashish Ranjan</h3>
              <p className="text-brand-yellow font-black uppercase tracking-[0.2em] text-xs text-center">FOUNDER & CHAIRMAN</p>
            </div>

            {/* Right Column: Other Leaders */}
            <div className="w-full lg:w-7/12 grid grid-cols-2 gap-x-8 gap-y-16 pt-8 lg:pt-16">
              
              {/* Member KR */}
              <div className="flex flex-col items-center">
                <div className="w-[140px] h-[140px] bg-gray-50 rounded-3xl shadow-sm border-2 border-gray-100 flex items-center justify-center mb-6">
                  <span className="text-4xl font-black text-gray-200">KR</span>
                </div>
                <h4 className="text-xl font-black text-brand-navy mb-2 text-center">Kumkum Ranjan</h4>
                <p className="text-brand-yellow font-black uppercase tracking-[0.2em] text-[10px] text-center">CEO</p>
              </div>

              {/* Member RK */}
              <div className="flex flex-col items-center">
                <div className="w-[140px] h-[140px] bg-gray-50 rounded-3xl shadow-sm border-2 border-gray-100 flex items-center justify-center mb-6">
                  <span className="text-4xl font-black text-gray-200">RK</span>
                </div>
                <h4 className="text-xl font-black text-brand-navy mb-2 text-center">Ratan Kumar</h4>
                <p className="text-brand-yellow font-black uppercase tracking-[0.2em] text-[10px] text-center">GENERAL MANAGER (GM)</p>
              </div>

              {/* Member AD */}
              <div className="flex flex-col items-center">
                <div className="w-[140px] h-[140px] bg-gray-50 rounded-3xl shadow-sm border-2 border-gray-100 flex items-center justify-center mb-6">
                  <span className="text-4xl font-black text-gray-200">AD</span>
                </div>
                <h4 className="text-xl font-black text-brand-navy mb-2 text-center">Anjula Devi</h4>
                <p className="text-brand-yellow font-black uppercase tracking-[0.2em] text-[10px] text-center">MANAGING DIRECTOR (MD)</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-brand-yellow text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">
            Let&apos;s build something incredible.
          </h2>
          <button className="bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target mt-6">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
