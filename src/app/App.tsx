import { useState } from 'react';
import { AkepNav } from './components/akep/AkepNav';
import { AkepHero } from './components/akep/AkepHero';
import { AkepLogoCloud } from './components/akep/AkepLogoCloud';
import { AkepProblems } from './components/akep/AkepProblems';
import { AkepSpotlight } from './components/akep/AkepSpotlight';
import { AkepStats } from './components/akep/AkepStats';
import { AkepFeatures } from './components/akep/AkepFeatures';
import { AkepHowItWorks } from './components/akep/AkepHowItWorks';
import { AkepSecurity } from './components/akep/AkepSecurity';
import { AkepIntegrations } from './components/akep/AkepIntegrations';
import { AkepUseCases } from './components/akep/AkepUseCases';
import { AkepPricing } from './components/akep/AkepPricing';
import { AkepWaitlist } from './components/akep/AkepWaitlist';
import { AkepFooter } from './components/akep/AkepFooter';
import { AkepTeam } from './components/akep/AkepTeam';
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
    <div className="min-h-screen" style={{ background: 'white', color: '#0B0B14' }}>
      <AkepNav onCta={scrollToWaitlist} />
      <AkepHero onPrimary={() => setDemoOpen(true)} onSecondary={scrollToWaitlist} />
      <AkepLogoCloud />
      <AkepProblems />
      <AkepSpotlight />
      <AkepFeatures />
      <AkepHowItWorks />
      <DemoVideoSection
        videoId={videoId}
        onDemoRequestClick={() => setDemoOpen(true)}
        onWaitlistClick={scrollToWaitlist}
      />
      <AkepSecurity />
      <AkepIntegrations />
      <AkepStats />
      <AkepUseCases />
      <AkepTeam />
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
