import { GraduationCap, Building2, BookOpen, Microscope, ArrowUpRight } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';

const cases = [
  {
    icon: Building2,
    title: 'Research offices',
    desc: 'Centralize every dissertation, defense schedule, and supervisor assignment in one place.',
  },
  {
    icon: GraduationCap,
    title: 'Deans & program directors',
    desc: 'Real-time visibility into program health, completion rates, and supervisor workload.',
  },
  {
    icon: BookOpen,
    title: 'Faculty & supervisors',
    desc: 'Skip the email chains. See your assigned students, deadlines, and review queue in one feed.',
  },
  {
    icon: Microscope,
    title: 'Doctoral schools',
    desc: 'Track multi-year PhD pipelines with milestones, committees, and publication tracking.',
  },
];

export function AkepUseCases() {
  const { t } = useI18n();
  const localizedCases = [
    { ...cases[0], title: t('cases.research'), desc: t('cases.researchBody') },
    { ...cases[1], title: t('cases.deans'), desc: t('cases.deansBody') },
    { ...cases[2], title: t('cases.faculty'), desc: t('cases.facultyBody') },
    { ...cases[3], title: t('cases.doctoral'), desc: t('cases.doctoralBody') },
  ];
  return (
    <section id="use-cases" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>{t('cases.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            {t('cases.heading')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localizedCases.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-8 transition-all hover:shadow-md group"
              style={{ border: `1px solid ${BORDER}`, background: 'white' }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: PURPLE_SOFT }}
                >
                  <c.icon size={20} style={{ color: PURPLE }} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: PURPLE }}
                />
              </div>
              <h3 className="mt-5" style={{ color: INK }}>
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
