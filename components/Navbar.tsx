import React, { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const { tr, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add('overflow-hidden');
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  const navigateTo = (target: string) => {
    setMenuOpen(false);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(target, { duration: 1.0 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t.sections.hero, target: '#hero' },
    { label: t.navbar.features, target: '#features' },
    { label: t.navbar.showcase, target: '#showcase' },
    { label: t.navbar.feedbacks, target: '#feedbacks' },
    { label: t.navbar.faq, target: '#faq' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding,backdrop-filter] duration-300 ${
          isScrolled
            ? 'bg-[#050C16]/90 backdrop-blur-md border-b border-white/10 py-2.5'
            : 'bg-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo ampliada suavemente */}
          <button
            type="button"
            className="flex items-center cursor-pointer focus:outline-none"
            onClick={() => navigateTo('#hero')}
            aria-label={tr('Byte Downloader Logo')}
          >
            <img
              src="/bd/bd-logo-expand.png"
              alt={tr('Byte Downloader Logo')}
              className="h-[52px] sm:h-[56px] md:h-[60px] w-auto object-contain transition-all"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Hambúrguer minimalista de duas linhas (estilo Rockstar) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? tr('Fechar menu') : tr('Abrir menu')}
            aria-expanded={menuOpen}
            className="group w-12 h-12 -mr-2 flex flex-col items-center justify-center gap-[7px] rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <span className="block w-7 h-[3px] rounded-full bg-white group-hover:bg-byte-cyan transition-colors" />
            <span className="block w-7 h-[3px] rounded-full bg-white group-hover:bg-byte-cyan transition-colors" />
          </button>
        </div>
      </motion.nav>

      {/* Drawer lateral direito (estilo Rockstar Games) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[120] bg-[#030712]/70 backdrop-blur-md flex justify-end"
            role="dialog"
            aria-modal="true"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px] h-full bg-[#060d1b] border-l border-white/10 p-6 sm:p-9 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              {/* Topo do Drawer */}
              <div className="flex items-center justify-between gap-4">
                <img
                  src="/bd/bd-logo-expand.png"
                  alt={tr('Byte Downloader Logo')}
                  className="h-9 sm:h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={tr('Fechar menu')}
                  className="w-10 h-10 rounded-full bg-white/[0.07] hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links grandes estilo editorial */}
              <nav className="my-8 flex flex-col gap-2" aria-label={tr('Menu principal')}>
                {navLinks.map((item) => (
                  <button
                    key={item.target}
                    type="button"
                    onClick={() => navigateTo(item.target)}
                    className="group w-full py-3.5 px-2 flex items-center justify-between text-left border-b border-white/[0.06] text-2xl sm:text-[28px] font-tech font-black uppercase tracking-wide text-white/85 hover:text-byte-cyan transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-byte-cyan group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </nav>

              {/* Rodapé do Drawer: CTA + Idioma */}
              <div className="space-y-5 pt-4">
                <button
                  type="button"
                  onClick={() => navigateTo('#pricing')}
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
                  className="w-full py-4 rounded-full bg-byte-purple hover:bg-byte-purpleLight text-white font-extrabold text-sm sm:text-base tracking-[0.12em] uppercase shadow-[0_0_28px_rgba(98,0,234,0.45)] transition-all cursor-pointer"
                >
                  {t.navbar.cta}
                </button>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                  <span className="text-xs font-tech uppercase tracking-[0.16em] text-gray-400">
                    {tr('Idioma')}
                  </span>
                  <LanguageSelector />
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
