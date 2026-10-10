import { Linkedin, Mail } from 'lucide-react';
import { Eyebrow, SectionHeading, cardBorder } from './SFUI';
import { Reveal } from './Reveal';
import { NAVY, ORANGE, MUTED, INK } from './theme';

type Member = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
  email: string;
};

const team: Member[] = [
  {
    name: 'Abdulai Tamba Lebbie',
    role: 'Founder & DevSecOps Engineer',
    photo: '/team/abdulai-tamba-lebbie.jpg',
    bio: 'MSc in AI & Cybersecurity (University of Udine, Italy & University of Klagenfurt, Austria) and ISO 27001 Lead Auditor. Published at ECCS 2026, Vienna. He designs and secures the infrastructure that ScholarFlow runs on.',
    linkedin: 'https://www.linkedin.com/in/abdulai-tamba-lebbie-9556919b/',
    email: 'atlebbie@gmail.com',
  },
  {
    name: 'Akinola Lanre',
    role: 'Co-founder & AI Engineer',
    photo: '/team/akinola-lanre-olusegun.jpeg',
    bio: 'Leads the AI and machine-learning systems behind ScholarFlow — from semantic search and retrieval to the models that make years of research instantly discoverable.',
    linkedin: 'https://www.linkedin.com/in/akinola-lanre-olusegun-409784102/',
    email: 'akinolalanre75@gmail.com',
  },
];

export function SFAbout() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <Eyebrow>About AKEP Technologies</Eyebrow>
          <SectionHeading>Meet the Team Building ScholarFlow</SectionHeading>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: MUTED }}>
            AKEP Technologies is an AI-focused company founded in 2023. ScholarFlow is our flagship
            product, built after direct engagement with research offices across Africa. We believe
            the infrastructure managing African research should be as ambitious as the research
            itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 120}>
              <div
                className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{ border: cardBorder }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-bold" style={{ color: NAVY, fontSize: 20 }}>
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold" style={{ color: ORANGE }}>
                    {m.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
                    {m.bio}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
                      style={{ background: 'rgba(26,60,94,0.08)', color: NAVY }}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`mailto:${m.email}`}
                      aria-label={`Email ${m.name}`}
                      className="inline-flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-semibold"
                      style={{ background: 'rgba(232,137,43,0.12)', color: INK }}
                    >
                      <Mail size={16} style={{ color: ORANGE }} />
                      {m.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
