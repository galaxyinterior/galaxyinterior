"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Maximize2,
  X,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Layers,
  Lightbulb,
  Compass,
  Palette,
  Shield,
  SlidersHorizontal
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";

interface DesignIdea {
  id: string;
  title: string;
  category: "living" | "kitchen" | "bedroom" | "ceiling" | "flooring" | "paneling";
  categoryLabel: string;
  image: string;
  shortDesc: string;
  spaceArea: string;
  designConcept: string;
  finishes: { label: string; value: string }[];
  highlights: string[];
  architecturalTip: string;
}

const CURATED_DESIGN_IDEAS: DesignIdea[] = [
  {
    id: "idea-kitchen-01",
    title: "Handleless Matte Acrylic Modular Kitchen",
    category: "kitchen",
    categoryLabel: "Modular Kitchen",
    image: "/generated/inspiration_modular_kitchen.jpg",
    shortDesc: "Anti-scratch acrylic cabinetry with integrated Gola profile channels and non-porous quartz countertops.",
    spaceArea: "180 – 260 sq.ft.",
    designConcept:
      "A minimalist culinary pavilion optimized around the Golden Cooking Triangle (Prep, Cook, Clean) with zero visible handles, concealed appliances, and silent German soft-close drawers.",
    finishes: [
      { label: "Cabinet Carcass", value: "Century Club Prime BWP 710 Marine Plywood" },
      { label: "Shutter Surface", value: "1.5mm High-Pressure Anti-Fingerprint Matte Acrylic" },
      { label: "Countertop", value: "KalingaStone 20mm Non-Porous Engineered Quartz" },
      { label: "Hardware & Slides", value: "Hettich InnoTech Atira Double-Wall Metal Drawers" },
      { label: "Lighting", value: "Concealed 3000K warm under-cabinet LED task profiles" }
    ],
    highlights: [
      "Zero-scratch, thermal-resistant acrylic shutters with PUR hot-melt edge banding",
      "Corner carousel pull-out and tall pantry larder with 120kg weight capacity",
      "Integrated pull-out waste sorting bins and acoustic under-mount sink pad"
    ],
    architecturalTip:
      "Orient your prep counter toward natural northern light to prevent shadows when chopping, and ensure the chimney duct length is under 10 feet with minimal bends for optimal suction."
  },
  {
    id: "idea-living-01",
    title: "Double-Height Contemporary Living Salon",
    category: "living",
    categoryLabel: "Living & Foyers",
    image: "/services/service_interior_1787300041689.jpg",
    shortDesc: "Monumental living space featuring acoustic fluted louvers, 22ft ceiling clearance, and indirect warm illumination.",
    spaceArea: "450 – 700 sq.ft.",
    designConcept:
      "Conceived to host grand family gatherings while maintaining an atmosphere of tranquil intimacy through textured vertical fluting and zoned ambient lighting.",
    finishes: [
      { label: "Wall Paneling", value: "Charcoal composite louvers & smoked walnut veneer" },
      { label: "Flooring", value: "Italian Bottochino natural marble with diamond mirror buff" },
      { label: "Ceiling", value: "Saint-Gobain Gyproc with concealed magnetic profile tracks" },
      { label: "Fittings", value: "Recessed anti-glare COB downlights (CRI > 92)" }
    ],
    highlights: [
      "22ft vertical fluted feature wall seamlessly concealing powder room access",
      "Layered illumination: cove perimeter lighting, downlights, and statement brass pendant",
      "Seamless bookmatched Italian marble slabs with 1mm hairline epoxy joints"
    ],
    architecturalTip:
      "In double-height living spaces, acoustic wall paneling is essential to absorb ambient reverberation and eliminate echoing during conversations."
  },
  {
    id: "idea-ceiling-01",
    title: "Architectural Cove & Magnetic Track Ceiling",
    category: "ceiling",
    categoryLabel: "False Ceilings & Lighting",
    image: "/generated/inspiration_false_ceiling.jpg",
    shortDesc: "Curved gypsum false ceiling with indirect perimeter illumination and modular magnetic track profiles.",
    spaceArea: "Universal (All Rooms)",
    designConcept:
      "Eliminating harsh direct ceiling glare by bouncing soft 3000K warm illumination off matte white gypsum planes, punctuated by movable magnetic spotlights.",
    finishes: [
      { label: "Board Material", value: "Saint-Gobain Gyproc 12.5mm Moisture-Resistant Plasterboard" },
      { label: "Framing System", value: "G.I. perimeter channels (0.5mm thickness)" },
      { label: "Track System", value: "24V Low-Voltage Magnetic Aluminum Recessed Track" },
      { label: "Driver & CCT", value: "Flicker-free Mean Well drivers (2700K - 3000K Dim-to-Warm)" }
    ],
    highlights: [
      "Concealed curtain pelmet tracks with integrated mood lighting",
      "Magnetic spotlights and linear diffusers can be rearranged without tools",
      "Zero-sag guarantee with reinforced ceiling hanger intervals"
    ],
    architecturalTip:
      "Maintain at least a 100mm drop for ambient cove illumination to achieve an even gradient of light without exposing individual LED diode hot spots."
  },
  {
    id: "idea-paneling-01",
    title: "Acoustic Fluted Paneling & Media Wall",
    category: "paneling",
    categoryLabel: "Acoustic Wall Paneling",
    image: "/generated/inspiration_tv_unit.jpg",
    shortDesc: "Sculpted fluted louvers, integrated media credenza, and concealed cabling for master entertainment consoles.",
    spaceArea: "120 – 200 sq.ft. (Wall Surface)",
    designConcept:
      "Unifying entertainment electronics into an architectural focal point while disguising all power bricks, gaming consoles, and cable spaghetti.",
    finishes: [
      { label: "Substrate", value: "Century Club Prime BWP 710 Plywood" },
      { label: "Fluted Finish", value: "Extruded Charcoal Polymer Louver Sheets" },
      { label: "Credenza Top", value: "Statuario Gold Quartz with beveled bullnose" },
      { label: "Hardware", value: "Hafele Push-to-Open heavy concealed slides" }
    ],
    highlights: [
      "Backlit floating TV backer with warm amber ambient halo",
      "Acoustic backing prevents sound transmission into adjoining master bedrooms",
      "Ventilated media drawers preventing amplifier and console overheating"
    ],
    architecturalTip:
      "Incorporate concealed PVC conduits behind the paneling during rough-in to allow seamless addition of future HDMI or fiber optic connections."
  },
  {
    id: "idea-flooring-01",
    title: "Bookmatched Italian Statuario Marble Floor",
    category: "flooring",
    categoryLabel: "Italian Marble & Tiles",
    image: "/generated/inspiration_italian_tiles.jpg",
    shortDesc: "Hand-selected Italian marble with bookmatched natural veining and multi-stage diamond polishing.",
    spaceArea: "Living, Dining & Master Suites",
    designConcept:
      "Creating an expansive mirror-like floor plane that reflects natural daylight and elevates the tactile grandeur of the entire residence.",
    finishes: [
      { label: "Material", value: "Authentic Italian Statuario / Michelangelo Marble (20mm)" },
      { label: "Adhesive", value: "Laticrete Platinum latex-fortified polymer mortar" },
      { label: "Grout", value: "Tenax Italian matching epoxy color-matched resin" },
      { label: "Buffing", value: "8-Stage Klindex Diamond disc crystallization process" }
    ],
    highlights: [
      "Continuous symmetrical vein matching curated from sequential quarry blocks",
      "Silicone nano-sealer coating prevents turmeric, tea, and red wine staining",
      "Seamless flush expansion joints preventing tile bucking across regional climate shifts"
    ],
    architecturalTip:
      "Natural Italian marble must be allowed to breathe; avoid chemical acid washes and specify pH-neutral stone conditioners for lifetime luster."
  },
  {
    id: "idea-bedroom-01",
    title: "Master Sanctuary with Integrated Fluted Headboard",
    category: "bedroom",
    categoryLabel: "Master Bedroom Suites",
    image: "/generated/interior_gallery_2.png",
    shortDesc: "Floor-to-ceiling upholstered velvet headboard, floating timber nightstands, and soft cove illumination.",
    spaceArea: "220 – 340 sq.ft.",
    designConcept:
      "A soothing decompression suite combining acoustic fabric walling with natural oak timber warmth, designed for deep restorative sleep.",
    finishes: [
      { label: "Headboard Fabric", value: "D'Decor stain-resistant velvet with acoustic foam" },
      { label: "Woodwork", value: "American White Oak veneer with zero-gloss PU seal" },
      { label: "Wardrobe Framing", value: "Bronze anodized aluminum profiles with fluted glass" },
      { label: "Bed Base", value: "Heavy-duty hydraulic lift mechanism with Century BWP frame" }
    ],
    highlights: [
      "Floor-to-ceiling vertical fluting with integrated brass reading gooseneck sconces",
      "Cantilevered floating bedside drawers with wireless smartphone charging pads",
      "Concealed master wardrobe dressing suite with automatic sensor illumination"
    ],
    architecturalTip:
      "Position the master bed along the South or West wall according to Vastu Shastra, ensuring the head faces South or East for biological alignment."
  },
  {
    id: "idea-paneling-02",
    title: "Natural Teak Louver Room Partition",
    category: "paneling",
    categoryLabel: "Acoustic Wall Paneling",
    image: "/generated/fac_wall_panelling.png",
    shortDesc: "Semi-permeable vertical timber screen defining dining and formal salon zones without blocking daylight.",
    spaceArea: "80 – 140 sq.ft. (Screen)",
    designConcept:
      "Delineating functional spaces in an open-concept layout while preserving air circulation and visual depth.",
    finishes: [
      { label: "Timber", value: "First-Class CP Seasoned Teak Wood (1.5 x 3 inch slats)" },
      { label: "Coating", value: "Asian Paints PU Luxury Wood Finish (Matte Satin)" },
      { label: "Anchors", value: "Concealed stainless steel floor-ceiling tension pins" }
    ],
    highlights: [
      "Rotatable or fixed timber louvers providing flexible visual privacy",
      "Clean geometric shadows cast across marble floors during afternoon sunlight",
      "100% solid timber construction free of warping or seasonal joint splitting"
    ],
    architecturalTip:
      "Semi-private timber screens allow you to preserve open-concept vistas while meeting traditional family privacy requirements."
  },
  {
    id: "idea-flooring-02",
    title: "Herringbone Engineered Hardwood Flooring",
    category: "flooring",
    categoryLabel: "Italian Marble & Tiles",
    image: "/generated/inspiration_wooden_flooring.jpg",
    shortDesc: "Multi-layer engineered European oak laid in classic herringbone pattern with acoustic underlayment.",
    spaceArea: "Master Suites & Private Libraries",
    designConcept:
      "Infusing warmth and European sophistication underfoot, creating quiet acoustic tranquility in private sleeping quarters.",
    finishes: [
      { label: "Wood Species", value: "European White Oak (4mm real timber top layer)" },
      { label: "Pattern", value: "Classic 90-degree Herringbone with micro-bevel edges" },
      { label: "Underlay", value: "3mm High-Density IXPE foam with moisture barrier film" },
      { label: "Topcoat", value: "UV-cured anti-scratch aluminum oxide lacquer" }
    ],
    highlights: [
      "Engineered multi-ply core prevents expansion/contraction in regional monsoon humidity",
      "Warm to the touch during cold winter mornings in Ranchi and Deoghar",
      "High slip-resistance and sound dampening rating"
    ],
    architecturalTip:
      "Pair herringbone timber floors with neutral off-white or ivory walls so the geometric rhythm of the floor remains the hero element."
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIdea, setActiveIdea] = useState<DesignIdea | null>(null);
  const [ideas, setIdeas] = useState<DesignIdea[]>(CURATED_DESIGN_IDEAS);

  useEffect(() => {
    try {
      const q = query(collection(db, 'gallery_images'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched: DesignIdea[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as any;
          if (data.status === 'inactive') return;
          fetched.push({
            id: docSnap.id,
            title: data.title || 'Architectural Design Showcase',
            category: (data.category?.toLowerCase() || 'living') as any,
            categoryLabel: data.category || 'Design Inspiration',
            image: data.imageUrl || data.image || '/generated/inspiration_modular_kitchen.jpg',
            shortDesc: data.description || 'Custom crafted space designed and executed by Galaxy Interior.',
            spaceArea: 'Custom Specifications',
            designConcept: data.description || 'Bespoke design concept executed with engineering precision.',
            finishes: [
              { label: 'Joinery Core', value: 'Century Club Prime BWP 710 Marine Ply' },
              { label: 'Surface Finish', value: 'High-Pressure Acrylic / Smoked Veneer' },
              { label: 'Hardware', value: 'German Hettich / Hafele Soft-Close Fittings' }
            ],
            highlights: [
              'Custom factory fabrication with 10-year timber warranty',
              'Vastu compliant spatial layout and lighting design',
              'On-site resident engineer quality supervision'
            ],
            architecturalTip: 'Ensure lighting color temperatures match across adjacent living zones for cohesive ambiance.'
          });
        });

        if (fetched.length > 0) {
          setIdeas([...fetched, ...CURATED_DESIGN_IDEAS]);
        }
      }, (err) => {
        console.warn('Firestore gallery_images listener notice:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Fallback to local curated design catalog');
    }
  }, []);

  // Filtered ideas
  const filteredIdeas = useMemo(() => {
    if (selectedCategory === "all") return ideas;
    return ideas.filter((idea) => idea.category === selectedCategory || idea.categoryLabel.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [selectedCategory, ideas]);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. EDITORIAL HEADER */}
      <section className="relative pt-32 pb-20 bg-[#0c121e] text-[#faf8f5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/inspiration_modular_kitchen.jpg"
            alt="Galaxy Interior Design Archive"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Design Ideas &amp; Inspiration Archive
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            Tactile Textures. Bespoke Joinery. <br />
            <span className="italic font-light text-[#c89d28]">Timeless Architectural Form.</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our curated material archive of bespoke kitchens, double-height salons, false ceiling channels, and Italian marble finishes. Click any concept to inspect architectural specifications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm font-light text-gray-300">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#c89d28]" /> Century Club Prime Plywood
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c89d28]" /> German Hettich Hardware
            </span>
            <span className="flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#c89d28]" /> Bookmatched Italian Marble
            </span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="sticky top-16 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-black/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2 shrink-0 hidden md:inline">
            Space:
          </span>
          {(
            [
              { id: "all", label: "All Spaces" },
              { id: "kitchen", label: "Modular Kitchens" },
              { id: "living", label: "Living & Foyers" },
              { id: "bedroom", label: "Master Suites" },
              { id: "ceiling", label: "Ceilings & Lighting" },
              { id: "flooring", label: "Italian Tiles & Marble" },
              { id: "paneling", label: "Acoustic Wall Paneling" }
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0c121e] text-[#faf8f5] shadow-sm"
                  : "bg-white text-gray-600 hover:text-black border border-black/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DESIGN IDEAS MASONRY GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => setActiveIdea(idea)}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden bg-black/5">
                <Image
                  src={idea.image}
                  alt={idea.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-4 left-4 bg-[#0c121e]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#c89d28] border border-[#c89d28]/30">
                  {idea.categoryLabel}
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-[#0c121e] shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>

                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white font-light">
                  {idea.spaceArea}
                </div>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#0c121e] mb-3 group-hover:text-[#c89d28] transition-colors leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {idea.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-black/5">
                    {idea.finishes.slice(0, 2).map((f, fIdx) => (
                      <div key={fIdx} className="text-xs text-gray-500 flex items-center justify-between">
                        <span className="font-medium text-gray-400">{f.label}:</span>
                        <span className="text-gray-700 font-light truncate ml-2">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspect Link */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-[#0c121e] group-hover:text-[#c89d28] transition-colors">
                  <span>Inspect Design Specs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PHASE 10: INTERACTIVE DETAIL INSPECTION MODAL */}
      {activeIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-black/10 relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveIdea(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-700 hover:text-black transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Image Hero */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-[#0c121e]">
              <Image
                src={activeIdea.image}
                alt={activeIdea.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c89d28] block mb-1">
                  {activeIdea.categoryLabel} &bull; {activeIdea.spaceArea}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight">
                  {activeIdea.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Concept */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-2">
                  Architectural Concept
                </h3>
                <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed">
                  {activeIdea.designConcept}
                </p>
              </div>

              {/* Material Schedule Table */}
              <div className="bg-[#faf8f5] p-6 rounded-2xl border border-black/5">
                <h3 className="font-serif text-xl text-[#0c121e] mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#c89d28]" /> Material &amp; Specification Schedule
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {activeIdea.finishes.map((f, idx) => (
                    <div key={idx} className="pb-3 border-b border-black/5">
                      <span className="text-gray-400 font-medium block uppercase tracking-wider text-[10px]">
                        {f.label}
                      </span>
                      <span className="text-gray-800 font-light mt-0.5 block">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Highlights */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                  Signature Highlights
                </h3>
                <div className="space-y-2">
                  {activeIdea.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#c89d28] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Design Tip */}
              <div className="p-5 rounded-2xl bg-[#c89d28]/10 border border-[#c89d28]/20 flex items-start gap-3.5">
                <Lightbulb className="w-5 h-5 text-[#c89d28] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c121e] mb-1">
                    Studio Architectural Advice
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">
                    {activeIdea.architecturalTip}
                  </p>
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href={`/contact?inspiration=${encodeURIComponent(activeIdea.title)}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0c121e] hover:bg-black text-[#faf8f5] text-center font-semibold text-xs tracking-widest uppercase transition-all"
                >
                  Commission This Space
                </Link>
                <a
                  href="tel:+919631980881"
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-black/20 hover:border-black/40 text-[#0c121e] text-center font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#c89d28]" />
                  Call Studio: +91 96319 80881
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. BOTTOM CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Bespoke Residential Conception
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-8 leading-tight">
            Inspired to Transform <br />
            <span className="italic text-[#c89d28]">Your Living Space?</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a personalized moodboarding session with our interior design directors. We review your floor plans and tailor material boards specifically for your residence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Book Design Consultation
            </Link>
            <a
              href="tel:+919631980881"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Helpline: +91 96319 80881
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
