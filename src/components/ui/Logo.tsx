import React from 'react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icon */}
      <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a2f52" />
              <stop offset="100%" stopColor="#0b162c" />
            </radialGradient>
          </defs>
          
          {/* Background Circle */}
          <circle cx="50" cy="50" r="47" fill="url(#bgGradient)" stroke="#d4af37" strokeWidth="1.5" />
          
          {/* Swoop (Ground) */}
          <path d="M 15 72 Q 50 58 85 72 L 85 78 Q 50 64 15 78 Z" fill="#b0b7c1" />
          
          {/* House Base */}
          <path d="M 28 68 L 28 46 L 50 28 L 72 46 L 72 68 Z" fill="#d1d6dc" />
          
          {/* Roof Overhang */}
          <path d="M 22 48 L 50 25 L 78 48" stroke="#d1d6dc" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          {/* Chimney */}
          <rect x="62" y="24" width="7" height="14" fill="#d1d6dc" />
          
          {/* Glowing Windows */}
          <rect x="43" y="44" width="5" height="5" fill="#facc15" className="animate-pulse" />
          <rect x="52" y="44" width="5" height="5" fill="#facc15" className="animate-pulse" style={{ animationDelay: '200ms' }} />
          <rect x="43" y="53" width="5" height="5" fill="#facc15" className="animate-pulse" style={{ animationDelay: '400ms' }} />
          <rect x="52" y="53" width="5" height="5" fill="#facc15" className="animate-pulse" style={{ animationDelay: '600ms' }} />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col justify-center mt-1">
        <span className="text-white text-xl md:text-[26px] font-black leading-none tracking-tight" style={{ fontFamily: 'Arial, system-ui, sans-serif' }}>
          GALAXY
        </span>
        <span className="text-[#e2b13c] text-[8px] md:text-[10px] font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase mt-1 md:mt-1">
          INTERIOR
        </span>
      </div>
    </div>
  );
}
