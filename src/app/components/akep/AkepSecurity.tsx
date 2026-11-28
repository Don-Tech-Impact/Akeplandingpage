import { ShieldCheck } from 'lucide-react';
import { INK, MUTED, BORDER, SectionEyebrow } from './AkepUI';
import { NAVY } from '../scholarflow/theme';
import { useI18n } from '../../../i18n/I18nProvider';

export function AkepSecurity() {
  const { t } = useI18n();
  return (
    <section id="security" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionEyebrow>{t('security.eyebrow')}</SectionEyebrow>
          <h1 className="mt-4 sf-page-title" style={{ color: NAVY }}>
            {t('security.title')}
          </h1>
          <p className="mt-5 sf-lead" style={{ color: MUTED }}>
            {t('security.body')}
          </p>
        </div>

        <div
          className="mx-auto max-w-4xl rounded-2xl p-8"
          style={{ background: '#F7F9FC', border: `1px solid ${BORDER}` }}
        >
          <h2 className="sf-card-title" style={{ color: NAVY }}>{t('security.topics')}</h2>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" style={{ color: MUTED }}>
            {[
              t('security.retention'),
              t('security.access'),
              t('security.hosting'),
              t('security.integration'),
              t('security.providers'),
              t('security.contracts'),
            ].map((topic) => (
              <li key={topic} className="flex items-center gap-3 rounded-lg bg-white p-4" style={{ border: `1px solid ${BORDER}`, color: INK }}>
                <ShieldCheck size={18} aria-hidden="true" className="shrink-0" style={{ color: '#E8892B' }} />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="mailto:hello@akepapp.com?subject=ScholarFlow%20security%20review"
            className="sf-btn inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
            style={{ background: '#E8892B', boxShadow: '0 8px 22px rgba(232,137,43,0.3)' }}
          >
            {t('security.contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
