import { useState } from 'react';
import { Search } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';

interface Integration {
  name: string;
  category: 'Identity' | 'Storage' | 'Productivity' | 'Communication' | 'Research' | 'LMS';
  initials: string;
}

const integrations: Integration[] = [
  { name: 'Google Workspace', category: 'Productivity', initials: 'GW' },
  { name: 'Microsoft 365', category: 'Productivity', initials: 'M3' },
  { name: 'Okta', category: 'Identity', initials: 'OK' },
  { name: 'Azure AD', category: 'Identity', initials: 'AA' },
  { name: 'Google SSO', category: 'Identity', initials: 'GS' },
  { name: 'Shibboleth', category: 'Identity', initials: 'SH' },
  { name: 'OneDrive', category: 'Storage', initials: 'OD' },
  { name: 'Google Drive', category: 'Storage', initials: 'GD' },
  { name: 'Dropbox', category: 'Storage', initials: 'DB' },
  { name: 'Slack', category: 'Communication', initials: 'SL' },
  { name: 'Teams', category: 'Communication', initials: 'MT' },
  { name: 'Outlook', category: 'Communication', initials: 'OL' },
  { name: 'Zotero', category: 'Research', initials: 'ZT' },
  { name: 'Mendeley', category: 'Research', initials: 'MD' },
  { name: 'ORCID', category: 'Research', initials: 'OR' },
  { name: 'Crossref', category: 'Research', initials: 'CR' },
  { name: 'Moodle', category: 'LMS', initials: 'MO' },
  { name: 'Canvas', category: 'LMS', initials: 'CV' },
  { name: 'Blackboard', category: 'LMS', initials: 'BB' },
  { name: 'Sakai', category: 'LMS', initials: 'SK' },
];

const categories = ['All', 'Identity', 'Storage', 'Productivity', 'Communication', 'Research', 'LMS'];

export function AkepIntegrations() {
  const { t } = useI18n();
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const categoryLabels: Record<string, string> = {
    All: t('integration.all'), Identity: t('integration.identity'), Storage: t('integration.storage'),
    Productivity: t('integration.productivity'), Communication: t('integration.communication'),
    Research: t('integration.research'), LMS: t('integration.lms'),
  };

  const visible = integrations.filter(
    (i) =>
      (active === 'All' || i.category === active) &&
      i.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="integrations" className="py-24 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <SectionEyebrow>{t('integration.eyebrow')}</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            {t('integration.heading')}
          </h2>
          <p className="mt-4" style={{ color: MUTED }}>
            {t('integration.body')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div
            className="flex items-center gap-2 px-4 rounded-lg flex-1"
            style={{ background: 'white', border: `1px solid ${BORDER}` }}
          >
            <Search size={16} style={{ color: MUTED }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('integration.search')}
              aria-label={t('integration.search')}
              className="flex-1 py-3 outline-none bg-transparent text-sm"
              style={{ color: INK }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className="px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{
                    background: isActive ? PURPLE : 'white',
                    color: isActive ? 'white' : INK,
                    border: `1px solid ${isActive ? PURPLE : BORDER}`,
                  }}
                >
                  {categoryLabels[c]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {visible.map((i) => (
            <div
              key={i.name}
              className="rounded-xl p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              style={{ background: 'white', border: `1px solid ${BORDER}` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                style={{ background: PURPLE_SOFT, color: PURPLE }}
              >
                {i.initials}
              </div>
              <div>
                <div className="text-sm" style={{ color: INK }}>
                  {i.name}
                </div>
                <div className="text-xs" style={{ color: MUTED }}>
                  {categoryLabels[i.category]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div
            className="mt-8 rounded-xl p-6 text-center text-sm"
            style={{ background: 'white', border: `1px solid ${BORDER}`, color: MUTED }}
          >
            {t('integration.empty')}
          </div>
        )}

        <p className="mt-6 text-center text-xs" style={{ color: MUTED }}>
          {t('integration.footer')}
        </p>
      </div>
    </section>
  );
}
