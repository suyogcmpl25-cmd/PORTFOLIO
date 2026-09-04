import { Zap } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function About() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="mb-10">
          <span className="section-label">About</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-ink-50">
            About Me
          </h2>
        </div>

        <div className="glass rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex items-start gap-5 mb-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent-400" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-lg text-ink-50 leading-relaxed">
                I am Suyog, an independent AI automation builder focused on turning repetitive business tasks into simple systems that run automatically.
              </p>
            </div>
          </div>

          <p className="text-base text-ink-200 leading-relaxed pl-0 lg:pl-[4.5rem]">
            I work with automation platforms, AI models and everyday business tools to build practical workflows that save time, improve response speed and reduce manual work.
          </p>
        </div>
      </div>
    </section>
  );
}
