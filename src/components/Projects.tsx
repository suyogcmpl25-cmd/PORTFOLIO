import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, Layers, Wrench, TrendingUp } from 'lucide-react';
import type { ProjectData } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PROJECTS: ProjectData[] = [
  {
    id: 'p1',
    number: '01',
    title: 'Restaurant Automation Suite',
    problem: 'Restaurants can lose leads through missed calls, slow follow-ups and inconsistent customer communication.',
    built: 'A collection of automations for missed-call handling, customer feedback, review requests, AI sentiment analysis, review replies and customer win-back campaigns.',
    value: 'Less manual customer communication and faster follow-up.',
    tags: ['n8n', 'Twilio', 'OpenAI', 'Gmail'],
    imageUrl: 'https://images.pexels.com/photos/4921260/pexels-photo-4921260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'p2',
    number: '02',
    title: 'AI Email Reply System',
    problem: 'Businesses spend valuable time reading repetitive emails and writing similar responses.',
    built: 'An AI workflow that classifies incoming emails, drafts appropriate responses and sends them for human approval before sending.',
    value: 'Faster email handling while keeping a human in control.',
    tags: ['n8n', 'OpenAI', 'Gmail', 'Google Sheets'],
    imageUrl: 'https://images.pexels.com/photos/7821760/pexels-photo-7821760.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'p3',
    number: '03',
    title: 'Automated Invoice Generator',
    problem: 'Creating invoices manually is repetitive and time-consuming.',
    built: 'A workflow that takes information from Google Sheets, cleans the data, generates an invoice number, fills a Google Docs template, creates a PDF and prepares the invoice email.',
    value: 'Turns a repetitive invoice process into an automated workflow.',
    tags: ['n8n', 'Google Sheets', 'Google Docs', 'Gmail'],
    imageUrl: 'https://images.pexels.com/photos/7651555/pexels-photo-7651555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

function ProjectModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-300 hover:text-ink-50 transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent-400 tracking-widest">{project.number}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent-500/30 to-transparent" />
        </div>

        <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink-50 mb-6">
          {project.title}
        </h3>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-red-400" />
              </div>
              <span className="text-xs font-mono tracking-widest text-ink-300">PROBLEM</span>
            </div>
            <p className="text-sm text-ink-100 leading-relaxed pl-8">{project.problem}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-accent-500/10 flex items-center justify-center">
                <Wrench className="w-3.5 h-3.5 text-accent-400" />
              </div>
              <span className="text-xs font-mono tracking-widest text-ink-300">WHAT I BUILT</span>
            </div>
            <p className="text-sm text-ink-100 leading-relaxed pl-8">{project.built}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              </div>
              <span className="text-xs font-mono tracking-widest text-ink-300">VALUE</span>
            </div>
            <p className="text-sm text-ink-100 leading-relaxed pl-8">{project.value}</p>
          </div>

          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-ink-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardLarge({
  project,
  onOpen,
}: {
  project: ProjectData;
  onOpen: () => void;
}) {
  return (
    <div className="max-w-5xl w-full mx-auto px-6 lg:px-10">
      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-8 lg:p-10 space-y-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-accent-400 tracking-widest">
                {project.number}
              </span>
              <div className="h-px w-12 bg-accent-500/30" />
            </div>

            <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink-50 leading-tight">
              {project.title}
            </h3>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-xs font-mono tracking-widest text-red-400/70">PROBLEM</span>
                <p className="text-sm text-ink-200 leading-relaxed mt-1">{project.problem}</p>
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-accent-400/70">WHAT I BUILT</span>
                <p className="text-sm text-ink-200 leading-relaxed mt-1">{project.built}</p>
              </div>
              <div>
                <span className="text-xs font-mono tracking-widest text-green-400/70">VALUE</span>
                <p className="text-sm text-ink-200 leading-relaxed mt-1">{project.value}</p>
              </div>
            </div>

            <button
              onClick={onOpen}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors pt-2"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="relative bg-ink-800 border-l border-white/5 min-h-[300px] lg:min-h-[420px] overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-900/80 via-ink-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-mono border border-white/10 bg-black/40 backdrop-blur-sm text-ink-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ progress: 0, sectionIndex: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.max(0, Math.min(1, scrolled / total));
        const sectionIndex = Math.min(PROJECTS.length - 1, Math.floor(progress * PROJECTS.length));
        setScrollState({ progress, sectionIndex });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="projects" className="relative">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28 reveal ${visible ? 'visible' : ''}`}>
        <div className="mb-14 lg:mb-20">
          <span className="section-label">Portfolio</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-3 text-ink-50">
            Selected Work
          </h2>
          <p className="text-ink-200 mt-3 max-w-lg">
            A few automation systems I've built to solve real repetitive business problems.
          </p>
        </div>
      </div>

      {/* Desktop pinned stacking */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: `${PROJECTS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {PROJECTS.map((project, i) => {
            const stagePosition = scrollState.progress * (PROJECTS.length - 1);
            const activeIndex = Math.min(PROJECTS.length - 1, Math.floor(stagePosition));
            const transitionProgress = stagePosition - activeIndex;

            let translateY = 35;
            let opacity = 0;
            let scale = 0.98;
            let zIndex = 1;

            if (i < activeIndex) {
              translateY = -10;
              opacity = 0.35;
              scale = 0.97;
              zIndex = i + 1;
            } else if (i === activeIndex) {
              translateY = -transitionProgress * 18;
              opacity = 1;
              scale = 1 - transitionProgress * 0.02;
              zIndex = PROJECTS.length + 1;
            } else if (i === activeIndex + 1) {
              translateY = (1 - transitionProgress) * 35;
              opacity = transitionProgress;
              scale = 0.98 + transitionProgress * 0.02;
              zIndex = PROJECTS.length + 2;
            }

            return (
              <div
                key={project.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translateY(${translateY}%) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'transform 0.12s linear, opacity 0.12s linear',
                }}
              >
                <ProjectCardLarge
                  project={project}
                  onOpen={() => setSelectedProject(project)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical cards */}
      <div className="lg:hidden px-6 pb-20 space-y-6">
        {PROJECTS.map((project) => (
          <div key={project.id} className="glass rounded-2xl overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-accent-400 tracking-widest">{project.number}</span>
                <div className="h-px w-12 bg-accent-500/30" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-50">{project.title}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-mono tracking-widest text-red-400/70">PROBLEM</span>
                  <p className="text-sm text-ink-200 leading-relaxed mt-1">{project.problem}</p>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest text-accent-400/70">WHAT I BUILT</span>
                  <p className="text-sm text-ink-200 leading-relaxed mt-1">{project.built}</p>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest text-green-400/70">VALUE</span>
                  <p className="text-sm text-ink-200 leading-relaxed mt-1">{project.value}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors"
              >
                View Project
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
