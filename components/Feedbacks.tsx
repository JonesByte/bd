import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEEDBACKS } from '../constants';
import { FeedbackItem } from '../types';
import { Star, X, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';

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

export const Feedbacks: React.FC = () => {
  const [activeModalItem, setActiveModalItem] = useState<FeedbackItem | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

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
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = FEEDBACKS.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="feedbacks" className="pt-20 pb-8 relative overflow-hidden bg-[#050C16]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-byte-purple/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-byte-cyan/30 bg-byte-cyan/10 text-byte-cyan text-xs font-bold font-tech uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Depoimentos Verificados
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-tech mb-4 uppercase tracking-wider text-white">
            QUEM USA <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">APROVA</span>
          </h2>
          
          <div className="flex items-center justify-center gap-1.5 mb-4" aria-label="5 estrelas de avaliação">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Depoimentos reais de quem já economizou horas de edição e download usando o Byte Downloader.
          </p>
        </motion.div>

        {/* Testimonials Cards Grid */}
        <div className="relative min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className={`grid grid-cols-1 ${currentItems.length > 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 lg:max-w-xl lg:mx-auto'} gap-6 md:gap-8 items-stretch w-full`}
            >
              {currentItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative rounded-2xl bg-[#091426]/90 border border-white/10 hover:border-byte-cyan/40 backdrop-blur-md p-7 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,240,255,0.08)]"
                >
                  {/* Top glowing line */}
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-byte-cyan/30 to-transparent group-hover:via-byte-cyan/70 transition-all duration-500"></div>

                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(item.stars)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Transcribed Quote */}
                    <blockquote className="text-gray-200 italic text-sm sm:text-[15px] md:text-base leading-relaxed font-medium mb-6">
                      "{item.text}"
                    </blockquote>
                  </div>

                  <div>
                    {/* Original Print Link */}
                    <div className="mb-5">
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-byte-cyan hover:text-white underline underline-offset-4 decoration-byte-cyan/40 hover:decoration-white transition-all cursor-pointer"
                      >
                        {item.source === 'x' ? (
                          <>
                            <XLogoIcon size={12} className="text-white/80" />
                            <span>Ver print original do X</span>
                          </>
                        ) : (
                          <>
                            <DiscordIcon size={13} className="text-[#5865F2]" />
                            <span>Ver print original do Discord</span>
                          </>
                        )}
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                      </button>
                    </div>

                    {/* Author block with vertical bar matching reference */}
                    <div className="flex items-center gap-3.5 pt-5 border-t border-white/10">
                      <div className="w-1 h-9 bg-gradient-to-b from-byte-cyan to-byte-purple rounded-full flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <span className="block font-black font-tech uppercase text-sm sm:text-base tracking-wider text-white truncate">
                          {item.author}
                        </span>
                        <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider mt-0.5">
                          {item.role}
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
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prevPage}
            aria-label="Página anterior"
            className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-byte-cyan/50 hover:bg-byte-cyan/10 text-white transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPageIndex(idx)}
                aria-label={`Ir para página ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  pageIndex === idx 
                    ? 'w-6 h-2 bg-gradient-to-r from-byte-cyan to-byte-purple' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextPage}
            aria-label="Próxima página"
            className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-byte-cyan/50 hover:bg-byte-cyan/10 text-white transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Discord Footer Note & Button */}
        <div className="mt-8 text-center flex flex-col items-center">
          <p className="text-xs sm:text-sm text-gray-400 font-medium mb-3.5">
            e muito mais na nossa comunidade do{' '}
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
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-extrabold text-sm md:text-base tracking-widest transition-colors duration-200 uppercase hover:-translate-y-0.5"
          >
            <DiscordIcon size={20} className="transition-transform group-hover:scale-105" />
            <span>QUERO ENTRAR TAMBÉM</span>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 md:p-10 backdrop-blur-sm"
            onClick={() => setActiveModalItem(null)}
          >
            <button 
              type="button"
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
              onClick={() => setActiveModalItem(null)}
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <div 
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={activeModalItem.url} 
                alt={activeModalItem.caption} 
                className="w-full max-h-[75vh] object-contain rounded-xl border border-white/20 shadow-2xl bg-[#091426]"
              />
              
              <div className="mt-4 bg-black/80 px-5 py-2.5 rounded-full border border-white/10 text-white font-tech tracking-wider text-xs md:text-sm text-center">
                {activeModalItem.caption}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
