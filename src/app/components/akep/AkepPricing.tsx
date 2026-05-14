import { useState } from 'react';
import { Check } from 'lucide-react';
import { GhostButton, PrimaryButton, SectionBadge } from './AkepUI';

const tiers = [
  {
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    desc: 'For small departments piloting AKEP',
    features: [
      'Up to 50 active dissertations',
      'Basic duplicate detection',
      'Single faculty workspace',
      'Email support',
    ],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'University',
    monthly: 499,
    yearly: 399,
    desc: 'For full universities and research offices',
    features: [
      'Unlimited dissertations',
      'Advanced AI duplicate detection',
      'Supervisor matching engine',
      'Multi-faculty workspaces',
      'SSO + audit logs',
      'Priority support',
    ],
    cta: 'Request demo',
    highlight: true,
  },
  {
    name: 'Consortium',
    monthly: null,
    yearly: null,
    desc: 'For ministries and university networks',
    features: [
      'Multi-institution dashboards',
      'Cross-institution duplicate search',
      'Custom integrations & SLA',
      'Dedicated success manager',
      'On-prem deployment option',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

export function AkepPricing({ onCta }: { onCta: () => void }) {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionBadge>💎 Pricing</SectionBadge>
          <h2 className="mt-6 text-white">Simple, transparent pricing</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Pay per institution, not per student. Scale without surprises.
          </p>

          <div
            className="inline-flex items-center mt-8 p-1 rounded-full border"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                !yearly ? 'text-white' : 'text-white/60'
              }`}
              style={!yearly ? { backgroundColor: 'rgba(107, 33, 245, 0.25)' } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                yearly ? 'text-white' : 'text-white/60'
              }`}
              style={yearly ? { backgroundColor: 'rgba(107, 33, 245, 0.25)' } : {}}
            >
              Yearly <span style={{ color: '#A78BFA' }}>−20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => {
            const price = yearly ? t.yearly : t.monthly;
            return (
              <div
                key={t.name}
                className="rounded-2xl border p-8 flex flex-col"
                style={{
                  borderColor: t.highlight ? 'rgba(107, 33, 245, 0.6)' : 'rgba(255,255,255,0.08)',
                  background: t.highlight
                    ? 'linear-gradient(160deg, rgba(107,33,245,0.18) 0%, rgba(20,16,43,0.8) 60%)'
                    : 'rgba(20,16,43,0.5)',
                  boxShadow: t.highlight ? '0 0 60px rgba(107, 33, 245, 0.25)' : 'none',
                }}
              >
                {t.highlight && (
                  <div
                    className="self-start mb-4 px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: 'rgba(107, 33, 245, 0.3)',
                      color: '#C4B5FD',
                    }}
                  >
                    Most popular
                  </div>
                )}
                <h3 className="text-white">{t.name}</h3>
                <p className="mt-1 text-white/60 text-sm">{t.desc}</p>
                <div className="mt-6 text-white">
                  {price === null ? (
                    <span className="text-3xl">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl">${price}</span>
                      <span className="text-white/50 text-sm ml-2">
                        / {yearly ? 'month, billed yearly' : 'month'}
                      </span>
                    </>
                  )}
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-white/75 text-sm">
                      <Check size={16} style={{ color: '#A78BFA' }} className="mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {t.highlight ? (
                    <PrimaryButton onClick={onCta} className="w-full">
                      {t.cta}
                    </PrimaryButton>
                  ) : (
                    <GhostButton onClick={onCta} className="w-full">
                      {t.cta}
                    </GhostButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
