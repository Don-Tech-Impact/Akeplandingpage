import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, GraduationCap, MapPin, Quote } from 'lucide-react';
import { Layout } from '../Layout';
import { UniversityLogo } from '../components/universities/UniversityCard';
import { NAVY, ORANGE, MUTED, BORDER } from '../components/scholarflow/theme';
import { fetchUniversity, placeOf, type PublicUniversity } from '../lib/universities';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/en';

const degreeKeys: Record<string, MessageKey> = {
  Certificate: 'degree.certificate', Diploma: 'degree.diploma',
  HigherDiploma: 'degree.higher', AdvancedDiploma: 'degree.advanced',
  Undergraduate: 'degree.undergraduate', Masters: 'degree.masters', PhD: 'degree.phd',
};

export function UniversityPage() {
  const { t, localizePath } = useI18n();
  const { slug = '' } = useParams();
  const [u, setU] = useState<PublicUniversity | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading');

  useEffect(() => {
    let live = true;
    setState('loading');
    fetchUniversity(slug)
      .then((d) => {
        if (!live) return;
        setU(d);
        setState(d ? 'ready' : 'missing');
      })
      .catch(() => live && setState('error'));
    return () => {
      live = false;
    };
  }, [slug]);

  return (
    <Layout>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to={localizePath('/universities')} className="inline-flex items-center gap-1.5 text-sm mb-8" style={{ color: MUTED }}>
            <ArrowLeft size={15} /> {t('universities.back')}
          </Link>

          {state === 'loading' && <p className="text-sm" style={{ color: MUTED }}>{t('universities.loading')}</p>}
          {state === 'missing' && <p className="text-sm" style={{ color: MUTED }}>{t('universities.missing')}</p>}
          {state === 'error' && <p className="text-sm" style={{ color: MUTED }}>{t('universities.error')}</p>}

          {state === 'ready' && u && (
            <article className="rounded-3xl bg-white p-8 sm:p-10" style={{ border: `1px solid ${BORDER}` }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <UniversityLogo u={u} size={88} />
                <div className="min-w-0">
                  <h1 className="font-bold leading-tight" style={{ color: NAVY, fontSize: 28 }}>{u.name}</h1>
                  {placeOf(u) && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: MUTED }}>
                      <MapPin size={14} /> {placeOf(u)}
                    </p>
                  )}
                </div>
              </div>

              {u.motto && (
                <p className="mt-8 flex items-start gap-2 text-lg italic" style={{ color: NAVY }}>
                  <Quote size={18} className="mt-1 shrink-0" style={{ color: ORANGE }} />
                  {u.motto}
                </p>
              )}

              {u.description && (
                <p className="mt-6 leading-relaxed whitespace-pre-line" style={{ color: MUTED }}>{u.description}</p>
              )}

              {u.focus_areas.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>{t('universities.focus')}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {u.focus_areas.map((f) => (
                      <span key={f} className="rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: '#EEF4FB', color: NAVY }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {u.degree_levels.length > 0 && (
                <div className="mt-8">
                  <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>
                    <GraduationCap size={14} /> {t('universities.degrees')}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {u.degree_levels.map((d) => (
                      <span key={d} className="rounded-full px-3 py-1.5 text-xs font-medium" style={{ border: `1px solid ${BORDER}`, color: NAVY }}>
                        {degreeKeys[d] ? t(degreeKeys[d]) : d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {u.website_url && (
                <a
                  href={u.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ background: ORANGE }}
                >
                  {t('universities.website')} <ExternalLink size={14} />
                </a>
              )}
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
}
