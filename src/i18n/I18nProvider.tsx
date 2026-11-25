import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { en, type MessageKey } from './en';
import { fr } from './fr';

export type Language = 'en' | 'fr';
type Parameters = Record<string, string | number>;
type I18n = {
  language: Language;
  t: (key: MessageKey, parameters?: Parameters) => string;
  switchLanguage: (language: Language) => void;
  localizePath: (path: string) => string;
};

const I18nContext = createContext<I18n | null>(null);
const STORAGE_KEY = 'scholarflow-language';

function stripFrenchPrefix(path: string) {
  return path.replace(/^\/fr(?=\/|$)/, '') || '/';
}

function localize(path: string, language: Language) {
  const englishPath = stripFrenchPrefix(path);
  return language === 'fr' ? `/fr${englishPath === '/' ? '' : englishPath}` : englishPath;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language: Language = /^\/fr(?:\/|$)/.test(location.pathname) ? 'fr' : 'en';
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (language === 'fr') return;
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Unable to read the saved language preference.', error);
    }
    const preferred = saved === 'fr' || saved === 'en'
      ? saved
      : navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    if (preferred === 'fr') {
      navigate(`${localize(location.pathname, 'fr')}${location.search}${location.hash}`, { replace: true, state: location.state });
    }
  }, [language, location.hash, location.pathname, location.search, location.state, navigate]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const switchLanguage = (next: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      console.warn('Unable to save the language preference.', error);
    }
    navigate(`${localize(location.pathname, next)}${location.search}${location.hash}`, { state: location.state });
  };
  const t = (key: MessageKey, parameters: Parameters = {}) => {
    const message = language === 'fr' ? fr[key] ?? en[key] : en[key];
    return message.replace(/\{([^{}]+)\}/g, (placeholder, name: string) =>
      Object.hasOwn(parameters, name) ? String(parameters[name]) : placeholder);
  };

  return (
    <I18nContext.Provider value={{ language, t, switchLanguage, localizePath: (path) => localize(path, language) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used within I18nProvider');
  return value;
}
