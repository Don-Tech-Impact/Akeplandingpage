import { NAVY, ORANGE, TINT, MUTED, INK } from './theme';

// Pure-CSS/SVG dashboard mockup inside a browser frame — no image asset needed.
export function DashboardMockup() {
  const students = [
    { name: 'A. Bangura', stage: 'Proposal', pct: 20, color: '#F59E0B' },
    { name: 'M. Okonkwo', stage: 'Data Collection', pct: 55, color: '#3B82F6' },
    { name: 'F. Diallo', stage: 'Writing', pct: 78, color: '#8B5CF6' },
    { name: 'S. Mensah', stage: 'Under Review', pct: 92, color: '#10B981' },
  ];
  return (
    <div
      className="rounded-xl overflow-hidden w-full"
      style={{ background: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 30px 70px -20px rgba(0,0,0,0.5)' }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
        <span className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#34D399' }} />
        <div className="ml-3 flex-1 rounded-md px-3 py-1 text-xs" style={{ background: '#FFFFFF', color: MUTED, border: '1px solid #E2E8F0' }}>
          app.scholarflow.io/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div className="p-5 text-left" style={{ background: '#FFFFFF' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-semibold uppercase" style={{ color: ORANGE, letterSpacing: '0.1em' }}>
              Research Office
            </div>
            <div className="font-bold" style={{ color: NAVY, fontSize: 18 }}>PhD Progress Overview</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: TINT, color: NAVY }}>
            Semester 2 · 2026
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Active PhDs', value: '148' },
            { label: 'In Review', value: '23' },
            { label: 'On Track', value: '86%' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg p-3" style={{ background: TINT }}>
              <div className="font-bold" style={{ color: NAVY, fontSize: 22 }}>{s.value}</div>
              <div className="text-xs" style={{ color: MUTED }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Student progress rows */}
        <div className="space-y-3">
          {students.map((st) => (
            <div key={st.name} className="flex items-center gap-3">
              <div className="w-24 text-xs font-medium truncate" style={{ color: INK }}>{st.name}</div>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EEF2F7' }}>
                <div className="h-full rounded-full" style={{ width: `${st.pct}%`, background: st.color }} />
              </div>
              <div className="w-24 text-xs" style={{ color: MUTED }}>{st.stage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
