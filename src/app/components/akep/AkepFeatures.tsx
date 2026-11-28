import { Brain, ShieldCheck, Workflow, FileSearch, Users, LineChart } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';
import { NAVY } from '../scholarflow/theme';
import { useI18n } from '../../../i18n/I18nProvider';

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
  const { t } = useI18n();
  const localizedFeatures = [
    { ...features[0], title: t('featurePage.topic'), desc: t('featurePage.topicBody') },
    { ...features[1], title: t('featurePage.assign'), desc: t('featurePage.assignBody') },
    { ...features[2], title: t('featurePage.approvals'), desc: t('featurePage.approvalsBody') },
    { ...features[3], title: t('featurePage.records'), desc: t('featurePage.recordsBody') },
    { ...features[4], title: t('featurePage.activity'), desc: t('featurePage.activityBody') },
    { ...features[5], title: t('featurePage.progress'), desc: t('featurePage.progressBody') },
  ];
  return (
    <section id="features" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>{t('featurePage.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4 sf-section-title" style={{ color: NAVY }}>
            {t('featurePage.heading')}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto sf-lead" style={{ color: MUTED }}>
            {t('featurePage.body')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localizedFeatures.map((f) => (
            <div
              key={f.title}
              className="sf-card rounded-2xl p-6"
              style={{ border: `1px solid ${BORDER}`, background: 'white' }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: PURPLE_SOFT }}
              >
                <f.icon size={20} style={{ color: PURPLE }} />
              </div>
              <h3 className="mt-5 sf-card-title" style={{ color: NAVY }}>
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
