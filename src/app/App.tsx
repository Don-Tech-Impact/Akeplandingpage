import { Layout } from './Layout';
import { useSFModal } from './components/scholarflow/SFModalProvider';
import { SFHero } from './components/scholarflow/SFHero';
import { SFProblem } from './components/scholarflow/SFProblem';
import { SFFeatures } from './components/scholarflow/SFFeatures';
import { SFDashboardShowcase } from './components/scholarflow/SFDashboardShowcase';
import { SFHowItWorks } from './components/scholarflow/SFHowItWorks';
import { SFTrust } from './components/scholarflow/SFTrust';
import { SFTrialCTA } from './components/scholarflow/SFTrialCTA';
import { SFAbout } from './components/scholarflow/SFAbout';

function Home() {
  const { openTrial, openDemo } = useSFModal();
  return (
    <>
      <SFHero onTrial={openTrial} onDemo={openDemo} />
      <SFProblem />
      <SFFeatures />
      <SFDashboardShowcase />
      <SFHowItWorks />
      <SFTrust />
      <SFTrialCTA onTrial={openTrial} />
      <SFAbout />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

