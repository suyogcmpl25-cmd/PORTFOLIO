import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FinalCTAProps {
  onBookAudit: () => void;
}

export default function FinalCTA({ onBookAudit }: FinalCTAProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative py-20 lg:py-32">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="relative glass rounded-3xl p-10 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              <span className="section-label text-accent-400">Free Audit</span>
            </div>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-ink-50 leading-[1.1] tracking-tight">
              Have repetitive work?
              <br />
              <span className="text-accent-gradient">Let's automate it.</span>
            </h2>

            <p className="text-base lg:text-lg text-ink-200 mt-6 max-w-xl mx-auto leading-relaxed">
              Tell me what you're doing manually. I'll show you what can be automated.
            </p>

            <button onClick={onBookAudit} className="btn-primary group mt-8 text-sm">
              Book a Free Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
