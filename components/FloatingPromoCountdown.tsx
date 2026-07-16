import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PromoCountdown } from './PromoCountdown';

export const FloatingPromoCountdown: React.FC = () => {
  const [show, setShow] = useState(true);

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

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 z-40 w-[calc(100vw-1.5rem)] max-w-[430px] rounded-3xl bg-byte-purple p-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:bottom-6 md:right-8 md:p-4"
          aria-label="Promoção exclusiva Byte Downloader"
        >
          <PromoCountdown compact />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};