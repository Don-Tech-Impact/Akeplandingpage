import { LayoutDashboard, ScanSearch, Workflow, GraduationCap, BarChart3, Lock, FileText, Languages } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, MUTED } from './theme';
import { useI18n } from '../../../i18n/I18nProvider';
import type { MessageKey } from '../../../i18n/en';

const features: { icon: typeof Lock; title: MessageKey; body: MessageKey }[] = [
  {
    icon: LayoutDashboard,
    title: 'features.dashboards',
    body: 'features.dashboardsBody',
  },
  {
    icon: ScanSearch,
    title: 'features.topic',
    body: 'features.topicBody',
  },
  {
    icon: Workflow,
    title: 'features.supervisor',
    body: 'features.supervisorBody',
  },
  {
    icon: GraduationCap,
    title: 'features.student',
    body: 'features.studentBody',
  },
  {
    icon: BarChart3,
    title: 'features.analytics',
    body: 'features.analyticsBody',
  },
  {
    icon: Lock,
    title: 'features.security',
    body: 'features.securityBody',
  },
  {
    icon: FileText,
    title: 'features.guidelines',
    body: 'features.guidelinesBody',
  },
  {
    icon: Languages,
    title: 'features.language',
    body: 'features.languageBody',
  },
];

export function SFFeatures() {
  const { t } = useI18n();
  return (
    <section id="features" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>{t('features.eyebrow')}</Eyebrow>
          <SectionHeading>{t('features.heading')}</SectionHeading>
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
                <h3 className="font-bold mb-2" style={{ color: NAVY, fontSize: 18 }}>{t(f.title)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{t(f.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
