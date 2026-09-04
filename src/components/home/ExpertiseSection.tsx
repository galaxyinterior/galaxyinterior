import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const EXPERTISE_ITEMS = [
  { title: 'Architectural Plan', desc: 'Modern architectural & structural blueprints for your dream home.' },
  { title: '2D Floor Plan', desc: 'Detailed 2D floor plans ensuring solid foundations and accurate mapping.' },
  { title: '3D Design', desc: 'Immersive 3D visualization to preview your interior and exterior.' },
  { title: 'Interior Projects', desc: 'Bespoke custom interiors crafted to fit your lifestyle and taste.' },
  { title: 'Construction', desc: 'Full-service construction execution with high-quality materials.' },
  { title: 'Modular Kitchen', desc: 'Smart, highly efficient & elegant kitchen solutions for modern homes.' },
];

export default function ExpertiseSection() {
  return (
    <section className="py-24 bg-white text-brand-navy">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Expertise</h4>
            <h2 className="text-4xl md:text-5xl font-black">Bespoke Solutions</h2>
            <p className="text-gray-600 max-w-xl mt-6 font-medium text-lg leading-relaxed">
              We offer a 360-degree approach to architecture and interiors, ensuring quality and luxury at every step of your home building.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-gray-500 text-sm tracking-widest uppercase font-bold flex items-center">
              <span className="w-12 h-px bg-brand-yellow mr-4"></span>
              Swipe to explore
              <span className="w-12 h-px bg-brand-yellow ml-4"></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE_ITEMS.map((service) => (
            <div
              key={service.title}
              data-cursor-tooltip="home-expertise-btn"
              className="bg-gray-50 p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-yellow/50 transition-all group cursor-pointer cursor-target"
            >
              <h3 className="text-brand-navy text-2xl font-black mb-4 group-hover:text-brand-yellow transition-colors">{service.title}</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed h-16">{service.desc}</p>
              <Link href={`/services/${service.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-brand-yellow text-sm font-bold tracking-widest uppercase flex items-center group-hover:underline underline-offset-4 w-fit">
                EXPLORE <ChevronDown className="ml-2 -rotate-90 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
