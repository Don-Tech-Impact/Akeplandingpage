import { createContext, useContext, useState, ReactNode } from 'react';
import { SFModal } from './SFModal';

type Ctx = { openPilot: () => void; openDemo: () => void };

const ModalContext = createContext<Ctx>({ openPilot: () => {}, openDemo: () => {} });

export function useSFModal() {
  return useContext(ModalContext);
}

export function SFModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'pilot' | 'demo' | null>(null);
  return (
    <ModalContext.Provider value={{ openPilot: () => setMode('pilot'), openDemo: () => setMode('demo') }}>
      {children}
      <SFModal isOpen={mode !== null} mode={mode ?? 'pilot'} onClose={() => setMode(null)} />
    </ModalContext.Provider>
  );
}
