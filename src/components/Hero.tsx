import { ArrowRight, MessageSquare } from 'lucide-react';
import WorkflowCanvas from './WorkflowCanvas';

interface HeroProps {
  scrollProgress: number;
  onBookAudit: () => void;
}

export default function Hero({ scrollProgress, onBookAudit }: HeroProps) {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950 pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-ink-50">
              I build automations that take{' '}
              <span className="text-accent-gradient">repetitive work</span>{' '}
              off your plate.
            </h1>

            <p className="text-base lg:text-lg text-ink-200 leading-relaxed max-w-lg">
              I design practical systems that help businesses handle customer communication, follow-ups, email and repetitive operations with less manual work.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={scrollToProjects} className="btn-primary group">
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={scrollToContact} className="btn-secondary group">
                <MessageSquare className="w-4 h-4" />
                Let's Talk
              </button>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] hidden lg:block overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <WorkflowCanvas scrollProgress={scrollProgress} className="w-full h-full max-w-[640px]" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-ink-300 animate-float-slow">
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-ink-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
