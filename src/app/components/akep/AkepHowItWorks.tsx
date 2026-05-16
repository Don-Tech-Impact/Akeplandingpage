import { SectionEyebrow } from './AkepUI';

const steps = [
  {
    n: '01',
    title: 'Onboard your university',
    desc: 'Connect your SSO, import faculties and the existing dissertation archive. Setup in under a day.',
  },
  {
    n: '02',
    title: 'Students submit, AI screens',
    desc: 'Every submission is automatically checked for duplicates, formatting, and metadata completeness.',
  },
  {
    n: '03',
    title: 'Workflow runs itself',
    desc: 'Supervisors get notified, defenses are scheduled, signatures collected — without email chains.',
  },
  {
    n: '04',
    title: 'Insights on every dashboard',
    desc: 'Deans see exactly where every dissertation stands. Faculty see workload. Students see deadlines.',
  },
];

export function AkepHowItWorks() {
  return (
    <section
      id="how"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#0B0420' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(107,33,245,0.25) 0%, rgba(11,4,32,0) 60%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-4 text-white" style={{ letterSpacing: '-0.01em' }}>
            From chaos to clarity in four steps
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl p-6 transition-all hover:-translate-y-0.5"
              style={{
                background: '#16122B',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 20px 50px -25px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: 'rgba(107,33,245,0.18)',
                  color: '#A78BFA',
                  border: '1px solid rgba(167,139,250,0.25)',
                }}
              >
                {s.n}
              </div>
              <h3 className="mt-5 text-white">{s.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
