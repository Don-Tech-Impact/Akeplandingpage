import { FileText, GraduationCap, Users } from 'lucide-react';
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
    icon: GraduationCap,
    title: 'Academic Background',
    body: 'The founding team brings postgraduate study and research experience in AI and cybersecurity.',
  },
  {
    icon: Users,
    title: 'Institutional Focus',
    body: 'ScholarFlow was developed after engagement with research offices across Africa.',
  },
];

export function SFTrust() {
  return (
    <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>About AKEP Technologies</Eyebrow>
          <SectionHeading>Meet the team and the thinking behind ScholarFlow</SectionHeading>
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
      </div>
    </section>
  );
}
