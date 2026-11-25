import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SFLogo } from './SFUI';
import { NAVY, ORANGE } from './theme';
import { useI18n } from '../../../i18n/I18nProvider';
import { LanguageSwitch } from '../../../i18n/LanguageSwitch';
import type { MessageKey } from '../../../i18n/en';

const SECTIONS: { label: MessageKey; id: string; page?: string }[] = [
  { label: 'nav.features', id: 'features' },
  { label: 'nav.dashboards', id: 'dashboards' },
  { label: 'nav.how', id: 'how-it-works' },
  { label: 'nav.universities', id: 'universities', page: '/universities' },
  { label: 'nav.security', id: 'security', page: '/security' },
  { label: 'nav.pricing', id: 'pricing', page: '/pricing' },
  { label: 'nav.about', id: 'about' },
  { label: 'nav.contact', id: 'contact' },
];

export function SFNav({ isHome = true, onDemo }: { isHome?: boolean; onDemo: () => void }) {
  const [scrolled, setScrolled] = useState(!isHome);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const { t, localizePath } = useI18n();

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const solid = scrolled;
  const linkHref = (id: string) => (isHome ? `#${id}` : `${localizePath('/')}#${id}`);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? NAVY : 'transparent',
        boxShadow: solid ? '0 2px 16px rgba(17,24,39,0.12)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>
        <a href={isHome ? '#top' : localizePath('/')} aria-label={t('nav.home')}>
          <SFLogo light />
        </a>

        <div className="hidden xl:flex items-center gap-4">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={s.page ? localizePath(s.page) : linkHref(s.id)}
              className="text-sm font-medium transition-colors"
              style={{
                color: active === s.id ? ORANGE : 'rgba(255,255,255,0.8)',
              }}
            >
              {t(s.label)}
            </a>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-4">
          <LanguageSwitch />
          <a
            href="https://dash.akepapp.com"
            className="text-sm font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {t('nav.signIn')}
          </a>
          <button
            onClick={onDemo}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: ORANGE, color: '#FFFFFF', boxShadow: '0 4px 14px rgba(232,137,43,0.4)' }}
          >
            {t('nav.demo')}
          </button>
        </div>

        <div className="flex xl:hidden items-center gap-3">
          <button
            onClick={onDemo}
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ background: ORANGE, color: '#FFFFFF' }}
          >
            {t('nav.demo')}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label={t('nav.menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            style={{ color: '#FFFFFF' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="xl:hidden px-6 pb-5 flex flex-col gap-1" style={{ background: NAVY }}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={s.page ? localizePath(s.page) : linkHref(s.id)}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              {t(s.label)}
            </a>
          ))}
          <a
            href="https://dash.akepapp.com"
            className="py-2.5 text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {t('nav.signIn')}
          </a>
          <LanguageSwitch />
        </div>
      )}
    </nav>
  );
}
