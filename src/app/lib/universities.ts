export type PublicUniversity = {
  slug: string;
  name: string;
  logo_url: string | null;
  motto: string | null;
  website_url: string | null;
  description: string | null;
  focus_areas: string[];
  degree_levels: string[];
  city: string | null;
  country: string;
};

const configured = (import.meta.env.VITE_AKEP_API_URL as string | undefined)?.trim();
// Dev falls back to the local AKEP API; production must set VITE_AKEP_API_URL.
export const AKEP_API_URL = (configured || (import.meta.env.DEV ? 'http://localhost:3000' : '')).replace(/\/+$/, '');

export const DEGREE_LABELS: Record<string, string> = {
  Certificate: 'Certificate',
  Diploma: 'Diploma',
  HigherDiploma: 'Higher Diploma',
  AdvancedDiploma: 'Advanced Diploma',
  Undergraduate: 'Undergraduate',
  Masters: "Master's",
  PhD: 'PhD',
};

export function assetUrl(path: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${AKEP_API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function placeOf(u: PublicUniversity): string {
  return [u.city, u.country].filter(Boolean).join(', ');
}

export async function fetchUniversities(): Promise<PublicUniversity[]> {
  if (!AKEP_API_URL) return [];
  const res = await fetch(`${AKEP_API_URL}/api/v1/public/universities`);
  if (!res.ok) throw new Error('Could not load universities');
  return res.json();
}

export async function fetchUniversity(slug: string): Promise<PublicUniversity | null> {
  if (!AKEP_API_URL) return null;
  const res = await fetch(`${AKEP_API_URL}/api/v1/public/universities/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Could not load university');
  return res.json();
}
