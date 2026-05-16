import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GhostButton, PrimaryButton, INK, MUTED, PURPLE, BORDER } from './AkepUI';
import { AnimatedDemo } from './AnimatedDemo';
import { useState } from 'react';

export function AkepHero({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);

  return (
    <section className="relative overflow-hidden pt-16 pb-24 px-6" style={{ background: 'white' }}>
      <div
        className="pointer-events-none absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(107, 33, 245, 0.12) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
          style={{
            background: '#F3EFFF',
            color: PURPLE,
            border: `1px solid ${BORDER}`,
          }}
        >
          <Sparkles size={14} /> Introducing AKEP for African universities
        </div>
        <h1
          className="mt-6 max-w-4xl mx-auto"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05,
            color: INK,
            letterSpacing: '-0.02em',
          }}
        >
          The research and dissertation platform{' '}
          <span style={{ color: PURPLE }}>built for modern universities</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: MUTED }}>
          AKEP automates dissertation submissions, AI duplicate detection, supervisor matching, and
          academic reporting — so faculty spend less time on paperwork and more on research.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <PrimaryButton onClick={onPrimary}>
            <span className="flex items-center gap-2">
              Request a demo <ArrowRight size={16} />
            </span>
          </PrimaryButton>
          <GhostButton onClick={onSecondary}>Join the waitlist</GhostButton>
        </div>
        <div
          className="mt-6 flex items-center justify-center gap-2 text-sm"
          style={{ color: MUTED }}
        >
          <ShieldCheck size={14} style={{ color: PURPLE }} /> FERPA & GDPR-ready · SSO included
        </div>

        <div className="mt-16 relative max-w-5xl mx-auto">
          <div
            className="absolute inset-0 -m-6 rounded-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(107,33,245,0.15) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${BORDER}`,
              background: '#0D0B1F',
              boxShadow: '0 30px 60px -20px rgba(11, 4, 32, 0.25)',
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
