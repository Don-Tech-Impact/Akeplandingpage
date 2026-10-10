import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SFNav } from './components/scholarflow/SFNav';
import { SFFooter } from './components/scholarflow/SFFooter';
import { SFModalProvider, useSFModal } from './components/scholarflow/SFModalProvider';
import { Toaster } from './components/ui/sonner';

function LayoutInner({ children }: { children: React.ReactNode }) {
  const [scrollPct, setScrollPct] = useState(0);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { openTrial } = useSFModal();

  // Scroll to top on route change (but preserve anchor jumps).
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setScrollPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF', color: '#111827' }}>
      {/* Orange scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-0.5 pointer-events-none"
        style={{ width: `${scrollPct}%`, background: '#E8892B', transition: 'width 80ms linear' }}
      />
      <SFNav isHome={isHome} onTrial={openTrial} />
      {/* Spacer so fixed nav doesn't cover content on non-home routes */}
      {!isHome && <div style={{ height: 72, background: '#1A3C5E' }} />}
      {children}
      <SFFooter />
      <Toaster />
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode; onCta?: () => void }) {
  return (
    <SFModalProvider>
      <LayoutInner>{children}</LayoutInner>
    </SFModalProvider>
  );
}
