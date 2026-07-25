import { createContext, useContext, useState, ReactNode } from 'react';
import { SFModal } from './SFModal';

type Ctx = { openTrial: () => void; openDemo: () => void };

const ModalContext = createContext<Ctx>({ openTrial: () => {}, openDemo: () => {} });

export function useSFModal() {
  return useContext(ModalContext);
}

export function SFModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'trial' | 'demo' | null>(null);
  return (
    <ModalContext.Provider value={{ openTrial: () => setMode('trial'), openDemo: () => setMode('demo') }}>
      {children}
      <SFModal isOpen={mode !== null} mode={mode ?? 'trial'} onClose={() => setMode(null)} />
    </ModalContext.Provider>
  );
}
