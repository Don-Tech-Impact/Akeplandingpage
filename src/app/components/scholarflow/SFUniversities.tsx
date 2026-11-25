import { Link } from 'react-router';
import { Eyebrow, SectionHeading } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE } from './theme';
import { UniversityCard } from '../universities/UniversityCard';
import { useUniversities } from '../universities/useUniversities';
import { useI18n } from '../../../i18n/I18nProvider';

// Hidden until at least one university has opted in, so the page never shows an empty shell.
export function SFUniversities() {
  const { items } = useUniversities();
  const { t, localizePath } = useI18n();
  if (!items || items.length === 0) return null;

  return (
    <section id="universities" className="py-24 px-6" style={{ background: '#F8FAFD' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>{t('universities.partners')}</Eyebrow>
          <SectionHeading>{t('universities.partnerHeading')}</SectionHeading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((u, i) => (
            <Reveal key={u.slug} delay={i * 80}>
              <UniversityCard u={u} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to={localizePath('/universities')} className="text-sm font-semibold" style={{ color: ORANGE }}>
            <span style={{ color: NAVY }}>{t('universities.browse')}</span> &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
