import { EyeOff, MessageSquareOff, ShieldAlert } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, TINT, MUTED, INK } from './theme';
import { useI18n } from '../../../i18n/I18nProvider';
import type { MessageKey } from '../../../i18n/en';

const pains: { icon: typeof EyeOff; title: MessageKey; body: MessageKey }[] = [
  {
    icon: EyeOff,
    title: 'problem.visibility',
    body: 'problem.visibilityBody',
  },
  {
    icon: MessageSquareOff,
    title: 'problem.supervision',
    body: 'problem.supervisionBody',
  },
  {
    icon: ShieldAlert,
    title: 'problem.plagiarism',
    body: 'problem.plagiarismBody',
  },
];

export function SFProblem() {
  const { t } = useI18n();
  return (
    <section id="problem" className="py-24 px-6" style={{ background: TINT }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>{t('problem.eyebrow')}</Eyebrow>
          <SectionHeading>{t('problem.heading')}</SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="rounded-2xl p-7 h-full" style={{ background: '#FFFFFF', border: cardBorder }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(232,137,43,0.12)' }}
                >
                  <p.icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: NAVY, fontSize: 19 }}>{t(p.title)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{t(p.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center mt-12 font-bold" style={{ color: NAVY, fontSize: 20 }}>
          {t('problem.summary')}
        </p>
        <p className="sr-only" style={{ color: INK }}>{t('problem.accessible')}</p>
      </div>
    </section>
  );
}
