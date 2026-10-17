import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero as OriginalHero } from './components/Hero';
import { Hero as PreviewHero } from './components/HeroPreview';

// Only the dedicated test URL uses the proposed video and gallery changes.
const isTestPage = /^\/bd\/teste\/?$/.test(window.location.pathname);
const Hero = isTestPage ? PreviewHero : OriginalHero;
import { Footer } from './components/Footer';



// --- LAZY LOADING MÁGICO ---
// Só carrega esses componentes pesados quando a tela é montada, poupando a internet do usuário.
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Showcase = lazy(() => (isTestPage
  ? import('./components/ShowcasePreview')
  : import('./components/Showcase')
).then(m => ({ default: m.Showcase })));
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

    // --- Controle de Snap Suave por Seção no Desktop ---
    const isSnapping = { current: false };
    let snapCooldownTimer: NodeJS.Timeout | null = null;

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

    const scrollToSectionIndex = (targetIdx: number) => {
      const targetSec = SECTIONS[targetIdx];
      if (!targetSec) return;
      isSnapping.current = true;
      setActiveSectionId(targetSec.id);
      lenis.scrollTo(`#${targetSec.id}`, {
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isSnapping.current = false;
        }
      });

      if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
      snapCooldownTimer = setTimeout(() => {
        isSnapping.current = false;
      }, 850);
    };

    // A single short out-and-back hint after ten seconds without interaction.
    let isNudging = false;
    let nudgeFrameId: number | null = null;
    let idleTimer: NodeJS.Timeout | null = null;
    let lastMediaTime = 0;

    // Detecta se há vídeo reproduzindo, tela cheia ou modal de feedback/vídeo ativo
    const isVideoOrMediaActive = (): boolean => {
      try {
        // 1. Se houve reprodução ou timeupdate nos últimos 5 segundos
        if (Date.now() - lastMediaTime < 5000) {
          return true;
        }

        // 2. Tela cheia nativa do navegador (HTML5 Fullscreen API)
        if (
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        ) {
          return true;
        }

        // 3. Modais ou vídeos ativos marcados no DOM
        if (
          document.body.dataset.videoActive === 'true' ||
          document.body.dataset.videoPlaying === 'true' ||
          document.body.dataset.modalActive === 'true' ||
          document.body.classList.contains('overflow-hidden') ||
          document.querySelector('.fixed.inset-0.z-\\[100\\]') !== null ||
          document.querySelector('[role="dialog"]') !== null
        ) {
          return true;
        }

        // 4. Qualquer elemento <video> sendo reproduzido no momento
        const videos = document.querySelectorAll('video');
        for (let i = 0; i < videos.length; i++) {
          const v = videos[i];
          if (!v.paused && !v.ended) {
            return true;
          }
        }

        // 5. Se estiver na seção Hero e o vídeo estiver ativo/expandido
        const heroVideo = document.querySelector('#hero video') as HTMLVideoElement | null;
        if (heroVideo && !heroVideo.paused) {
          return true;
        }

        // 6. Se houver iframe de vídeo (YouTube) ativo em modal
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
          const src = iframes[i].src || '';
          if (src.includes('youtube.com') || src.includes('youtu.be')) {
            return true;
          }
        }
      } catch {
        // fallback seguro
      }

      return false;
    };

    let readingComparison = false;
    const performPeek = () => {
      if (readingComparison) return;
      if (isSnapping.current || isNudging) return;

      // Não roda de jeito nenhum se houver vídeo reproduzindo, tela cheia ou modal ativo
      if (isVideoOrMediaActive()) {
        return;
      }

      // Se a área de compra (pricing) estiver na tela, PARA totalmente!
      const pricingEl = document.getElementById('pricing');
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        // Quando a seção de compra ocupa a visão principal do usuário
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.45) {
          return;
        }
      }

      const currentIdx = getCurrentSectionIndex();
      const currentSec = SECTIONS[currentIdx];
      if (currentSec && currentSec.id === 'pricing') return;

      // Se estiver em perguntas (faq), faz o inverso: sobe um tiquinho e volta
      const faqEl = document.getElementById('faq');
      let isFaq = currentSec?.id === 'faq';
      if (faqEl) {
        const rect = faqEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.65) {
          isFaq = true;
        }
      }

      const baseScroll = window.scrollY;
      const peekDelta = isFaq ? -36 : 36;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetPeek = Math.max(0, Math.min(maxScroll, baseScroll + peekDelta));

      if (Math.abs(targetPeek - baseScroll) < 15) return;

      isNudging = true;

      // Use one bounded animation, so the return cannot be lost between scroll calls.
      const startedAt = performance.now();
      const duration = 700;
      const animatePeek = (now: number) => {
        if (!isNudging) return;
        const progress = Math.min(1, (now - startedAt) / duration);
        const position = baseScroll + (targetPeek - baseScroll) * Math.sin(Math.PI * progress);
        lenis.scrollTo(progress === 1 ? baseScroll : position, { immediate: true, force: true });
        if (progress < 1) {
          nudgeFrameId = requestAnimationFrame(animatePeek);
        } else {
          nudgeFrameId = null;
          isNudging = false;
        }
      };
      nudgeFrameId = requestAnimationFrame(animatePeek);
    };

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        idleTimer = null;
        if (isVideoOrMediaActive() || document.hidden) {
          resetIdleTimer();
          return;
        }
        performPeek();
        // Only actual user activity arms another hint.
      }, 10000);
    };

    const onUserActivity = () => {
      // Real input takes control; an old return must never override a new navigation.
      if (isNudging) {
        isNudging = false;
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
      if (nudgeFrameId !== null) {
        cancelAnimationFrame(nudgeFrameId);
        nudgeFrameId = null;
      }
      isNudging = false;
      resetIdleTimer();
    };

    // Eventos contínuos de mídia (timeupdate, play, etc.) empurram ativamente o timer
    const onMediaPlayback = () => {
      onUserActivity();
      lastMediaTime = Date.now();
      resetIdleTimer();
    };

    resetIdleTimer();

    window.addEventListener('pointermove', onUserActivity, { passive: true });
    window.addEventListener('touchstart', onUserActivity, { passive: true });
    window.addEventListener('mousedown', onUserActivity, { passive: true });
    window.addEventListener('keydown', onUserActivity, { passive: true });
    document.addEventListener('fullscreenchange', onUserActivity);
    document.addEventListener('webkitfullscreenchange', onUserActivity);
    document.addEventListener('play', onMediaPlayback, true);
    document.addEventListener('timeupdate', onMediaPlayback, true);
    document.addEventListener('playing', onMediaPlayback, true);
    document.addEventListener('seeking', onMediaPlayback, true);
    document.addEventListener('pause', onUserActivity, true);

    // Roda do mouse no desktop -> desliza suavemente para cada seção e trava no finalzinho
    const handleWheel = (e: WheelEvent) => {
      onUserActivity();
      if (window.innerWidth < 1024) return;

      // Respeita elementos com rolagem própria interna (ex: modal ou carrosséis)
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (
          target.getAttribute('data-lenis-prevent') !== null ||
          target.classList.contains('overflow-y-auto') ||
          target.classList.contains('hide-scrollbar')
        ) {
          if (target.scrollHeight > target.clientHeight || target.scrollWidth > target.clientWidth) {
            return;
          }
        }
        target = target.parentElement;
      }

      if (Math.abs(e.deltaY) < 24) return;

      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      const currentIdx = getCurrentSectionIndex();
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      const faqEl = document.getElementById('faq');
      const faqTop = faqEl ? faqEl.getBoundingClientRect().top + window.scrollY : 0;
      const isPastFaqTop = window.scrollY > faqTop + 60;

      if (e.deltaY > 0) {
        // Rolando para baixo
        if (currentIdx === SECTIONS.length - 1) {
          // Última seção (FAQ): trava suavemente no finalzinho da página
          if (!isAtBottom) {
            e.preventDefault();
            isSnapping.current = true;
            lenis.scrollTo(document.documentElement.scrollHeight, {
              duration: 1.0,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping.current = false;
              }
            });
            if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
            snapCooldownTimer = setTimeout(() => {
              isSnapping.current = false;
            }, 850);
            return;
          }
          return;
        }

        e.preventDefault();
        scrollToSectionIndex(currentIdx + 1);
      } else {
        // Rolando para cima
        if (currentIdx === SECTIONS.length - 1 && isPastFaqTop) {
          // Se estava travado no finalzinho (vendo o footer), volta suave para o topo do FAQ
          e.preventDefault();
          isSnapping.current = true;
          lenis.scrollTo('#faq', {
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              isSnapping.current = false;
            }
          });
          if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
          snapCooldownTimer = setTimeout(() => {
            isSnapping.current = false;
          }, 850);
          return;
        }

        if (currentIdx > 0) {
          e.preventDefault();
          scrollToSectionIndex(currentIdx - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Navegação suave por teclado (Setas e PageUp/PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      onUserActivity();
      if (window.innerWidth < 1024) return;
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (['input', 'textarea', 'select'].includes(targetTag)) return;

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      const faqEl = document.getElementById('faq');
      const faqTop = faqEl ? faqEl.getBoundingClientRect().top + window.scrollY : 0;
      const isPastFaqTop = window.scrollY > faqTop + 60;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const currentIdx = getCurrentSectionIndex();
        if (currentIdx === SECTIONS.length - 1) {
          if (!isAtBottom) {
            e.preventDefault();
            isSnapping.current = true;
            lenis.scrollTo(document.documentElement.scrollHeight, {
              duration: 1.0,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping.current = false;
              }
            });
            if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
            snapCooldownTimer = setTimeout(() => {
              isSnapping.current = false;
            }, 850);
          }
          return;
        }
        e.preventDefault();
        scrollToSectionIndex(currentIdx + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const currentIdx = getCurrentSectionIndex();
        if (currentIdx === SECTIONS.length - 1 && isPastFaqTop) {
          e.preventDefault();
          isSnapping.current = true;
          lenis.scrollTo('#faq', {
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              isSnapping.current = false;
            }
          });
          if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
          snapCooldownTimer = setTimeout(() => {
            isSnapping.current = false;
          }, 850);
          return;
        }
        if (currentIdx > 0) {
          e.preventDefault();
          scrollToSectionIndex(currentIdx - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

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
          isSnapping.current = true;
          lenis.scrollTo(targetId, {
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              isSnapping.current = false;
            }
          });
          if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
          snapCooldownTimer = setTimeout(() => {
            isSnapping.current = false;
          }, 1100);
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
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointermove', onUserActivity);
      window.removeEventListener('touchstart', onUserActivity);
      window.removeEventListener('mousedown', onUserActivity);
      window.removeEventListener('keydown', onUserActivity);
      document.removeEventListener('fullscreenchange', onUserActivity);
      document.removeEventListener('webkitfullscreenchange', onUserActivity);
      document.removeEventListener('play', onMediaPlayback, true);
      document.removeEventListener('timeupdate', onMediaPlayback, true);
      document.removeEventListener('playing', onMediaPlayback, true);
      document.removeEventListener('seeking', onMediaPlayback, true);
      document.removeEventListener('pause', onUserActivity, true);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      if (idleTimer) clearTimeout(idleTimer);
      if (nudgeFrameId !== null) cancelAnimationFrame(nudgeFrameId);
      if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
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
          <Payment isMercadoPago={isMercadoPago} isPreview={isTestPage} />
          <FAQ isMercadoPago={isMercadoPago} />
          {/* <FloatingPromoCountdown /> */}
        </Suspense>
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
