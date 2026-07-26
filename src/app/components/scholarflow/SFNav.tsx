import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SFLogo } from './SFUI';
import { NAVY, ORANGE } from './theme';

const SECTIONS = [
  { label: 'Features', id: 'features' },
  { label: 'Dashboards', id: 'dashboards' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export function SFNav({ isHome = true, onTrial }: { isHome?: boolean; onTrial: () => void }) {
  const [scrolled, setScrolled] = useState(!isHome);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

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
  const linkHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? NAVY : 'transparent',
        boxShadow: solid ? '0 2px 16px rgba(17,24,39,0.12)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>
        <a href={isHome ? '#top' : '/'} aria-label="ScholarFlow home">
          <SFLogo light />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={linkHref(s.id)}
              className="text-sm font-medium transition-colors"
              style={{
                color: active === s.id ? ORANGE : 'rgba(255,255,255,0.8)',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://dash.akepapp.com"
            className="text-sm font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Sign in
          </a>
          <button
            onClick={onTrial}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: ORANGE, color: '#FFFFFF', boxShadow: '0 4px 14px rgba(232,137,43,0.4)' }}
          >
            Start Free Trial
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onTrial}
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ background: ORANGE, color: '#FFFFFF' }}
          >
            Free Trial
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{ color: '#FFFFFF' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-1" style={{ background: NAVY }}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={linkHref(s.id)}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              {s.label}
            </a>
          ))}
          <a
            href="https://dash.akepapp.com"
            className="py-2.5 text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Sign in
          </a>
        </div>
      )}
    </nav>
  );
}
