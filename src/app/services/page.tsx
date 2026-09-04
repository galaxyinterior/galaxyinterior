"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface ServiceData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, "services"), orderBy("sortOrder", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as ServiceData))
          .filter(s => s.isActive);
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-brand-yellow font-bold tracking-widest uppercase mb-4 text-sm">Our Services</h4>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8">Uncompromising Excellence</h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            From visionary blueprints to the final coat of paint, we deliver a seamless, world-class experience at every stage of building your dream space.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-[1400px] mx-auto py-16 px-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-bold text-xl">
            Check back soon for our updated services list.
          </div>
        ) : (
          services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={service.id} 
                id={service.id} 
                className={`flex flex-col lg:flex-row items-stretch min-h-[500px] mb-24 lg:mb-32 group scroll-mt-32 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl shadow-2xl h-[400px] lg:h-auto">
                  <Image 
                    src={service.imageUrl} 
                    alt={service.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                {/* Content Side */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-0 ${isEven ? 'lg:pl-20' : 'lg:pr-20'}`}>
                  <div className="text-brand-yellow font-black text-6xl md:text-8xl opacity-10 mb-[-2rem] select-none">
                    0{index + 1}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8 relative z-10">
                    {service.name}
                  </h2>
                  <div className="w-20 h-1 bg-brand-yellow mb-8"></div>
                  <p className="text-gray-600 text-lg font-medium leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-12">
                    <button className="px-8 py-4 bg-brand-navy hover:bg-[#162442] text-white font-bold text-sm tracking-widest uppercase rounded-full shadow-lg transition-colors flex items-center">
                      Discuss Project
                      <span className="ml-4 text-brand-yellow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
