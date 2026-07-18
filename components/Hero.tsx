import React, { useRef } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { THEMES } from '../constants';

export const Hero: React.FC<{ currentThemeIndex: number }> = ({ currentThemeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mainPreview = THEMES[currentThemeIndex].screenshots[0].url;

  const scrollTo = (target: string) => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="hero-section relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#071629]">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(0,240,255,0.14),rgba(8,20,38,0.72)_38%,rgba(98,0,234,0.20))]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="hero-layout container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hero-copy space-y-6 lg:space-y-8 text-center lg:text-left mt-10 lg:mt-0"
        >
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-tech leading-[1.08] md:leading-[0.95] text-white uppercase">
            <span className="block">BAIXA.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">MELHORA.</span>
            <span className="block">CONVERTE.</span>
          </h1>
          
          <p className="hero-subtitle max-w-lg mx-auto lg:mx-0 px-2 lg:px-0 text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-200/90 font-medium">
            Cole o link, pegue o video, salve a capa, melhore imagem, transcreva fala e deixe o audio pronto.
            <span className="block mt-1 text-white font-bold">Tudo no mesmo app. Sem depender de site aleatorio.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              type="button"
              onClick={() => scrollTo('#pricing')}
              className="group relative w-full sm:w-auto px-8 py-5 rounded-2xl overflow-hidden bg-byte-purple hover:bg-byte-purpleLight text-white font-sans font-black text-sm md:text-base tracking-widest transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white/15 -skew-y-6 translate-y-6 group-hover:translate-y-3 transition-transform duration-500 pointer-events-none"></span>
              <span className="relative z-10 leading-tight text-center">COMPRAR<br className="sm:hidden" /> AGORA</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#showcase')}
              className="w-full sm:w-auto px-7 py-5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-sans font-black text-sm md:text-base tracking-widest transition-all duration-300 flex items-center justify-center gap-3"
            >
              VER POR DENTRO
            </button>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-2 text-xs md:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-byte-purple" />
              Uma olhada e voce entende por que ele vicia.
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-200 font-tech text-[10px] tracking-[0.18em] uppercase">
              <span className="grid grid-cols-2 gap-0.5 w-3 h-3" aria-hidden="true">
                <span className="bg-byte-cyan rounded-[1px]"></span>
                <span className="bg-byte-cyan rounded-[1px]"></span>
                <span className="bg-byte-cyan rounded-[1px]"></span>
                <span className="bg-byte-cyan rounded-[1px]"></span>
              </span>
              Win 10/11
            </div>
          </div>
          
          <div className="hero-stats flex items-center justify-center lg:justify-start gap-4 md:gap-8 pt-4 md:pt-6 pb-10 lg:pb-0">
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-byte-cyan font-black text-xl md:text-2xl">170+</span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold">Pessoas usando</span>
            </div>
            <div className="h-8 md:h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center lg:items-start">
               <span className="flex items-center gap-1" aria-label="5 estrelas">
                 {[...Array(5)].map((_, index) => (
                   <Star key={index} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                 ))}
               </span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold mt-1">Feedback real</span>
            </div>
            <div className="h-8 md:h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-white font-black text-xl md:text-2xl flex items-center gap-1 md:gap-2">7 dias <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-400" /></span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold">Garantia</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ rotateY: rotate, scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }}
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hero-preview relative hidden md:block group perspective-1000"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
            className="relative z-20 rounded-[2rem] overflow-hidden border border-white/20 bg-[#0d1a2d] transition-all duration-700 group-hover:border-byte-cyan/50"
          >
             <div className="relative bg-[#071629] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={mainPreview}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    src={mainPreview} 
                    alt="Interface do Byte Downloader" 
                    className="hero-preview-image w-full h-auto block transition-all duration-1000 group-hover:opacity-100 group-hover:scale-[1.03]" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1280x720/050C16/00F0FF?text=Screenshot+Nao+Encontrada";
                    }}
                  />
                </AnimatePresence>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};