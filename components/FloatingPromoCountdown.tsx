import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PromoCountdown } from './PromoCountdown';

export const FloatingPromoCountdown: React.FC = () => {
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const pricing = document.getElementById('pricing');
    if (!pricing) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.18 }
    );

    observer.observe(pricing);
    return () => observer.disconnect();
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.aside
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="floating-promo fixed bottom-4 right-4 z-40 w-[calc(100vw-1.5rem)] max-w-[430px] rounded-3xl bg-byte-purple p-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:bottom-6 md:right-8 md:p-4 group"
          aria-label="Promoção exclusiva Byte Downloader"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            aria-label="Fechar aviso de promoção"
            className="absolute -top-2 -right-2 z-50 p-1.5 rounded-full bg-[#050C16] border border-white/20 text-gray-300 hover:text-white hover:bg-black transition-colors shadow-md"
          >
            <X size={14} />
          </button>
          <PromoCountdown compact />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};