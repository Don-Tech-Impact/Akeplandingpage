import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AkepLogo } from './AkepUI';

const NAV_BG = '#0D1B3E';
const NAV_BORDER = 'rgba(255,255,255,0.08)';
const GOLD = '#F59E0B';

export function AkepNav({ onCta }: { onCta: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Platform', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Demo', href: '#demo' },
    { label: 'Customers', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className="sticky top-0 z-40"
      style={{
        backgroundColor: NAV_BG,
        borderBottom: `1px solid ${NAV_BORDER}`,
        boxShadow: '0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <AkepLogo dark />
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#"
            className="text-sm transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Sign in
          </a>
          <button
            onClick={onCta}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: GOLD,
              color: '#0D1B3E',
              boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
            }}
          >
            Get started
          </button>
        </div>
        <button
          className="md:hidden transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-3"
          style={{ borderTop: `1px solid ${NAV_BORDER}` }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.70)' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onCta}
            className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: GOLD, color: '#0D1B3E' }}
          >
            Get started
          </button>
        </div>
      )}
    </nav>
  );
}

