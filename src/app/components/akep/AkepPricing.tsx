import { ArrowRight, Users, Server, LifeBuoy } from 'lucide-react';
import { INK, MUTED, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';
import { NAVY } from '../scholarflow/theme';
import { useI18n } from '../../../i18n/I18nProvider';

export function AkepPricing({ onCta }: { onCta: () => void }) {
  const { t } = useI18n();
  return (
    <section id="pricing" className="py-24 px-6" style={{ background: '#F7F9FC' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <SectionEyebrow>{t('pricing.eyebrow')}</SectionEyebrow>
          <h1 className="mt-4 sf-page-title" style={{ color: NAVY }}>
            {t('pricing.title')}
          </h1>
          <p className="mt-5 sf-lead" style={{ color: MUTED }}>
            {t('pricing.body')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: t('pricing.population'), Icon: Users },
            { label: t('pricing.deployment'), Icon: Server },
            { label: t('pricing.support'), Icon: LifeBuoy },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 rounded-2xl p-7 text-center"
              style={{ border: `1px solid ${BORDER}`, background: 'white', color: INK }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: PURPLE_SOFT }}>
                <Icon size={20} aria-hidden="true" style={{ color: NAVY }} />
              </span>
              <span className="font-semibold">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onCta}
            className="sf-btn inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white hover:opacity-95"
            style={{ background: '#E8892B', boxShadow: '0 8px 22px rgba(232,137,43,0.3)' }}
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
