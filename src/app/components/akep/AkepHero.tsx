import { ArrowRight, GraduationCap, BookOpen } from 'lucide-react';
import { AnimatedDemo } from './AnimatedDemo';
import { useState } from 'react';

const NAVY = '#0D1B3E';
const NAVY_MID = '#1A2E5A';
const GOLD = '#F59E0B';
const GOLD_LIGHT = '#FCD34D';

export function AkepHero({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);

  return (
    <section
      className="relative overflow-hidden pt-20 pb-0 px-6"
      style={{
        background: `linear-gradient(160deg, ${NAVY} 0%, #112247 45%, #0B1A38 100%)`,
      }}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(107,33,245,0.10) 0%, transparent 50%)',
        }}
      />

      {/* Decorative horizontal rule — gives it an academic document feel */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 40%, ${GOLD_LIGHT} 60%, transparent 100%)`, opacity: 0.6 }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Eyebrow — academic institution badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{
            background: 'rgba(245,158,11,0.12)',
            color: GOLD_LIGHT,
            border: '1px solid rgba(245,158,11,0.30)',
            letterSpacing: '0.12em',
          }}
        >
          <GraduationCap size={13} />
          Academic Research Management Platform
        </div>

        {/* Headline — Playfair Display for gravitas */}
        <h1
          className="max-w-4xl mx-auto leading-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
            lineHeight: 1.08,
            color: '#F0F4FF',
            letterSpacing: '-0.01em',
          }}
        >
          Graduate Research Management —{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: GOLD_LIGHT,
              fontWeight: 600,
            }}
          >
            Built for African Universities
          </em>
        </h1>

        {/* Divider rule */}
        <div className="mt-8 mb-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-24" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <BookOpen size={16} style={{ color: GOLD, opacity: 0.7 }} />
          <div className="h-px flex-1 max-w-24" style={{ background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Subheading — Inter, formal tone */}
        <p
          className="max-w-2xl mx-auto text-lg leading-relaxed"
          style={{ color: 'rgba(210,220,255,0.75)', fontWeight: 400 }}
        >
          ScholarFlow, a product of AKEP Technologies, helps universities coordinate postgraduate
          research submissions, supervision workflows, and progress reporting.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onPrimary}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: GOLD,
              color: NAVY,
              boxShadow: '0 8px 24px rgba(245,158,11,0.35)',
            }}
          >
            Book an Institutional Demo <ArrowRight size={16} />
          </button>
          <button
            onClick={onSecondary}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm border transition-all hover:bg-white/5"
            style={{
              borderColor: 'rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Discuss a Pilot
          </button>
        </div>

        {/* Product preview — flush to bottom, no gap */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Top fade from navy into the dark card */}
          <div
            className="absolute -inset-x-12 top-0 h-12 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,27,62,0.0) 0%, rgba(13,27,62,0) 100%)',
            }}
          />
          <div
            className="relative rounded-t-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderBottom: 'none',
              background: '#0D0B1F',
              boxShadow: '0 -20px 60px -10px rgba(107,33,245,0.20)',
              aspectRatio: '16 / 9',
            }}
          >
            <AnimatedDemo activeIndex={sceneIndex} onSelect={setSceneIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}
