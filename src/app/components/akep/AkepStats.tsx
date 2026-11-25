import { INK, MUTED, PURPLE, BORDER } from './AkepUI';

const measures = [
  'Administrative effort',
  'Time to feedback',
  'Milestone visibility',
  'Reporting effort',
];

export function AkepStats() {
  return (
    <section className="py-20 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ color: INK, letterSpacing: '-0.01em' }}>Agree how to measure a pilot</h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Select measures with your institution before an evaluation begins, then review them
            against your current process.
          </p>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BORDER}`, background: 'white' }}
        >
          {measures.map((measure, i) => (
            <div
              key={measure}
              className="p-8 text-center"
              style={{
                borderRight: i < measures.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}
            >
              <div style={{ color: PURPLE, fontSize: '1rem' }}>{measure}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
