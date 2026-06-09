import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEEDBACKS } from '../constants';
import { Star, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const Feedbacks: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (FEEDBACKS.length === 0) return null;

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const openFullScreen = (index: number) => {
    setCurrentIndex(index % FEEDBACKS.length);
    setIsFullScreen(true);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % FEEDBACKS.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + FEEDBACKS.length) % FEEDBACKS.length);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-byte-navy">
      <div className="absolute inset-0 bg-byte-purple/5 mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black font-tech mb-4 uppercase tracking-wider">
            O QUE OS <span className="text-byte-cyan">BYTES</span> DIZEM
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Resultados reais de quem já transformou seu fluxo de trabalho usando o Byte Downloader.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full group cursor-pointer">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-byte-navy to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-byte-navy to-transparent z-10 pointer-events-none"></div>
        
        {/* Container com scroll nativo oculto e snap para rolagem manual suave */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 pt-4 gap-4 px-8 md:px-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEEDBACKS.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`} 
              onClick={() => openFullScreen(idx)}
              className="group/item snap-center relative flex-shrink-0 w-[300px] md:w-[500px] lg:w-[650px] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-[#0A101F] shadow-lg hover:border-byte-cyan/40 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <img 
                src={item.url} 
                alt={item.caption} 
                className="w-full h-auto object-cover opacity-80 group-hover/item:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x200/050C16/00F0FF?text=Feedback+Nao+Encontrado";
                }}
              />
              <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity backdrop-blur-sm shadow-xl">
                 <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal copiado do modelo da galeria (Showcase) */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-12"
            onClick={toggleFullScreen}
          >
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
              onClick={toggleFullScreen}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            {FEEDBACKS.length > 1 && (
              <>
                <button 
                  onClick={prevSlide} 
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 md:p-5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/30 transition-all duration-300 backdrop-blur-xl"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                <button 
                  onClick={nextSlide} 
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 md:p-5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/30 transition-all duration-300 backdrop-blur-xl"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            <motion.img 
              key={`fs-feedback-${FEEDBACKS[currentIndex].id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={FEEDBACKS[currentIndex].url} 
              alt={FEEDBACKS[currentIndex].caption} 
              className="w-full max-w-5xl max-h-[85vh] object-contain rounded-lg md:rounded-xl shadow-2xl relative z-[105]"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 text-white font-tech tracking-widest text-[10px] md:text-sm whitespace-nowrap z-[110]">
              {FEEDBACKS[currentIndex].caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
