import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Layout } from '../Layout';
import { Eyebrow, SectionHeading } from '../components/scholarflow/SFUI';
import { MUTED, BORDER } from '../components/scholarflow/theme';
import { UniversityCard } from '../components/universities/UniversityCard';
import { useUniversities } from '../components/universities/useUniversities';

export function UniversitiesPage() {
  const { items, error, loading } = useUniversities();
  const [q, setQ] = useState('');

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!items) return [];
    if (!term) return items;
    return items.filter((u) =>
      [u.name, u.city, u.country, ...u.focus_areas].some((v) => v?.toLowerCase().includes(term))
    );
  }, [items, q]);

  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow>Universities</Eyebrow>
            <SectionHeading>Find your university on ScholarFlow</SectionHeading>
            <p className="mt-4 text-sm" style={{ color: MUTED }}>
              Institutions that manage dissertations with ScholarFlow.
            </p>
          </div>

          <div className="relative max-w-md mx-auto mb-12">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, city or focus"
              aria-label="Search universities"
              className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-sm outline-none focus:ring-2"
              style={{ border: `1px solid ${BORDER}` }}
            />
          </div>

          {loading && <p className="text-center text-sm" style={{ color: MUTED }}>Loading…</p>}
          {error && (
            <p className="text-center text-sm" style={{ color: MUTED }}>
              We couldn&apos;t load universities right now. Please try again shortly.
            </p>
          )}
          {items && shown.length === 0 && (
            <p className="text-center text-sm" style={{ color: MUTED }}>
              {items.length === 0 ? 'No universities are listed yet.' : 'No universities match your search.'}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((u) => (
              <UniversityCard key={u.slug} u={u} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
