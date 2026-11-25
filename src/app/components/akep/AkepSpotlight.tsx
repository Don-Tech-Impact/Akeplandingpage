import { Check, FileText, Sparkles, Users, BarChart3 } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';

interface Spot {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  mock: 'submission' | 'duplicate' | 'supervisor' | 'reporting';
}

const spots: Spot[] = [
  {
    eyebrow: 'Submissions',
    title: 'Every dissertation in one queue',
    body:
      'Replace email threads, paper forms, and shared drives with a structured submission flow that captures metadata, supervisors, and committee members at the source.',
    bullets: [
      'Configurable submission forms per faculty',
      'Auto-validated metadata and formatting checks',
      'Versioned uploads with audit trail',
      'Status tracking visible to student, supervisor, and dean',
    ],
    mock: 'submission',
  },
  {
    eyebrow: 'Topic review',
    title: 'Review potential topic overlap',
    body:
      'Compare a proposed research topic with existing topics to help academic staff review potential overlap. Chapter plagiarism scanning is coming soon.',
    bullets: [
      'Compare proposed topics with existing topics',
      'Support academic review of potential topic overlap',
      'Keep academic decisions with authorized staff',
    ],
    mock: 'duplicate',
  },
  {
    eyebrow: 'Supervisor Matching',
    title: 'Match students to supervisors that actually fit',
    body:
      'ScholarFlow helps institutions consider topical fit, current load, and availability when coordinating supervisor assignments.',
    bullets: [
      'Topical fit from supervisor publications',
      'Live workload caps and term availability',
      'Auto-notifications and acceptance tracking',
      'Manual override with full reasoning logged',
    ],
    mock: 'supervisor',
  },
  {
    eyebrow: 'Reporting',
    title: 'Reporting for institutional review',
    body:
      'Use workflow activity, dashboards, and available exports to review postgraduate research progress and prepare institutional reporting.',
    bullets: [
      'Pre-built templates for accreditation cycles',
      'CSV / PDF exports with audit signature',
      'Faculty, supervisor, and program-level dashboards',
      'Historical comparisons across terms',
    ],
    mock: 'reporting',
  },
];

function MockSubmission() {
  const { t } = useI18n();
  const names = t('spot.names').split('|');
  const statuses = t('spot.status').split('|');
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <FileText size={14} style={{ color: PURPLE }} /> {t('spot.queue')}
      </div>
      <div className="mt-4 space-y-2">
        {[
          { name: 'A. Diallo — Applied ML in agriculture', status: 'In AI review', tone: 'review' },
          { name: 'M. Okonkwo — Public health policy', status: 'Awaiting supervisor', tone: 'wait' },
          { name: 'L. Bensalem — Computational linguistics', status: 'Accepted', tone: 'ok' },
          { name: 'K. Nyong\'o — Water systems modeling', status: 'Flagged: overlap', tone: 'warn' },
        ].map((r, i) => (
          <div
            key={r.name}
            className="flex items-center justify-between text-sm rounded-lg px-3 py-2"
            style={{ background: '#F8F7FB' }}
          >
            <span style={{ color: INK }}>{names[i]}</span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={
                r.tone === 'ok'
                  ? { background: '#E6F7EE', color: '#0F8245' }
                  : r.tone === 'warn'
                  ? { background: '#FFF1E0', color: '#B45309' }
                  : r.tone === 'review'
                  ? { background: PURPLE_SOFT, color: PURPLE }
                  : { background: '#EEF1F8', color: '#3F3F52' }
              }
            >
              {statuses[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockDuplicate() {
  const { t } = useI18n();
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <Sparkles size={14} style={{ color: PURPLE }} /> {t('spot.check')}
      </div>
      <div className="mt-4">
        <div className="text-sm" style={{ color: INK }}>
          {t('spot.example')}
        </div>
        <div className="text-xs mt-0.5" style={{ color: MUTED }}>
          {t('spot.illustration')}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {t('spot.comparisons').split('|').map((d) => (
          <div key={d} className="text-xs" style={{ color: INK }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function MockSupervisor() {
  const { t } = useI18n();
  const subjects = t('spot.subjects').split('|');
  const rows = [
    { name: 'Prof. M. Sow', match: 96, load: '3 / 8', topic: 'Applied ML' },
    { name: 'Dr. F. Ndiaye', match: 89, load: '5 / 8', topic: 'AgriTech' },
    { name: 'Prof. K. Bâ', match: 74, load: '7 / 8', topic: 'Data Science' },
  ];
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <Users size={14} style={{ color: PURPLE }} /> {t('spot.matching')}
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center gap-3 rounded-lg p-3"
            style={{
              border: i === 0 ? `1px solid ${PURPLE}` : `1px solid ${BORDER}`,
              background: i === 0 ? PURPLE_SOFT : 'white',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, #A78BFA)` }}
            >
              {r.name.split(' ').slice(-1)[0][0]}
            </div>
            <div className="flex-1 text-sm" style={{ color: INK }}>
              <div>{r.name}</div>
              <div className="text-xs" style={{ color: MUTED }}>
                {subjects[i]} · {t('spot.load')} {r.load}
              </div>
            </div>
            <div className="text-sm" style={{ color: PURPLE }}>
              {r.match}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockReporting() {
  const { t, language } = useI18n();
  const labels = t('spot.stats').split('|');
  const bars = [42, 60, 55, 78, 70, 88, 84];
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <BarChart3 size={14} style={{ color: PURPLE }} /> {t('spot.lastWeeks')}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 mb-4">
        {[
          { v: '1,284', l: 'Active' },
          { v: '312', l: 'In review' },
          { v: '8,420', l: 'Completed' },
        ].map((k, i) => (
          <div
            key={k.l}
            className="rounded-lg p-3"
            style={{ background: '#F8F7FB' }}
          >
            <div className="text-lg" style={{ color: INK }}>
              {language === 'fr' ? new Intl.NumberFormat('fr-FR').format(Number(k.v.replaceAll(',', ''))) : k.v}
            </div>
            <div className="text-xs" style={{ color: MUTED }}>
              {labels[i]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${b}%`,
              background: `linear-gradient(180deg, #A78BFA 0%, ${PURPLE} 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Mock({ kind }: { kind: Spot['mock'] }) {
  if (kind === 'submission') return <MockSubmission />;
  if (kind === 'duplicate') return <MockDuplicate />;
  if (kind === 'supervisor') return <MockSupervisor />;
  return <MockReporting />;
}

export function AkepSpotlight() {
  const { t } = useI18n();
  const translations = [
    { text: t('spot.submission'), bullets: t('spot.submissionBullets') },
    { text: t('spot.topic'), bullets: t('spot.topicBullets') },
    { text: t('spot.supervisor'), bullets: t('spot.supervisorBullets') },
    { text: t('spot.reporting'), bullets: t('spot.reportingBullets') },
  ];
  const localizedSpots = spots.map((spot, index) => {
    const [eyebrow, title, body] = translations[index].text.split('|');
    return { ...spot, eyebrow, title, body, bullets: translations[index].bullets.split('|') };
  });
  return (
    <section className="py-24 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionEyebrow>{t('spot.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            {t('spot.heading')}
          </h2>
        </div>

        <div className="space-y-20">
          {localizedSpots.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={s.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div className={flip ? 'lg:order-2' : ''}>
                  <SectionEyebrow>{s.eyebrow}</SectionEyebrow>
                  <h3 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                  <p className="mt-3" style={{ color: MUTED }}>
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: INK }}
                      >
                        <Check size={16} style={{ color: PURPLE }} className="mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={flip ? 'lg:order-1' : ''}>
                  <div
                    className="rounded-2xl p-3"
                    style={{
                      background: 'white',
                      border: `1px solid ${BORDER}`,
                      boxShadow: '0 20px 50px -25px rgba(11,4,32,0.25)',
                    }}
                  >
                    <Mock kind={s.mock} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
