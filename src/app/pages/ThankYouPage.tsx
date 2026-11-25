import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Layout } from '../Layout';
import { NAVY, ORANGE, MUTED } from '../components/scholarflow/theme';
import { useI18n } from '../../i18n/I18nProvider';

export function ThankYouPage() {
  const { state } = useLocation();
  const { t, localizePath } = useI18n();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const email = typeof state?.email === 'string' ? state.email : '';

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <Layout>
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold" style={{ color: NAVY }}>
          {t(email ? 'confirm.title' : 'confirm.directTitle')}
        </h1>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: MUTED }}>
          {email ? <>{t('confirm.emailPrefix')}<strong className="break-all" style={{ color: NAVY }}>{email}</strong>{t('confirm.emailSuffix')}</> : t('confirm.generic')}
        </p>
        <section className="mt-10 rounded-2xl p-6 sm:p-8" style={{ background: '#F1F5F9' }}>
          <h2 className="text-xl font-bold" style={{ color: NAVY }}>{t('confirm.scheduleTitle')}</h2>
          <p className="mt-3 leading-relaxed" style={{ color: MUTED }}>{t('confirm.scheduleBody')}</p>
          <button type="button" disabled aria-describedby="booking-availability"
            className="mt-5 rounded-lg px-5 py-3 font-semibold cursor-not-allowed opacity-60"
            style={{ background: NAVY, color: '#FFFFFF' }}>
            {t('confirm.schedule')}
          </button>
          <p id="booking-availability" className="mt-2 text-sm" style={{ color: MUTED }}>{t('confirm.comingSoon')}</p>
        </section>
        <p className="mt-10 font-semibold" style={{ color: NAVY }}>{t('confirm.explore')}</p>
        <Link to={localizePath('/how-it-works')} className="mt-2 inline-block font-semibold underline" style={{ color: ORANGE }}>
          {t('confirm.how')}
        </Link>
      </main>
    </Layout>
  );
}
