import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';



// --- LAZY LOADING MÁGICO ---
// Só carrega esses componentes pesados quando a tela é montada, poupando a internet do usuário.
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const TwitterVideo = lazy(() => import('./components/TwitterVideo').then(m => ({ default: m.TwitterVideo })));
const Showcase = lazy(() => import('./components/Showcase').then(m => ({ default: m.Showcase })));
const Feedbacks = lazy(() => import('./components/Feedbacks').then(m => ({ default: m.Feedbacks })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Payment = lazy(() => import('./components/Payment').then(m => ({ default: m.Payment })));
const FloatingPromoCountdown = lazy(() => import('./components/FloatingPromoCountdown').then(m => ({ default: m.FloatingPromoCountdown })));

import { isMercadoPagoRoute } from './constants';

const App: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isMercadoPago, setIsMercadoPago] = useState(() => isMercadoPagoRoute());

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

    const handleRouteChange = () => {
      setIsMercadoPago(isMercadoPagoRoute());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-byte-navy text-white selection:bg-byte-purple selection:text-white font-sans">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-byte-cyan to-byte-purple z-[60] origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
      <Navbar />
      <main>
        <Hero currentThemeIndex={currentThemeIndex} />
        
        {/* Suspense envolve os componentes Lazy. Ele mostra o spinner se a net do cara for lenta. */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-byte-navy"><div className="w-8 h-8 border-2 border-byte-cyan border-t-transparent rounded-full animate-spin"></div></div>}>
          <Features />
          <TwitterVideo />
          <Showcase currentThemeIndex={currentThemeIndex} setCurrentThemeIndex={setCurrentThemeIndex} />
          <Payment isMercadoPago={isMercadoPago} />
          <Feedbacks />
          <FAQ isMercadoPago={isMercadoPago} />
          <FloatingPromoCountdown />
        </Suspense>
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
