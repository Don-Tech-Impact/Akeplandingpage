import { ReactNode, useId } from 'react';
import { NAVY, NAVY_DEEP, ORANGE, ORANGE_DARK, INK, MUTED, BORDER, FONT_HEAD } from './theme';

/**
 * ScholarFlow logo — a graduation cap that dissolves into a "flow" of motion,
 * wrapped in a soft navy badge, with a two-tone "Scholar / Flow" wordmark.
 */
export function SFLogo({
  light = false,
  size = 36,
  showTagline = true,
  markOnly = false,
}: {
  light?: boolean;
  size?: number;
  showTagline?: boolean;
  markOnly?: boolean;
}) {
  const uid = useId().replace(/[:]/g, '');
  const gBadge = `sfBadge-${uid}`;
  const gCap = `sfCap-${uid}`;
  const gFlow = `sfFlow-${uid}`;

  const wordColor = light ? '#FFFFFF' : NAVY;
  const subColor = light ? 'rgba(255,255,255,0.55)' : MUTED;

  const Mark = (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: `linear-gradient(145deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
        boxShadow: light
          ? '0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 14px rgba(26,60,94,0.28), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gCap} x1="6" y1="6" x2="34" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF6B" />
            <stop offset="55%" stopColor={ORANGE} />
            <stop offset="100%" stopColor={ORANGE_DARK} />
          </linearGradient>
          <linearGradient id={gFlow} x1="8" y1="24" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Mortarboard — the graduation cap board */}
        <path d="M20 6L35 13L20 20L5 13L20 6Z" fill={`url(#${gCap})`} />
        {/* Board highlight edge */}
        <path d="M20 6L35 13L20 20" fill="rgba(255,255,255,0.18)" />

        {/* Tassel dropping from the board's right edge */}
        <path d="M33 13.4V19" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="33" cy="20.4" r="1.7" fill={ORANGE} />

        {/* Flow — three tapering waves suggesting progress & motion */}
        <path d="M8 25.5C13 22.5 20 22.5 26 25.5C29 27 31 27 33 25.8" stroke={`url(#${gFlow})`} strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M9 30.5C14 27.8 20 27.8 25 30.5C27.5 31.8 29 31.8 31 30.8" stroke={`url(#${gFlow})`} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M11 35C15 32.8 20 32.8 24 35" stroke={`url(#${gFlow})`} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    </div>
  );

  if (markOnly) return Mark;

  return (
    <div className="flex items-center gap-2.5">
      {Mark}
      <div className="flex flex-col leading-none">
        <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: size * 0.52, letterSpacing: '-0.025em' }}>
          <span style={{ color: wordColor }}>Scholar</span>
          <span style={{ color: ORANGE }}>Flow</span>
        </span>
        {showTagline && (
          <span style={{ color: subColor, fontSize: Math.max(9, size * 0.26), fontWeight: 500, marginTop: 3, letterSpacing: '0.02em' }}>
            by AKEP Technologies
          </span>
        )}
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase mb-4"
      style={{ color: ORANGE, letterSpacing: '0.14em' }}
    >
      {children}
    </span>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        color: NAVY,
        fontFamily: FONT_HEAD,
        fontWeight: 700,
        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </h2>
  );
}

export function PrimaryCTA({
  children,
  onClick,
  href,
  large = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  large?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all hover:opacity-95 ${
    large ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'
  }`;
  const style = {
    background: ORANGE,
    color: '#FFFFFF',
    boxShadow: '0 8px 22px rgba(232,137,43,0.35)',
    transform: 'scale(1)',
  } as const;
  const onEnter = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.transform = 'scale(1.03)');
  const onLeave = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.transform = 'scale(1)');
  if (href) {
    return (
      <a href={href} className={cls} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </button>
  );
}

export function OutlineCTA({
  children,
  onClick,
  href,
  light = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  light?: boolean;
}) {
  const cls =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold px-6 py-3 text-sm border-2 transition-all hover:bg-black/5';
  const style = {
    borderColor: light ? 'rgba(255,255,255,0.5)' : NAVY,
    color: light ? '#FFFFFF' : NAVY,
    background: 'transparent',
  } as const;
  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

export const cardBorder = `1px solid ${BORDER}`;
export { INK, MUTED };
