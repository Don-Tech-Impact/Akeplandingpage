import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Building2, GraduationCap, School, UserRoundCog, Users2, X } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, MUTED, INK, TINT } from './theme';

type RedactionBox = {
  top: string;
  left: string;
  width: string;
  height: string;
  radius?: string;
};

type DashboardView = {
  key: string;
  role: string;
  portal: string;
  title: string;
  subtitle: string;
  audience: string;
  decisionImpact: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ size?: number; style?: CSSProperties }>;
  metrics: Array<{ label: string; value: string; tone: string }>;
  actions: string[];
  wins: string[];
  mockRows: Array<{ label: string; value: string; color: string }>;
  redactions: RedactionBox[];
};

const views: DashboardView[] = [
  {
    key: 'university',
    role: 'University Dashboard',
    portal: 'University Portal',
    title: 'Institution-level command center for dissertation operations',
    subtitle: 'Manage structure, users, active calls, and institution reporting in one operational view.',
    audience: 'For Vice Chancellors and Research Office Directors',
    decisionImpact: 'Spot faculty bottlenecks early and intervene before supervision timelines slip.',
    image: '/dashboards/university-dashboard.png',
    imageAlt: 'University dashboard showing institution metrics and dissertation pipeline.',
    icon: Building2,
    metrics: [
      { label: 'Total students', value: '3,482', tone: '#1D4ED8' },
      { label: 'Active calls', value: '24', tone: '#CA8A04' },
      { label: 'Pending batches', value: '12', tone: '#0D9488' },
      { label: 'Archived', value: '2,108', tone: '#7C3AED' },
    ],
    actions: ['Create call', 'Invite users', 'Manage structure', 'Open dissertations'],
    wins: ['Institution-level visibility', 'Faster policy rollout', 'Accreditation-ready metrics'],
    mockRows: [
      { label: 'Dissertation pipeline', value: '67% on track', color: '#1D4ED8' },
      { label: 'Submissions this week', value: '142', color: '#CA8A04' },
      { label: 'Pending approvals', value: '12', color: '#0D9488' },
    ],
    redactions: [
      { top: '2.2%', left: '88.2%', width: '10.5%', height: '5.8%', radius: '10px' },
      { top: '79.4%', left: '0.9%', width: '14.6%', height: '8.7%', radius: '10px' },
    ],
  },
  {
    key: 'hod',
    role: 'HOD Dashboard',
    portal: 'HOD Portal',
    title: 'Department inbox for completion batches and approvals',
    subtitle: 'Review supervisor submissions, return revisions, and archive final cohorts with traceability.',
    audience: 'For Heads of Department and Faculty Review Leads',
    decisionImpact: 'Approve or return batches in minutes with complete status context at a glance.',
    image: '/dashboards/hod-completion-batches.png',
    imageAlt: 'HOD completion batches table with status filters and archive actions.',
    icon: School,
    metrics: [
      { label: 'Department batches', value: '18', tone: '#1D4ED8' },
      { label: 'Awaiting review', value: '5', tone: '#CA8A04' },
      { label: 'Approved this term', value: '11', tone: '#0D9488' },
      { label: 'Returned', value: '2', tone: '#DC2626' },
    ],
    actions: ['Filter by status', 'Open batch details', 'Download report', 'Archive final'],
    wins: ['Cleaner departmental workflow', 'Less email back-and-forth', 'Clear accountability trail'],
    mockRows: [
      { label: 'Batches awaiting HOD', value: '5 rows', color: '#CA8A04' },
      { label: 'Supervisor submissions', value: '11 approved', color: '#0D9488' },
      { label: 'Archived final sets', value: '2', color: '#7C3AED' },
    ],
    redactions: [
      { top: '2%', left: '87.5%', width: '12%', height: '7.4%', radius: '10px' },
      { top: '78.2%', left: '1.1%', width: '14.4%', height: '8.4%', radius: '10px' },
    ],
  },
  {
    key: 'supervisor',
    role: 'Supervisor Dashboard',
    portal: 'Supervisor Portal',
    title: 'Daily supervision cockpit for chapters, reviews, and capacity',
    subtitle: 'Track supervision load, pending reviews, and student milestones from one focused workspace.',
    audience: 'For Supervisors and Program Coordinators',
    decisionImpact: 'Balance supervision load and clear review backlogs before they delay student progress.',
    image: '/dashboards/supervisor-dashboard.png',
    imageAlt: 'Supervisor dashboard showing capacity, pending reviews, and active supervisions.',
    icon: UserRoundCog,
    metrics: [
      { label: 'Active supervisions', value: '9', tone: '#1D4ED8' },
      { label: 'Pending reviews', value: '4', tone: '#CA8A04' },
      { label: 'Capacity left', value: '2 slots', tone: '#0D9488' },
      { label: 'Completed', value: '14', tone: '#7C3AED' },
    ],
    actions: ['Open supervisions', 'Review chapters', 'Send feedback', 'Check analytics'],
    wins: ['Balanced workload', 'Quicker feedback loops', 'Better completion outcomes'],
    mockRows: [
      { label: 'Capacity meter', value: '1 / 3 used', color: '#0D9488' },
      { label: 'Pending chapter reviews', value: '4', color: '#CA8A04' },
      { label: 'Recent supervision updates', value: '9 today', color: '#1D4ED8' },
    ],
    redactions: [
      { top: '2.2%', left: '87.6%', width: '11.7%', height: '6.5%', radius: '10px' },
      { top: '77.7%', left: '1.1%', width: '15%', height: '8.8%', radius: '10px' },
    ],
  },
  {
    key: 'supervisor-workspace',
    role: 'Supervisor Workspace',
    portal: 'Supervisor Portal',
    title: 'Project workspace to manage each dissertation in context',
    subtitle: 'Set guidelines, monitor status, and jump directly into each dissertation workspace.',
    audience: 'For Supervisors Managing Multiple Active Projects',
    decisionImpact: 'Standardize project-level expectations and reduce coordination overhead per dissertation.',
    image: '/dashboards/supervisor-workspace.png',
    imageAlt: 'Supervisor project list with setup guidelines and open workspace actions.',
    icon: Users2,
    metrics: [
      { label: 'Projects', value: '7', tone: '#1D4ED8' },
      { label: 'Needs revision', value: '2', tone: '#CA8A04' },
      { label: 'In progress', value: '4', tone: '#0D9488' },
      { label: 'Archived', value: '1', tone: '#7C3AED' },
    ],
    actions: ['Setup guidelines', 'Open workspace', 'Refresh list', 'Review history'],
    wins: ['Consistent supervision standards', 'Clear project context', 'Faster turnaround to final'],
    mockRows: [
      { label: 'Project workspaces', value: '7 tracked', color: '#1D4ED8' },
      { label: 'Guidelines status', value: '100% configured', color: '#0D9488' },
      { label: 'Archived batch projects', value: '1', color: '#7C3AED' },
    ],
    redactions: [
      { top: '1.7%', left: '87.5%', width: '12%', height: '7.5%', radius: '10px' },
      { top: '77.7%', left: '1.1%', width: '14.8%', height: '8.7%', radius: '10px' },
    ],
  },
  {
    key: 'student',
    role: 'Student Dashboard',
    portal: 'Student Portal',
    title: 'Guided dissertation journey from proposal to defense',
    subtitle: 'Students see deadlines, submission status, revisions, and next steps in one clear flow.',
    audience: 'For Graduate Schools Focused on Student Throughput',
    decisionImpact: 'Keep students moving by making deadlines and required actions impossible to miss.',
    image: '/dashboards/student-dashboard.png',
    imageAlt: 'Student dashboard showing deadlines, progress tracker, and quick actions.',
    icon: GraduationCap,
    metrics: [
      { label: 'Current status', value: 'Not started', tone: '#1D4ED8' },
      { label: 'Days to deadline', value: '5', tone: '#CA8A04' },
      { label: 'Proposals', value: '0 / 2', tone: '#0D9488' },
      { label: 'Revisions', value: '0', tone: '#7C3AED' },
    ],
    actions: ['Propose topic', 'Open workspace', 'Track progress', 'Group chat'],
    wins: ['Clear next steps', 'Less submission confusion', 'Higher student confidence'],
    mockRows: [
      { label: 'Current stage', value: 'Proposal setup', color: '#1D4ED8' },
      { label: 'Deadline countdown', value: '5 days', color: '#CA8A04' },
      { label: 'Quick actions completed', value: '3 today', color: '#0D9488' },
    ],
    redactions: [
      { top: '1.8%', left: '87.3%', width: '12.1%', height: '6.9%', radius: '10px' },
      { top: '77.7%', left: '1.1%', width: '14.8%', height: '8.7%', radius: '10px' },
    ],
  },
];

function NameRedactionOverlays({ boxes }: { boxes: RedactionBox[] }) {
  return (
    <>
      {boxes.map((box, idx) => (
        <div
          key={`redact-${idx}`}
          className="absolute pointer-events-none"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            borderRadius: box.radius ?? '8px',
            background: 'rgba(255,255,255,0.28)',
            border: '1px solid rgba(148,163,184,0.35)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
          }}
        />
      ))}
      <div
        className="absolute left-3 top-3 pointer-events-none text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-md"
        style={{
          background: 'rgba(15,23,42,0.52)',
          color: '#E2E8F0',
          border: '1px solid rgba(148,163,184,0.35)',
        }}
      >
        Public demo (names masked)
      </div>
    </>
  );
}

function DashboardImageFallback({ view }: { view: DashboardView }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FB7185' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FBBF24' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#34D399' }} />
        <div className="ml-2 text-[11px] font-medium truncate" style={{ color: MUTED }}>
          {view.portal} / {view.role}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {view.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="rounded-lg p-2" style={{ background: '#F7FAFF', border: '1px solid #E5EDF6' }}>
              <div className="text-[10px] uppercase font-semibold" style={{ color: MUTED, letterSpacing: '0.08em' }}>
                {m.label}
              </div>
              <div className="text-sm font-bold mt-1" style={{ color: m.tone }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2.5">
          {view.mockRows.map((row) => (
            <div key={row.label} className="rounded-lg px-3 py-2" style={{ background: '#FFFFFF', border: '1px solid #E5EDF6' }}>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span style={{ color: INK }}>{row.label}</span>
                <span className="font-semibold" style={{ color: row.color }}>{row.value}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full" style={{ background: '#EDF2F7' }}>
                <div className="h-full rounded-full" style={{ width: '65%', background: row.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SFDashboardShowcase() {
  const [active, setActive] = useState(views[0].key);
  const [imageFailed, setImageFailed] = useState<Record<string, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lastManualSelectRef = useRef(0);
  const mobileTabs = useMemo(
    () => views.filter((v) => ['university', 'hod', 'supervisor', 'student'].includes(v.key)),
    []
  );
  const mobileTabKeys = useMemo(() => mobileTabs.map((t) => t.key), [mobileTabs]);
  const current = useMemo(() => views.find((v) => v.key === active) ?? views[0], [active]);
  const Icon = current.icon;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    if (!media.matches) return;

    const id = window.setInterval(() => {
      if (Date.now() - lastManualSelectRef.current < 9000) return;
      setActive((prev) => {
        const idx = mobileTabKeys.indexOf(prev);
        if (idx < 0) return mobileTabKeys[0];
        return mobileTabKeys[(idx + 1) % mobileTabKeys.length];
      });
    }, 3800);

    return () => window.clearInterval(id);
  }, [mobileTabKeys]);

  const handleRoleSelect = (key: string) => {
    lastManualSelectRef.current = Date.now();
    setActive(key);
  };

  return (
    <section id="dashboards" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12">
          <Eyebrow>Main Dashboards</Eyebrow>
          <SectionHeading>Every Role Gets the Right Workspace</SectionHeading>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: MUTED }}>
            ScholarFlow ships role-specific dashboards for University Admin, HOD, Supervisors, and
            Students. Each view is optimized for the decisions that role must make daily.
          </p>
        </div>

        <Reveal className="lg:hidden mb-5">
          <div className="overflow-x-auto [scrollbar-width:none]" style={{ msOverflowStyle: 'none' }}>
            <div className="flex gap-2 min-w-max pr-1">
              {mobileTabs.map((tab) => {
                const isActive = active === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleRoleSelect(tab.key)}
                    className="relative px-4 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      minWidth: 148,
                      background: isActive ? NAVY : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : INK,
                      border: isActive ? '1px solid rgba(26,60,94,0.2)' : '1px solid #E2E8F0',
                      transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                    }}
                  >
                    <div className="text-xs font-semibold">{tab.role.replace(' Dashboard', '')}</div>
                    <div
                      className="text-[11px] mt-0.5"
                      style={{ color: isActive ? 'rgba(255,255,255,0.72)' : MUTED }}
                    >
                      {tab.portal}
                    </div>
                    {isActive && (
                      <span
                        className="absolute left-2 right-2 bottom-1 h-[2px] rounded-full"
                        style={{ background: ORANGE, animation: 'sfTabSlide 3.8s linear infinite' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <Reveal className="hidden lg:block">
            <div className="rounded-2xl p-4 lg:p-5" style={{ border: cardBorder, background: '#FBFDFF' }}>
              <div className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: '0.12em' }}>
                Roles
              </div>
              <div className="space-y-2">
                {views.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => handleRoleSelect(v.key)}
                    className="w-full text-left rounded-xl px-4 py-3 transition-all"
                    style={{
                      background: active === v.key ? NAVY : 'transparent',
                      color: active === v.key ? '#FFFFFF' : INK,
                      border: active === v.key ? '1px solid rgba(26,60,94,0.1)' : '1px solid #E5EDF6',
                    }}
                  >
                    <div className="font-semibold text-sm">{v.role}</div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: active === v.key ? 'rgba(255,255,255,0.72)' : MUTED }}
                    >
                      {v.portal}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl overflow-hidden" style={{ border: cardBorder }}>
              <div
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3"
                style={{ borderBottom: '1px solid #E5EDF6', background: '#F8FBFF' }}
              >
                <div>
                  <div className="text-xs font-bold uppercase" style={{ color: ORANGE, letterSpacing: '0.12em' }}>
                    {current.portal}
                  </div>
                  <div className="font-bold mt-1" style={{ color: NAVY, fontSize: 20 }}>
                    {current.role}
                  </div>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(26,60,94,0.08)' }}>
                  <Icon size={20} style={{ color: NAVY }} />
                </div>
              </div>

              <div className="p-5 sm:p-6" style={{ background: '#FFFFFF' }}>
                <h3 className="font-bold leading-tight" style={{ color: NAVY, fontSize: 24 }}>
                  {current.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: MUTED }}>
                  {current.subtitle}
                </p>

                <div className="mt-4 rounded-xl p-4" style={{ background: '#F8FBFF', border: '1px solid #E2EAF4' }}>
                  <div className="text-xs font-bold uppercase" style={{ color: ORANGE, letterSpacing: '0.1em' }}>
                    {current.audience}
                  </div>
                  <p className="mt-1.5 text-sm" style={{ color: INK }}>
                    {current.decisionImpact}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => !imageFailed[current.key] && setLightboxOpen(true)}
                    className="w-full text-left rounded-xl overflow-hidden"
                    style={{ border: '1px solid #E2E8F0', cursor: imageFailed[current.key] ? 'default' : 'zoom-in' }}
                  >
                    {imageFailed[current.key] ? (
                      <DashboardImageFallback view={current} />
                    ) : (
                      <div className="relative">
                        <img
                          src={current.image}
                          alt={current.imageAlt}
                          className="w-full h-auto block"
                          loading="lazy"
                          onError={() =>
                            setImageFailed((prev) => ({
                              ...prev,
                              [current.key]: true,
                            }))
                          }
                        />
                        <NameRedactionOverlays boxes={current.redactions} />
                      </div>
                    )}
                  </button>
                  <p className="mt-2 text-xs" style={{ color: MUTED }}>
                    {imageFailed[current.key]
                      ? 'Screenshot placeholder shown. Add real image files under public/dashboards to replace this preview.'
                      : 'Click to expand dashboard screenshot.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl p-3.5" style={{ background: TINT }}>
                      <div className="text-[11px] uppercase font-semibold" style={{ color: MUTED, letterSpacing: '0.08em' }}>
                        {m.label}
                      </div>
                      <div className="mt-1.5 font-bold" style={{ color: m.tone, fontSize: 24 }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl p-4" style={{ border: '1px solid #E5EDF6' }}>
                    <div className="text-xs font-bold uppercase mb-2" style={{ color: ORANGE, letterSpacing: '0.1em' }}>
                      Key actions
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.actions.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium"
                          style={{ background: '#F8FAFC', color: INK, border: '1px solid #E2E8F0' }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl p-4" style={{ border: '1px solid #E5EDF6' }}>
                    <div className="text-xs font-bold uppercase mb-2" style={{ color: ORANGE, letterSpacing: '0.1em' }}>
                      Outcomes
                    </div>
                    <ul className="space-y-1.5">
                      {current.wins.map((w) => (
                        <li key={w} className="text-sm" style={{ color: MUTED }}>
                          • {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {lightboxOpen && !imageFailed[current.key] && (
          <div
            className="fixed inset-0 z-[80] p-4 sm:p-8"
            style={{ background: 'rgba(15,23,42,0.82)', backdropFilter: 'blur(4px)' }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="max-w-6xl mx-auto h-full flex items-center justify-center">
              <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute -top-11 right-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.14)', color: '#FFFFFF' }}
                  aria-label="Close screenshot"
                >
                  <X size={18} />
                </button>
                <img
                  src={current.image}
                  alt={current.imageAlt}
                  className="w-full max-h-[85vh] object-contain rounded-xl"
                  style={{ boxShadow: '0 30px 80px -20px rgba(0,0,0,0.65)' }}
                />
                <NameRedactionOverlays boxes={current.redactions} />
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes sfTabSlide {
            from { transform: scaleX(0.35); transform-origin: left; opacity: 0.7; }
            to { transform: scaleX(1); transform-origin: left; opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
