import { useScrollReveal } from '@/hooks/useScrollReveal';

const STEPS = [
  {
    number: '01',
    title: 'Understand',
    description: 'I analyze your current workflow, identify bottlenecks and find the repetitive tasks worth automating.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'I design a practical automation around your existing process, tools and business requirements.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'I connect the required apps, APIs and AI services to turn the design into a working system.',
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'I test the automation, launch it into your workflow and provide ongoing support when needed.',
  },
];

export default function Process() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="process" className="relative py-20 lg:py-28">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="mb-14">
          <span className="section-label">Process</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-ink-50">
            How I Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%-1.5rem)] w-12 h-px bg-gradient-to-r from-accent-500/30 to-transparent" />
              )}
              <div className="glass rounded-xl p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm text-accent-400 tracking-widest">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink-50 mb-2 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-200 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
