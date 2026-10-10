import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact, submitWaitlist } from '../../lib/api';
import { NAVY, ORANGE, INK, MUTED, BORDER } from './theme';

interface SFModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'trial' | 'demo';
}

export function SFModal({ isOpen, onClose, mode }: SFModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isTrial = mode === 'trial';
  const title = isTrial ? 'Request Your 60-Day Free Trial' : 'Book a 30-Minute Demo';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isTrial) {
        await submitWaitlist({
          name,
          email,
          institution: org,
          challenge: message,
          source: 'ScholarFlow free trial request',
        });
      } else {
        await submitContact({
          name,
          email,
          institution: org,
          subject: 'ScholarFlow demo request',
          message,
        });
      }
      toast.success(`Thanks ${name || 'there'} — we'll reach out within 24h.`);
      setName('');
      setEmail('');
      setOrg('');
      setMessage('');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = { borderColor: BORDER, backgroundColor: '#FFFFFF', color: INK } as const;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(17,24,39,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ background: '#FFFFFF', boxShadow: '0 30px 80px -20px rgba(17,24,39,0.4)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-70" style={{ color: MUTED }} aria-label="Close">
          <X size={20} />
        </button>
        <h3 className="font-bold" style={{ color: NAVY, fontSize: 20 }}>{title}</h3>
        <p className="mt-2 text-sm" style={{ color: MUTED }}>
          Tell us a bit about your institution and we&apos;ll get back within one business day.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-lg border outline-none" style={inputStyle} />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="w-full px-4 py-3 rounded-lg border outline-none" style={inputStyle} />
          <input type="text" required value={org} onChange={(e) => setOrg(e.target.value)} placeholder="University / Institution" className="w-full px-4 py-3 rounded-lg border outline-none" style={inputStyle} />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={isTrial ? 'Anything we should know about your research office?' : 'What would you like to see in the demo?'} rows={3} className="w-full px-4 py-3 rounded-lg border outline-none resize-none" style={inputStyle} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-5 py-3 rounded-lg font-semibold transition-all hover:opacity-95"
            style={{ background: ORANGE, color: '#FFFFFF', boxShadow: '0 6px 16px rgba(232,137,43,0.35)' }}
          >
            {isSubmitting ? 'Sending…' : isTrial ? 'Request Free Trial' : 'Book Demo'}
          </button>
        </form>
      </div>
    </div>
  );
}
