import { useEffect } from "react";
import { useLocation } from "react-router";
import seo from "../../seo.json";

export function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const page = seo.pages[path as keyof typeof seo.pages];
    // Dynamic university profiles are not part of the static page manifest.
    const title = page?.title || "University Profile | ScholarFlow";
    const description = page?.description || "Explore university profiles in the ScholarFlow directory.";
    const url = `${seo.origin}${path}`;

    document.title = title;
    const values: Record<string, string> = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': url,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
    };
    for (const [selector, content] of Object.entries(values)) {
      document.querySelector(selector)?.setAttribute("content", content);
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [pathname]);

  return null;
}
