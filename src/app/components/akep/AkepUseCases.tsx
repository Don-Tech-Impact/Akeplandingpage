import { GraduationCap, Building2, BookOpen, Microscope } from 'lucide-react';
import { SectionBadge } from './AkepUI';

const cases = [
  {
    icon: Building2,
    title: 'Research Offices',
    desc: 'Centralize every dissertation, defense schedule, and supervisor assignment in one place.',
  },
  {
    icon: GraduationCap,
    title: 'Deans & Program Directors',
    desc: 'Real-time visibility into program health, completion rates, and supervisor workload.',
  },
  {
    icon: BookOpen,
    title: 'Faculty & Supervisors',
    desc: 'Skip the email chains. See your assigned students, deadlines, and review queue in one feed.',
  },
  {
    icon: Microscope,
    title: 'Doctoral Schools',
    desc: 'Track multi-year PhD pipelines with milestones, committees, and publication tracking.',
  },
];

export function AkepUseCases() {
  return (
    <section id="use-cases" className="py-24 px-6" style={{ backgroundColor: '#0D0B1F' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge>🎓 Use cases</SectionBadge>
          <h2 className="mt-6 text-white">Made for every role in academic research</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className="rounded-xl border p-8 flex gap-5 transition-all hover:border-purple-400/40"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(135deg, rgba(20,16,43,0.7) 0%, rgba(13,11,31,0.5) 100%)',
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(107, 33, 245, 0.15)',
                  border: '1px solid rgba(107, 33, 245, 0.3)',
                }}
              >
                <c.icon size={22} style={{ color: '#A78BFA' }} />
              </div>
              <div>
                <h3 className="text-white">{c.title}</h3>
                <p className="mt-2 text-white/65 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
