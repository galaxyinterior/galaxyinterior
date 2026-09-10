import Link from 'next/link';
import { 
  ArrowUpRight, 
  PhoneCall, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Clock 
} from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-28 md:py-36 bg-[#080d17] text-white relative overflow-hidden">
      
      {/* Cinematic Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-gold/[0.06] rounded-full blur-[120px] pointer-events-none" 
      />
      
      {/* Architectural Geometric Subtle Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Architectural Journey</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-tight text-white leading-[1.08] mb-6">
          Homes Designed <br />
          <span className="text-gold-gradient font-editorial italic">Around You.</span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 font-light text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
          From bare land to turnkey handover. Experience architectural design, 3D visualization, and structural execution with contractual transparency.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Link 
            href="/contact"
            data-cursor-tooltip="start-project-cta" 
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-brand-gold hover:bg-yellow-400 text-brand-charcoal font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-[0_10px_30px_rgba(241,184,33,0.25)] hover:shadow-[0_15px_40px_rgba(241,184,33,0.4)] hover:scale-105 cursor-target flex items-center justify-center gap-2"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          
          <Link 
            href="/projects" 
            data-cursor-tooltip="view-projects-cta"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 font-bold text-xs uppercase tracking-[0.18em] transition-all hover:border-brand-gold/40 cursor-target flex items-center justify-center gap-2"
          >
            <span>View Delivered Homes</span>
          </Link>

          <a
            href="tel:+917004465611"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-mono text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
            <span>+91 70044 65611</span>
          </a>
        </div>

        {/* 3 Core Commitments */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Itemised BOQ Guarantee</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">Legally bound pricing with zero escalation.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">3D Before Build</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">100% photorealism before a single brick is laid.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Milestone Escrow</div>
              <div className="text-[11px] text-gray-400 font-light mt-0.5">Pay only as quality stages are verified on site.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

