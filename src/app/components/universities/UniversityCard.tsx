import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { assetUrl, placeOf, type PublicUniversity } from '../../lib/universities';
import { NAVY, ORANGE, MUTED, BORDER } from '../scholarflow/theme';

export function UniversityLogo({ u, size = 56 }: { u: PublicUniversity; size?: number }) {
  const src = assetUrl(u.logo_url);
  const initials = u.name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && w.toLowerCase() !== 'of')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <div
      className="flex items-center justify-center overflow-hidden shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: '#fff',
        border: `1px solid ${BORDER}`,
      }}
    >
      {src ? (
        <img src={src} alt={`${u.name} logo`} className="w-full h-full object-contain p-1.5" loading="lazy" />
      ) : (
        <span className="font-bold" style={{ color: NAVY, fontSize: size * 0.34 }}>
          {initials}
        </span>
      )}
    </div>
  );
}

export function UniversityCard({ u }: { u: PublicUniversity }) {
  const place = placeOf(u);
  return (
    <Link
      to={`/universities/${u.slug}`}
      className="group flex flex-col rounded-2xl bg-white p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{ border: `1px solid ${BORDER}`, boxShadow: '0 1px 2px rgba(17,24,39,0.04)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <UniversityLogo u={u} />
        <ArrowUpRight
          size={18}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: ORANGE }}
        />
      </div>

      <h3 className="mt-5 font-bold leading-snug" style={{ color: NAVY, fontSize: 18 }}>
        {u.name}
      </h3>
      {u.motto && (
        <p className="mt-1 text-sm italic" style={{ color: MUTED }}>
          &ldquo;{u.motto}&rdquo;
        </p>
      )}

      {place && (
        <p className="mt-4 flex items-center gap-1.5 text-xs" style={{ color: MUTED }}>
          <MapPin size={13} /> {place}
        </p>
      )}

      {u.focus_areas.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {u.focus_areas.slice(0, 3).map((f) => (
            <span
              key={f}
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ background: '#EEF4FB', color: NAVY }}
            >
              {f}
            </span>
          ))}
          {u.focus_areas.length > 3 && (
            <span className="px-1 py-1 text-[11px]" style={{ color: MUTED }}>
              +{u.focus_areas.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
