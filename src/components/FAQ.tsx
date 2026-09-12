import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FAQS = [
  {
    question: 'What kind of businesses do you work with?',
    answer: 'I work with businesses that have repetitive manual processes, customer communication or administrative work that can be improved through automation.',
  },
  {
    question: 'What can you automate?',
    answer: 'Lead capture and qualification, customer follow-ups, email workflows, data processing, reporting, document workflows, invoices and other repetitive business processes.',
  },
  {
    question: 'Can you work with my existing tools?',
    answer: 'Yes. I design automations around the tools your business already uses whenever the required integrations are available.',
  },
  {
    question: 'How much does an automation cost?',
    answer: 'Every automation is different. Pricing depends on the workflow complexity, number of integrations, AI requirements and business needs. After understanding your process, I provide a clear project quote before development begins.',
  },
  {
    question: 'How long does an automation take?',
    answer: 'It depends on the workflow. Simple automations can be built quickly, while larger systems require more planning, testing and refinement. I will give you a realistic timeline before development starts.',
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes. I offer ongoing monitoring, maintenance, troubleshooting and improvements through monthly support plans. The first month of support is free for my clients.',
  },
  {
    question: 'What happens after I contact you?',
    answer: 'We start with a free automation audit to understand your current process, identify opportunities for automation and determine what would provide the most value. If we are a good fit, I provide a clear proposal and project quote.',
  },
];

function FaqItem({ item, isOpen, onToggle }: { item: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm lg:text-base font-medium text-ink-50 group-hover:text-accent-300 transition-colors">
          {item.question}
        </span>
        <div className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-ink-200 group-hover:border-accent-500/30 group-hover:text-accent-400 transition-colors">
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-sm text-ink-200 leading-relaxed pb-5 pr-12">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="faq" className="relative py-20 lg:py-28">
      <div ref={ref} className={`max-w-3xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="mb-10">
          <span className="section-label">FAQ</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-ink-50">
            FAQ
          </h2>
        </div>

        <div className="glass rounded-2xl px-6 lg:px-8">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
