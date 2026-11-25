import { ArrowRight } from 'lucide-react';
import { PrimaryCTA, OutlineCTA } from './SFUI';
import { DashboardMockup } from './DashboardMockup';
import { NAVY, NAVY_DEEP, ORANGE, FONT_HEAD } from './theme';
import { useI18n } from '../../../i18n/I18nProvider';

export function SFHero({ onPilot, onDemo }: { onPilot: () => void; onDemo: () => void }) {
  const { t } = useI18n();
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6"
      style={{
        background: `linear-gradient(165deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
        paddingTop: 128,
        paddingBottom: 80,
      }}
    >
      {/* Geometric accent — diagonal lines, upper right */}
      <svg
        className="pointer-events-none absolute top-0 right-0 opacity-40"
        width="480" height="480" viewBox="0 0 480 480" fill="none" aria-hidden="true"
      >
        <path d="M480 0L200 480" stroke="rgba(232,137,43,0.25)" strokeWidth="2" />
        <path d="M480 80L280 480" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <path d="M480 160L360 480" stroke="rgba(232,137,43,0.15)" strokeWidth="2" />
      </svg>

      <div className="relative max-w-4xl mx-auto text-center">
        <span
          className="inline-block text-xs font-bold uppercase mb-6"
          style={{ color: ORANGE, letterSpacing: '0.16em' }}
        >
          {t('hero.eyebrow')}
        </span>

        <h1
          className="mx-auto"
          style={{
            fontFamily: FONT_HEAD,
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            lineHeight: 1.08,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            animation: 'sfHeroIn 0.6s ease both',
          }}
        >
          {t('hero.title')}
        </h1>

        <p
          className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
          style={{ color: 'rgba(226,235,247,0.8)' }}
        >
          {t('hero.body')}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <PrimaryCTA onClick={onDemo}>
            {t('hero.demo')} <ArrowRight size={17} />
          </PrimaryCTA>
          <OutlineCTA light onClick={onPilot}>
            {t('hero.pilot')}
          </OutlineCTA>
        </div>

        <p className="mt-5 text-sm" style={{ color: 'rgba(226,235,247,0.6)' }}>
          {t('hero.note')}
        </p>

        <div className="mt-14">
          <DashboardMockup />
        </div>
      </div>

      <style>{`
        @keyframes sfHeroIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
