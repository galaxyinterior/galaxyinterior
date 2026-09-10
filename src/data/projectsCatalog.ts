export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'turnkey' | 'interior' | 'architecture' | 'renovation';
  categoryLabel: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  location: string;
  city: string;
  state: string;
  area: string;
  plotSize: string;
  year: string;
  duration: string;
  scope: string;
  coverImage: string;
  galleryImages: string[];
  clientBrief: string;
  architecturalApproach: string;
  team: {
    leadArchitect: string;
    structuralEngineer: string;
    siteEngineer: string;
    stylingDirector: string;
  };
  keySpecs: {
    label: string;
    spec: string;
  }[];
  highlights: string[];
  deliverables: string[];
}

export const PROJECTS_CATALOG: ProjectDetail[] = [
  {
    id: "curated-1",
    slug: "the-grand-horizon-villa-ranchi",
    title: "The Grand Horizon Villa",
    subtitle: "A contemporary cantilevered sanctuary balancing private family courtyards with expansive entertaining salons.",
    category: "turnkey",
    categoryLabel: "Architecture & Turnkey Civil",
    status: "completed",
    location: "Morabadi, Ranchi",
    city: "Ranchi",
    state: "Jharkhand",
    area: "4,800 sq.ft.",
    plotSize: "5,400 sq.ft. (North-Facing)",
    year: "2024",
    duration: "10 Months",
    scope: "Architectural Planning • Vastu Zoning • Fe 550D Civil Build • Luxury Interior Turnkey",
    coverImage: "/generated/legacy_villa.png",
    galleryImages: [
      "/generated/legacy_villa.png",
      "/generated/3d_split_villa_exterior.png",
      "/generated/interior_gallery_1.png",
      "/generated/inspiration_modular_kitchen.jpg",
      "/generated/3d_interior_hero.png",
      "/generated/inspiration_false_ceiling.jpg"
    ],
    clientBrief:
      "The client, a prominent regional industrialist family, required an imposing multi-generational residence that respects ancient Vastu Shastra while embodying sleek minimalist contemporary aesthetics. The brief emphasized acoustic separation between the ground-floor elders' suite and upper-floor entertainment lounges.",
    architecturalApproach:
      "We conceived a split-level structural frame anchored by a central double-height lightwell (Brahmasthan) that floods interior corridors with soft southern daylight. Cantilevered RCC porticos shield living room fenestrations from harsh midday summer solar heat, reducing cooling loads by 28%.",
    team: {
      leadArchitect: "Shivashish Ranjan (Principal)",
      structuralEngineer: "Er. Alok Verma, M.Tech (Structures)",
      siteEngineer: "Er. Nishant Kumar (Resident Civil)",
      stylingDirector: "Kumkum Ranjan"
    },
    keySpecs: [
      { label: "Structural Rebar", spec: "Tata Tiscon Fe 550D Super Ductile TMT" },
      { label: "Concrete Grade", spec: "M25 / M30 Ready-Mix with 28-day cube verification" },
      { label: "Interior Plywood", spec: "CenturyPly Club Prime 710 BWP Marine Plywood" },
      { label: "Cabinet Hardware", spec: "German Hettich Sensys Soft-Close & Hafele runners" },
      { label: "Flooring", spec: "Imported Italian Bottochino & Statuario bookmatched marble" },
      { label: "Fenestration", spec: "Double-glazed soundproof thermal-break aluminum profiles" },
      { label: "Wall Finishes", spec: "Asian Paints Royale Aspira with micro-cement accents" }
    ],
    highlights: [
      "Double-height 22ft ceiling in formal salon with indirect warm 3000K cove channels",
      "Vastu-aligned Ishanya (North-East) water fountain with natural filtration",
      "Handleless acrylic modular kitchen equipped with built-in Häfele induction & chimney",
      "Integrated rooftop rainwater harvesting system with 15,000L underground cistern"
    ],
    deliverables: [
      "Municipal Corporation Sanction Dossier & Structural Blueprints",
      "3D Photorealistic Exterior & Interior Raytraced Walkthroughs",
      "Itemized Zero-Escalation Master BOQ with Weekly Site Audit Logs",
      "10-Year Written Structural Stability Certificate & Timber Warranty Bond"
    ]
  },
  {
    id: "curated-2",
    slug: "the-ivory-penthouse-patna",
    title: "The Ivory Penthouse",
    subtitle: "A serene sky residence celebrating muted monochrome palettes, tactile textiles, and bespoke factory joinery.",
    category: "interior",
    categoryLabel: "Luxury Interior Execution",
    status: "completed",
    location: "Bailey Road, Patna",
    city: "Patna",
    state: "Bihar",
    area: "3,400 sq.ft.",
    plotSize: "14th Floor Penthouse",
    year: "2024",
    duration: "55 Days",
    scope: "Bespoke Interior Turnkey • Acoustic Paneling • Smart Architectural Lighting",
    coverImage: "/generated/hero_interior_1.png",
    galleryImages: [
      "/generated/hero_interior_1.png",
      "/generated/interior_gallery_2.png",
      "/generated/inspiration_modular_kitchen.jpg",
      "/generated/inspiration_tv_unit.jpg",
      "/generated/fac_wall_panelling.png",
      "/generated/inspiration_wooden_flooring.jpg"
    ],
    clientBrief:
      "A senior cardiologist couple wanted an uncluttered, acoustically peaceful retreat perched above the busy thoroughfare of Patna. The home had to host intimate musical soirees while providing ergonomic, clutter-free storage for extensive book and art collections.",
    architecturalApproach:
      "We deployed a continuous architectural datum across the apartment using charcoal fluted wall paneling and recessed magnetic profile track lighting. Acoustic gypsum ceiling baffles dampen street reverberation, while hidden floor-to-ceiling push-to-open flush doors preserve clean visual planes.",
    team: {
      leadArchitect: "Shivashish Ranjan (Principal)",
      structuralEngineer: "Er. K. P. Singh (Consultant)",
      siteEngineer: "Er. Rahul Anand (Interior Project Head)",
      stylingDirector: "Kumkum Ranjan"
    },
    keySpecs: [
      { label: "Cabinetry Core", spec: "Greenply 710 Grade BWP Marine Plywood" },
      { label: "Surfacing", spec: "Natural Smoked Oak & American Walnut veneer with matte PU" },
      { label: "Kitchen Counter", spec: "KalingaStone non-porous engineered quartz" },
      { label: "Hardware & Slides", spec: "Blum Movento concealed runners with tip-on Blumotion" },
      { label: "Ceiling System", spec: "Saint-Gobain Gyproc with magnetic track lighting channels" },
      { label: "Automation", spec: "Schneider Wiser Smart Home lighting & motorized curtains" },
      { label: "Paint System", spec: "Asian Paints Royale Matte & PU metallic lacquer" }
    ],
    highlights: [
      "Concealed magnetic architectural track lights with warm 2700K ambient dimming",
      "Acoustic fluted charcoal wall louvers integrating concealed master bedroom entrance",
      "Walk-in dressing sanctuary featuring bronze tinted fluted glass and sensor LED rods",
      "Anti-scratch matte acrylic modular kitchen with tandem corner pull-outs"
    ],
    deliverables: [
      "Room-by-Room 3D Visual Dossier & Lighting Circuit Schematics",
      "Factory CNC Joinery Production Drawings & Edge-Band Verification",
      "Comprehensive Indoor Air Quality (IAQ) Low-VOC Paint Certification",
      "10-Year Timber Warranty Bond & 5-Year Hardware Performance Guarantee"
    ]
  },
  {
    id: "curated-3",
    slug: "lakeview-duplex-estate-kolkata",
    title: "Lakeview Duplex Estate",
    subtitle: "A contemporary waterfront duplex featuring dramatic cantilevered balconies and climate-responsive solar shading.",
    category: "turnkey",
    categoryLabel: "Contemporary Architecture & Build",
    status: "ongoing",
    location: "New Town, Action Area II, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    area: "5,200 sq.ft.",
    plotSize: "6,000 sq.ft. (Lakefront)",
    year: "2025",
    duration: "12 Months (Stage: Superstructure Casting)",
    scope: "Structural Civil Build • 3D Facade Elevation • Monolithic Concrete Casting",
    coverImage: "/generated/3d_elevation_hero.png",
    galleryImages: [
      "/generated/3d_elevation_hero.png",
      "/generated/project_ongoing_1.png",
      "/generated/elevation_gallery_1.png",
      "/services/service_construction_1787300029220.jpg",
      "/generated/3d_split_villa_exterior.png",
      "/generated/elevation_gallery_2.png"
    ],
    clientBrief:
      "Located adjacent to a calm lake in New Town, the client wanted an imposing architectural statement that prioritizes panoramic lake views from all master suites while maintaining thermal comfort during hot, humid Kolkata summers.",
    architecturalApproach:
      "We engineered dynamic deep cantilevered concrete overhangs and vertical timber-finish terracotta louvers that cut incident solar radiation while framing unobstructed waterfront views. The foundation utilizes deep bored cast-in-situ RCC piles to address soft alluvial lakebed soil.",
    team: {
      leadArchitect: "Shivashish Ranjan (Principal)",
      structuralEngineer: "Er. S. Sen, Ph.D. (Foundations & Structures)",
      siteEngineer: "Er. Bikram Ghosh (Resident Civil Engineer)",
      stylingDirector: "Ratan Kumar"
    },
    keySpecs: [
      { label: "Foundation", spec: "Cast-in-situ bored RCC friction piles (18m depth)" },
      { label: "Structural Steel", spec: "Jindal Panther Fe 550D TMT Reinforcement" },
      { label: "Concrete Mix", spec: "M30 High-Performance Sulphate-Resistant Concrete" },
      { label: "Waterproofing", spec: "Fosroc Proofex Torch-on Bituminous & Crystalline slurry" },
      { label: "Fenestration", spec: "Schüco insulated sliding thermal-break double glass" },
      { label: "Roof Screed", spec: "Polyurethane thermal insulation screed with solar reflectance index (SRI) > 85" }
    ],
    highlights: [
      "14ft deep column-free cantilevered viewing deck suspended over perimeter reflecting pool",
      "Specialized deep pile foundation engineered for high water table and lakebed subsoil",
      "Bioclimatic cross-ventilation shafts drawing cool lake breezes through the ground salon",
      "Full digital site inspection dashboard with weekly 360-degree drone flyovers"
    ],
    deliverables: [
      "Geotechnical Soil Report & Certified Pile Load Test Certificates",
      "WB HIDCO Municipal Sanction Drawings & Structural Approval Dossier",
      "Milestone-Linked Escrow Construction Agreement with Zero Escalation Guarantee",
      "Permanent Structural Health Monitoring Register"
    ]
  },
  {
    id: "curated-4",
    slug: "minimalist-zen-residence-bhagalpur",
    title: "Minimalist Zen Residence",
    subtitle: "A peaceful residential oasis celebrating tactile stone, Japanese joinery nuances, and tranquil indoor greenery.",
    category: "interior",
    categoryLabel: "Turnkey Residential Interior",
    status: "completed",
    location: "Adampur, Bhagalpur",
    city: "Bhagalpur",
    state: "Bihar",
    area: "2,800 sq.ft.",
    plotSize: "Single-Family Floor",
    year: "2023",
    duration: "42 Days",
    scope: "Spatial Reconfiguration • Bespoke Millwork • False Ceiling • Marble Restoration",
    coverImage: "/generated/interior_gallery_1.png",
    galleryImages: [
      "/generated/interior_gallery_1.png",
      "/generated/3d_split_living_room.png",
      "/generated/fac_tiles_flooring.png",
      "/generated/inspiration_modular_kitchen.jpg",
      "/generated/fac_wooden_work.png",
      "/generated/inspiration_false_ceiling.jpg"
    ],
    clientBrief:
      "A multigenerational business family in Bhagalpur requested a complete interior transformation of their 15-year-old traditional residence into an airy, uncluttered sanctuary inspired by Japanese minimalism and Scandinavian warmth (Japandi).",
    architecturalApproach:
      "We removed non-load-bearing masonry walls to merge the dark compartmentalized kitchen, dining room, and formal living area into a unified 48ft light-filled pavilion. Hand-finished micro-cement wall treatments contrast with warm white oak millwork.",
    team: {
      leadArchitect: "Shivashish Ranjan (Principal)",
      structuralEngineer: "Er. R. K. Choudhary",
      siteEngineer: "Er. Amit Raj (Senior Interior Supervisor)",
      stylingDirector: "Kumkum Ranjan"
    },
    keySpecs: [
      { label: "Woodwork Substrate", spec: "Century Club Prime BWP 710 Marine Ply" },
      { label: "Veneer Finish", spec: "Quarter-sawn White Oak veneer with zero-gloss PU seal" },
      { label: "Kitchen Counter", spec: "Silestone Charcoal Quartz with waterfall edge" },
      { label: "Flooring", spec: "Seamless concrete-look Italian vitrified tiles (1200x2400mm)" },
      { label: "Plumbing Fixtures", spec: "Kohler Purist matte black concealed thermostatic mixers" },
      { label: "Lighting Fixtures", spec: "Anti-glare recessed COB spotlights (CRI > 92)" }
    ],
    highlights: [
      "Seamless 48ft open-concept living and dining pavilion with unified ceiling planes",
      "Concealed prayer alcove (Puja Room) behind laser-cut wooden sliding screens",
      "Handcrafted dining table carved from a single slab of seasoned plantation teak",
      "Zero-water-leakage guarantee with multi-stage sunken slab crystalline treatment"
    ],
    deliverables: [
      "Detailed Spatial Floor Plans & 3D Photorealistic Interior Dossier",
      "Factory-Finished Joinery Inspection Log with PUR Edge-Band Verification",
      "10-Year Termite & Borer Warranty Certificate",
      "White-Glove Deep Cleaning & Move-In Staging Handover"
    ]
  },
  {
    id: "curated-5",
    slug: "deoghar-heritage-sanctuary",
    title: "The Deoghar Heritage Sanctuary",
    subtitle: "A modern spiritual retreat harmonizing basalt stone masonry, terracotta roof tiles, and quiet internal verandas.",
    category: "architecture",
    categoryLabel: "Architectural & 2D/3D Design",
    status: "completed",
    location: "Castairs Town, Deoghar",
    city: "Deoghar",
    state: "Jharkhand",
    area: "4,200 sq.ft.",
    plotSize: "7,200 sq.ft. (East-Facing)",
    year: "2024",
    duration: "9 Months",
    scope: "Master Vastu Planning • 3D Architectural Visualization • Structural Engineering",
    coverImage: "/generated/3d_split_villa_exterior.png",
    galleryImages: [
      "/generated/3d_split_villa_exterior.png",
      "/generated/2d_floor_plan.png",
      "/generated/3d_split_bedroom.png",
      "/generated/3d_elevation_hero.png",
      "/generated/legacy_villa.png",
      "/generated/inspiration_italian_tiles.jpg"
    ],
    clientBrief:
      "A peaceful retirement estate located near Deoghar designed to host visiting spiritual scholars and extended family gatherings. The architecture needed to evoke regional sacred traditions while offering modern HVAC insulation and universal accessibility.",
    architecturalApproach:
      "The residence wraps around an authentic central courtyard (Brahmasthan) flanked by covered pillared verandahs that facilitate natural cross-ventilation. Deep overhangs protect exposed local stone walls from heavy monsoon downpours.",
    team: {
      leadArchitect: "Shivashish Ranjan (Principal)",
      structuralEngineer: "Er. Alok Verma",
      siteEngineer: "Er. Sumit Sharma",
      stylingDirector: "Anjula Devi"
    },
    keySpecs: [
      { label: "Structural Framing", spec: "Earthquake-resistant RCC frame with Tata Tiscon Fe 550D" },
      { label: "Roofing", spec: "Sloped RCC slab lined with insulated terracotta clay tiles" },
      { label: "Cladding Stone", spec: "Locally sourced dressed Chotanagpur basalt & granite" },
      { label: "Joinery", spec: "Seasoned CP Teakwood frames and solid panel shutters" },
      { label: "Flooring", spec: "Leather-finish Kadappa limestone and Jaisalmer yellow marble" }
    ],
    highlights: [
      "Central Vastu-aligned open-to-sky courtyard with natural rainwater drainage",
      "Universal wheelchair-accessible ramps seamlessly integrated into the garden perimeter",
      "Passive cooling architecture reducing air-conditioning reliance by 35%",
      "Private meditation pavilion oriented precisely toward true magnetic East"
    ],
    deliverables: [
      "Complete Municipal Sanction Dossier & Vastu Compliance Audit",
      "360-Degree Virtual Reality Walkthrough & 4K Raytraced Renders",
      "Structural Working Drawings with Bar Bending Schedules (BBS)",
      "Itemized Material Procurement BOQ"
    ]
  },
  {
    id: "curated-6",
    slug: "dumka-modern-manor",
    title: "Dumka Modern Manor",
    subtitle: "A stately contemporary manor combining industrial steel elements with warm timber finishes in the heart of Santhal Pargana.",
    category: "turnkey",
    categoryLabel: "Turnkey Civil & Architecture",
    status: "ongoing",
    location: "Court Road, Dumka",
    city: "Dumka",
    state: "Jharkhand",
    area: "6,100 sq.ft.",
    plotSize: "8,500 sq.ft.",
    year: "2025",
    duration: "14 Months",
    scope: "Full Turnkey Build • Architectural Blueprints • Landscape Architecture",
    coverImage: "/generated/elevation_gallery_1.png",
    galleryImages: [
      "/generated/elevation_gallery_1.png",
      "/services/service_turnkey_1787300070398.jpg",
      "/generated/project_ongoing_1.png",
      "/generated/interior_gallery_1.png",
      "/generated/legacy_villa.png",
      "/generated/inspiration_wall_panelling.jpg"
    ],
    clientBrief:
      "A prominent regional surgeon required a landmark residence that reflects professional achievement, incorporating a private consulting clinic on the ground level with complete acoustic and physical privacy for the private family quarters above.",
    architecturalApproach:
      "We devised an L-shaped massing plan that cleanly segregates professional patient ingress from private family circulation. The upper levels feature expansive cantilevered family terraces overlooking private landscaped perimeter lawns.",
    team: {
      leadArchitect: "Shivashish Ranjan (Principal)",
      structuralEngineer: "Er. K. P. Singh",
      siteEngineer: "Er. Sandeep Soren (Resident Civil)",
      stylingDirector: "Kumkum Ranjan"
    },
    keySpecs: [
      { label: "RCC Structure", spec: "M25 Machine-Batched concrete with Fe 550D TMT rebar" },
      { label: "Masonry", spec: "AAC Autoclaved Aerated Concrete thermal insulation blocks" },
      { label: "Acoustic Partition", spec: "Double-stud soundproof drywall with Rockwool acoustic insulation" },
      { label: "Exterior Finish", spec: "External insulation finishing system (EIFS) & HPL exterior louvers" },
      { label: "Elevator", spec: "Gearless machine-room-less (MRL) 6-passenger automatic elevator" }
    ],
    highlights: [
      "Complete acoustic and spatial segregation of clinic and family residence",
      "6-passenger automatic glass elevator connecting all 3 levels",
      "Solar rooftop 10kW net-metered photovoltaic array with hybrid battery backup",
      "Full turnkey delivery including perimeter security, CCTV, and automated gates"
    ],
    deliverables: [
      "Certified Municipal Sanction Drawings & Structural Stability Certificates",
      "Complete MEP, HVAC & Medical Gas Piping Technical Layouts",
      "Legally Enforceable Master BOQ with Fixed Milestone Schedule",
      "10-Year Structural Stability Warranty Bond"
    ]
  }
];

export function getProjectByIdOrSlug(idOrSlug: string): ProjectDetail | undefined {
  return PROJECTS_CATALOG.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug || p.id.toLowerCase() === idOrSlug.toLowerCase()
  );
}
