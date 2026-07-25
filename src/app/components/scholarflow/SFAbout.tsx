import { Eyebrow, SectionHeading } from './SFUI';
import { NAVY, ORANGE, TINT, MUTED, INK } from './theme';

const facts = [
  ['Founded', '2023'],
  ['Founder', 'Abdulai Tamba Lebbie'],
  ['Academic credentials', 'MSc AI & Cybersecurity — University of Udine (Italy) + University of Klagenfurt (Austria)'],
  ['Published', 'ECCS 2026, Vienna'],
  ['Certification', 'ISO 27001 Lead Auditor'],
  ['Technology', 'FastAPI · Next.js 15 · PostgreSQL/pgvector · AWS · Docker'],
];

export function SFAbout() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <Eyebrow>About AKEP Technologies</Eyebrow>
          <SectionHeading>We Build AI Infrastructure for African Research</SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
            AKEP Technologies is an AI-focused technology company founded in 2023. ScholarFlow is
            our flagship product, built after direct engagement with research offices across
            Africa. We believe the infrastructure managing African research should be as ambitious
            as the research itself.
          </p>

          <div className="rounded-2xl p-7" style={{ background: TINT }}>
            <dl className="space-y-4">
              {facts.map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="w-40 flex-shrink-0 text-sm font-bold" style={{ color: NAVY }}>{k}</dt>
                  <dd className="text-sm" style={{ color: INK }}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 h-1 w-16 rounded-full" style={{ background: ORANGE }} />
          </div>
        </div>
      </div>
    </section>
  );
}
