import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LOGO_OUTLINE = '/bd/bd-logo-outline.webp';
const LOGO_OUTLINE_GLOW = '/bd/bd-logo-outline-glow.webp';
const MIN_MS = 720;
const MAX_MS = 1000;
const EXIT_S = 0.28;

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers: number[] = [];
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      // Mede desde o início real da navegação (performance.now() = ms desde navigationStart)
      // para a página completa revelar em exatamente ~1,0s (MIN_MS + EXIT_S)
      const wait = Math.max(220, MIN_MS - performance.now());
      timers.push(window.setTimeout(() => setVisible(false), wait));
    };

    const warm1 = new Image();
    warm1.src = LOGO_OUTLINE;
    const warm2 = new Image();
    warm2.src = LOGO_OUTLINE_GLOW;

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      finish();
    } else {
      window.addEventListener('DOMContentLoaded', finish, { once: true });
      window.addEventListener('load', finish, { once: true });
    }
    timers.push(window.setTimeout(finish, Math.max(220, MAX_MS - performance.now())));

    return () => {
      window.removeEventListener('DOMContentLoaded', finish);
      window.removeEventListener('load', finish);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="byte-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_S, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-label="Carregando"
          style={{ contain: 'layout paint style', willChange: 'opacity' }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0d0a22] overflow-hidden"
        >
          <style>{`
            /* Traçado vazado 100% transparente (estilo Rockstar, zero filter/drop-shadow em runtime) */
            .byte-pl-edge {
              opacity: 0.14;
            }
            .byte-pl-glow-edge {
              opacity: 0.78;
              will-change: transform;
              animation: bytePlCounter 0.95s ease-in-out infinite;
            }
            /* Janela deslizante 100% GPU (transform) com máscara estática suave */
            .byte-pl-window {
              -webkit-mask-image: linear-gradient(100deg, transparent 22%, #000 50%, transparent 78%);
              mask-image: linear-gradient(100deg, transparent 22%, #000 50%, transparent 78%);
              will-change: transform;
              animation: bytePlWindow 0.95s ease-in-out infinite;
            }
            @keyframes bytePlWindow {
              from { transform: translate3d(-45%, 0, 0); }
              to   { transform: translate3d(45%, 0, 0); }
            }
            @keyframes bytePlCounter {
              from { transform: translate3d(45%, 0, 0); }
              to   { transform: translate3d(-45%, 0, 0); }
            }
            @keyframes bytePlBar {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(98,0,234,0.10), transparent 70%), radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[min(560px,74vw)] aspect-[4/1]"
          >
            {/* Apenas o contorno vazado (interior 100% transparente mostrando o fundo) */}
            <img src={LOGO_OUTLINE} alt="" draggable={false} decoding="async" className="byte-pl-edge absolute inset-0 w-full h-full object-contain select-none" />
            {/* Brilho suave percorrendo APENAS o traçado — 100% GPU (zero CSS filter por frame) */}
            <div className="byte-pl-window absolute inset-0 overflow-hidden pointer-events-none">
              <img src={LOGO_OUTLINE_GLOW} alt="" draggable={false} decoding="async" className="byte-pl-glow-edge absolute inset-0 w-full h-full object-contain select-none" />
            </div>
          </motion.div>

          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[min(180px,40vw)] h-px bg-white/10 overflow-hidden">
            <div
              className="h-full w-full bg-gradient-to-r from-transparent via-byte-cyan/60 to-transparent origin-left"
              style={{ animation: `bytePlBar ${MIN_MS}ms ease-out forwards`, willChange: 'transform' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
