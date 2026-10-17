import { useLanguage } from '../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEEDBACKS } from '../constants';
import { FeedbackItem } from '../types';
import { Star, X, ChevronLeft, ChevronRight, MessageSquare, ExternalLink, Play, ZoomIn, ZoomOut, CheckCircle2, Quote, Sparkles } from 'lucide-react';

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

const PREVIEW_FEEDBACKS = FEEDBACKS
  .filter(item => !['feedback-lucky-motion', 'feedback-15', 'feedback-20'].includes(item.id))
  .map(item => item.id === 'feedback-25'
    ? { ...item, role: 'Editor de Vídeo', caption: 'Feedback de ImPeter - Editor de Vídeo (Discord)' }
    : item);

const FeedbacksComponent: React.FC<{ isPreview?: boolean }> = ({ isPreview = false }) => {
  const feedbacks = isPreview ? PREVIEW_FEEDBACKS : FEEDBACKS;
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
    ? feedbacks.findIndex((f) => f.id === activeModalItem.id)
    : -1;

  const nextModalItem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentModalIndex >= 0) {
      const nextIdx = (currentModalIndex + 1) % feedbacks.length;
      setActiveModalItem(feedbacks[nextIdx]);
    }
  };

  const prevModalItem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentModalIndex >= 0) {
      const prevIdx = (currentModalIndex - 1 + feedbacks.length) % feedbacks.length;
      setActiveModalItem(feedbacks[prevIdx]);
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
    // Only a breakpoint crossing changes the number of cards. Avoid handling every
    // resize event (including mobile browser toolbar changes while scrolling).
    const breakpoint = window.matchMedia('(min-width: 1024px)');
    const update = () => setItemsPerPage(breakpoint.matches ? 2 : 1);
    update();
    breakpoint.addEventListener('change', update);
    return () => breakpoint.removeEventListener('change', update);
  }, []);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

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

  const currentItems = feedbacks.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="feedbacks" className="snap-section pt-10 md:pt-14 pb-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center relative overflow-hidden bg-[#050C16]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-byte-cyan/30 bg-byte-cyan/10 text-byte-cyan text-xs font-bold font-tech uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tr("Depoimentos Verificados")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-tech mb-3 uppercase tracking-wider text-white">
            {tr("QUEM USA")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">{tr("APROVA")}</span>
          </h2>
          
          <div className="flex items-center justify-center mb-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#09172E]/80 border border-amber-400/20 backdrop-blur-md">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                ))}
              </div>
              <span className="text-white font-tech font-black text-sm tracking-wide">
                5.0 <span className="text-gray-400 font-normal text-xs font-sans">/ 5.0</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-byte-cyan"></span>
              <span className="text-byte-cyan text-[11px] font-tech font-bold uppercase tracking-wider">
                {tr("Nota Máxima")}</span>
            </div>
          </div>

          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {tr("Depoimentos reais de quem já economizou horas de edição e download usando o Byte Downloader.")}</p>
        </motion.div>

        {/* Testimonials Cards Grid with swipe / drag gesture */}
        <div className="relative min-h-[340px] overflow-hidden" style={isPreview ? { contain: 'layout style' } : undefined}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={pageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={isPreview ? { willChange: 'transform, opacity' } : undefined}
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
              className={`touch-pan-y select-none cursor-grab active:cursor-grabbing grid grid-cols-1 ${currentItems.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 lg:max-w-xl lg:mx-auto'} gap-6 md:gap-8 items-stretch w-full`}
            >
              {currentItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative rounded-2xl bg-gradient-to-b from-[#0c1c36]/95 via-[#081426]/95 to-[#040914]/95 border border-white/10 hover:border-byte-cyan/50 backdrop-blur-md p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-colors duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden"
                >
                  {/* Top subtle line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-byte-cyan/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Subtle watermark quote icon */}
                  <Quote className="absolute right-6 top-6 w-14 h-14 text-white/[0.03] group-hover:text-byte-cyan/[0.05] transition-colors pointer-events-none -rotate-12" />

                  <div className="relative z-10">
                    {/* Header Row: Stars + Platform Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      {/* Stars & Rating (radiant gold color) */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(item.stars)].map((_, s) => (
                            <Star key={s} className="w-4 h-4 text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.45)]" />
                          ))}
                        </div>
                        <span 
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                          className="text-white/90 font-black text-xs sm:text-sm tracking-tight"
                        >
                          {item.stars}.0
                        </span>
                      </div>

                      {/* Platform source badge */}
                      <div>
                        {item.videoUrl ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-byte-cyan/10 border border-byte-cyan/30 text-byte-cyan font-semibold text-[11px]">
                            <Play className="w-2.5 h-2.5 fill-byte-cyan" />
                            <span>{tr("Motion Ad")}</span>
                          </span>
                        ) : item.source === 'youtube' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 font-semibold text-[11px]">
                            <YouTubeIcon size={12} className="text-red-500" />
                            <span>YouTube</span>
                          </span>
                        ) : item.source === 'x' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/20 text-gray-200 font-semibold text-[11px]">
                            <XLogoIcon size={11} className="text-white" />
                            <span>X (Twitter)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#8ea1e1] font-semibold text-[11px]">
                            <DiscordIcon size={12} className="text-[#5865F2]" />
                            <span>Discord</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Transcribed Quote */}
                    <blockquote className="text-gray-200 text-sm sm:text-[15px] leading-relaxed font-medium mb-6 relative">
                      <span className="text-byte-cyan/60 font-serif text-base select-none mr-1">“</span>
                      {tr(item.text)}
                      <span className="text-byte-cyan/60 font-serif text-base select-none ml-1">”</span>
                    </blockquote>
                  </div>

                  <div className="relative z-10">
                    {/* Action Button Pill - Clean border highlight without glow */}
                    <div className="mb-5">
                      <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalItem(item);
                        }}
                        className="group/btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-byte-cyan/60 text-gray-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                      >
                        {item.videoUrl ? (
                          <>
                            <div className="w-5 h-5 rounded-full bg-byte-cyan/15 border border-byte-cyan/30 flex items-center justify-center text-byte-cyan group-hover/btn:scale-110 transition-transform">
                              <Play className="w-2.5 h-2.5 fill-byte-cyan ml-0.5" />
                            </div>
                            <span className="text-byte-cyan group-hover/btn:text-white transition-colors">{tr("Assistir Motion Ad no X")}</span>
                          </>
                        ) : item.source === 'youtube' ? (
                          <>
                            <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 group-hover/btn:scale-110 transition-transform">
                              <Play className="w-2.5 h-2.5 fill-red-500 ml-0.5" />
                            </div>
                            <span className="text-gray-300 group-hover/btn:text-white transition-colors">{tr("Assistir o vídeo no YouTube")}</span>
                          </>
                        ) : item.source === 'x' ? (
                          <>
                            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform">
                              <XLogoIcon size={10} className="text-white" />
                            </div>
                            <span className="text-gray-300 group-hover/btn:text-white transition-colors">{tr("Ver print original no X")}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-5 h-5 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2] group-hover/btn:scale-110 transition-transform">
                              <DiscordIcon size={11} className="text-[#5865F2]" />
                            </div>
                            <span className="text-gray-300 group-hover/btn:text-white transition-colors">{tr("Ver print original no Discord")}</span>
                          </>
                        )}
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover/btn:text-byte-cyan transition-colors ml-0.5" />
                      </button>
                    </div>

                    {/* Author block with Avatar + Verified Icon */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-byte-cyan/10 border border-byte-cyan/30 overflow-hidden flex items-center justify-center shrink-0">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                            decoding="async"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <span className="text-byte-cyan font-tech font-black text-sm">
                            {item.author.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black font-tech uppercase text-sm sm:text-base tracking-wider text-white truncate">
                            {item.author}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-byte-cyan fill-byte-cyan/20 shrink-0" />
                        </div>
                        <span className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mt-0.5 truncate font-mono">
                          {tr(item.role)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto px-2">
          <button
            type="button"
            onClick={prevPage}
            aria-label={tr("Página anterior")}
            className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/15 hover:border-byte-cyan/50 hover:bg-byte-cyan/10 text-white transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator with scroll window on mobile */}
          <div className="relative max-w-[160px] sm:max-w-none overflow-hidden py-2 px-2 flex items-center justify-center">
            {/* Gradient fades on edges for mobile */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#050C16] to-transparent z-10 sm:hidden" />
            
            <div 
              ref={dotsContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-3 sm:px-0"
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
                      ? 'w-6 h-2 bg-gradient-to-r from-byte-cyan to-byte-purple' 
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#050C16] to-transparent z-10 sm:hidden" />
          </div>

          <button
            type="button"
            onClick={nextPage}
            aria-label={tr("Próxima página")}
            className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/15 hover:border-byte-cyan/50 hover:bg-byte-cyan/10 text-white transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile swipe hint */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2.5 text-[11px] text-gray-400 font-medium select-none">
          <span>←</span>
          <span>{tr("Arraste para o lado para ver mais")}</span>
          <span>→</span>
        </div>

        {/* Discord Footer Note & Button */}
        <div className="mt-8 text-center flex flex-col items-center">
          <p className="text-xs sm:text-sm text-gray-400 font-medium mb-3.5">
            {tr("e muito mais na nossa comunidade do")}{' '}
            <a 
              href="https://discord.gg/RWWGkeVCRC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#5865F2] hover:text-[#7289da] font-bold underline underline-offset-4"
            >
              Discord
            </a>
          </p>

          <a 
            href="https://discord.gg/RWWGkeVCRC"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-extrabold text-sm md:text-base tracking-widest transition-colors duration-200 uppercase hover:-translate-y-0.5 cursor-pointer"
          >
            <DiscordIcon size={20} className="transition-transform group-hover:scale-105" />
            <span>{tr("QUERO ENTRAR TAMBÉM")}</span>
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
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#081528] border border-byte-cyan/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#050C16] z-10 shrink-0">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {activeModalItem.avatar ? (
                    <div className="w-10 h-10 rounded-full border border-byte-cyan/40 overflow-hidden flex items-center justify-center shrink-0 bg-byte-cyan/10">
                      <img
                        src={activeModalItem.avatar}
                        alt={activeModalItem.author}
                        className="w-full h-full object-cover rounded-full"
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
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/15 hover:border-byte-cyan/40 text-white transition-all hover:scale-105 z-20 cursor-pointer shadow-lg active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  type="button"
                  onClick={nextModalItem}
                  aria-label={tr("Próximo feedback")}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/15 hover:border-byte-cyan/40 text-white transition-all hover:scale-105 z-20 cursor-pointer shadow-lg active:scale-95"
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
                      <div className="w-full aspect-video max-w-3xl rounded-xl border border-white/20 shadow-2xl overflow-hidden bg-black">
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
                      <div className="w-full aspect-video max-w-3xl rounded-xl border border-white/20 shadow-2xl overflow-hidden bg-black">
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
                          className={`rounded-xl border border-white/15 shadow-2xl bg-[#091426] select-none ${
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

// Scrolling changes the parent section indicator, not the testimonials.
export const Feedbacks = React.memo(FeedbacksComponent);
