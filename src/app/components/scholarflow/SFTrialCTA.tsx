import { ArrowRight } from 'lucide-react';
import { NAVY, NAVY_DEEP, ORANGE, FONT_HEAD } from './theme';

export function SFTrialCTA({ onTrial }: { onTrial: () => void }) {
  const points = [
    'Full platform access — nothing restricted',
    'Onboarding workshop included',
    'Data export guaranteed at trial end',
  ];
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}
    >
      <svg className="pointer-events-none absolute bottom-0 left-0 opacity-30" width="360" height="360" viewBox="0 0 360 360" fill="none" aria-hidden="true">
        <path d="M0 360L180 0" stroke="rgba(232,137,43,0.2)" strokeWidth="2" />
        <path d="M0 300L120 0" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      </svg>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2
          style={{
            fontFamily: FONT_HEAD,
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}
        >
          90 Days. Free. No Risk.
        </h2>
        <p className="mt-4 text-lg font-medium" style={{ color: ORANGE }}>
          See what ScholarFlow does for your research office — before you commit to anything.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 mb-10">
          {points.map((p) => (
            <div
              key={p}
              className="rounded-xl px-4 py-4 text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {p}
            </div>
          ))}
        </div>

        <button
          onClick={onTrial}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-base transition-all hover:opacity-95"
          style={{ background: ORANGE, color: '#FFFFFF', boxShadow: '0 10px 30px rgba(232,137,43,0.45)' }}
        >
          Request Your Free Trial <ArrowRight size={18} />
        </button>

        <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Already spoken to us? Email{' '}
          <a href="mailto:hello@akepapp.com" className="font-semibold" style={{ color: '#FFFFFF' }}>
            hello@akepapp.com
          </a>{' '}
          to get started today.
        </p>
      </div>
    </section>
  );
}
