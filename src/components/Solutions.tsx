import { Users, Settings, Mail } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SOLUTIONS = [
  {
    number: '01',
    title: 'Lead & Customer Automation',
    description: 'Capture leads, automate follow-ups and improve customer communication.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Business Process Automation',
    description: 'Remove repetitive manual tasks from everyday business operations.',
    icon: Settings,
  },
  {
    number: '03',
    title: 'AI Email & Communication',
    description: 'Use AI to classify, draft and organize business communication.',
    icon: Mail,
  },
];

export default function Solutions() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="solutions" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div ref={ref} className={`relative max-w-7xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="mb-14">
          <span className="section-label">Solutions</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-ink-50">
            What I Can Automate
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.number}
                className="group glass rounded-xl p-8 hover:border-accent-500/30 transition-all duration-300 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center group-hover:bg-accent-500/15 transition-colors">
                    <Icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <span className="font-mono text-xs text-ink-400 tracking-widest">{sol.number}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-50 mb-2">
                  {sol.title}
                </h3>
                <p className="text-sm text-ink-200 leading-relaxed">{sol.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
