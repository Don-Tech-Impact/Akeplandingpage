import { LayoutDashboard, ScanSearch, Workflow, GraduationCap, BarChart3, Lock } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, MUTED } from './theme';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Real-Time Progress Dashboards',
    body: 'See every student\u2019s dissertation stage at a glance. No more chasing updates by email.',
  },
  {
    icon: ScanSearch,
    title: 'AI Plagiarism Screening',
    body: 'Automated similarity detection runs on every submission before supervisor review. Consistent, fast, auditable.',
  },
  {
    icon: Workflow,
    title: 'Supervisor Workflow Tools',
    body: 'Structured feedback requests, revision tracking, and permanent archived communication threads \u2014 not WhatsApp.',
  },
  {
    icon: GraduationCap,
    title: 'Student Progress Portal',
    body: 'Each student sees their current stage, deadlines, and supervisor feedback history in one place.',
  },
  {
    icon: BarChart3,
    title: 'Research Office Analytics',
    body: 'Institution-wide reports: completion rates, bottlenecks, supervisor workload \u2014 all exportable.',
  },
  {
    icon: Lock,
    title: 'Secure Data Storage',
    body: 'ISO 27001-aligned controls. All data encrypted at rest and in transit. Role-based access across departments.',
  },
];

export function SFFeatures() {
  return (
    <section id="features" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>The Platform</Eyebrow>
          <SectionHeading>Everything Your Research Office Needs, In One Place</SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 100}>
              <div
                className="rounded-2xl p-7 h-full transition-shadow hover:shadow-lg"
                style={{ border: cardBorder, background: '#FFFFFF' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: NAVY }}
                >
                  <f.icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY, fontSize: 18 }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
