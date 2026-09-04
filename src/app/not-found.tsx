import React from 'react';
import { Compass } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-navy p-6">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-8 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
          <Compass className="w-12 h-12 text-brand-yellow animate-[spin_4s_linear_infinite]" />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter opacity-10">404</h1>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 -mt-16 md:-mt-20 relative z-10 drop-shadow-lg">
          Room Not <span className="text-brand-yellow">Found</span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-lg mx-auto font-medium">
          The space you are looking for does not exist in our blueprints. It might have been relocated or is currently under construction.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-8 py-4 rounded-full font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(241,184,33,0.3)] transition-all hover:scale-105"
        >
          Return to Lobby
        </Link>
      </div>
    </div>
  );
}
