import { ArrowRight, Sparkles, FileSearch, Users, BarChart3 } from 'lucide-react';
import { GhostButton, PrimaryButton, SectionBadge } from './AkepUI';

export function AkepHero({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(107, 33, 245, 0.35) 0%, rgba(13, 11, 31, 0) 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(13, 11, 31, 0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        <SectionBadge>
          <Sparkles size={14} /> AI-powered research pipeline
        </SectionBadge>
        <h1
          className="mt-6 text-white max-w-4xl mx-auto"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
        >
          The dissertation platform built for{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #6B21F5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            modern universities
          </span>
        </h1>
        <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
          AKEP automates dissertation submissions, duplicate detection, supervisor matching, and
          reporting — so your faculty can focus on research, not paperwork.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton onClick={onPrimary}>
            <span className="flex items-center gap-2">
              Request a Demo <ArrowRight size={16} />
            </span>
          </PrimaryButton>
          <GhostButton onClick={onSecondary}>Join the Waitlist</GhostButton>
        </div>

        <div className="mt-20 relative max-w-5xl mx-auto">
          <div
            className="rounded-2xl border p-6 backdrop-blur-sm"
            style={{
              borderColor: 'rgba(107, 33, 245, 0.4)',
              background:
                'linear-gradient(135deg, rgba(20, 16, 43, 0.9) 0%, rgba(13, 11, 31, 0.9) 100%)',
              boxShadow: '0 0 80px rgba(107, 33, 245, 0.25)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: FileSearch,
                  title: '12,438',
                  sub: 'Dissertations indexed',
                  trend: '+24% this term',
                },
                {
                  icon: Users,
                  title: '342',
                  sub: 'Supervisors matched',
                  trend: '98% acceptance rate',
                },
                {
                  icon: BarChart3,
                  title: '0.4%',
                  sub: 'Duplicate rate detected',
                  trend: 'AI flagged 87 cases',
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border text-left"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <s.icon size={20} style={{ color: '#A78BFA' }} />
                  <div className="mt-3 text-white text-2xl">{s.title}</div>
                  <div className="text-white/60 text-sm">{s.sub}</div>
                  <div className="mt-2 text-xs" style={{ color: '#A78BFA' }}>
                    {s.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
