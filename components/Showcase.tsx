import { useLanguage } from '../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { THEMES } from '../constants';
import { ChevronLeft, ChevronRight, Maximize2, Monitor, Download, Play, Image as ImageIcon, Cpu, Settings, Search, CheckCircle2, X, Palette } from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useAppVersion } from '../hooks/useAppVersion';

const UISimulation: React.FC<{ index: number }> = ({ index }) => {
  const { tr } = useLanguage();
  const appVersion = useAppVersion();  
  const renderContent = () => {
    switch(index) {
      case 0:
        return (
          <div className="p-8 space-y-6 min-h-[500px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 w-full max-w-xl">
                <Search size={18} className="text-gray-500" />
                <span className="text-gray-400 text-sm">https://youtube.com/watch?v=8K_VIDEO_DEMO...</span>
              </div>
              <div className="px-6 py-3 bg-byte-cyan text-byte-navy font-black rounded-xl text-xs">{tr("ANALISAR LINK")}</div>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-4 border-l-4 border-byte-cyan">
                <div className="w-24 h-14 bg-gray-800 rounded-lg flex items-center justify-center"><Play size={20} className="text-byte-cyan" /></div>
                <div className="flex-1">
                  <div className="h-3 w-48 bg-white/10 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-2 w-16 bg-byte-cyan/30 rounded"></div>
                    <div className="h-2 w-12 bg-white/5 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-byte-cyan font-bold text-xs mb-1">8K HDR</div>
                  <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{width: 0}} animate={{width: i === 1 ? '75%' : '100%'}} className="h-full bg-byte-cyan"></motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="p-8 grid grid-cols-4 gap-4 min-h-[500px]">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="aspect-square glass-panel rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-byte-cyan/50">
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <ImageIcon size={24} className="text-gray-700 group-hover:text-byte-cyan transition-colors" />
                  </div>
               </div>
             ))}
          </div>
        );
      case 2:
        return (
          <div className="p-8 space-y-6 min-h-[500px]">
             <div className="grid grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                     <div className="aspect-video bg-gray-800 flex items-center justify-center">
                        <ImageIcon size={32} className="text-white/10" />
                     </div>
                     <div className="p-4 flex justify-between items-center">
                        <div className="h-2 w-24 bg-white/10 rounded"></div>
                        <div className="px-3 py-1 bg-byte-cyan/20 text-byte-cyan text-[10px] rounded">{tr("MAX RES")}</div>
                     </div>
                  </div>
                ))}
             </div>
             <div className="flex justify-center pt-8">
                <div className="px-10 py-4 bg-byte-cyan text-byte-navy font-black rounded-2xl">{tr("BAIXAR TODAS AS CAPAS")}</div>
             </div>
          </div>
        );
      case 3:
        return (
          <div className="p-8 flex flex-col items-center justify-center h-full gap-8">
             <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-byte-cyan/30">
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                   <div className="flex gap-12 items-center">
                      <div className="text-center">
                         <div className="text-[10px] font-tech text-gray-500 mb-2">ORIGINAL (480P)</div>
                         <div className="w-32 h-32 bg-white/5 rounded-lg flex items-center justify-center"><ImageIcon className="opacity-20" /></div>
                      </div>
                      <motion.div animate={{scale: [1, 1.1, 1]}} transition={{repeat: Infinity}} className="text-byte-cyan"><Cpu size={32} /></motion.div>
                      <div className="text-center">
                         <div className="text-[10px] font-tech text-byte-cyan mb-2">BYTE-AI (4K HDR)</div>
                         <div className="w-32 h-32 bg-byte-cyan/10 border border-byte-cyan/30 rounded-lg flex items-center justify-center"><ImageIcon className="text-byte-cyan" /></div>
                      </div>
                   </div>
                </div>
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-byte-cyan"></div>
             </div>
             <div className="flex gap-4">
                <div className="px-8 py-3 bg-byte-purple text-white rounded-xl font-bold text-sm">{tr("INICIAR PROCESSAMENTO GPU")}</div>
                <div className="px-8 py-3 border border-white/10 text-gray-400 rounded-xl font-bold text-sm">{tr("CONFIGURAR MODELO IA")}</div>
             </div>
          </div>
        );
      case 4:
        return (
          <div className="p-8 space-y-6 min-h-[500px]">
             <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-byte-cyan/10 rounded-full flex items-center justify-center border border-byte-cyan/30">
                   <Palette size={40} className="text-byte-cyan" />
                </div>
                <div className="text-center">
                   <h4 className="text-white font-bold text-lg">{tr("Conversor FFmpeg Integrado")}</h4>
                   <p className="text-gray-500 text-sm">{tr("Arraste arquivos para converter para MP4, MKV, MP3 ou WAV.")}</p>
                </div>
                <div className="w-full max-w-md p-4 bg-white/5 border border-dashed border-white/20 rounded-2xl text-center text-gray-600 text-xs">
                   {tr("DROP FILES HERE")}</div>
                <div className="flex gap-3">
                   <div className="px-4 py-2 bg-white/5 rounded-lg text-white text-xs">H.264</div>
                   <div className="px-4 py-2 bg-white/5 rounded-lg text-white text-xs">H.265</div>
                   <div className="px-4 py-2 bg-byte-cyan/20 text-byte-cyan rounded-lg text-xs">{tr("PRO PRESET")}</div>
                </div>
             </div>
          </div>
        );
      case 5:
        return (
          <div className="p-12 space-y-8 min-h-[500px]">
             <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-byte-purple/20 flex items-center justify-center border border-byte-purple/40">
                   <Settings size={32} className="text-byte-purple" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl font-tech uppercase tracking-widest">{tr("Painel de Preferências")}</h4>
                  <p className="text-gray-500 text-sm">{tr("Ajustes finos para máxima performance de hardware.")}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="flex justify-between items-center p-4 glass-panel rounded-xl">
                    <div className="h-3 w-40 bg-white/10 rounded"></div>
                    <div className="w-10 h-5 bg-byte-cyan/20 rounded-full border border-byte-cyan/40 relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-byte-cyan rounded-full"></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-[#050C16] relative overflow-hidden font-sans">
       <div className="absolute left-0 top-10 bottom-0 w-16 md:w-20 bg-black/40 border-r border-white/5 flex flex-col items-center py-8 gap-6 z-10">
          <div className={`p-3 rounded-xl ${index === 0 ? 'bg-byte-cyan text-byte-navy' : 'text-gray-600'}`}><Download size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 1 ? 'bg-byte-cyan text-byte-navy' : 'text-gray-600'}`}><ImageIcon size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 2 ? 'bg-byte-cyan text-byte-navy' : 'text-gray-600'}`}><Monitor size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 3 ? 'bg-byte-cyan text-byte-navy' : 'text-gray-600'}`}><Cpu size={20} /></div>
          <div className={`p-3 rounded-xl ${index === 4 ? 'bg-byte-cyan text-byte-navy' : 'text-gray-600'}`}><Palette size={20} /></div>
          <div className="mt-auto mb-4">
            <div className={`p-3 rounded-xl ${index === 5 ? 'bg-byte-cyan text-byte-navy' : 'text-gray-600'}`}><Settings size={20} /></div>
          </div>
       </div>
       
       <div className="pl-20 pt-10 h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="h-full w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
       </div>

       <div className="absolute top-14 right-8 flex gap-2">
          <div className="px-3 py-1 bg-green-500/20 text-green-400 text-[9px] font-black font-tech border border-green-500/30 rounded uppercase tracking-tighter flex items-center gap-1">
             <CheckCircle2 size={10} /> CORE V{appVersion.toUpperCase()}  {tr("ESTÁVEL")}</div>
          <div className="px-3 py-1 bg-byte-cyan/20 text-byte-cyan text-[9px] font-black font-tech border border-byte-cyan/30 rounded uppercase tracking-tighter">
             {tr("GPU ACCEL: ON")}
          </div>
       </div>
    </div>
  );
};

export const Showcase: React.FC<{ currentThemeIndex: number, setCurrentThemeIndex: (index: number) => void }> = ({ currentThemeIndex, setCurrentThemeIndex }) => {
  const { tr } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isShowcaseInView = useInView(containerRef, { amount: 0.35 });
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const currentTheme = THEMES[currentThemeIndex];
  const currentScreenshots = currentTheme.screenshots;

  useEffect(() => {
    if (!isShowcaseInView || isFullScreen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isShowcaseInView, isFullScreen, currentScreenshots.length]);

  useEffect(() => {
    const activeThumb = thumbnailRefs.current[currentIndex];
    const container = thumbnailsContainerRef.current;
    if (activeThumb && container) {
      const containerWidth = container.offsetWidth;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      
      const scrollPos = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
      
      container.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + currentScreenshots.length) % currentScreenshots.length);
  };

  const handleImageError = (index: number) => {
    const screenshotId = currentScreenshots[index].id;
    console.warn(`Asset ${currentScreenshots[index].url} não carregado. Ativando Modo Simulação para o usuário.`);
    setImageErrors(prev => ({ ...prev, [screenshotId]: true }));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (isFullScreen) {
      document.body.dataset.modalActive = 'true';
      document.body.classList.add('overflow-hidden');
      return () => {
        delete document.body.dataset.modalActive;
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [isFullScreen]);

  const handleThemeChange = (index: number) => {
    setCurrentThemeIndex(index);
    setCurrentIndex(0);
  };

  return (
    <section 
      id="showcase" 
      ref={containerRef} 
      className="snap-section min-h-screen py-4 md:py-6 lg:py-8 flex flex-col justify-center bg-byte-navy relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,240,255,0.05),transparent_45%,rgba(98,0,234,0.08))]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col justify-center max-w-5xl">
        <div className="text-center mb-2 md:mb-3">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 text-byte-cyan font-tech text-[10px] md:text-xs tracking-[0.2em] mb-1"
          >
             <Monitor size={13} />  {tr("TOUR COMPLETO PELA INTERFACE")}</motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.2, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl font-tech font-bold text-white mb-1"
          >
            {tr("DOMÍNIO")} <span className="text-byte-cyan">{tr("TOTAL")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 1, 0.3, 1] }}
            className="text-gray-400 max-w-md mx-auto text-xs sm:text-sm leading-relaxed"
          >
            {tr("Interface limpa e cirúrgica para criar mais rápido.")}</motion.p>
        </div>

        <motion.div 
          style={{ y, scale }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 1, 0.3, 1] }}
          className="w-full relative group"
        >
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-2 md:mb-3">
            {THEMES.map((theme, idx) => (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(idx)}
                className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-xs font-tech tracking-wider transition-all duration-300 border flex items-center gap-1.5 cursor-pointer ${
                  idx === currentThemeIndex
                    ? 'bg-byte-cyan/20 border-byte-cyan text-byte-cyan'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-[#00F0FF]/30'
                }`}
              >
                <Palette size={11} className="md:w-3 md:h-3" />
                {theme.name}
              </button>
            ))}
          </div>

          {/* Main Display Window com max-h responsivo para nunca vazar da tela */}
          <div 
            className="relative w-full aspect-video max-h-[46vh] lg:max-h-[50vh] max-w-4xl mx-auto bg-[#050C16] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 group-hover:border-byte-cyan/30 transition-colors duration-500 cursor-pointer"
            onClick={toggleFullScreen}
          >
            <AnimatePresence>
              {imageErrors[currentScreenshots[currentIndex].id] ? (
                 <motion.div 
                    key="sim" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.3 }}
                    className="w-full h-full absolute inset-0 overflow-y-auto"
                 >
                    <UISimulation index={currentIndex} />
                 </motion.div>
              ) : (
                <motion.img 
                  key={currentScreenshots[currentIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  src={currentScreenshots[currentIndex].url} 
                  alt={tr(currentScreenshots[currentIndex].caption)} 
                  className="w-full h-full object-contain p-2 md:p-4 block absolute inset-0"
                  onError={() => handleImageError(currentIndex)}
                />
              )}
            </AnimatePresence>
            
            {/* Botão sutil de tela cheia no canto superior */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
              aria-label={tr("Ver imagem em tela cheia")}
              className="hidden sm:flex absolute top-3 right-3 z-30 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-gray-300 hover:text-white hover:border-byte-cyan/40 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 text-xs font-tech font-bold cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-byte-cyan" />
              <span>{tr("Tela cheia")}</span>
            </button>

            {/* Legenda elegante e minimalista da tela */}
            <div className="absolute bottom-2.5 md:bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none max-w-[92%]">
              <motion.div 
                key={currentScreenshots[currentIndex].id + "-caption"}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/85 border border-white/15 backdrop-blur-md text-center"
              >
                <span className="text-byte-cyan font-tech font-bold text-[11px] md:text-xs uppercase tracking-wider shrink-0">
                  {tr(currentScreenshots[currentIndex].caption).split(':')[0]}
                </span>
                <span className="text-gray-500 text-xs">·</span>
                <span className="text-gray-200 text-[11px] md:text-xs font-medium truncate">
                  {tr(currentScreenshots[currentIndex].caption).split(':')[1]?.trim()}
                </span>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide} 
              aria-label={tr("Slide anterior")}
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-40 p-2.5 lg:p-3 rounded-full bg-byte-navy/90 border border-white/15 text-white hover:bg-byte-purple hover:border-byte-purple transition-all duration-300 opacity-75 hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button 
              onClick={nextSlide} 
              aria-label={tr("Próximo slide")}
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-40 p-2.5 lg:p-3 rounded-full bg-byte-navy/90 border border-white/15 text-white hover:bg-byte-cyan hover:border-byte-cyan hover:text-byte-navy transition-all duration-300 opacity-75 hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>

          {/* Thumbnails Navigation Grid Compacto */}
          <div className="relative max-w-3xl mx-auto mt-2.5 md:mt-3 px-6 md:px-10">
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              aria-label={tr("Aba anterior")}
              className="hidden md:flex absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-[#050C16] border border-white/15 text-white hover:bg-byte-purple hover:border-byte-purple transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div 
              ref={thumbnailsContainerRef}
              className="flex overflow-x-auto gap-1.5 sm:gap-2 md:gap-2.5 pb-1 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {currentScreenshots.map((screenshot, idx) => (
                <button 
                  key={screenshot.id}
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-none group relative rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 bg-[#050C16] w-14 sm:w-16 md:w-20 min-w-[56px] sm:min-w-[64px] md:min-w-[76px] ${
                    idx === currentIndex 
                      ? 'border-byte-cyan scale-105 z-10' 
                      : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <div className="relative overflow-hidden bg-gray-900 aspect-video">
                    {imageErrors[screenshot.id] ? (
                      <div className="w-full h-full flex items-center justify-center bg-byte-surface">
                         <Monitor className={`w-3 h-3 ${idx === currentIndex ? 'text-byte-cyan' : 'text-gray-700'}`} />
                      </div>
                    ) : (
                      <img 
                        src={screenshot.url} 
                        alt={tr('Aba {page}', { page: idx + 1 })} 
                        className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className={`p-0.5 md:p-1 text-[7px] font-tech text-center uppercase tracking-widest font-black ${idx === currentIndex ? 'bg-byte-cyan text-byte-navy' : 'text-gray-500'}`}>
                    {tr("ABA")} {idx + 1}
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              aria-label={tr("Próxima aba")}
              className="hidden md:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-[#050C16] border border-white/15 text-white hover:bg-byte-cyan hover:border-byte-cyan hover:text-byte-navy transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        <div className="mt-3 md:mt-4 flex justify-center">
          <a 
            href="#pricing" 
            style={{ fontFamily: "'Montserrat', sans-serif" }} 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-byte-purple hover:bg-byte-purpleLight px-6 py-2.5 md:py-3 font-extrabold text-xs md:text-sm tracking-wider text-white transition-all transform hover:-translate-y-0.5 border border-white/15"
          >
            {tr("QUERO USAR ASSIM")}</a>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 md:p-12"
            onClick={toggleFullScreen}
          >
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
              onClick={toggleFullScreen}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <button 
              onClick={prevSlide} 
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 md:p-5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <button 
              onClick={nextSlide} 
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 md:p-5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.img 
              key={`fs-${currentScreenshots[currentIndex].id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={currentScreenshots[currentIndex].url} 
              alt={tr(currentScreenshots[currentIndex].caption)} 
              className="w-full max-w-full max-h-[85vh] object-contain rounded-lg md:rounded-xl relative z-[105]"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/85 px-5 py-2.5 rounded-full border border-white/15 text-white font-tech tracking-wider text-xs md:text-sm whitespace-nowrap z-[110] flex items-center gap-2">
              <span className="text-byte-cyan font-bold uppercase">{tr(currentScreenshots[currentIndex].caption).split(':')[0]}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-200">{tr(currentScreenshots[currentIndex].caption).split(':')[1]?.trim()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

