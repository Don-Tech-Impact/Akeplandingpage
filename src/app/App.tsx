import { useState } from 'react';
import { AkepNav } from './components/akep/AkepNav';
import { AkepHero } from './components/akep/AkepHero';
import { AkepFeatures } from './components/akep/AkepFeatures';
import { AkepHowItWorks } from './components/akep/AkepHowItWorks';
import { AkepUseCases } from './components/akep/AkepUseCases';
import { AkepPricing } from './components/akep/AkepPricing';
import { AkepWaitlist } from './components/akep/AkepWaitlist';
import { AkepFooter } from './components/akep/AkepFooter';
import { AkepModal } from './components/akep/AkepModal';
import { DemoVideoSection } from './components/DemoVideoSection';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const videoId = (import.meta as any).env?.VITE_DEMO_VIDEO_ID as string | undefined;

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0D0B1F' }}>
      <AkepNav onCta={scrollToWaitlist} />
      <AkepHero onPrimary={() => setDemoOpen(true)} onSecondary={scrollToWaitlist} />
      <AkepHowItWorks />
      <DemoVideoSection
        videoId={videoId}
        onDemoRequestClick={() => setDemoOpen(true)}
        onWaitlistClick={scrollToWaitlist}
      />
      <AkepFeatures />
      <AkepUseCases />
      <AkepPricing onCta={() => setDemoOpen(true)} />
      <AkepWaitlist />
      <AkepFooter />

      <AkepModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Request a Live Demo"
        subject="Live Demo Request"
      />
      <AkepModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        title="Join the Waitlist"
      />
      <Toaster />
    </div>
  );
}
