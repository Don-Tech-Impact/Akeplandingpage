import { ReactNode } from 'react';

export const PURPLE = '#6B21F5';
export const PURPLE_LIGHT = '#A78BFA';
export const BG = '#0D0B1F';
export const BG_ALT = '#14102B';

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm"
      style={{
        borderColor: 'rgba(107, 33, 245, 0.4)',
        backgroundColor: 'rgba(107, 33, 245, 0.1)',
        color: '#C4B5FD',
      }}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] text-white ${className}`}
      style={{
        background: 'linear-gradient(135deg, #6B21F5 0%, #8B5CF6 100%)',
        boxShadow: '0 8px 24px rgba(107, 33, 245, 0.35)',
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg border transition-all hover:bg-white/5 text-white ${className}`}
      style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
    >
      {children}
    </button>
  );
}

export function AkepLogo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-lg flex items-center justify-center text-white"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #6B21F5 0%, #A78BFA 100%)',
          boxShadow: '0 4px 16px rgba(107, 33, 245, 0.4)',
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M14 4v5h5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="14" r="2" fill="white" />
        </svg>
      </div>
      <span className="text-white tracking-wide">AKEP</span>
    </div>
  );
}
