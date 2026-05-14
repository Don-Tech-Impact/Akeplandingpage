import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { PrimaryButton } from './AkepUI';

interface AkepModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subject?: string;
}

export function AkepModal({ isOpen, onClose, title, subject }: AkepModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState(subject || '');

  if (!isOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Thanks ${name || 'there'} — we'll reach out within 24h.`);
    setName('');
    setEmail('');
    setOrg('');
    setMessage(subject || '');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(5, 4, 15, 0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border p-8"
        style={{
          borderColor: 'rgba(107, 33, 245, 0.5)',
          background: 'linear-gradient(160deg, rgba(20,16,43,0.98) 0%, rgba(13,11,31,0.98) 100%)',
          boxShadow: '0 0 80px rgba(107, 33, 245, 0.3)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h3 className="text-white">{title}</h3>
        <p className="mt-2 text-white/60 text-sm">
          Tell us a bit about your institution and we'll get back within one business day.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-lg border text-white placeholder-white/40 outline-none focus:border-purple-400"
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
            placeholder="Work email"
            className="w-full px-4 py-3 rounded-lg border text-white placeholder-white/40 outline-none focus:border-purple-400"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          />
          <input
            type="text"
            required
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="University / Organization"
            className="w-full px-4 py-3 rounded-lg border text-white placeholder-white/40 outline-none focus:border-purple-400"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to discuss?"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border text-white placeholder-white/40 outline-none focus:border-purple-400 resize-none"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          />
          <PrimaryButton className="w-full">Send request</PrimaryButton>
        </form>
      </div>
    </div>
  );
}
