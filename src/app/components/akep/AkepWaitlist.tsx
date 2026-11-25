import { ArrowRight } from 'lucide-react';
import { DARK } from './AkepUI';
import { useI18n } from '../../../i18n/I18nProvider';
import { useSFModal } from '../scholarflow/SFModalProvider';

export function AkepWaitlist() {
  const { t } = useI18n();
  const { openPilot } = useSFModal();

  return (
    <section id="waitlist" className="relative py-24 px-6 overflow-hidden" style={{ background: DARK }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(107, 33, 245, 0.4) 0%, rgba(11, 4, 32, 0) 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, rgba(11, 4, 32, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-white" style={{ letterSpacing: '-0.01em' }}>
          {t('waitlist.title')}
        </h2>
        <p className="mt-4 text-white/70">
          {t('waitlist.body')}
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={openPilot}
            className="px-5 py-3 rounded-lg inline-flex items-center justify-center gap-2 hover:opacity-90 transition"
            style={{ background: 'white', color: DARK }}
          >
            {t('waitlist.submit')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
