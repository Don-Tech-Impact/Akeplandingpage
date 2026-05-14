import { Brain, ShieldCheck, Workflow, FileSearch, Users, LineChart } from 'lucide-react';
import { SectionBadge } from './AkepUI';

const features = [
  {
    icon: Brain,
    title: 'AI Duplicate Detection',
    desc: 'Semantic similarity engine compares every new submission against your full archive — catching plagiarism and overlap in seconds.',
  },
  {
    icon: Users,
    title: 'Smart Supervisor Matching',
    desc: 'Match students to supervisors based on research interests, workload, and availability — no more manual spreadsheets.',
  },
  {
    icon: Workflow,
    title: 'Automated Workflows',
    desc: 'From submission to defense, every approval, signature, and deadline is tracked automatically.',
  },
  {
    icon: FileSearch,
    title: 'Searchable Research Archive',
    desc: 'Full-text search across years of dissertations with filters by faculty, topic, supervisor, and year.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance & Audit Trail',
    desc: 'Every action logged. Export audit-ready reports for accreditation reviews in one click.',
  },
  {
    icon: LineChart,
    title: 'Dashboards & Reporting',
    desc: 'Real-time KPIs for deans and program directors — submissions, completion rates, supervisor load.',
  },
];

export function AkepFeatures() {
  return (
    <section id="features" className="relative py-24 px-6" style={{ backgroundColor: '#0D0B1F' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge>⚡ Features</SectionBadge>
          <h2 className="mt-6 text-white">Everything your research office needs</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Built with faculty workflows in mind. AKEP replaces a dozen disconnected tools with one
            unified research pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-xl border p-6 transition-all hover:-translate-y-1"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(135deg, rgba(20,16,43,0.6) 0%, rgba(13,11,31,0.4) 100%)',
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{
                  background: 'rgba(107, 33, 245, 0.15)',
                  border: '1px solid rgba(107, 33, 245, 0.3)',
                }}
              >
                <f.icon size={20} style={{ color: '#A78BFA' }} />
              </div>
              <h3 className="mt-5 text-white">{f.title}</h3>
              <p className="mt-2 text-white/65 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
