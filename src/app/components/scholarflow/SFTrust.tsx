import { FileText, BadgeCheck, Network } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, MUTED } from './theme';

const creds = [
  {
    icon: FileText,
    title: 'Published Research',
    body: '\u201CZero-Trust Boot Protocol for IoT Devices\u201D presented at ECCS 2026, European Conference on Cyber Security, Vienna, Austria.',
  },
  {
    icon: BadgeCheck,
    title: 'ISO 27001 Lead Auditor',
    body: 'Certified February 2026. ScholarFlow is built on information security controls aligned with international standards.',
  },
  {
    icon: Network,
    title: 'Designed with the ARUA & ACU Networks',
    body: 'ScholarFlow was developed with direct input from research administrators across the African Research University Alliance and Association of Commonwealth Universities networks.',
  },
];

export function SFTrust() {
  return (
    <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Why Trust Us</Eyebrow>
          <SectionHeading>Built by Researchers, for Research Institutions</SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creds.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="rounded-2xl p-7 h-full" style={{ border: cardBorder }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(232,137,43,0.12)' }}
                >
                  <c.icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY, fontSize: 18 }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 mt-14 text-sm font-semibold tracking-wide" style={{ color: MUTED }}>
          <span>ARUA</span>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <span>ACU</span>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <span>WACREN</span>
        </div>
      </div>
    </section>
  );
}
