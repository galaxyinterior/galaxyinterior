const PARTNER_LOGOS = [
  { src: '/partner_logos/Century_Plyboards.svg.png', alt: 'Century Plyboards' },
  { src: '/partner_logos/Greenply_logo.svg.png', alt: 'Greenply' },
  { src: '/partner_logos/Havells_Logo.svg.png', alt: 'Havells' },
  { src: '/partner_logos/Panasonic_logo.svg.png', alt: 'Panasonic' },
  { src: '/partner_logos/Pidilite_logo.svg.png', alt: 'Pidilite' },
  { src: '/partner_logos/Ultratech_Cement_Logo.svg.png', alt: 'UltraTech Cement' },
  { src: '/partner_logos/godrej.png', alt: 'Godrej' },
  { src: '/partner_logos/kajaria.png', alt: 'Kajaria' },
  { src: '/partner_logos/skydecor.png', alt: 'SkyDecor' },
  { src: '/partner_logos/somany.png', alt: 'Somany' },
];

// Tripled for seamless infinite marquee scroll
const MARQUEE_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-brand-gray-light text-center border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <h4 className="text-sm font-bold tracking-widest text-brand-navy uppercase mb-2">Our Trusted Partners</h4>
        <p className="text-brand-gray font-medium mb-10">Winning collaborations that produce winning designs.</p>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center h-24 mask-image-gradient">
          <div className="flex animate-marquee gap-16 md:gap-32 min-w-max items-center">
            {MARQUEE_LOGOS.map((logo, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${logo.src}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
