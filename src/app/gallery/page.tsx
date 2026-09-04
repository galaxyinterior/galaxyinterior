"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CircularGallery from '@/components/CircularGallery';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ChevronDown, ImageIcon, Sparkles } from 'lucide-react';

const DEFAULT_GALLERY_IMAGES = [
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", text: "Luxury Living" },
  { image: "https://images.unsplash.com/photo-1541888081297-c819dc788916?auto=format&fit=crop&q=80&w=1200", text: "Modern Build" },
  { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", text: "Cozy Interior" },
  { image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", text: "Turnkey Project" },
  { image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200", text: "Renovation" },
  { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", text: "Elegant Spaces" },
  { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", text: "Office Design" },
  { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", text: "Smart Home" },
  { image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1200", text: "Kitchen Remodel" },
  { image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200", text: "Minimalist" },
  
  // Extra images for the second section
  { image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200", text: "Rustic Vibes" },
  { image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200", text: "Bathroom Setup" },
  { image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200", text: "Bright Dining" },
  { image: "https://images.unsplash.com/photo-1599619351208-6e6a20028742?auto=format&fit=crop&q=80&w=1200", text: "Bedroom Comfort" },
  { image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200", text: "Living Space" }
];

export default function GalleryPage() {
  const [images, setImages] = useState(DEFAULT_GALLERY_IMAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const q = query(collection(db, "gallery_images"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const loadedImages = querySnapshot.docs
            .map(doc => doc.data())
            .filter(data => data.isActive !== false) // Default to true if missing
            .map(data => ({
              image: data.imageUrl || data.url || data.image,
              text: data.title || data.text || 'Gallery Image'
            }));
          
          if (loadedImages.length > 0) {
            setImages(loadedImages);
          }
        }
      } catch (error) {
        console.error("Error loading gallery images from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Split images: First 10 for CircularGallery, rest for Masonry
  const topImages = images.slice(0, 10);
  const restImages = images.slice(10);

  return (
    <main className="bg-brand-navy min-h-screen text-white pt-40 pb-10">

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center px-6 py-2 border border-brand-yellow/30 rounded-full mb-6 backdrop-blur-sm bg-brand-navy/50">
          <Sparkles className="text-brand-yellow w-4 h-4 mr-2" />
          <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Our Masterpieces</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl text-white">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Gallery</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Explore our finest interior, construction, and turnkey projects brought to life. Scroll horizontally to view featured works.
        </p>
      </div>

      {/* SECTION 1: CIRCULAR GALLERY (First 10 Images) */}
      <section className="w-full relative overflow-hidden" style={{ height: '700px' }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <CircularGallery
            items={topImages}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
            font="bold 30px Orbitron"
          />
        )}
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10 pointer-events-none">
          <span className="text-white/50 text-xs tracking-widest uppercase font-bold mb-2">Drag or Scroll to View</span>
          <ChevronDown className="text-brand-yellow" />
        </div>
      </section>

      {/* SECTION 2: MASONRY GRID (Rest of the Images) */}
      {restImages.length > 0 && (
        <section className="py-24 bg-white text-brand-navy mt-10 rounded-t-[3rem] relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" /> More Projects
                </h4>
                <h2 className="text-4xl md:text-5xl font-black">Extensive Portfolio</h2>
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {restImages.map((img, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl group gallery-item break-inside-avoid">
                  <Image 
                    src={img.image} 
                    alt={img.text} 
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                    <h3 className="text-white font-black text-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {img.text}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CALL TO ACTION */}
      <section className="bg-brand-yellow py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6">
            Inspired by what you see?
          </h2>
          <p className="text-brand-navy/80 text-lg font-medium mb-10">
            Let&apos;s start drafting the blueprint for your dream space today.
          </p>
          <button className="bg-brand-navy hover:bg-[#162442] text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl transition-transform hover:scale-105 cursor-target">
            Book a Consultation
          </button>
        </div>
      </section>

    </main>
  );
}
