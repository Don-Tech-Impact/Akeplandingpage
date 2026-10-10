import { Mail } from 'lucide-react';
import { SFLogo } from './SFUI';
import { NAVY, NAVY_DEEP, ORANGE, CONTACT_EMAIL } from './theme';

export function SFFooter() {
  const quickLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About', href: '/#about' },
    { label: 'Privacy', href: '/security' },
  ];

  return (
    <footer id="contact" style={{ background: NAVY, color: '#FFFFFF' }}>
      {/* Contact block */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SFLogo light />
          <h3 className="mt-6 font-bold" style={{ fontSize: 22 }}>Get in touch</h3>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-flex items-center gap-2 text-lg font-semibold"
            style={{ color: ORANGE }}
          >
            <Mail size={18} /> {CONTACT_EMAIL}
          </a>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We respond within 24 hours.
          </p>
        </div>

        <div className="md:text-right">
          <div className="text-xs font-bold uppercase mb-4" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>
            Quick Links
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
          <div>© {new Date().getFullYear()} AKEP Technologies. ScholarFlow is a product of AKEP Technologies.</div>
          <div>Built for African Research. Governed by Austrian Law.</div>
        </div>
      </div>
    </footer>
  );
}
