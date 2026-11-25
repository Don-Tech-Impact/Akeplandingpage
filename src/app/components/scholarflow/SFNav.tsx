import { useEffect, useRef, useState } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t, localizePath } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target) && !menuButtonRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4" style={{ height: 72 }}>
        <a href={isHome ? '#top' : localizePath('/')} aria-label={t('nav.home')} className="shrink-0">
          <SFLogo light />
        </a>

        <div className="hidden 2xl:flex items-center gap-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={s.page ? localizePath(s.page) : linkHref(s.id)}
              className="text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                color: active === s.id ? ORANGE : 'rgba(255,255,255,0.8)',
              }}
            >
              {t(s.label)}
            </a>
          ))}
        </div>

        <div className="hidden 2xl:flex items-center gap-3 shrink-0">
          <LanguageSwitch />
          <a
            href="https://dash.akepapp.com"
            className="text-sm font-medium transition-colors whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {t('nav.signIn')}
          </a>
          <button
            onClick={onDemo}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: ORANGE, color: '#FFFFFF', boxShadow: '0 4px 14px rgba(232,137,43,0.4)' }}
          >
            {t('nav.demo')}
          </button>
        </div>

        <div className="flex 2xl:hidden items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSwitch />
          <button
            onClick={onDemo}
            className="hidden sm:block px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ background: ORANGE, color: '#FFFFFF' }}
          >
            {t('nav.demo')}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={t('nav.menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ color: '#FFFFFF' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="2xl:hidden absolute top-[72px] right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-xs rounded-xl p-4 flex flex-col gap-1 max-h-[calc(100dvh-88px)] overflow-y-auto"
          style={{ background: NAVY, boxShadow: '0 12px 30px rgba(0,0,0,0.25)' }}
        >
          <button onClick={() => { setOpen(false); onDemo(); }} className="sm:hidden py-2.5 text-left text-sm font-semibold" style={{ color: ORANGE }}>
            {t('nav.demo')}
          </button>
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
        </div>
      )}
    </nav>
  );
}
