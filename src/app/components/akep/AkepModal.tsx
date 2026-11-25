import { SFModal } from '../scholarflow/SFModal';

interface AkepModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subject?: string;
}

export function AkepModal({ isOpen, onClose, title, subject = '' }: AkepModalProps) {
  const mode = /waitlist/i.test(`${title} ${subject}`) ? 'pilot' : 'demo';
  return <SFModal isOpen={isOpen} onClose={onClose} mode={mode} />;
}
