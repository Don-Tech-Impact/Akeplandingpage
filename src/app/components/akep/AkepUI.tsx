import { ReactNode } from 'react';

export const PURPLE = '#6B21F5';
export const PURPLE_SOFT = '#F3EFFF';
export const INK = '#0B0B14';
export const MUTED = '#5B5B6B';
export const BORDER = '#E6E4EF';
export const SURFACE = '#FFFFFF';
export const SURFACE_ALT = '#F8F7FB';
export const DARK = '#0B0420';

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-wide uppercase"
      style={{
        backgroundColor: PURPLE_SOFT,
        color: PURPLE,
        border: `1px solid ${BORDER}`,
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
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-3 rounded-lg transition-all hover:opacity-95 hover:-translate-y-0.5 ${className}`}
      style={{
        background: PURPLE,
        color: 'white',
        boxShadow: '0 6px 16px rgba(107, 33, 245, 0.25)',
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
      className={`px-5 py-3 rounded-lg border transition-colors hover:bg-[#F3EFFF] ${className}`}
      style={{
        borderColor: BORDER,
        color: INK,
        background: 'white',
      }}
    >
      {children}
    </button>
  );
}

export function AkepLogo({ dark = false, size = 32 }: { dark?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-lg flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${PURPLE} 0%, #A78BFA 100%)`,
          boxShadow: '0 4px 14px rgba(107, 33, 245, 0.25)',
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
      <span style={{ color: dark ? 'white' : INK }} className="tracking-wide">
        AKEP
      </span>
    </div>
  );
}
