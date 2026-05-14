import { useState } from 'react';
import { toast } from 'sonner';
import { PrimaryButton, SectionBadge } from './AkepUI';

export function AkepWaitlist() {
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(`You're on the list, ${org || 'friend'}! We'll be in touch.`);
    setEmail('');
    setOrg('');
  };

  return (
    <section id="waitlist" className="relative py-24 px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(107, 33, 245, 0.18) 0%, rgba(13,11,31,0) 70%)',
        }}
      />
      <div
        className="relative max-w-3xl mx-auto rounded-2xl border p-10 text-center"
        style={{
          borderColor: 'rgba(107, 33, 245, 0.4)',
          background:
            'linear-gradient(160deg, rgba(20,16,43,0.9) 0%, rgba(13,11,31,0.9) 100%)',
          boxShadow: '0 0 80px rgba(107, 33, 245, 0.2)',
        }}
      >
        <SectionBadge>🚀 Early access</SectionBadge>
        <h2 className="mt-6 text-white">Be first to bring AKEP to your campus</h2>
        <p className="mt-3 text-white/70">
          Universities joining the waitlist get free onboarding and 6 months of University-tier
          access on launch.
        </p>
        <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="University name"
            className="flex-1 px-4 py-3 rounded-lg border text-white placeholder-white/40 outline-none focus:border-purple-400"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            className="flex-1 px-4 py-3 rounded-lg border text-white placeholder-white/40 outline-none focus:border-purple-400"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          />
          <PrimaryButton>Join</PrimaryButton>
        </form>
        <p className="mt-4 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
