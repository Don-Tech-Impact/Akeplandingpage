import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionEyebrow } from './AkepUI';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { useI18n } from '../../../i18n/I18nProvider';

interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const team: Member[] = [
  {
    name: 'Abdulai Tamba Lebbie',
    role: 'CEO & Founder',
    bio: 'Visionary leader at the intersection of AI and African higher education. Building AKEP to transform how research institutions manage knowledge, compliance, and academic workflows across the continent.',
    photo: '/team/abdulai-tamba-lebbie.jpg',
    linkedin: 'https://www.linkedin.com/in/abdulai-tamba-lebbie',
    twitter: 'https://x.com/abdulaitamba',
    github: 'https://github.com/abdulaitamba',
  },
  {
    name: 'Lanre Olusegun Akinola',
    role: 'AI Engineer',
    bio: "Designs and deploys the machine learning models that power AKEP's semantic analysis — from entity extraction to intelligent document classification. Focused on AI that understands the nuance of academic language and institutional context.",
    photo: '/team/akinola-lanre-olusegun.jpeg',
    linkedin: 'https://www.linkedin.com/in/lanre-akinola',
    github: 'https://github.com/lanre-akinola',
  },
  {
    name: 'Foday Mansaray',
    role: 'Front-End Engineer',
    bio: 'Crafts the interfaces that make complex research workflows feel intuitive. Bridges design and engineering to ensure every researcher, administrator, and compliance officer gets a clear, responsive experience.',
    photo: '/team/foday-mansaray.jpeg',
    linkedin: 'https://www.linkedin.com/in/foday-mansaray',
    github: 'https://github.com/foday-mansaray',
  },
  {
    name: 'Richard Ekow Sackey',
    role: 'Backend Engineer',
    bio: 'Architects the APIs, data pipelines, and infrastructure that keep AKEP reliable at scale. Ensures that every record stored and every workflow triggered performs exactly as expected — under any load.',
    photo: '/team/richard-ekow-sackey.jpeg',
    linkedin: 'https://www.linkedin.com/in/richard-ekow-sackey',
    github: 'https://github.com/richard-ekow-sackey',
  },
];

function TeamCard({ member }: { member: Member }) {
  const { t } = useI18n();
  return (
    <div
      className="sf-card-dark rounded-2xl p-5 sm:p-6 lg:p-7 text-center flex flex-col items-center"
      style={{
        background: '#183553',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 50px -25px rgba(0,0,0,0.5)',
      }}
    >
      {/* Avatar — scales from 88px on mobile up to 112px on desktop */}
      <div
        className="rounded-full p-[3px] w-22 h-22 sm:w-24 sm:h-24 lg:w-28 lg:h-28 shrink-0"
        style={{
          background:
            'linear-gradient(135deg, #E8892B 0%, #F7C98F 50%, #F4B26A 100%)',
        }}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{ background: '#122C46' }}
        >
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <h2 className="mt-4 text-white sf-card-title">
        {member.name}
      </h2>
      <div className="mt-1 text-sm" style={{ color: '#F4B26A' }}>
        {member.role}
      </div>
      <p
        className="mt-3 text-xs sm:text-sm leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {member.bio}
      </p>

      {/* Social links */}
      {(member.linkedin || member.twitter || member.github) && (
        <div className="mt-5 pt-4 w-full flex items-center justify-center gap-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('about.linkedin', { name: member.name })}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <Linkedin size={15} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('team.github', { name: member.name })}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <Github size={15} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('team.twitter', { name: member.name })}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              <Twitter size={15} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function AkepTeam() {
  const { t } = useI18n();
  const localizedTeam = [
    { ...team[0], role: t('team.role1'), bio: t('team.bio1') },
    { ...team[1], role: t('team.role2'), bio: t('team.bio2') },
    { ...team[2], role: t('team.role3'), bio: t('team.bio3') },
    { ...team[3], role: t('team.role4'), bio: t('team.bio4') },
  ];
  return (
    <section
      id="team"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#0F2236' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(76,132,196,0.25) 0%, rgba(15,34,54,0) 60%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto px-2">
          <SectionEyebrow dark>{t('team.eyebrow')}</SectionEyebrow>
          <h1 className="mt-4 text-white sf-page-title">
            {t('team.heading')}
          </h1>
          <p className="mt-5 sf-lead" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {t('team.body')}
          </p>
        </div>

        {/* Mobile: 1 col · Tablet: 2 col · Desktop: 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {localizedTeam.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
