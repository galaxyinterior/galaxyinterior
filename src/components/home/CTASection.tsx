import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-32 bg-brand-yellow relative overflow-hidden">
      {/* Abstract bg pattern */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
        <div className="w-[800px] h-[800px] border-[100px] border-brand-navy rounded-full absolute"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h4 className="text-brand-navy text-sm font-bold tracking-[0.3em] uppercase mb-6">READY TO BUILD?</h4>
        <h2 className="text-5xl md:text-7xl font-black text-brand-navy leading-none mb-12">
          Let&apos;s craft your perfect space together.
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/contact" className="w-full sm:w-auto bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target flex items-center justify-center">
            ENQUIRE NOW
          </Link>
          <Link href="/projects" className="w-full sm:w-auto bg-transparent hover:bg-white/30 text-brand-navy border-2 border-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase transition-colors cursor-target flex items-center justify-center">
            VIEW PROJECTS
          </Link>
        </div>
      </div>
    </section>
  );
}
