import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LOGO = '/bd/bd-logo-expand.png';
const MIN_MS = 1700;
const MAX_MS = 5000;

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

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    timers.push(window.setTimeout(finish, MAX_MS));

    return () => {
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
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-label="Carregando"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0d0a22] overflow-hidden"
        >
          <style>{`
            .byte-pl-edge { filter: brightness(0) drop-shadow(0 0 0.7px rgba(196,180,255,0.9)) drop-shadow(0 0 4px rgba(150,120,255,0.28)); opacity: .55; }
            .byte-pl-fill { filter: brightness(0) invert(1); opacity: .045; }
            .byte-pl-sweep {
              filter: brightness(0) drop-shadow(0 0 1px rgba(255,255,255,0.95)) drop-shadow(0 0 7px rgba(190,160,255,0.75));
              -webkit-mask-image: linear-gradient(100deg, transparent 38%, #000 50%, transparent 62%);
              mask-image: linear-gradient(100deg, transparent 38%, #000 50%, transparent 62%);
              -webkit-mask-size: 240% 100%; mask-size: 240% 100%;
              -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
              animation: bytePlSweep 2.4s ease-in-out infinite;
            }
            @keyframes bytePlSweep {
              from { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
              to   { -webkit-mask-position: 0% 0;   mask-position: 0% 0; }
            }
            @keyframes bytePlBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          `}</style>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(98,0,234,0.10), transparent 70%), radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[min(560px,74vw)] aspect-[4/1]"
          >
            <img src={LOGO} alt="" draggable={false} className="byte-pl-edge absolute inset-0 w-full h-full object-contain select-none" />
            <img src={LOGO} alt="" draggable={false} className="byte-pl-fill absolute inset-0 w-full h-full object-contain select-none" />
            <img src={LOGO} alt="" draggable={false} className="byte-pl-sweep absolute inset-0 w-full h-full object-contain select-none" />
          </motion.div>

          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[min(180px,40vw)] h-px bg-white/10 overflow-hidden">
            <div
              className="h-full w-full bg-gradient-to-r from-transparent via-byte-cyan/60 to-transparent origin-left"
              style={{ animation: `bytePlBar ${MIN_MS}ms ease-out forwards` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
