import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Tools from '@/components/Tools';
import Projects from '@/components/Projects';
import Solutions from '@/components/Solutions';
import Process from '@/components/Process';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import AuditModal from '@/components/AuditModal';
import { useScrollProgress } from '@/hooks/useScrollProgress';

function App() {
  const [auditOpen, setAuditOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-ink-950 overflow-x-hidden">
      <Navbar onBookAudit={() => setAuditOpen(true)} />

      <main>
        <Hero scrollProgress={scrollProgress} onBookAudit={() => setAuditOpen(true)} />
        <Tools />
        <Projects />
        <Solutions />
        <Process />
        <About />
        <FAQ />
        <FinalCTA onBookAudit={() => setAuditOpen(true)} />
      </main>

      <Footer />

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </div>
  );
}

export default App;
