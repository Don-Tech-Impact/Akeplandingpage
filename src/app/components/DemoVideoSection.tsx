import { useState } from 'react';
import { AnimatedDemo } from './akep/AnimatedDemo';
import { PrimaryButton, GhostButton, INK, MUTED, PURPLE, BORDER, SectionEyebrow } from './akep/AkepUI';

interface DemoVideoSectionProps {
  videoId?: string;
  onWaitlistClick: () => void;
  onDemoRequestClick: () => void;
}

const chapters = [
  { time: '00:00', seconds: 0, label: 'University Onboarding' },
  { time: '00:45', seconds: 45, label: 'AI Duplicate Detection' },
  { time: '01:30', seconds: 90, label: 'Supervisor Matching' },
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
    <section id="demo" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionEyebrow>Product demo</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            See how AKEP works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Watch how a university goes from chaotic dissertation management to a fully automated,
            AI-powered research pipeline.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: '16 / 9',
            border: `1px solid ${BORDER}`,
            background: '#0D0B1F',
            boxShadow: '0 30px 60px -20px rgba(11, 4, 32, 0.25)',
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
                className="px-4 py-2 rounded-full border text-sm transition-all"
                style={{
                  borderColor: isActive ? PURPLE : BORDER,
                  color: isActive ? PURPLE : MUTED,
                  background: isActive ? '#F3EFFF' : 'white',
                }}
              >
                <span style={{ color: PURPLE }}>{c.time}</span>
                <span className="mx-2" style={{ color: BORDER }}>
                  —
                </span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryButton onClick={onDemoRequestClick}>Request a live demo</PrimaryButton>
          <GhostButton onClick={onWaitlistClick}>Join the waitlist</GhostButton>
        </div>
      </div>
    </section>
  );
}
