import { Mail } from 'lucide-react';
import { SFLogo } from './SFUI';
import { NAVY, NAVY_DEEP, ORANGE, CONTACT_EMAIL } from './theme';
import { useI18n } from '../../../i18n/I18nProvider';
import { LanguageSwitch } from '../../../i18n/LanguageSwitch';

export function SFFooter() {
  const { t, language, localizePath } = useI18n();
  const quickLinks = [
    { label: t('nav.features'), href: `${localizePath('/')}#features` },
    { label: t('nav.how'), href: `${localizePath('/')}#how-it-works` },
    { label: t('nav.about'), href: `${localizePath('/')}#about` },
    { label: t('nav.security'), href: localizePath('/security') },
    { label: t('nav.pricing'), href: localizePath('/pricing') },
  ];

  return (
    <footer id="contact" style={{ background: NAVY, color: '#FFFFFF' }}>
      {/* Contact block */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SFLogo light />
          <h3 className="mt-6 font-bold" style={{ fontSize: 22 }}>{t('footer.contact')}</h3>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-flex items-center gap-2 text-lg font-semibold"
            style={{ color: ORANGE }}
          >
            <Mail size={18} /> {CONTACT_EMAIL}
          </a>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {t('footer.response')}
          </p>
        </div>

        <div className="md:text-right">
          <div className="text-xs font-bold uppercase mb-4" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>
            {t('footer.links')}
          </div>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm transition-colors hover:opacity-100" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: NAVY_DEEP }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <div>{t('footer.product', { year: new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en', { useGrouping: false }).format(new Date().getFullYear()) })}</div>
          <div>{t('footer.law')}</div>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
