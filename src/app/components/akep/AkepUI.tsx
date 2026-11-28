import { ReactNode } from 'react';

// Legacy token names kept for compatibility; values now follow the ScholarFlow brand.
export const PURPLE = '#1A3C5E';
export const PURPLE_LIGHT = '#F4B26A';
export const PURPLE_SOFT = '#EEF4FB';
export const BG = '#0F2236';
export const BG_ALT = '#163150';
export const INK = '#111827';
export const MUTED = '#4B5563';
export const BORDER = '#E3EAF2';
export const SURFACE = '#FFFFFF';
export const SURFACE_ALT = '#F7F9FC';
export const DARK = '#0F2236';
export const ACCENT = '#E8892B';
export const ACCENT_TEXT = '#B45309';

// ─── Dark-section surface & overlay tokens ───────────────────────────────────
export const SURFACE_DARK = '#183553';
export const PURPLE_DIM = 'rgba(232,137,43,0.12)';
export const PURPLE_BORDER = 'rgba(232,137,43,0.28)';
export const TEXT_MUTED = 'rgba(255,255,255,0.55)';
export const TEXT_DIM = 'rgba(255,255,255,0.35)';

export function SectionEyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase"
      style={{ color: dark ? PURPLE_LIGHT : ACCENT_TEXT, letterSpacing: '0.14em' }}
    >
      {children}
    </span>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm"
      style={{
        borderColor: PURPLE_BORDER,
        backgroundColor: PURPLE_DIM,
        color: PURPLE_LIGHT,
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
      className={`sf-btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold hover:opacity-95 ${className}`}
      style={{
        background: ACCENT,
        color: 'white',
        boxShadow: '0 8px 22px rgba(232,137,43,0.3)',
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
      className={`sf-btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 font-semibold hover:bg-[#EEF4FB] ${className}`}
      style={{
        borderColor: PURPLE,
        color: PURPLE,
        background: 'white',
      }}
    >
      {children}
    </button>
  );
}

export function AkepLogo({ dark = false, size = 32 }: { dark?: boolean; size?: number }) {
  const LOGO_NAVY = '#0D1B3E';
  const LOGO_GOLD = '#F59E0B';
  return (
    <div className="flex items-center gap-2.5">
      {/* Mark: navy rounded square with gold "A" lettermark */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.28),
          background: LOGO_NAVY,
          border: `1.5px solid rgba(245,158,11,${dark ? '0.55' : '0.40'})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: dark
            ? '0 0 0 1px rgba(245,158,11,0.12)'
            : '0 2px 8px rgba(13,27,62,0.18)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 20 20" fill="none">
          {/* Stylised "A" lettermark */}
          <path
            d="M3.5 16L10 4L16.5 16"
            stroke={LOGO_GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 11.5h8"
            stroke={LOGO_GOLD}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* Wordmark: Playfair Display for academic character */}
      <span
        style={{
          color: dark ? '#FFFFFF' : LOGO_NAVY,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: size * 0.56,
          letterSpacing: '0.06em',
          lineHeight: 1,
        }}
      >
        AKEP
      </span>
    </div>
  );
}
