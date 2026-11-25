import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { PageMetadata } from "./app/components/PageMetadata";
import App from "./app/App.tsx";
import { FeaturesPage } from "./app/pages/FeaturesPage.tsx";
import { HowItWorksPage } from "./app/pages/HowItWorksPage.tsx";
import { SecurityPage } from "./app/pages/SecurityPage.tsx";
import { UseCasesPage } from "./app/pages/UseCasesPage.tsx";
import { AboutPage } from "./app/pages/AboutPage.tsx";
import { UniversitiesPage } from "./app/pages/UniversitiesPage.tsx";
import { UniversityPage } from "./app/pages/UniversityPage.tsx";
import { PricingPage } from "./app/pages/PricingPage.tsx";
import { I18nProvider } from "./i18n/I18nProvider";
import { NotFoundPage } from "./app/pages/NotFoundPage";
import { ThankYouPage } from "./app/pages/ThankYouPage";
import "./styles/index.css";

const pages = [
  { index: true, element: <App /> },
  { path: "features", element: <FeaturesPage /> },
  { path: "how-it-works", element: <HowItWorksPage /> },
  { path: "security", element: <SecurityPage /> },
  { path: "use-cases", element: <UseCasesPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "pricing", element: <PricingPage /> },
  { path: "universities", element: <UniversitiesPage /> },
  { path: "universities/:slug", element: <UniversityPage /> },
  { path: "thank-you", element: <ThankYouPage /> },
  { path: "*", element: <NotFoundPage /> },
];

const router = createBrowserRouter([
  {
    element: <I18nProvider><PageMetadata /><Outlet /></I18nProvider>,
    children: [
      { path: "/", children: pages },
      { path: "/fr", children: pages },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
