import { ArrowRight } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, SectionEyebrow } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';

export function AkepPricing({ onCta }: { onCta: () => void }) {
  const { t } = useI18n();
  return (
    <section id="pricing" className="py-24 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <SectionEyebrow>{t('pricing.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            {t('pricing.title')}
          </h2>
          <p className="mt-4" style={{ color: MUTED }}>
            {t('pricing.body')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            t('pricing.population'),
            t('pricing.deployment'),
            t('pricing.support'),
          ].map((factor) => (
            <div
              key={factor}
              className="rounded-2xl p-6 text-center"
              style={{ border: `1px solid ${BORDER}`, background: 'white', color: INK }}
            >
              {factor}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: PURPLE }}
          >
            {t('pricing.cta')} <ArrowRight size={17} />
          </button>
          <p className="mt-4 text-sm" style={{ color: MUTED }}>
            {t('pricing.note')}
          </p>
        </div>
      </div>
    </section>
  );
}
