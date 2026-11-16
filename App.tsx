import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';



// --- LAZY LOADING MÁGICO ---
// Só carrega esses componentes pesados quando a tela é montada, poupando a internet do usuário.
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Showcase = lazy(() => import('./components/Showcase').then(m => ({ default: m.Showcase })));
const Feedbacks = lazy(() => import('./components/Feedbacks').then(m => ({ default: m.Feedbacks })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Payment = lazy(() => import('./components/Payment').then(m => ({ default: m.Payment })));
const FloatingPromoCountdown = lazy(() => import('./components/FloatingPromoCountdown').then(m => ({ default: m.FloatingPromoCountdown })));

import { isMercadoPagoRoute } from './constants';
import { useLanguage } from './i18n/LanguageContext';

const SECTIONS = [
  { id: 'hero', label: 'Início' },
  { id: 'features', label: 'Recursos' },
  { id: 'showcase', label: 'Interface' },
  { id: 'feedbacks', label: 'Depoimentos' },
  { id: 'pricing', label: 'Oferta' },
  { id: 'faq', label: 'Dúvidas' },
];

const App: React.FC = () => {
  const { tr } = useLanguage();
  const { t } = useLanguage();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isMercadoPago, setIsMercadoPago] = useState(() => isMercadoPagoRoute());
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Evita conflito entre restauração nativa do navegador e Lenis no carregamento inicial
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
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

    const getCurrentSectionIndex = () => {
      const scrollY = window.scrollY;
      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        return SECTIONS.length - 1;
      }

      let bestIdx = 0;
      let minDistance = Infinity;

      SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(top - scrollY);
        if (distance < minDistance) {
          minDistance = distance;
          bestIdx = idx;
        }
      });
      return bestIdx;
    };

    // Atualiza a bolinha ativa ao rolar de forma leve (sem travar o ciclo de renderização)
    let scrollRafId: number | null = null;
    lenis.on('scroll', () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        const idx = getCurrentSectionIndex();
        if (SECTIONS[idx]) {
          setActiveSectionId((prev) => (prev === SECTIONS[idx].id ? prev : SECTIONS[idx].id));
        }
        scrollRafId = null;
      });
    });

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
            duration: 1.0,
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
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      cancelAnimationFrame(lenisRafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-byte-navy text-white selection:bg-byte-purple selection:text-white font-sans">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-byte-cyan to-byte-purple z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />

      {/* Indicador Flutuante Lateral de Seções (Desktop Luxury Dots) */}
      <div 
        className="hidden lg:flex fixed right-4 xl:right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2.5 bg-[#050C16]/85 backdrop-blur-md p-2 rounded-full border border-white/10"
        aria-label={tr("Navegador de Seções")}
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSectionId === sec.id;
          const secLabel = t.sections[sec.id as keyof typeof t.sections] || sec.label;
          return (
            <button
              key={sec.id}
              onClick={() => {
                const lenis = (window as any).lenis;
                if (lenis) {
                  lenis.scrollTo(`#${sec.id}`, {
                    duration: 1.0,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  });
                }
              }}
              aria-label={tr('Ir para {name}', { name: secLabel })}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
            >
              {/* Tooltip ao passar o mouse */}
              <span className="absolute right-full mr-3.5 px-2.5 py-1 rounded-lg bg-[#050C16]/95 border border-white/15 text-[11px] font-tech font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-wider uppercase">
                {secLabel}
              </span>

              {/* Bolinha com cor de destaque quando ativa */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#00F0FF] scale-125'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/80 hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>

      <main>
        <Hero currentThemeIndex={currentThemeIndex} />
        
        {/* Suspense envolve os componentes Lazy. Ele mostra o spinner se a net do cara for lenta. */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-byte-navy"><div className="w-8 h-8 border-2 border-byte-cyan border-t-transparent rounded-full animate-spin"></div></div>}>
          <Features />
          <Showcase currentThemeIndex={currentThemeIndex} setCurrentThemeIndex={setCurrentThemeIndex} />
          <Feedbacks />
          <Payment isMercadoPago={isMercadoPago} />
          <FAQ isMercadoPago={isMercadoPago} />
          {/* <FloatingPromoCountdown /> */}
        </Suspense>
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
