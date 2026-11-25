import { Link } from 'react-router';
import { Layout } from '../Layout';
import { useI18n } from '../../i18n/I18nProvider';

export function NotFoundPage() {
  const { t, localizePath } = useI18n();
  return (
    <Layout>
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-bold">{t('notFound.title')}</h1>
        <p className="mt-4">{t('notFound.body')}</p>
        <Link className="mt-6 inline-block underline" to={localizePath('/')}>{t('notFound.home')}</Link>
      </main>
    </Layout>
  );
}
