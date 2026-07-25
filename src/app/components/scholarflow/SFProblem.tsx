import { EyeOff, MessageSquareOff, ShieldAlert } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, TINT, MUTED, INK } from './theme';

const pains = [
  {
    icon: EyeOff,
    title: 'No visibility',
    body: 'Research Directors cannot see, in real time, how many students are at which dissertation stage. Decisions are made on guesswork.',
  },
  {
    icon: MessageSquareOff,
    title: 'Supervision is unstructured',
    body: 'Feedback lives in email threads. Revision history is lost. Students wait weeks for responses with no system tracking progress.',
  },
  {
    icon: ShieldAlert,
    title: 'Plagiarism checking is inconsistent',
    body: 'Free online tools are used inconsistently. There is no institutional audit trail, no automated workflow, no assurance of coverage.',
  },
];

export function SFProblem() {
  return (
    <section id="problem" className="py-24 px-6" style={{ background: TINT }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>The Problem</Eyebrow>
          <SectionHeading>How Dissertation Management Works Today</SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="rounded-2xl p-7 h-full" style={{ background: '#FFFFFF', border: cardBorder }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(232,137,43,0.12)' }}
                >
                  <p.icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY, fontSize: 19 }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center mt-12 font-bold" style={{ color: NAVY, fontSize: 20 }}>
          ScholarFlow solves all three.
        </p>
        <p className="sr-only" style={{ color: INK }}>Dissertation management for university research offices in Africa.</p>
      </div>
    </section>
  );
}
