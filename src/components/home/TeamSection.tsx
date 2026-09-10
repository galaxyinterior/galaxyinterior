'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Quote, 
  Users, 
  MapPin, 
  Building2 
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  shortBio: string;
  image?: string;
  initials: string;
}

const EXECUTIVE_TEAM: TeamMember[] = [
  {
    name: 'Kumkum Ranjan',
    role: 'Chief Executive Officer',
    shortBio: 'Drives operational excellence across all regional hubs, ensuring client delivery standards and team alignment.',
    initials: 'KR'
  },
  {
    name: 'Ratan Kumar',
    role: 'General Manager',
    shortBio: 'Oversees day-to-day project execution, vendor coordination, and construction milestone compliance.',
    initials: 'RK'
  },
  {
    name: 'Anjula Devi',
    role: 'Managing Director',
    shortBio: 'Leads strategic expansion, financial governance, and long-term brand partnerships across Eastern India.',
    initials: 'AD'
  }
];

export default function TeamSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0c121e] text-white border-b border-white/10 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Leadership &amp; Architecture Team</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-white leading-[1.1] mb-5">
            The People Behind <br />
            <span className="text-gold-gradient font-editorial italic">The Spaces.</span>
          </h2>
          <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
            Galaxy Interior was built on a simple conviction: families deserve transparent, stress-free home building.
            Our leadership team brings that vision to every square foot we craft.
          </p>
        </div>

        {/* Founder Feature — Full Width */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Founder Portrait */}
            <div className="lg:col-span-5 relative h-[400px] lg:h-[560px] overflow-hidden">
              <Image
                src="/ceo.png"
                alt="Shivashish Ranjan — Founder & Chairman, Galaxy Interior"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-transparent to-transparent opacity-60 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0c121e]/40" />
            </div>

            {/* Founder Bio */}
            <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold font-bold">
                  Founder &amp; Chairman
                </span>
                <span className="h-px flex-grow bg-white/10" />
                <span className="text-xs font-mono text-gray-500">Est. 2021</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-editorial font-normal text-white mb-6 leading-tight">
                Shivashish Ranjan
              </h3>

              <div className="relative mb-8">
                <Quote className="w-8 h-8 text-brand-gold/30 absolute -top-2 -left-2" />
                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed italic pl-8">
                  &ldquo;Every family dreams of a home that truly reflects who they are. We exist to make that dream a documented, transparent, and joyful reality — not a stressful gamble with local contractors.&rdquo;
                </p>
              </div>

              <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                Shivashish founded Galaxy Interior in 2021 with a vision to professionalize residential architecture and interior execution in Eastern India. Under his leadership, the studio has grown from a single office in Bhagalpur to 11 operational hubs across Jharkhand, Bihar, and West Bengal — delivering over 120 luxury residences with zero-escalation contracts and daily site accountability.
              </p>

              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Building2 className="w-4 h-4 text-brand-gold" />
                  <span>11 Regional Offices</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <span>Jharkhand • Bihar • West Bengal</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Users className="w-4 h-4 text-brand-gold" />
                  <span>20+ In-House Specialists</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Leadership Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
              Executive Leadership
            </span>
            <Link
              href="/about"
              data-cursor-tooltip="about-team"
              className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-gold hover:text-white transition-colors inline-flex items-center gap-1 cursor-target"
            >
              <span>Full Team &amp; Story</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXECUTIVE_TEAM.map((member, idx) => (
              <div
                key={member.name}
                data-cursor-tooltip="team-member"
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-brand-gold/40 transition-all duration-300 cursor-target group"
              >
                {/* Avatar / Initials */}
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-editorial text-2xl font-bold mb-5">
                  {member.initials}
                </div>

                <h4 className="text-xl font-editorial font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">
                  {member.name}
                </h4>
                <div className="text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 font-semibold mb-4">
                  {member.role}
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {member.shortBio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
