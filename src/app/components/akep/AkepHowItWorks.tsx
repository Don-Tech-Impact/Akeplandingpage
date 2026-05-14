import { SectionBadge } from './AkepUI';

const steps = [
  {
    n: '01',
    title: 'Onboard your university',
    desc: 'Connect your SSO, import your faculties and existing dissertation archive. Setup in under a day.',
  },
  {
    n: '02',
    title: 'Students submit, AI screens',
    desc: 'Every submission is automatically checked for duplicates, formatting issues, and metadata completeness.',
  },
  {
    n: '03',
    title: 'Workflow runs itself',
    desc: 'Supervisors get notified, defenses are scheduled, signatures collected — all without email chains.',
  },
  {
    n: '04',
    title: 'Insights on every dashboard',
    desc: 'Deans see exactly where every dissertation stands. Faculty see workload. Students see deadlines.',
  },
];

export function AkepHowItWorks() {
  return (
    <section id="how" className="relative py-24 px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(107, 33, 245, 0.12) 0%, rgba(13,11,31,0) 70%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge>🔁 How it works</SectionBadge>
          <h2 className="mt-6 text-white">From chaos to clarity in four steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-xl border p-6"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: 'rgba(20,16,43,0.5)',
              }}
            >
              <div
                className="text-5xl"
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #6B21F5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.n}
              </div>
              <h3 className="mt-4 text-white">{s.title}</h3>
              <p className="mt-2 text-white/65 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
