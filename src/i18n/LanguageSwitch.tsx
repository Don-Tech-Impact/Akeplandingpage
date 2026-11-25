import { useI18n } from './I18nProvider';

export function LanguageSwitch() {
  const { language, switchLanguage, t } = useI18n();
  return (
    <div role="group" aria-label={t('language.label')} className="flex items-center gap-1 text-sm text-white">
      {(['en', 'fr'] as const).map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-label={option === 'en' ? 'English' : 'Français'}
          aria-pressed={language === option}
          onClick={() => switchLanguage(option)}
          className="rounded px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ fontWeight: language === option ? 700 : 400, textDecoration: language === option ? 'underline' : 'none' }}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
