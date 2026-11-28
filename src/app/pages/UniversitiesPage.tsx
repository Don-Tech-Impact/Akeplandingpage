import { useMemo, useState } from 'react';
import { Search, RefreshCw, Building2 } from 'lucide-react';
import { Layout } from '../Layout';
import { Eyebrow, SectionHeading } from '../components/scholarflow/SFUI';
import { MUTED, BORDER, NAVY, TINT } from '../components/scholarflow/theme';
import { UniversityCard } from '../components/universities/UniversityCard';
import { useUniversities } from '../components/universities/useUniversities';
import { useI18n } from '../../i18n/I18nProvider';

export function UniversitiesPage() {
  const { t } = useI18n();
  const { items, error, loading, retry } = useUniversities();
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
            <Eyebrow>{t('universities.eyebrow')}</Eyebrow>
            <SectionHeading as="h1">{t('universities.heading')}</SectionHeading>
            <p className="mt-4 sf-lead" style={{ color: MUTED }}>
              {t('universities.body')}
            </p>
          </div>

          <div className="relative max-w-md mx-auto mb-12">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('universities.search')}
              aria-label={t('universities.searchLabel')}
              className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[#E8892B]/40"
              style={{ border: `1px solid ${BORDER}` }}
            />
          </div>

          {loading && (
            <div role="status" aria-live="polite">
              <span className="sr-only">{t('universities.loading')}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-2xl bg-white p-6" style={{ border: `1px solid ${BORDER}` }}>
                    <div className="flex items-center gap-3">
                      <div className="sf-skeleton h-12 w-12 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <div className="sf-skeleton h-4 w-3/4 rounded" />
                        <div className="sf-skeleton h-3 w-1/2 rounded" />
                      </div>
                    </div>
                    <div className="sf-skeleton mt-5 h-3 w-full rounded" />
                    <div className="sf-skeleton mt-2 h-3 w-5/6 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="sf-fade-in mx-auto flex max-w-md flex-col items-center rounded-2xl px-6 py-10 text-center"
              style={{ background: TINT, border: `1px solid ${BORDER}` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white" aria-hidden="true">
                <Building2 size={22} style={{ color: NAVY }} />
              </span>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
                {t('universities.loadError')}
              </p>
              <button
                type="button"
                onClick={retry}
                className="sf-btn mt-5 inline-flex items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold hover:bg-white"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                <RefreshCw size={15} aria-hidden="true" />
                {t('universities.retry')}
              </button>
            </div>
          )}
          {items && shown.length === 0 && (
            <p className="text-center text-sm" style={{ color: MUTED }}>
              {t(items.length === 0 ? 'universities.empty' : 'universities.noMatch')}
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
