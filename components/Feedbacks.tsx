import { useLanguage } from '../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEEDBACKS } from '../constants';
import { FeedbackItem } from '../types';
import { Star, X, ChevronLeft, ChevronRight, ExternalLink, Play, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 127.14 96.36" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const XLogoIcon = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Feedbacks: React.FC = () => {
  const { tr } = useLanguage();
  const [activeModalItem, setActiveModalItem] = useState<FeedbackItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLButtonElement>(null);

  // Reset zoom when modal item changes
  useEffect(() => {
    setIsZoomed(false);
  }, [activeModalItem]);

  // Set modal indicator and lock body when activeModalItem is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.dataset.modalActive = 'true';
      document.body.classList.add('overflow-hidden');
      return () => {
        delete document.body.dataset.modalActive;
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [activeModalItem]);

  // Modal navigation
  const currentModalIndex = activeModalItem
    ? FEEDBACKS.findIndex((f) => f.id === activeModalItem.id)
    : -1;

  const nextModalItem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentModalIndex >= 0) {
      const nextIdx = (currentModalIndex + 1) % FEEDBACKS.length;
      setActiveModalItem(FEEDBACKS[nextIdx]);
    }
  };

  const prevModalItem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentModalIndex >= 0) {
      const prevIdx = (currentModalIndex - 1 + FEEDBACKS.length) % FEEDBACKS.length;
      setActiveModalItem(FEEDBACKS[prevIdx]);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      } else if (e.key === 'ArrowRight') {
        nextModalItem();
      } else if (e.key === 'ArrowLeft') {
        prevModalItem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, currentModalIndex]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(FEEDBACKS.length / itemsPerPage);

  const nextPage = () => {
    setDirection(1);
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (idx: number) => {
    setDirection(idx > pageIndex ? 1 : -1);
    setPageIndex(idx);
  };

  // Center active dot inside the mobile scroll container
  useEffect(() => {
    if (activeDotRef.current && dotsContainerRef.current) {
      const container = dotsContainerRef.current;
      const dot = activeDotRef.current;
      const scrollLeft = dot.offsetLeft - container.offsetWidth / 2 + dot.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [pageIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : dir < 0 ? -40 : 0,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : dir < 0 ? 40 : 0,
    }),
  };

  const currentItems = FEEDBACKS.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="feedbacks" className="snap-section py-10 md:py-14 relative overflow-hidden bg-[#040914]">
      {/* Textura cinematográfica ultra-sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 relative z-10">
        {/* Faixa minimalista de métricas reais acima de QUEM USA APROVA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-2 sm:gap-8 pb-7 mb-7 border-b border-white/[0.09] text-center"
        >
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[20px] sm:text-4xl lg:text-5xl font-tech font-black text-byte-cyan tracking-tight leading-none whitespace-nowrap">
              336+
            </span>
            <span className="mt-2 text-[9.5px] sm:text-xs font-tech font-semibold uppercase tracking-[0.08em] sm:tracking-[0.18em] text-gray-300 leading-tight">
              {tr("Editores e Criadores")}
            </span>
          </div>

          <div className="flex flex-col items-center min-w-0">
            <span className="text-[20px] sm:text-4xl lg:text-5xl font-tech font-black text-white tracking-tight leading-none whitespace-nowrap">
              35+
            </span>
            <span className="mt-2 text-[9.5px] sm:text-xs font-tech font-semibold uppercase tracking-[0.08em] sm:tracking-[0.18em] text-gray-300 leading-tight">
              {tr("Ferramentas Integradas")}
            </span>
          </div>

          <div
            className="flex flex-col items-center min-w-0"
            title={tr("Estimativa baseada em ~3h/semana economizadas por editor entre 336+ usuários")}
          >
            <span className="text-[20px] sm:text-4xl lg:text-5xl font-tech font-black text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-[#8b5cf6] tracking-tight leading-none whitespace-nowrap">
              10.000h+
            </span>
            <span className="mt-2 text-[9.5px] sm:text-xs font-tech font-semibold uppercase tracking-[0.08em] sm:tracking-[0.18em] text-gray-300 leading-tight">
              {tr("Horas de Trabalho Salvas")}
            </span>
          </div>
        </motion.div>

        {/* Cabeçalho editorial minimalista — menos é mais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-tech font-black text-white uppercase tracking-tight leading-[0.96]">
            {tr("QUEM USA")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-[#8b5cf6]">
              {tr("APROVA")}
            </span>
          </h2>

          <div className="inline-flex items-center gap-3 pb-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
              ))}
            </div>
            <span className="text-white font-tech font-black text-base tracking-wide">5.0</span>
            <span className="w-1 h-1 rounded-full bg-byte-cyan" />
            <span className="text-byte-cyan text-xs font-tech font-semibold uppercase tracking-[0.18em]">
              {tr("Nota Máxima")}
            </span>
          </div>
        </motion.div>

        {/* Grid orgânico de depoimentos com altura estável (setas nunca pulam) e tipografia inteligente */}
        <div className="relative h-[384px] sm:h-[344px] lg:h-[356px] xl:h-[324px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={pageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                const threshold = 35;
                const velocityThreshold = 200;
                if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                  nextPage();
                } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                  prevPage();
                }
              }}
              className={`h-full touch-pan-y select-none cursor-grab active:cursor-grabbing grid grid-cols-1 ${
                currentItems.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 lg:max-w-2xl lg:mx-auto'
              } gap-6 md:gap-8 items-stretch w-full`}
            >
              {currentItems.map((item) => {
                const quoteText = tr(item.text);
                const quoteSizeClass =
                  quoteText.length <= 45
                    ? 'text-xl sm:text-2xl font-medium leading-snug tracking-tight'
                    : quoteText.length <= 115
                    ? 'text-[17px] sm:text-[19px] leading-relaxed'
                    : quoteText.length <= 215
                    ? 'text-[15.5px] sm:text-[17px] leading-relaxed'
                    : 'text-[14px] sm:text-[15px] leading-[1.56]';

                return (
                <article
                  key={item.id}
                  className="group relative h-full rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
                >
                  {/* Topo: Estrelas + botão único da origem/print */}
                  <div className="flex items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-1">
                      {[...Array(item.stars)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                      ))}
                    </div>

                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalItem(item);
                      }}
                      className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-byte-cyan/50 hover:bg-byte-cyan/10 text-xs font-semibold text-gray-300 hover:text-white transition-all duration-200 cursor-pointer shrink-0"
                    >
                      {item.videoUrl ? (
                        <>
                          <Play className="w-3 h-3 text-byte-cyan fill-byte-cyan shrink-0" />
                          <span>{tr("Motion Ad")}</span>
                        </>
                      ) : item.source === 'youtube' ? (
                        <>
                          <YouTubeIcon size={13} className="text-red-500 shrink-0" />
                          <span>YouTube</span>
                        </>
                      ) : item.source === 'x' ? (
                        <>
                          <XLogoIcon size={11} className="text-white shrink-0" />
                          <span>X</span>
                        </>
                      ) : (
                        <>
                          <DiscordIcon size={13} className="text-[#7289da] shrink-0" />
                          <span>Discord</span>
                        </>
                      )}
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover/btn:text-byte-cyan transition-colors shrink-0" />
                    </button>
                  </div>

                  {/* Citação centralizada verticalmente com tipografia adaptada ao tamanho */}
                  <div className="flex-1 flex items-center py-4 min-h-0 overflow-y-auto no-scrollbar">
                    <blockquote className={`text-gray-200 font-normal ${quoteSizeClass}`}>
                      <span className="text-byte-cyan/50 font-serif text-xl select-none mr-1">“</span>
                      {quoteText}
                      <span className="text-byte-cyan/50 font-serif text-xl select-none ml-1">”</span>
                    </blockquote>
                  </div>

                  {/* Rodapé sempre alinhado: apenas Autor + Cargo */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3.5 min-w-0 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/15 overflow-hidden flex items-center justify-center shrink-0">
                      {item.avatar ? (
                        <img
                          src={`${item.avatar}${item.avatar.includes('?') ? '&' : '?'}v=20261125-av2`}
                          alt={item.author}
                          className="w-full h-full object-cover object-center rounded-full"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-byte-cyan font-tech font-black text-sm">
                          {item.author.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold font-tech uppercase text-sm sm:text-base tracking-wider text-white truncate">
                          {item.author}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-byte-cyan fill-byte-cyan/20 shrink-0" />
                      </div>
                      <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mt-0.5 truncate font-mono">
                        {tr(item.role)}
                      </span>
                    </div>
                  </div>
                </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Barra inferior: Controles do carrossel à esquerda + Discord à direita */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevPage}
              aria-label={tr("Página anterior")}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:border-byte-cyan/50 hover:text-byte-cyan text-gray-400 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="relative max-w-[180px] sm:max-w-none overflow-hidden py-1 px-1 flex items-center">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#040914] to-transparent z-10 sm:hidden" />
              <div
                ref={dotsContainerRef}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-0"
              >
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    ref={pageIndex === idx ? activeDotRef : null}
                    type="button"
                    onClick={() => goToPage(idx)}
                    aria-label={tr('Ir para página {page}', { page: idx + 1 })}
                    className={`shrink-0 transition-all duration-300 rounded-full cursor-pointer ${
                      pageIndex === idx
                        ? 'w-7 h-1.5 bg-gradient-to-r from-byte-cyan to-[#8b5cf6]'
                        : 'w-2 h-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#040914] to-transparent z-10 sm:hidden" />
            </div>

            <button
              type="button"
              onClick={nextPage}
              aria-label={tr("Próxima página")}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:border-byte-cyan/50 hover:text-byte-cyan text-gray-400 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <a
            href="https://discord.gg/RWWGkeVCRC"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:border-byte-cyan/50 hover:bg-byte-cyan/10 text-white font-tech font-bold text-xs tracking-widest uppercase transition-all duration-200"
          >
            <DiscordIcon size={15} className="text-[#7289da] group-hover:text-byte-cyan transition-colors" />
            <span>{tr("QUERO ENTRAR TAMBÉM")}</span>
            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-byte-cyan transition-colors" />
          </a>
        </div>
      </div>

      {/* Fullscreen Screenshot Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-3 sm:p-6 md:p-8"
            onClick={() => setActiveModalItem(null)}
          >
            {/* Standardized Proportional Card */}
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#081528] border border-byte-cyan/30 overflow-hidden z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#050C16] z-10 shrink-0">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {activeModalItem.avatar ? (
                    <div className="w-10 h-10 rounded-full border border-byte-cyan/40 overflow-hidden flex items-center justify-center shrink-0 bg-byte-cyan/10">
                      <img
                        src={`${activeModalItem.avatar}${activeModalItem.avatar.includes('?') ? '&' : '?'}v=20261125-av2`}
                        alt={activeModalItem.author}
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    </div>
                  ) : (
                    <div className={`p-2 rounded-full flex items-center justify-center shrink-0 ${
                      activeModalItem.source === 'youtube'
                        ? 'bg-red-500/15 text-red-500 border border-red-500/30'
                        : activeModalItem.source === 'x'
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-[#5865F2]/15 text-[#5865F2] border border-[#5865F2]/30'
                    }`}>
                      {activeModalItem.source === 'youtube' ? (
                        <Play className="w-4 h-4 fill-current" />
                      ) : activeModalItem.source === 'x' ? (
                        <XLogoIcon size={14} className="text-white" />
                      ) : (
                        <DiscordIcon size={16} className="text-[#5865F2]" />
                      )}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-tech font-bold text-white text-sm sm:text-base uppercase tracking-wider truncate">
                        {activeModalItem.author}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-byte-cyan/10 text-byte-cyan border border-byte-cyan/20">
                        {activeModalItem.videoUrl ? tr("Motion Ad no X") : activeModalItem.source === 'youtube' ? tr("Vídeo Oficial") : activeModalItem.source === 'x' ? tr("Print do X") : tr("Print do Discord")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {tr(activeModalItem.role)}
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Zoom button for images */}
                  {activeModalItem.source !== 'youtube' && !activeModalItem.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setIsZoomed((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-byte-cyan/40 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
                      title={isZoomed ? tr("Ajustar à tela") : tr("Ampliar imagem")}
                    >
                      {isZoomed ? (
                        <>
                          <ZoomOut className="w-3.5 h-3.5 text-byte-cyan" />
                          <span className="hidden sm:inline">{tr("Ajustar")}</span>
                        </>
                      ) : (
                        <>
                          <ZoomIn className="w-3.5 h-3.5 text-byte-cyan" />
                          <span className="hidden sm:inline">{tr("Ampliar")}</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-transparent hover:border-white/10 transition-colors cursor-pointer"
                    aria-label={tr("Fechar visualização")}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Central Stage / Viewport - Standardized Proportions */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[460px] max-h-[62vh] bg-[#030712] p-3 sm:p-6 flex items-center justify-center overflow-auto select-none">
                {/* Navigation Arrows inside stage */}
                <button
                  type="button"
                  onClick={prevModalItem}
                  aria-label={tr("Feedback anterior")}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/15 hover:border-byte-cyan/40 text-white transition-all hover:scale-105 z-20 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={nextModalItem}
                  aria-label={tr("Próximo feedback")}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/15 hover:border-byte-cyan/40 text-white transition-all hover:scale-105 z-20 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModalItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {activeModalItem.videoUrl ? (
                      <div className="w-full aspect-video max-w-3xl rounded-xl border border-white/20 overflow-hidden bg-black">
                        <video
                          src={activeModalItem.videoUrl}
                          poster={activeModalItem.url}
                          controls
                          autoPlay
                          playsInline
                          onPlay={() => {
                            document.body.dataset.videoPlaying = 'true';
                          }}
                          onTimeUpdate={() => {
                            document.body.dataset.videoPlaying = 'true';
                          }}
                          onPause={() => {
                            delete document.body.dataset.videoPlaying;
                          }}
                          onEnded={() => {
                            delete document.body.dataset.videoPlaying;
                          }}
                          className="w-full h-full object-contain bg-black"
                        />
                      </div>
                    ) : activeModalItem.source === 'youtube' && activeModalItem.videoId ? (
                      <div className="w-full aspect-video max-w-3xl rounded-xl border border-white/20 overflow-hidden bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${activeModalItem.videoId}?start=${activeModalItem.startSeconds ?? 0}&autoplay=1&rel=0`}
                          title={tr(activeModalItem.caption)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                    ) : (
                      <div 
                        className={`relative w-full h-full flex items-center justify-center ${
                          isZoomed ? 'cursor-zoom-out overflow-auto p-4' : 'cursor-zoom-in'
                        }`}
                        onClick={() => setIsZoomed((prev) => !prev)}
                      >
                        <img 
                          src={activeModalItem.url} 
                          alt={tr(activeModalItem.caption)} 
                          decoding="async"
                          className={`rounded-xl border border-white/15 bg-[#091426] select-none ${
                            isZoomed
                              ? 'max-w-none scale-125 sm:scale-150 my-auto mx-auto'
                              : 'w-auto max-w-full max-h-[54vh] object-contain'
                          }`}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer / Quote & Caption Bar */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#050C16]/95 backdrop-blur-sm shrink-0 flex flex-col gap-1.5">
                <blockquote className="text-xs sm:text-sm text-gray-200 italic font-medium leading-snug line-clamp-2 sm:line-clamp-none">
                  "{tr(activeModalItem.text)}"
                </blockquote>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-400 pt-1 border-t border-white/5 flex-wrap gap-2">
                  <span className="truncate pr-2">
                    {tr(activeModalItem.caption)}
                  </span>
                  {activeModalItem.tweetUrl ? (
                    <a
                      href={activeModalItem.tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#00F0FF] hover:text-white underline underline-offset-4 transition-colors shrink-0 ml-auto"
                    >
                      <XLogoIcon size={12} />
                      <span>{tr("Ver post original no X")}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  ) : activeModalItem.source !== 'youtube' && !activeModalItem.videoUrl && (
                    <span className="text-byte-cyan shrink-0 font-medium select-none">
                      {isZoomed ? tr("Clique para ajustar") : tr("Clique para ampliar")}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
