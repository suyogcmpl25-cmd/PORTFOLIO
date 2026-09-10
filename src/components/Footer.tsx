import { Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-500/10 border border-accent-500/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent-400" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-ink-50">Suyog S. Patil</p>
              <p className="text-xs text-ink-200 mt-0.5">AI Automation Builder</p>
              <p className="text-xs text-ink-200 mt-2">
                Based in India · Working with businesses worldwide
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-medium tracking-widest text-ink-200 hover:text-ink-50 transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-ink-300 font-mono">© Suyog S. Patil</p>
        </div>
      </div>
    </footer>
  );
}
