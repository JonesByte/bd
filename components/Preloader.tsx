import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LOGO = '/bd/bd-logo-expand.png';
const MIN_MS = 1200;
const MAX_MS = 2600;

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const timers: number[] = [];
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      timers.push(window.setTimeout(() => setVisible(false), wait));
    };

    const warm = new Image();
    warm.src = LOGO;

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      finish();
    } else {
      window.addEventListener('DOMContentLoaded', finish, { once: true });
      window.addEventListener('load', finish, { once: true });
    }
    timers.push(window.setTimeout(finish, MAX_MS));

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
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-label="Carregando"
          style={{ contain: 'layout paint style', willChange: 'opacity' }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0d0a22] overflow-hidden"
        >
          <style>{`
            .byte-pl-edge {
              filter: brightness(0) drop-shadow(0 0 1px rgba(196,180,255,0.85));
              opacity: .55;
            }
            .byte-pl-fill {
              filter: brightness(0) invert(1);
              opacity: .05;
            }
            .byte-pl-mask {
              -webkit-mask-image: url('${LOGO}');
              mask-image: url('${LOGO}');
              -webkit-mask-size: contain;
              mask-size: contain;
              -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
              -webkit-mask-position: center;
              mask-position: center;
            }
            .byte-pl-sheen {
              background: linear-gradient(100deg, transparent 25%, rgba(255,255,255,0.92) 48%, rgba(190,160,255,0.85) 54%, transparent 75%);
              will-change: transform;
              animation: bytePlSheen 1.8s ease-in-out infinite;
            }
            @keyframes bytePlSheen {
              from { transform: translate3d(-120%, 0, 0); }
              to   { transform: translate3d(120%, 0, 0); }
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[min(560px,74vw)] aspect-[4/1]"
          >
            <img src={LOGO} alt="" draggable={false} decoding="async" className="byte-pl-edge absolute inset-0 w-full h-full object-contain select-none" />
            <img src={LOGO} alt="" draggable={false} decoding="async" className="byte-pl-fill absolute inset-0 w-full h-full object-contain select-none" />
            {/* GPU-composited sweep (transform only — zero per-frame CPU repaints on mobile) */}
            <div className="byte-pl-mask absolute inset-0 overflow-hidden pointer-events-none">
              <div className="byte-pl-sheen absolute inset-y-0 -inset-x-1/2" />
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
