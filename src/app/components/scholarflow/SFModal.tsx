import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { submitContact, submitWaitlist } from '../../lib/api';
import { NAVY, ORANGE, INK, MUTED, BORDER } from './theme';
import { useI18n } from '../../../i18n/I18nProvider';
import type { MessageKey } from '../../../i18n/en';

interface SFModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'pilot' | 'demo';
}

const roles: MessageKey[] = [
  'modal.student', 'modal.supervisor', 'modal.graduate', 'modal.research',
  'modal.department', 'modal.leadership', 'modal.ict', 'modal.procurement',
  'modal.other', 'modal.preferNot',
];
const goals: MessageKey[] = [
  'modal.goalResearch', 'modal.goalSupervision', 'modal.goalDepartment',
  'modal.goalReporting', 'modal.goalOther',
];

export function SFModal({ isOpen, onClose, mode }: SFModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { t, language, localizePath } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    dialogRef.current?.querySelector<HTMLElement>('input')?.focus();
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isPilot = mode === 'pilot';
  const title = t(isPilot ? 'modal.pilotTitle' : 'modal.demoTitle');
  const close = () => {
    onClose();
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const details = {
      name: name.trim(), email: email.trim(), institution: org.trim(),
      role, country: country.trim(), goal, language, formType: 'institutional' as const,
    };
    try {
      if (isPilot) {
        await submitWaitlist({
          ...details, challenge: message.trim(), source: 'ScholarFlow institutional pilot enquiry',
        });
      } else {
        await submitContact({
          ...details, subject: 'ScholarFlow demo request', message: message.trim(),
        });
      }
      setName('');
      setEmail('');
      setOrg('');
      setRole('');
      setCountry('');
      setGoal('');
      setMessage('');
      onClose();
      navigate(localizePath('/thank-you'), { state: { email: details.email } });
    } catch (error) {
      console.error('Request submission failed:', error);
      toast.error(language === 'fr' ? t('modal.failure') : error instanceof Error ? error.message : t('modal.failure'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = { borderColor: BORDER, backgroundColor: '#FFFFFF', color: INK } as const;
  const inputClass = 'mt-1 w-full px-4 py-3 rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A3C5E]';
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      const elements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      );
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(17,24,39,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={close}>
      <div ref={dialogRef} onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
        style={{ background: '#FFFFFF', boxShadow: '0 30px 80px -20px rgba(17,24,39,0.4)' }}
        role="dialog" aria-modal="true" aria-labelledby="sf-modal-title">
        <button type="button" onClick={close} className="absolute top-4 right-4 hover:opacity-70"
          style={{ color: MUTED }} aria-label={t('modal.close')}>
          <X size={20} />
        </button>
          <>
            <h3 id="sf-modal-title" className="font-bold pr-6" style={{ color: NAVY, fontSize: 20 }}>{title}</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>{t(isPilot ? 'modal.pilotIntro' : 'modal.demoIntro')}</p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="block text-sm font-medium" style={{ color: NAVY }}>
                {t('modal.name')} *
                <input type="text" required pattern=".*\S.*" maxLength={200} autoComplete="name" value={name}
                  onChange={(e) => setName(e.target.value)} className={inputClass} style={inputStyle} />
              </label>
              <label className="block text-sm font-medium" style={{ color: NAVY }}>
                {t('modal.email')} *
                <input type="email" required autoComplete="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} className={inputClass} style={inputStyle} />
              </label>
              <label className="block text-sm font-medium" style={{ color: NAVY }}>
                {t('modal.institution')} *
                <input type="text" required pattern=".*\S.*" maxLength={200} autoComplete="organization" value={org}
                  onChange={(e) => setOrg(e.target.value)} className={inputClass} style={inputStyle} />
              </label>
              <label className="block text-sm font-medium" style={{ color: NAVY }}>
                {t('modal.role')} *
                <select required value={role} onChange={(e) => setRole(e.target.value)} className={inputClass} style={inputStyle}>
                  <option value="">{t('modal.roleOptional')}</option>
                  {roles.map((item) => <option key={item} value={t(item)}>{t(item)}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium" style={{ color: NAVY }}>
                {t('modal.country')}
                <input type="text" autoComplete="country-name" maxLength={100} value={country}
                  onChange={(e) => setCountry(e.target.value)} className={inputClass} style={inputStyle} />
              </label>
              <fieldset>
                <legend className="text-sm font-medium" style={{ color: NAVY }}>{t('modal.goal')}</legend>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {goals.map((item) => (
                    <label key={item} className="flex items-center gap-2 rounded-lg border p-2 text-sm" style={{ borderColor: BORDER, color: INK }}>
                      <input type="radio" name="goal" value={t(item)} checked={goal === t(item)} onChange={(e) => setGoal(e.target.value)} />
                      {t(item)}
                    </label>
                  ))}
                </div>
                {goal && <button type="button" onClick={() => setGoal('')} className="mt-2 text-sm underline" style={{ color: NAVY }}>{t('modal.goalClear')}</button>}
              </fieldset>
              <label className="block text-sm font-medium" style={{ color: NAVY }}>
                {t('modal.messageOptional')}
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} rows={2}
                  className={`${inputClass} resize-y`} style={inputStyle} />
              </label>
              <p className="text-xs" style={{ color: MUTED }}>{t('modal.privacy')}</p>
              <button type="submit" disabled={isSubmitting}
                className="w-full px-5 py-3 rounded-lg font-semibold transition-all hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: ORANGE, color: '#FFFFFF', boxShadow: '0 6px 16px rgba(232,137,43,0.35)' }}>
                {t(isSubmitting ? 'modal.sending' : isPilot ? 'modal.sendPilot' : 'modal.sendDemo')}
              </button>
            </form>
          </>
      </div>
    </div>
  );
}
