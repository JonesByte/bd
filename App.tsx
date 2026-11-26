import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { SectionDivider } from './components/SectionDivider';



// --- LAZY LOADING MÁGICO ---
// Só carrega esses componentes pesados quando a tela é montada, poupando a internet do usuário.
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Showcase = lazy(() => import('./components/Showcase').then(m => ({ default: m.Showcase })));
const Feedbacks = lazy(() => import('./components/Feedbacks').then(m => ({ default: m.Feedbacks })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Payment = lazy(() => import('./components/Payment').then(m => ({ default: m.Payment })));

import { isMercadoPagoRoute } from './constants';

const App: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isMercadoPago, setIsMercadoPago] = useState(() => isMercadoPagoRoute());
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Evita conflito entre restauração nativa do navegador e Lenis no carregamento inicial
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    let lenisRafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      lenisRafId = requestAnimationFrame(raf);
    }
    lenisRafId = requestAnimationFrame(raf);

    // Intercept anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const rawHref = anchor.getAttribute('href');
        if (rawHref && rawHref !== '#') {
          e.preventDefault();
          const targetId = rawHref === '#calculo-comparacao' ? '#faq' : rawHref;
          lenis.scrollTo(targetId, {
            duration: 0.75,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const handleRouteChange = () => {
      setIsMercadoPago(isMercadoPagoRoute());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      cancelAnimationFrame(lenisRafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-byte-navy text-white selection:bg-byte-purple selection:text-white font-sans">
      <Preloader />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-byte-cyan to-byte-purple z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />

      <main>
        <Hero currentThemeIndex={currentThemeIndex} />
        
        {/* Suspense envolve os componentes Lazy. Ele mostra o spinner se a net do cara for lenta. */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-byte-navy"><div className="w-8 h-8 border-2 border-byte-cyan border-t-transparent rounded-full animate-spin"></div></div>}>
          <Features />
          <SectionDivider from="#050C16" to="#050C16" />
          <Showcase currentThemeIndex={currentThemeIndex} setCurrentThemeIndex={setCurrentThemeIndex} />
          <SectionDivider from="#050C16" to="#040914" />
          <Feedbacks />
          <SectionDivider from="#040914" to="#060b18" />
          <Payment isMercadoPago={isMercadoPago} />
          <SectionDivider from="#060b18" to="#050C16" />
          <FAQ isMercadoPago={isMercadoPago} />
        </Suspense>
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
