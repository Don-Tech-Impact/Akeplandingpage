import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../Layout';
import { NAVY, MUTED } from '../components/scholarflow/theme';
import { useI18n } from '../../i18n/I18nProvider';

export function NotFoundPage() {
  const { t, localizePath } = useI18n();
  return (
    <Layout>
      <main className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <p className="text-xs font-bold uppercase" style={{ color: '#B45309', letterSpacing: '0.14em' }} aria-hidden="true">
          404
        </p>
        <h1 className="mt-3 sf-page-title" style={{ color: NAVY }}>{t('notFound.title')}</h1>
        <p className="mt-4 sf-lead" style={{ color: MUTED }}>{t('notFound.body')}</p>
        <Link
          className="sf-btn mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          style={{ background: NAVY }}
          to={localizePath('/')}
        >
          {t('notFound.home')} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </main>
    </Layout>
  );
}
