import { AkepLogo } from './AkepUI';

export function AkepFooter() {
  const cols = [
    { title: 'Product', links: ['Features', 'How it works', 'Pricing', 'Demo'] },
    { title: 'Company', links: ['About', 'Careers', 'Contact', 'Press'] },
    { title: 'Resources', links: ['Docs', 'Blog', 'Security', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'DPA', 'Cookies'] },
  ];
  return (
    <footer
      className="border-t pt-16 pb-8 px-6"
      style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: '#0A0815' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <AkepLogo />
          <p className="mt-4 text-white/60 text-sm max-w-xs">
            The AI-powered research and dissertation platform for modern universities.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-white/90 mb-4 text-sm">{c.title}</div>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/55 text-sm hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/45">
        <div>© {new Date().getFullYear()} AKEP. All rights reserved.</div>
        <div>Built for African universities, designed for the world.</div>
      </div>
    </footer>
  );
}
