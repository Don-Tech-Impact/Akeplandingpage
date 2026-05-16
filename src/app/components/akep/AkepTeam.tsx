import { Twitter, Linkedin, Github } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionEyebrow } from './AkepUI';

interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
  links: { twitter?: string; linkedin?: string; github?: string };
}

const team: Member[] = [
  {
    name: 'Alex Rivera',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 10+ years in AI and data science.',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    links: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Samantha Lee',
    role: 'CTO',
    bio: 'Ex-Google engineer, scaling distributed systems.',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    links: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Dr. Naledi Okafor',
    role: 'Head of AI / ML',
    bio: 'PhD in NLP. Built the semantic similarity engine powering AKEP.',
    photo:
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    links: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Kwame Mensah',
    role: 'Head of Partnerships',
    bio: 'A decade leading rollouts of academic software across Africa.',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    links: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Chiamaka Eze',
    role: 'Head of Customer Success',
    bio: 'Helps research offices migrate without losing data — or sleep.',
    photo:
      'https://images.unsplash.com/photo-1607503873903-c5e95f80d7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    links: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Yusuf Bensalem',
    role: 'Lead Product Designer',
    bio: 'Designs research tools that make complex workflows feel obvious.',
    photo:
      'https://images.unsplash.com/photo-1590086782957-93c06ef21604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    links: { twitter: '#', linkedin: '#', github: '#' },
  },
];

function SocialIcon({
  Icon,
  href,
  label,
}: {
  Icon: typeof Twitter;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="transition-colors hover:text-white"
      style={{ color: 'rgba(255,255,255,0.45)' }}
    >
      <Icon size={18} />
    </a>
  );
}

function TeamCard({ member }: { member: Member }) {
  return (
    <div
      className="rounded-2xl p-8 text-center"
      style={{
        background: '#16122B',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 50px -25px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="mx-auto rounded-full p-[3px]"
        style={{
          width: 112,
          height: 112,
          background:
            'linear-gradient(135deg, #6B21F5 0%, #C084FC 50%, #A78BFA 100%)',
        }}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{ background: '#0D0B1F' }}
        >
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-5 text-white" style={{ fontSize: '1.125rem' }}>
        {member.name}
      </div>
      <div className="mt-1" style={{ color: '#A78BFA' }}>
        {member.role}
      </div>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {member.bio}
      </p>
      <div className="mt-5 flex items-center justify-center gap-5">
        {member.links.twitter && (
          <SocialIcon Icon={Twitter} href={member.links.twitter} label="Twitter" />
        )}
        {member.links.linkedin && (
          <SocialIcon Icon={Linkedin} href={member.links.linkedin} label="LinkedIn" />
        )}
        {member.links.github && (
          <SocialIcon Icon={Github} href={member.links.github} label="GitHub" />
        )}
      </div>
    </div>
  );
}

export function AkepTeam() {
  return (
    <section
      id="team"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#0B0420' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(107,33,245,0.25) 0%, rgba(11,4,32,0) 60%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionEyebrow>Team</SectionEyebrow>
          <h2 className="mt-4 text-white" style={{ letterSpacing: '-0.01em' }}>
            Builders, researchers, and operators behind AKEP
          </h2>
          <p className="mt-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            A small, focused team with deep roots in African higher education, applied AI, and
            software for research operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        <p
          className="mt-10 text-center text-xs"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Profiles shown are placeholders while we finalize team bios.
        </p>
      </div>
    </section>
  );
}
