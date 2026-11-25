import { SectionEyebrow } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';

const steps = [
  {
    n: '01',
    title: 'Scope your workflows',
    desc: 'Identify the teams, research stages, access needs, and existing records relevant to your evaluation.',
  },
  {
    n: '02',
    title: 'Configure review steps',
    desc: 'Agree how submissions, review stages, and milestone updates should be handled by your institution.',
  },
  {
    n: '03',
    title: 'Bring teams into the process',
    desc: 'Introduce the agreed workflow to graduate-school staff, departments, supervisors, and students.',
  },
  {
    n: '04',
    title: 'Review progress and next steps',
    desc: 'Assess workflow visibility and reporting against the evaluation goals agreed with your institution.',
  },
];

export function AkepHowItWorks() {
  const { t } = useI18n();
  const localizedSteps = [
    { ...steps[0], title: t('howPage.step1'), desc: t('howPage.step1Body') },
    { ...steps[1], title: t('howPage.step2'), desc: t('howPage.step2Body') },
    { ...steps[2], title: t('howPage.step3'), desc: t('howPage.step3Body') },
    { ...steps[3], title: t('howPage.step4'), desc: t('howPage.step4Body') },
  ];
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
          <SectionEyebrow>{t('howPage.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4 text-white" style={{ letterSpacing: '-0.01em' }}>
            {t('howPage.heading')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizedSteps.map((s) => (
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
