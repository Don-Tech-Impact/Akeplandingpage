import { Brain, ShieldCheck, Workflow, FileSearch, Users, LineChart } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

const features = [
  {
    icon: Brain,
    title: 'Compare research topics for academic review',
    desc: 'Compare a proposed topic with existing topics to help academic staff review potential overlap. Chapter plagiarism scanning is coming soon.',
  },
  {
    icon: Users,
    title: 'Coordinate student and supervisor assignments',
    desc: 'Bring research interests, supervisor workload, and availability into the assignment workflow.',
  },
  {
    icon: Workflow,
    title: 'Track approvals and milestones',
    desc: 'Keep submission status, review steps, and deadlines visible through the research workflow.',
  },
  {
    icon: FileSearch,
    title: 'Find dissertation records',
    desc: 'Search and review dissertation records using the information your institution keeps in ScholarFlow.',
  },
  {
    icon: ShieldCheck,
    title: 'Review activity and reporting',
    desc: 'Use recorded workflow activity and available reports to support internal review and institutional reporting.',
  },
  {
    icon: LineChart,
    title: 'Monitor progress across programmes',
    desc: 'Give authorized leaders a view of submission status, programme progress, and supervisor workload.',
  },
];

export function AkepFeatures() {
  return (
    <section id="features" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Platform</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            Replace Spreadsheets and Email Chains With One Platform
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            ScholarFlow, a product of AKEP Technologies, brings postgraduate research milestones,
            supervision workflows, and progress reporting into one workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ border: `1px solid ${BORDER}`, background: 'white' }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: PURPLE_SOFT }}
              >
                <f.icon size={20} style={{ color: PURPLE }} />
              </div>
              <h3 className="mt-5" style={{ color: INK }}>
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
