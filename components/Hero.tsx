import React, { useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PRICE_PROMO, THEMES } from '../constants';
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

  // Pega a primeira print (Aba Vídeos) definida em constants.ts (do tema selecionado)
  const mainPreview = THEMES[currentThemeIndex].screenshots[0].url;
  const appVersion = useAppVersion();

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-byte-navy">
      {/* Background Elements */}
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
        {/* Left Content */}
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left text-sharp mt-10 lg:mt-0"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-byte-cyan/50 bg-byte-cyan/10 text-byte-cyan font-tech text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] mb-2 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-byte-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-byte-cyan"></span>
            </span>
            MOTOR V{appVersion.toUpperCase()} ATIVO
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-tech leading-[1.1] md:leading-[0.9] text-white uppercase">
            BAIXE 8K <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple neon-text">
              CORTADO
            </span> <br className="hidden sm:block" />
            SEM PARAR
          </h1>
          
          <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold tracking-tight px-2 lg:px-0">
            Software definitivo com <span className="text-byte-cyan">Aceleração de Hardware</span>, <span className="text-byte-purple">IA de Upscaling</span> e <span className="text-byte-cyan">Conversor Integrado</span>.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center lg:justify-start pt-4 w-full sm:w-auto px-4 sm:px-0">
            <button 
              onClick={() => {
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo('#pricing');
                } else {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative w-full sm:w-auto px-6 py-4 md:px-12 md:py-6 bg-byte-purple hover:bg-byte-purpleLight text-white font-black text-base md:text-xl rounded-xl md:rounded-2xl shadow-[0_0_20px_rgba(98,0,234,0.4)] md:shadow-[0_0_30px_rgba(98,0,234,0.5)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                BAIXAR
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button 
               onClick={() => {
                 if ((window as any).lenis) {
                   (window as any).lenis.scrollTo('#showcase');
                 } else {
                   document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                 }
               }}
               className="w-full sm:w-auto px-5 py-4 md:px-10 md:py-6 border-2 border-white/20 bg-white/5 text-white font-black text-xs md:text-base rounded-xl md:rounded-2xl hover:bg-white/10 hover:border-byte-cyan transition-all backdrop-blur-md flex items-center justify-center gap-2 md:gap-3 group"
            >
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                <Sparkles className="w-4 h-4 md:w-[22px] md:h-[22px] text-byte-cyan group-hover:rotate-[30deg] transition-transform" /> 
                <span className="hidden sm:inline">VER INTERFACE COMPLETA</span>
                <span className="sm:hidden">VER INTERFACE</span>
              </span>
            </button>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-10 pt-6 md:pt-8 pb-10 lg:pb-0">
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-byte-cyan font-black text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">60+</span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold">Usuários</span>
            </div>
            <div className="h-8 md:h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-byte-purple font-black text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(98,0,234,0.4)]">8K HDR</span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold">Resolução</span>
            </div>
            <div className="h-8 md:h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-white font-black text-xl md:text-2xl flex items-center gap-1 md:gap-2">100% <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-400" /></span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold">Seguro</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Software Preview */}
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
