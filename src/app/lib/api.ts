const SAFE_PROD_API_BASE_URL = "https://email_api.akepapp.com";

function normalizeBaseUrl(value?: string) {
  if (!value) return "";
  return value.trim().replace(/\/+$/, "");
}

function resolveApiBaseUrl() {
  const configuredBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
  if (configuredBaseUrl) {
    const normalizedBaseUrl = configuredBaseUrl;

    // In production, avoid using raw ALB hostnames from stale environment settings.
    if (!import.meta.env.DEV) {
      try {
        const host = new URL(normalizedBaseUrl).hostname;
        if (host.endsWith("elb.amazonaws.com")) {
          return SAFE_PROD_API_BASE_URL;
        }
      } catch {
        return SAFE_PROD_API_BASE_URL;
      }
    }

    return normalizedBaseUrl;
  }

  // Keep localhost default only for local development.
  if (import.meta.env.DEV) {
    return "http://localhost:8787";
  }

  return SAFE_PROD_API_BASE_URL;
}

const API_BASE_URL = resolveApiBaseUrl();

type WaitlistPayload = {
  name?: string;
  email: string;
  institution?: string;
  role?: string;
  country?: string;
  source?: string;
  challenge?: string;
};

type ContactPayload = {
  name: string;
  email: string;
  institution?: string;
  subject?: string;
  message?: string;
};

async function postJson<TPayload>(path: string, payload: TPayload) {
  if (!API_BASE_URL && !import.meta.env.DEV) {
    throw new Error("Frontend misconfigured: set VITE_API_BASE_URL for production builds.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function submitWaitlist(payload: WaitlistPayload) {
  return postJson("/api/waitlist", payload);
}

export function submitContact(payload: ContactPayload) {
  return postJson("/api/contact", payload);
}

export { API_BASE_URL };
