import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionEyebrow } from './AkepUI';

interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

const team: Member[] = [
  {
    name: 'Abdulai Tamba Lebbie',
    role: 'CEO & Founder',
    bio: 'Visionary leader at the intersection of AI and African higher education. Building AKEP to transform how research institutions manage knowledge, compliance, and academic workflows across the continent.',
    photo: '/team/abdulai-tamba-lebbie.jpg',
  },
  {
    name: 'Lanre Olusegun Akinola',
    role: 'AI Engineer',
    bio: 'Designs and deploys the machine learning models that power AKEP\'s semantic analysis — from entity extraction to intelligent document classification. Focused on AI that understands the nuance of academic language and institutional context.',
    photo: '/team/akinola-lanre-olusegun.jpeg',
  },
  {
    name: 'Foday Mansaray',
    role: 'Front-End Engineer',
    bio: 'Crafts the interfaces that make complex research workflows feel intuitive. Bridges design and engineering to ensure every researcher, administrator, and compliance officer gets a clear, responsive experience.',
    photo: '/team/foday-mansaray.jpeg',
  },
  {
    name: 'Richard Ekow Sackey',
    role: 'Backend Engineer',
    bio: 'Architects the APIs, data pipelines, and infrastructure that keep AKEP reliable at scale. Ensures that every record stored and every workflow triggered performs exactly as expected — under any load.',
    photo: '/team/richard-ekow-sackey.jpeg',
  },
];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
