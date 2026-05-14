import { useState } from 'react';
import { AnimatedDemo } from './akep/AnimatedDemo';

interface DemoVideoSectionProps {
  videoId?: string;
  onWaitlistClick: () => void;
  onDemoRequestClick: () => void;
}

const chapters = [
  { time: '00:00', seconds: 0, label: 'University Onboarding' },
  { time: '00:45', seconds: 45, label: 'AI Duplicate Detection' },
  { time: '01:30', seconds: 90, label: 'Supervisor Matching & Workflow' },
  { time: '02:15', seconds: 135, label: 'Dashboard & Reporting' },
];

export function DemoVideoSection({
  videoId,
  onWaitlistClick,
  onDemoRequestClick,
}: DemoVideoSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasVideo = Boolean(videoId);

  const jumpTo = (index: number, seconds: number) => {
    if (hasVideo) {
      const iframe = document.getElementById('akep-demo-iframe') as HTMLIFrameElement | null;
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?start=${seconds}&autoplay=1`;
      }
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="demo"
      className="relative overflow-hidden py-24 px-6"
      style={{ backgroundColor: '#0D0B1F' }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '900px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(107, 33, 245, 0.25) 0%, rgba(107, 33, 245, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{
              borderColor: 'rgba(107, 33, 245, 0.4)',
              backgroundColor: 'rgba(107, 33, 245, 0.1)',
              color: '#C4B5FD',
            }}
          >
            ✨ Product Demo
          </span>
          <h2 className="mt-6 text-white">See How AKEP Works</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Watch how a university goes from chaotic dissertation management to a fully automated,
            AI-powered research pipeline — in minutes.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '16 / 9',
            borderRadius: '16px',
            border: '1px solid rgba(107, 33, 245, 0.5)',
            boxShadow: '0 0 60px rgba(107, 33, 245, 0.2)',
          }}
        >
          {hasVideo ? (
            <iframe
              id="akep-demo-iframe"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="AKEP Product Demo"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <AnimatedDemo activeIndex={activeIndex} onSelect={setActiveIndex} />
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {chapters.map((c, i) => {
            const isActive = !hasVideo && i === activeIndex;
            return (
              <button
                key={c.time}
                onClick={() => jumpTo(i, c.seconds)}
                className="px-4 py-2 rounded-full border text-sm transition-all hover:border-purple-400/60 hover:bg-purple-500/10"
                style={{
                  borderColor: isActive ? 'rgba(107, 33, 245, 0.6)' : 'rgba(255, 255, 255, 0.12)',
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: isActive
                    ? 'rgba(107, 33, 245, 0.18)'
                    : 'rgba(255, 255, 255, 0.03)',
                }}
              >
                <span style={{ color: '#A78BFA' }}>{c.time}</span>
                <span className="mx-2 text-white/30">—</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onDemoRequestClick}
            className="px-6 py-3 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              backgroundColor: '#00C2A8',
              color: '#0A0F1F',
              boxShadow: '0 8px 24px rgba(0, 194, 168, 0.25)',
            }}
          >
            Request a Live Demo
          </button>
          <button
            onClick={onWaitlistClick}
            className="px-6 py-3 rounded-lg border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}
