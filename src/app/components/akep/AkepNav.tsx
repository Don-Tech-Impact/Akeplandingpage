import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AkepLogo, PrimaryButton, BORDER, INK } from './AkepUI';

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
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <AkepLogo />
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm flex items-center gap-1 transition-colors"
              style={{ color: '#3F3F52' }}
            >
              {l.label}
              {l.label === 'Platform' && <ChevronDown size={14} />}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: INK }}
          >
            Sign in
          </a>
          <PrimaryButton onClick={onCta}>Get started</PrimaryButton>
        </div>
        <button
          className="md:hidden"
          style={{ color: INK }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-3"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-sm"
              style={{ color: INK }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <PrimaryButton onClick={onCta}>Get started</PrimaryButton>
        </div>
      )}
    </nav>
  );
}
