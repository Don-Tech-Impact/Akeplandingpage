import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, GraduationCap, MapPin, Quote } from 'lucide-react';
import { Layout } from '../Layout';
import { UniversityLogo } from '../components/universities/UniversityCard';
import { NAVY, ORANGE, MUTED, BORDER } from '../components/scholarflow/theme';
import { DEGREE_LABELS, fetchUniversity, placeOf, type PublicUniversity } from '../lib/universities';

export function UniversityPage() {
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
          <Link to="/universities" className="inline-flex items-center gap-1.5 text-sm mb-8" style={{ color: MUTED }}>
            <ArrowLeft size={15} /> All universities
          </Link>

          {state === 'loading' && <p className="text-sm" style={{ color: MUTED }}>Loading…</p>}
          {state === 'missing' && <p className="text-sm" style={{ color: MUTED }}>This university isn&apos;t listed.</p>}
          {state === 'error' && <p className="text-sm" style={{ color: MUTED }}>Something went wrong. Please try again.</p>}

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
                  <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>Focus areas</h2>
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
                    <GraduationCap size={14} /> Degree levels
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {u.degree_levels.map((d) => (
                      <span key={d} className="rounded-full px-3 py-1.5 text-xs font-medium" style={{ border: `1px solid ${BORDER}`, color: NAVY }}>
                        {DEGREE_LABELS[d] ?? d}
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
                  Visit website <ExternalLink size={14} />
                </a>
              )}
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
}
