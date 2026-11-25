import { useEffect } from "react";
import { useLocation } from "react-router";
import seo from "../../seo.json";
import { useI18n } from "../../i18n/I18nProvider";

export function PageMetadata() {
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const french = /^\/fr(?:\/|$)/.test(path);
    const englishPath = path.replace(/^\/fr(?=\/|$)/, "") || "/";
    const page = seo.pages[englishPath as keyof typeof seo.pages];
    const universityProfile = /^\/universities\/[^/]+$/.test(englishPath);
    const thankYou = englishPath === "/thank-you";
    // Dynamic university profiles are not part of the static page manifest.
    const title = thankYou ? `${t('confirm.directTitle')} | ScholarFlow`
      : page ? (french ? page.frTitle : page.title)
      : universityProfile ? (french ? "Profil universitaire | ScholarFlow" : "University Profile | ScholarFlow")
      : `${t('notFound.title')} | ScholarFlow`;
    const description = thankYou ? t('confirm.generic')
      : page ? (french ? page.frDescription : page.description)
      : universityProfile ? (french ? "Découvrez les profils universitaires dans l’annuaire ScholarFlow." : "Explore university profiles in the ScholarFlow directory.")
      : t('notFound.body');
    const url = `${seo.origin}${path}`;

    document.title = title;
    const values: Record<string, string> = {
      'meta[name="description"]': description,
      'meta[name="robots"]': thankYou ? 'noindex, nofollow' : 'index, follow',
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': url,
      'meta[property="og:locale"]': french ? 'fr_FR' : 'en_GB',
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
    };
    for (const [selector, content] of Object.entries(values)) {
      document.querySelector(selector)?.setAttribute("content", content);
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('link[hreflang="en"]')?.setAttribute("href", `${seo.origin}${englishPath}`);
    document.querySelector('link[hreflang="fr"]')?.setAttribute("href", `${seo.origin}/fr${englishPath === "/" ? "" : englishPath}`);
    document.querySelector('link[hreflang="x-default"]')?.setAttribute("href", `${seo.origin}${englishPath}`);
  }, [pathname, t]);

  return null;
}
