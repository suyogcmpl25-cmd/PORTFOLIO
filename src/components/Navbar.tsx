import { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  onBookAudit: () => void;
}

const NAV_LINKS = [
  { label: 'SOLUTIONS', href: '#solutions' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'PROCESS', href: '#process' },
  { label: 'ABOUT', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onBookAudit }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent-500/10 border border-accent-500/30 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
            <Zap className="w-4 h-4 text-accent-400" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-sm tracking-wide leading-tight text-ink-50">
            SUYOG S. PATIL
            <span className="block mt-0.5 text-[9px] font-mono font-normal tracking-[0.16em] text-accent-400">
              AI AUTOMATION BUILDER
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium tracking-widest text-ink-200 hover:text-ink-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button onClick={onBookAudit} className="btn-primary text-xs tracking-wide">
            Book a Free Audit
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink-100 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/5">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-widest text-ink-200 hover:text-ink-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onBookAudit();
              }}
              className="btn-primary text-xs tracking-wide w-full justify-center mt-2"
            >
              Book a Free Audit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
