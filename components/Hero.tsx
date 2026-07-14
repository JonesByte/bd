import React, { useRef } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { THEMES } from '../constants';
import { useAppVersion } from '../hooks/useAppVersion';

export const Hero: React.FC<{ currentThemeIndex: number }> = ({ currentThemeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mainPreview = THEMES[currentThemeIndex].screenshots[0].url;
  const appVersion = useAppVersion();

  const goToShowcase = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo('#showcase');
    } else {
      document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-byte-navy">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-full lg:w-2/3 h-full bg-byte-purple/20 blur-[100px] lg:blur-[150px] rounded-full mix-blend-screen animate-pulse-slow"
        ></motion.div>
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-full lg:w-1/2 h-full bg-byte-cyan/15 blur-[100px] lg:blur-[150px] rounded-full mix-blend-screen animate-pulse-slow"
        ></motion.div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left mt-10 lg:mt-0"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-byte-cyan/50 bg-byte-cyan/10 text-byte-cyan font-tech text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] mb-2 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="grid grid-cols-2 gap-0.5 w-3 h-3" aria-hidden="true">
              <span className="bg-byte-cyan rounded-[1px]"></span>
              <span className="bg-byte-cyan rounded-[1px]"></span>
              <span className="bg-byte-cyan rounded-[1px]"></span>
              <span className="bg-byte-cyan rounded-[1px]"></span>
            </span>
            WIN 10/11
            <span className="hidden sm:inline text-byte-cyan/40">•</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-byte-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-byte-cyan"></span>
            </span>
            MOTOR V{appVersion.toUpperCase()} PRONTO
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-tech leading-[1.08] md:leading-[0.95] text-white uppercase">
            UM APP. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">
              TUDO PRONTO.
            </span>
          </h1>
          
          <p className="max-w-lg mx-auto lg:mx-0 px-2 lg:px-0 text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-200/90 font-medium">
            Baixe video, pegue capa, melhore imagem, transforme fala em texto e deixe o audio bonito.
            <span className="block mt-1 text-white font-bold">Tudo em um lugar. Sem pular de site em site.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              type="button"
              onClick={goToShowcase}
              className="group relative w-full sm:w-auto px-8 py-5 rounded-2xl overflow-hidden bg-byte-purple hover:bg-byte-purpleLight text-white font-sans font-black text-sm md:text-base tracking-widest shadow-[0_0_35px_rgba(98,0,234,0.35)] hover:shadow-[0_0_55px_rgba(98,0,234,0.65)] transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white/15 -skew-y-6 translate-y-6 group-hover:translate-y-3 transition-transform duration-500 pointer-events-none"></span>
              <span className="relative z-10 leading-tight text-center">VER POR<br className="sm:hidden" /> DENTRO</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
              <Sparkles className="w-4 h-4 text-byte-purple" />
              Uma olhada e voce entende por que ele vicia.
            </div>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-8 pt-6 md:pt-8 pb-10 lg:pb-0">
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-byte-cyan font-black text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">60+</span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold">Pessoas usando</span>
            </div>
            <div className="h-8 md:h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center lg:items-start">
               <span className="flex items-center gap-1 drop-shadow-[0_0_10px_rgba(250,204,21,0.35)]" aria-label="5 estrelas">
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
          className="relative animate-float hidden md:block group perspective-1000"
        >
          <div className="relative z-20 rounded-[2rem] overflow-hidden shadow-[0_0_120px_rgba(0,240,255,0.15)] border border-white/20 bg-[#0A101F] transition-all duration-700 group-hover:border-byte-cyan/50 group-hover:shadow-[0_0_150px_rgba(0,240,255,0.3)]">
             <div className="relative bg-byte-navy overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={mainPreview}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    src={mainPreview} 
                    alt="Interface do Byte Downloader" 
                    className="w-full h-auto block transition-all duration-1000 group-hover:opacity-100 group-hover:scale-[1.03]" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1280x720/050C16/00F0FF?text=Screenshot+Nao+Encontrada";
                    }}
                  />
                </AnimatePresence>
             </div>
          </div>
          
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-byte-purple rounded-full blur-[150px] opacity-40 z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-byte-cyan rounded-full blur-[150px] opacity-30 z-0"></div>
        </motion.div>
      </div>
    </section>
  );
};
