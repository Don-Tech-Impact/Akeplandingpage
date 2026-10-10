import { Eyebrow, SectionHeading } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, TINT, MUTED } from './theme';

const steps = [
  {
    week: 'Week 1',
    title: 'Setup',
    body: 'We configure your account, run a 2-hour onboarding workshop with your team, and load your active dissertation projects.',
  },
  {
    week: 'Weeks 2\u20134',
    title: 'Activation',
    body: 'Supervisors and students begin using the platform alongside existing processes. Data starts flowing.',
  },
  {
    week: 'Weeks 5\u20137',
    title: 'Full Operation',
    body: 'ScholarFlow becomes your primary tool. Dashboards populate with real institutional data.',
  },
  {
    week: 'Week 8',
    title: 'Evaluation',
    body: 'We present a full performance report. Your decision: continue, expand, or walk away \u2014 with all your data exported.',
  },
];

export function SFHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: TINT }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow>How It Works</Eyebrow>
          <SectionHeading>From Day One to Full Operation in 8 Weeks</SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="relative rounded-2xl p-6 h-full" style={{ background: '#FFFFFF' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4"
                  style={{ background: ORANGE, color: '#FFFFFF' }}
                >
                  {i + 1}
                </div>
                <div className="text-xs font-bold uppercase mb-1" style={{ color: ORANGE, letterSpacing: '0.1em' }}>
                  {s.week}
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY, fontSize: 18 }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center mt-12 font-bold" style={{ color: NAVY, fontSize: 18 }}>
          Zero cost. No contract. No lock-in.
        </p>
      </div>
    </section>
  );
}
