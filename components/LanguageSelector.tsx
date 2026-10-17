import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';
import { FlagBR, FlagPT, FlagUS, FlagES } from '../i18n/flags';

interface LanguageItem {
  code: Language;
  name: string;
  FlagComponent: React.FC<{ className?: string }>;
}

const LANGUAGES: LanguageItem[] = [
  { code: 'pt-BR', name: 'Português (Brasil)', FlagComponent: FlagBR },
  { code: 'pt-PT', name: 'Português (Portugal)', FlagComponent: FlagPT },
  { code: 'en', name: 'English (US)', FlagComponent: FlagUS },
  { code: 'es', name: 'Español', FlagComponent: FlagES },
];

export const LanguageSelector: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { lang, setLang, tr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const ActiveFlag = activeItem.FlagComponent;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Versão horizontal para menu mobile
  if (isMobile) {
    return (
      <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
        {LANGUAGES.map(({ code, name, FlagComponent }) => {
          const isActive = lang === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              title={name}
              aria-label={name}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'border-[#00F0FF] bg-[#00F0FF]/20 shadow-[0_0_12px_rgba(0,240,255,0.4)] scale-110'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-6 h-4 rounded-[3px] overflow-hidden shadow-sm flex items-center justify-center">
                <FlagComponent className="w-full h-full object-cover" />
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block shrink-0" ref={containerRef}>
      {/* Botão de Idioma apenas com a bandeira do país */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={tr('Idioma atual: {name}', { name: activeItem.name })}
        title={tr('Idioma: {name}', { name: activeItem.name })}
        className="group relative flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_16px_rgba(0,240,255,0.25)]"
      >
        <div className="w-6 h-4 sm:w-6.5 sm:h-4.5 rounded-[3px] overflow-hidden shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
          <ActiveFlag className="w-full h-full object-cover" />
        </div>
      </button>

      {/* Dropdown com as 4 bandeiras */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 bg-[#050C16]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex flex-col gap-1.5 z-50"
          >
            {LANGUAGES.map(({ code, name, FlagComponent }) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setLang(code);
                    setIsOpen(false);
                  }}
                  title={name}
                  aria-label={name}
                  className={`group/item relative flex items-center justify-center p-2 rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white/15 border border-[#00F0FF]/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'hover:bg-white/10 border border-transparent hover:border-white/15 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="w-7 h-4.5 rounded-[3px] overflow-hidden shadow-sm flex items-center justify-center transition-transform group-hover/item:scale-110">
                    <FlagComponent className="w-full h-full object-cover" />
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
