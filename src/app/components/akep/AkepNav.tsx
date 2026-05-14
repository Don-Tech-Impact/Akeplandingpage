import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AkepLogo, PrimaryButton } from './AkepUI';

export function AkepNav({ onCta }: { onCta: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Demo', href: '#demo' },
    { label: 'Use cases', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'rgba(13, 11, 31, 0.7)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <AkepLogo />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <PrimaryButton onClick={onCta}>Join the Waitlist</PrimaryButton>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-white/5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 py-2"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <PrimaryButton onClick={onCta}>Join the Waitlist</PrimaryButton>
        </div>
      )}
    </nav>
  );
}
