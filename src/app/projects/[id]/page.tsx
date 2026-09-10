import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Shield,
  PhoneCall,
  Sparkles,
  Building,
  Ruler,
  Check,
  UserCheck
} from "lucide-react";
import type { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { PROJECTS_CATALOG, getProjectByIdOrSlug, ProjectDetail } from "@/data/projectsCatalog";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return {
      title: "Landmark Project | Galaxy Interior India",
      description: "Explore bespoke residential architecture and luxury interiors by Galaxy Interior India."
    };
  }

  return {
    title: `${project.title} | Galaxy Interior India`,
    description: `${project.subtitle} Located in ${project.location}. Scope: ${project.scope}.`,
    openGraph: {
      title: `${project.title} | Galaxy Interior India`,
      description: project.subtitle,
      url: `https://galaxyinteriorindia.com/projects/${project.id}`,
      siteName: "Galaxy Interior India",
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    }
  };
}

async function fetchProject(id: string): Promise<ProjectDetail | undefined> {
  // 1. Check local catalog first
  const localProject = getProjectByIdOrSlug(id);
  if (localProject) {
    return localProject;
  }

  // 2. If not found locally, query Firestore
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as any;
      return {
        id: docSnap.id,
        slug: docSnap.id,
        title: data.projectName || data.title || "Custom Residence",
        subtitle: data.subtitle || data.description || "Architectural project executed by Galaxy Interior.",
        category: data.category || "turnkey",
        categoryLabel: data.categoryLabel || "Turnkey Architecture & Build",
        status: data.status?.toLowerCase() || "completed",
        location: data.location || "Eastern Region, India",
        city: data.city || data.location?.split(",")[0]?.trim() || "Regional Hub",
        state: data.state || "Jharkhand / Bihar",
        area: data.areaSqft ? `${data.areaSqft} sq.ft.` : data.area || "4,000 sq.ft.",
        plotSize: data.plotSize || "Custom Residential Plot",
        year: data.year || "2024",
        duration: data.duration || "10 Months",
        scope: data.scope || data.requirements || "Architectural Design • Civil Engineering • Interior Joinery",
        coverImage: data.coverImageUrl || data.image || "/generated/legacy_villa.png",
        galleryImages: data.galleryImages || [
          data.coverImageUrl || data.image || "/generated/legacy_villa.png",
          "/generated/interior_gallery_1.png",
          "/generated/3d_elevation_hero.png",
          "/generated/3d_split_villa_exterior.png"
        ],
        clientBrief: data.description || data.requirements || "A tailored architectural residence commissioned to balance timeless elegance with modern living requirements.",
        architecturalApproach: data.architecturalApproach || "Conceived with strict adherence to Vastu Shastra, natural daylighting, and seismic structural engineering standards.",
        team: {
          leadArchitect: data.leadArchitect || "Shivashish Ranjan (Principal)",
          structuralEngineer: "Galaxy Senior Structural Bureau",
          siteEngineer: "Resident Civil Engineer In-Charge",
          stylingDirector: "Galaxy Interior Styling Bureau"
        },
        keySpecs: [
          { label: "Structural Rebar", spec: "Primary Fe 550D TMT Reinforcement" },
          { label: "Concrete Mix", spec: "M25 Tested Design-Mix Concrete" },
          { label: "Joinery Core", spec: "Century Club Prime BWP 710 Marine Plywood" },
          { label: "Hardware Standards", spec: "German Hettich / Hafele Soft-Close Fittings" },
          { label: "Flooring", spec: "Italian Marble & High-Gloss Vitrified Tiles" },
          { label: "Warranty", spec: "10-Year Written Structural Stability Bond" }
        ],
        highlights: data.highlights || [
          "Vastu-compliant layout optimizing cross-ventilation and thermal comfort",
          "Dedicated resident engineer on-site daily ensuring drawing tolerances",
          "10-Year written structural and interior timber warranty"
        ],
        deliverables: [
          "Sanctioned Architectural Blueprints & 3D Photorealistic Dossier",
          "Master Zero-Escalation Itemized BOQ Contract",
          "Comprehensive Warranty Documentation & Key Handover"
        ]
      };
    }
  } catch (err) {
    console.warn("Error fetching project from Firestore:", err);
  }

  // 3. Fallback to first catalog project if unresolvable ID
  return PROJECTS_CATALOG[0];
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    notFound();
  }

  // Related projects
  const relatedProjects = PROJECTS_CATALOG.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-32 pb-24 bg-[#0c121e] text-[#faf8f5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            <Link href="/projects" className="hover:text-[#c89d28] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#c89d28]">{project.categoryLabel}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 text-[11px] font-semibold tracking-wider uppercase text-[#c89d28] backdrop-blur-sm">
              {project.categoryLabel}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-[11px] font-semibold tracking-wider uppercase text-white flex items-center gap-1.5 backdrop-blur-sm">
              {project.status === "completed" ? (
                <CheckCircle2 size={13} className="text-emerald-400" />
              ) : (
                <Clock size={13} className="text-[#c89d28]" />
              )}
              {project.status === "completed" ? "Completed Landmark" : "Under Active Construction"}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            {project.title}
          </h1>
          <p className="text-gray-300 text-lg sm:text-2xl font-light max-w-3xl leading-relaxed mb-10">
            {project.subtitle}
          </p>

          {/* Location & Scope Pill */}
          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10 text-xs sm:text-sm font-light text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c89d28]" />
              <span className="font-medium text-white">{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#c89d28]" />
              <span>Built-Up: <strong className="text-white font-medium">{project.area}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c89d28]" />
              <span>Handover: <strong className="text-white font-medium">{project.year}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL BRIEF & SPEC MATRIX */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Narrative */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                The Client Brief
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#0c121e] mb-4">
                Lifestyle Vision &amp; Spatial Goals
              </h2>
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed">
                {project.clientBrief}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
                Architectural Response
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#0c121e] mb-4">
                Engineering &amp; Vastu Philosophy
              </h2>
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed">
                {project.architecturalApproach}
              </p>
            </div>

            {/* Signature Highlights */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-4">
                Key Architectural Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.highlights.map((h, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-black/5 flex items-start gap-3 shadow-sm">
                    <Check className="w-4 h-4 text-[#c89d28] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <h3 className="font-serif text-2xl text-[#0c121e] mb-6 pb-4 border-b border-black/5">
                Technical Specifications
              </h3>

              <div className="space-y-4">
                {project.keySpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex flex-col pb-3 border-b border-black/5 last:border-b-0 last:pb-0">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
                      {spec.label}
                    </span>
                    <span className="text-sm font-medium text-[#0c121e] mt-0.5">
                      {spec.spec}
                    </span>
                  </div>
                ))}
              </div>

              {/* Studio Team Credits */}
              <div className="mt-8 pt-6 border-t border-black/5">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#c89d28] mb-4 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" /> Studio Credits
                </h4>
                <div className="space-y-2 text-xs text-gray-600 font-light">
                  <p><strong className="text-[#0c121e]">Lead Architect:</strong> {project.team.leadArchitect}</p>
                  <p><strong className="text-[#0c121e]">Structural:</strong> {project.team.structuralEngineer}</p>
                  <p><strong className="text-[#0c121e]">Site Lead:</strong> {project.team.siteEngineer}</p>
                  <p><strong className="text-[#0c121e]">Interiors:</strong> {project.team.stylingDirector}</p>
                </div>
              </div>

              {/* Consultation Button */}
              <Link
                href={`/contact?project=${encodeURIComponent(project.title)}`}
                className="mt-8 w-full block py-4 rounded-full bg-[#0c121e] hover:bg-black text-[#faf8f5] text-center font-semibold text-xs tracking-widest uppercase transition-all shadow-md"
              >
                Inquire About Similar Build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIGH-RES PHOTOGRAPHIC GALLERY */}
      <section className="py-20 bg-[#0c121e] text-[#faf8f5] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-3">
              Photographic Archive
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
              Spaces as Built &amp; Handed Over
            </h2>
            <p className="text-gray-400 font-light mt-4 text-base">
              A visual walkthrough of structural facades, bespoke joinery details, and delivered living salons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.galleryImages.map((imgSrc, index) => (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 group ${
                  index === 0 ? "md:col-span-2 md:row-span-2 h-[560px]" : "h-68"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`${project.title} Photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DELIVERABLES & GUARANTEES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-black/5 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-2">
              Contractual Assurance
            </p>
            <h3 className="font-serif text-3xl text-[#0c121e]">
              Dossier Deliverables &amp; Warranty
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.deliverables.map((del, dIdx) => (
              <div key={dIdx} className="p-6 rounded-2xl bg-[#faf8f5] border border-black/5">
                <Shield className="w-6 h-6 text-[#c89d28] mb-3" />
                <p className="text-sm font-medium text-[#0c121e] leading-relaxed">{del}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELATED PROJECTS */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-black/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89d28] mb-2">
              Explore More
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#0c121e]">
              Related Residences
            </h3>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#0c121e] hover:text-[#c89d28] transition-colors"
          >
            All Portfolio Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.id}
              href={`/projects/${rel.id || rel.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-60 w-full overflow-hidden bg-black/5">
                <Image
                  src={rel.coverImage}
                  alt={rel.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-[#0c121e]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#c89d28]">
                  {rel.categoryLabel}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                  {rel.location}
                </p>
                <h4 className="font-serif text-xl text-[#0c121e] group-hover:text-[#c89d28] transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-gray-600 text-xs font-light line-clamp-2">
                  {rel.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Commission a Landmark
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-8 leading-tight">
            Envisioning a Similar Residence?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a private architectural consultation with Shivashish Ranjan and our principal design directors. We review your plot and develop a custom feasibility study.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href={`/contact?project=${encodeURIComponent(project.title)}`}
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Discuss Your Project
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Call +91 70044 65611
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
