'use client';

import { useState } from 'react';
import Link from 'next/link';

const FURNITURE_ITEMS = [
  { title: 'Luxury Velvet Sofa', type: 'Luxury', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
  { title: 'Marble Dining Table', type: 'Grand', img: 'https://images.unsplash.com/photo-1617806118233-18e1c0955534?auto=format&fit=crop&q=80&w=600' },
  { title: 'Designer King Bed', type: 'Modern', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
  { title: 'Sleek Glass Wardrobe', type: 'Chic', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=600' },
];

const CATEGORIES = ['All', 'Luxury', 'Grand', 'Modern', 'Chic'];

export default function FurnitureSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = FURNITURE_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.type === selectedCategory
  );

  return (
    <section className="py-24 bg-brand-gray-light">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Collections</h4>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">Premium Furniture</h2>
          <p className="text-brand-gray font-medium max-w-2xl mx-auto text-lg">
            From ergonomic office setups to luxurious home comfort, we provide bespoke furniture that defines your living space.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-y-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-brand-yellow'
                  : 'bg-white text-brand-navy hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filtered.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-navy text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{item.type}</div>
                <h3 className="text-xl font-black text-brand-navy mb-6">{item.title}</h3>
                <Link
                  href="/contact"
                  data-cursor-tooltip="home-furniture-btn"
                  className="w-full flex justify-center border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-bold text-xs tracking-widest uppercase py-3 rounded-lg transition-colors cursor-target"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            data-cursor-tooltip="home-custom-furniture-btn"
            className="inline-block bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-lg transition-colors cursor-target"
          >
            GET CUSTOM FURNITURE
          </Link>
        </div>
      </div>
    </section>
  );
}
