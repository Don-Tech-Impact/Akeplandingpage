import { INK, MUTED, PURPLE, BORDER, SectionEyebrow } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';

export function AkepSecurity() {
  const { t } = useI18n();
  return (
    <section id="security" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionEyebrow>{t('security.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            {t('security.title')}
          </h2>
          <p className="mt-4" style={{ color: MUTED }}>
            {t('security.body')}
          </p>
        </div>

        <div
          className="mx-auto max-w-4xl rounded-2xl p-8"
          style={{ background: '#F8F7FB', border: `1px solid ${BORDER}` }}
        >
          <h3 style={{ color: INK }}>{t('security.topics')}</h3>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" style={{ color: MUTED }}>
            {[
              t('security.retention'),
              t('security.access'),
              t('security.hosting'),
              t('security.integration'),
              t('security.providers'),
              t('security.contracts'),
            ].map((topic) => (
              <li key={topic} className="rounded-lg bg-white p-4" style={{ border: `1px solid ${BORDER}` }}>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="mailto:hello@akepapp.com?subject=ScholarFlow%20security%20review"
            className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: PURPLE }}
          >
            {t('security.contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
