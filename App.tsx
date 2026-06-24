import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DiscordButton } from './components/DiscordButton';
import { ChatWidget } from './components/ChatWidget';


// --- LAZY LOADING MÁGICO ---
// Só carrega esses componentes pesados quando a tela é montada, poupando a internet do usuário.
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Showcase = lazy(() => import('./components/Showcase').then(m => ({ default: m.Showcase })));
const ProblemSolution = lazy(() => import('./components/ProblemSolution').then(m => ({ default: m.ProblemSolution })));
const Feedbacks = lazy(() => import('./components/Feedbacks').then(m => ({ default: m.Feedbacks })));
const ComparisonTable = lazy(() => import('./components/ComparisonTable').then(m => ({ default: m.ComparisonTable })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Payment = lazy(() => import('./components/Payment').then(m => ({ default: m.Payment })));

const App: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Intercept anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          lenis.scrollTo(href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);



  return (
    <div className="min-h-screen bg-byte-navy text-white selection:bg-byte-purple selection:text-white font-sans">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-byte-cyan to-byte-purple z-[60] origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
      <DiscordButton />
      <ChatWidget />
      <Navbar />
      <main>
        <Hero currentThemeIndex={currentThemeIndex} />
        
        {/* Suspense envolve os componentes Lazy. Ele mostra o spinner se a net do cara for lenta. */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-byte-navy"><div className="w-8 h-8 border-2 border-byte-cyan border-t-transparent rounded-full animate-spin"></div></div>}>
          <ProblemSolution />
          <Features />
          <Showcase currentThemeIndex={currentThemeIndex} setCurrentThemeIndex={setCurrentThemeIndex} />
          <Feedbacks />
          <ComparisonTable />
          
          {/* ORDEM INVERTIDA: Payment primeiro, FAQ depois */}
          <Payment />
          <FAQ />
        </Suspense>
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
