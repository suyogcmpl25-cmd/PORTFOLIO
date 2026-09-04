import { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: string;
  kind: 'trigger' | 'process' | 'action' | 'ai' | 'output';
}

interface Edge {
  from: string;
  to: string;
}

const NODES: Node[] = [
  { id: 'n1', x: 80, y: 120, label: 'Trigger', icon: 'webhook', kind: 'trigger' },
  { id: 'n2', x: 290, y: 80, label: 'Classify', icon: 'filter', kind: 'process' },
  { id: 'n3', x: 290, y: 220, label: 'AI Reply', icon: 'sparkles', kind: 'ai' },
  { id: 'n4', x: 500, y: 150, label: 'Approve', icon: 'check', kind: 'process' },
  { id: 'n5', x: 680, y: 80, label: 'Send Email', icon: 'mail', kind: 'action' },
  { id: 'n6', x: 680, y: 220, label: 'Update Sheet', icon: 'sheet', kind: 'output' },
  { id: 'n7', x: 500, y: 300, label: 'Log', icon: 'database', kind: 'output' },
];

const EDGES: Edge[] = [
  { from: 'n1', to: 'n2' },
  { from: 'n1', to: 'n3' },
  { from: 'n2', to: 'n4' },
  { from: 'n3', to: 'n4' },
  { from: 'n4', to: 'n5' },
  { from: 'n4', to: 'n6' },
  { from: 'n3', to: 'n7' },
];

const PATHS: string[][] = [
  ['n1', 'n2', 'n4', 'n5'],
  ['n1', 'n3', 'n4', 'n6'],
  ['n1', 'n3', 'n7'],
];

const ICON_PATHS: Record<string, string> = {
  webhook: 'M10 14L14 6M8 8a4 4 0 1 1 0 8M14 16h2a3 3 0 1 0-6 0',
  filter: 'M3 4h18l-7 8v6l-4 2v-8z',
  sparkles: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z M19 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z',
  check: 'M5 12l5 5L20 7',
  mail: 'M3 5h18v14H3z M3 5l9 7 9-7',
  sheet: 'M4 3h16v18H4z M4 9h16 M4 15h16 M10 3v18',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
};

function getNode(id: string): Node {
  return NODES.find((n) => n.id === id)!;
}

function edgePath(from: Node, to: Node): string {
  const dx = to.x - from.x;
  const midX = from.x + dx * 0.5;
  return `M ${from.x + 60} ${from.y + 24} C ${midX} ${from.y + 24}, ${midX} ${to.y + 24}, ${to.x} ${to.y + 24}`;
}

function buildPath(nodeIds: string[]): string {
  let d = '';
  for (let i = 0; i < nodeIds.length - 1; i++) {
    const from = getNode(nodeIds[i]);
    const to = getNode(nodeIds[i + 1]);
    d += edgePath(from, to) + ' ';
  }
  return d;
}

const KIND_STYLES: Record<Node['kind'], { ring: string; glow: string; bg: string }> = {
  trigger: { ring: '#3b82f6', glow: 'rgba(59,130,246,0.3)', bg: '#0f1114' },
  process: { ring: '#3a3f47', glow: 'rgba(255,255,255,0.05)', bg: '#0f1114' },
  action: { ring: '#3b82f6', glow: 'rgba(59,130,246,0.25)', bg: '#0f1114' },
  ai: { ring: '#60a5fa', glow: 'rgba(96,165,250,0.35)', bg: '#0f1114' },
  output: { ring: '#3a3f47', glow: 'rgba(255,255,255,0.05)', bg: '#0f1114' },
};

interface WorkflowCanvasProps {
  scrollProgress: number;
  className?: string;
}

export default function WorkflowCanvas({ scrollProgress, className }: WorkflowCanvasProps) {
  const [activePath, setActivePath] = useState(0);
  const [signalPos, setSignalPos] = useState({ x: 140, y: 144 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRaf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animateParallax = () => {
      setParallax((prev) => ({
        x: prev.x + (mouseRef.current.x * 12 - prev.x) * 0.05,
        y: prev.y + (mouseRef.current.y * 12 - prev.y) * 0.05,
      }));
      parallaxRaf.current = requestAnimationFrame(animateParallax);
    };
    parallaxRaf.current = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(parallaxRaf.current);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let progress = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      progress += dt * 0.25;

      if (progress >= 1) {
        setActivePath((ap) => (ap + 1) % PATHS.length);
        progress = 0;
      }

      const pathEl = pathRef.current;
      if (pathEl) {
        const totalLen = pathEl.getTotalLength();
        const point = pathEl.getPointAtLength(totalLen * progress);
        setSignalPos({ x: point.x, y: point.y });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollY = scrollProgress * 200;
  const scrollOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  const currentPath = PATHS[activePath];
  const fullPath = buildPath(currentPath);

  return (
    <div
      className={`relative ${className || ''}`}
      style={{
        transform: `translate3d(${parallax.x}px, ${parallax.y - scrollY * 0.3}px, 0)`,
        opacity: scrollOpacity,
        transition: 'opacity 0.1s linear',
      }}
    >
      <svg
        viewBox="40 30 760 340"
        className="w-full h-full"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))' }}
      >
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#262a30" />
            <stop offset="100%" stopColor="#3a3f47" />
          </linearGradient>
          <linearGradient id="signal-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="signal-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dy="2" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          return (
            <path
              key={i}
              d={edgePath(from, to)}
              stroke="url(#edge-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.5}
            />
          );
        })}

        <path
          ref={pathRef}
          d={fullPath}
          stroke="url(#signal-grad)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />

        <g filter="url(#signal-glow)">
          <circle cx={signalPos.x} cy={signalPos.y} r="5" fill="#60a5fa" />
          <circle cx={signalPos.x} cy={signalPos.y} r="10" fill="#3b82f6" opacity="0.3" />
        </g>

        {NODES.map((node) => {
          const style = KIND_STYLES[node.kind];
          const isActive = currentPath.includes(node.id);
          return (
            <g
              key={node.id}
              filter="url(#node-shadow)"
              style={{
                transform: `translate(${node.x}px, ${node.y}px)`,
                opacity: isActive ? 1 : 0.85,
                transition: 'opacity 0.5s ease',
              }}
            >
              <rect
                width="120"
                height="48"
                rx="8"
                fill={style.bg}
                stroke={isActive ? style.ring : '#262a30'}
                strokeWidth="1.5"
                style={{
                  filter: isActive ? `drop-shadow(0 0 8px ${style.glow})` : 'none',
                  transition: 'all 0.5s ease',
                }}
              />
              <rect
                width="3"
                height="48"
                rx="1.5"
                fill={style.ring}
                opacity={isActive ? 1 : 0.4}
                style={{ transition: 'opacity 0.5s ease' }}
              />
              <g
                transform="translate(12, 12)"
                stroke={isActive ? style.ring : '#565c66'}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICON_PATHS[node.icon]} />
              </g>
              <text
                x="40"
                y="29"
                fill={isActive ? '#e2e6ea' : '#828a96'}
                fontSize="12"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
                style={{ transition: 'fill 0.5s ease' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
