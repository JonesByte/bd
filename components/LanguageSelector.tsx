import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';
import { FlagBR, FlagPT, FlagUS, FlagES } from '../i18n/flags';

interface LanguageItem {
  code: Language;
  name: string;
  shortLabel: string;
  FlagComponent: React.FC<{ className?: string }>;
}

const LANGUAGES: LanguageItem[] = [
  { code: 'pt-BR', name: 'Português (Brasil)', shortLabel: 'Português (BR)', FlagComponent: FlagBR },
  { code: 'pt-PT', name: 'Português (Portugal)', shortLabel: 'Português (PT)', FlagComponent: FlagPT },
  { code: 'en', name: 'English (US)', shortLabel: 'English', FlagComponent: FlagUS },
  { code: 'es', name: 'Español', shortLabel: 'Español', FlagComponent: FlagES },
];

export const LanguageSelector: React.FC<{ isMobile?: boolean; direction?: 'up' | 'down' }> = ({
  isMobile = false,
  direction = 'down',
}) => {
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
                  ? 'border-[#00F0FF] bg-[#00F0FF]/20 scale-110'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-5 rounded-[3px] overflow-hidden flex items-center justify-center">
                <FlagComponent className="w-full h-full object-cover" />
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  const openUp = direction === 'up';

  return (
    <div className="relative inline-block shrink-0" ref={containerRef}>
      {/* Botão de Idioma com bandeira ampliada */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={tr('Idioma atual: {name}', { name: activeItem.name })}
        title={tr('Idioma: {name}', { name: activeItem.name })}
        className="group relative flex items-center justify-center p-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-byte-cyan/50 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
      >
        <div className="w-8 h-5 sm:w-9 sm:h-6 rounded-[4px] overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
          <ActiveFlag className="w-full h-full object-cover" />
        </div>
      </button>

      {/* Dropdown com as 4 bandeiras (abre para cima na barra lateral para nunca cortar) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUp ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUp ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`absolute right-0 ${
              openUp ? 'bottom-full mb-2.5' : 'top-full mt-2'
            } min-w-[190px] bg-[#050C16]/98 backdrop-blur-xl border border-white/15 rounded-2xl p-2 flex flex-col gap-1 z-50`}
          >
            {LANGUAGES.map(({ code, name, shortLabel, FlagComponent }) => {
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
                  className={`group/item relative flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white/15 border border-[#00F0FF]/60 text-white'
                      : 'hover:bg-white/10 border border-transparent hover:border-white/15 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-5 rounded-[3px] overflow-hidden flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-105">
                    <FlagComponent className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{shortLabel}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
