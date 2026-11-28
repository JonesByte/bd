import { useLanguage } from '../i18n/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { THEMES, PLUGIN_NATIVE_THEME } from '../constants';
import { ChevronLeft, ChevronRight, Maximize2, Monitor, Download, Play, Image as ImageIcon, Cpu, Settings, Search, CheckCircle2, X, Layers, Clapperboard, Palette } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  const [viewMode, setViewMode] = useState<'programa' | 'plugin'>('programa');
  const [useNativePluginTheme, setUseNativePluginTheme] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [lastLoadedUrl, setLastLoadedUrl] = useState<string>('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isShowcaseInView = useInView(containerRef, { amount: 0.35 });
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const safeThemeIndex = currentThemeIndex < THEMES.length ? currentThemeIndex : 0;
  const desktopTheme = THEMES[safeThemeIndex];
  const isNativeActive = viewMode === 'plugin' && useNativePluginTheme;
  const activeAccent = isNativeActive ? PLUGIN_NATIVE_THEME.accent : desktopTheme.accent;
  const currentScreenshots =
    viewMode === 'programa'
      ? desktopTheme.screenshots
      : isNativeActive
        ? PLUGIN_NATIVE_THEME.pluginScreenshots
        : desktopTheme.pluginScreenshots;
  const safeIndex = currentIndex < currentScreenshots.length ? currentIndex : 0;
  const activeShot = currentScreenshots[safeIndex];

  useEffect(() => {
    if (!isShowcaseInView || isFullScreen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isShowcaseInView, isFullScreen, currentScreenshots.length, safeIndex, viewMode, safeThemeIndex, useNativePluginTheme]);

  // Pré-carregamento inteligente: no mobile carrega apenas vizinhos (economiza ~100MB de RAM); no PC carrega vizinhos + resto em idle
  useEffect(() => {
    if (!isShowcaseInView && !isFullScreen) return;
    const len = currentScreenshots.length;
    if (!len) return;

    const preloadUrl = (url?: string) => {
      if (!url) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    };

    const neighborIndices = [
      (safeIndex + 1) % len,
      (safeIndex - 1 + len) % len,
      (safeIndex + 2) % len,
    ];
    neighborIndices.forEach((idx) => preloadUrl(currentScreenshots[idx]?.url));

    const isLowEndOrTouch = typeof window !== 'undefined' && (
      window.matchMedia('(pointer: coarse)').matches ||
      ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4)
    );
    if (isLowEndOrTouch) return;

    const timer = window.setTimeout(() => {
      currentScreenshots.forEach((shot, idx) => {
        if (!neighborIndices.includes(idx) && idx !== safeIndex) {
          preloadUrl(shot?.url);
        }
      });
    }, 600);

    return () => window.clearTimeout(timer);
  }, [isShowcaseInView, isFullScreen, currentScreenshots, safeIndex]);

  // Keyboard navigation in fullscreen
  useEffect(() => {
    if (!isFullScreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullScreen(false);
      else if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
      else if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + currentScreenshots.length) % currentScreenshots.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullScreen, currentScreenshots.length]);

  useEffect(() => {
    const activeThumb = thumbnailRefs.current[safeIndex];
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
  }, [safeIndex, viewMode]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % currentScreenshots.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + currentScreenshots.length) % currentScreenshots.length);
  };

  const handleImageError = (screenshotId: string, url: string) => {
    if (!screenshotId) return;
    console.warn(`Asset ${url} não carregado. Ativando Modo Simulação para o usuário.`);
    setImageErrors(prev => ({ ...prev, [screenshotId]: true }));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (isFullScreen) {
      const html = document.documentElement;
      const prevHtmlOverflow = html.style.overflow;
      document.body.dataset.modalActive = 'true';
      html.style.overflow = 'hidden';
      document.body.classList.add('overflow-hidden');
      (window as any).lenis?.stop?.();
      return () => {
        delete document.body.dataset.modalActive;
        html.style.overflow = prevHtmlOverflow;
        document.body.classList.remove('overflow-hidden');
        (window as any).lenis?.start?.();
      };
    }
  }, [isFullScreen]);

  const handleThemeChange = (index: number) => {
    setUseNativePluginTheme(false);
    setCurrentThemeIndex(index);
  };

  const handleSelectNativePluginTheme = () => {
    setUseNativePluginTheme(true);
  };

  const handleModeChange = (mode: 'programa' | 'plugin') => {
    if (mode === viewMode) return;
    setViewMode(mode);
    if (mode === 'programa') setUseNativePluginTheme(false);
    setCurrentIndex(0);
  };

  const [hoveredThumbIndex, setHoveredThumbIndex] = useState<number | null>(null);
  const formatCounter = (n: number) => String(n).padStart(2, '0');
  const activeCaptionParts = tr(activeShot.caption).split(':');
  const activeTitle = activeCaptionParts[0]?.trim() || tr(activeShot.label);
  const activeDesc = activeCaptionParts.slice(1).join(':').trim();

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="snap-section py-8 md:py-10 flex flex-col bg-byte-navy relative overflow-hidden"
    >
      {/* Ambient minimal glow sutil acompanhando a cor do tema (radial-gradient puro sem blur-[130px] na GPU) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1180px] h-[540px] rounded-full opacity-[0.14] transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${activeAccent} 0%, transparent 72%)`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col max-w-[1160px]">
        {/* Cabeçalho editorial minimalista */}
        <div className="text-center mb-5 md:mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-tech font-bold text-white tracking-tight leading-[1.08]"
          >
            {tr("DOMÍNIO")} <span className="text-byte-cyan">{tr("TOTAL")}</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 1, 0.3, 1] }}
          className="w-full relative"
        >
          {/* Barra superior minimalista — em 1 linha limpa no desktop */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 mb-4 px-1">
            <div className="inline-flex items-center gap-4 sm:gap-5 shrink-0">
              <button
                type="button"
                onClick={() => handleModeChange('programa')}
                className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  viewMode === 'programa'
                    ? 'text-byte-cyan'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Layers size={17} className="shrink-0" />
                <span>{tr("Programa")}</span>
                <span className={`font-mono text-xs ${viewMode === 'programa' ? 'text-byte-cyan/75' : 'text-white/35'}`}>
                  {desktopTheme.screenshots.length}
                </span>
              </button>
              <span className="w-px h-4 bg-white/15 shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={() => handleModeChange('plugin')}
                className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  viewMode === 'plugin'
                    ? 'text-byte-cyan'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Clapperboard size={17} className="shrink-0" />
                <span>{tr("Plugin Premiere & AE")}</span>
                <span className={`font-mono text-xs ${viewMode === 'plugin' ? 'text-byte-cyan/75' : 'text-white/35'}`}>
                  {desktopTheme.pluginScreenshots.length}
                </span>
              </button>
            </div>

            {/* Seletor de temas limpo — pills clicáveis em linha única */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-1.5">
              {viewMode === 'plugin' && (
                <button
                  type="button"
                  onClick={handleSelectNativePluginTheme}
                  title={tr("Tema Nativo do Premiere Pro")}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isNativeActive
                      ? 'border-white/40 bg-white/10 text-white'
                      : 'border-white/15 bg-white/[0.04] text-white/55 hover:border-white/30 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 transition-transform ${isNativeActive ? 'scale-125' : ''}`}
                    style={{ backgroundColor: PLUGIN_NATIVE_THEME.accent }}
                  />
                  <span>{tr("Nativo")}</span>
                </button>
              )}
              {THEMES.map((theme, idx) => {
                const isSelected = !isNativeActive && idx === safeThemeIndex;
                return (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => handleThemeChange(idx)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-white/40 bg-white/10 text-white'
                        : 'border-white/15 bg-white/[0.04] text-white/55 hover:border-white/30 hover:bg-white/[0.08] hover:text-white'
                    }`}
                    style={isSelected ? { borderColor: `${theme.accent}70`, backgroundColor: `${theme.accent}18` } : undefined}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-transform ${isSelected ? 'scale-125' : ''}`}
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span>{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palco principal 16:9 ultra-minimalista com mini-carrossel flutuante no canto inferior central */}
          <div
            className="group/stage relative w-full aspect-video mx-auto bg-[#030710] rounded-2xl md:rounded-[24px] overflow-hidden border border-white/[0.09] transition-all duration-500 cursor-pointer"
            style={{ borderColor: `${activeAccent}35` }}
            onClick={toggleFullScreen}
          >
            {/* Fundo com última imagem carregada para nunca piscar tela preta em cliques rápidos */}
            {lastLoadedUrl && !imageErrors[activeShot.id] && (
              <img
                src={lastLoadedUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain block absolute inset-0 bg-[#030710] pointer-events-none select-none"
              />
            )}

            <AnimatePresence initial={false}>
              {imageErrors[activeShot.id] ? (
                <motion.div
                  key={`sim-${activeShot.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full absolute inset-0 overflow-y-auto z-10"
                >
                  <UISimulation index={safeIndex} />
                </motion.div>
              ) : (
                <motion.img
                  key={activeShot.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  src={activeShot.url}
                  alt={tr(activeShot.caption)}
                  decoding="async"
                  className="w-full h-full object-contain block absolute inset-0 z-10"
                  onLoad={() => setLastLoadedUrl(activeShot.url)}
                  onError={() => handleImageError(activeShot.id, activeShot.url)}
                />
              )}
            </AnimatePresence>

            {/* Vinheta inferior suave para destacar o carrossel flutuante */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-28 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-20"
              aria-hidden="true"
            />

            {/* Botão minimalista de tela cheia (apenas ícone, aparece no hover) */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
              aria-label={tr("Ver imagem em tela cheia")}
              title={tr("Tela cheia")}
              className="hidden sm:flex absolute top-3.5 right-3.5 z-30 w-9 h-9 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white/80 hover:text-white hover:bg-black/80 hover:border-white/30 transition-all duration-200 backdrop-blur-xl opacity-0 group-hover/stage:opacity-100 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Setas sutis laterais (aparecem apenas no hover para manter o visual limpo) */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label={tr("Slide anterior")}
              className="hidden md:flex absolute left-3.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-black/50 border border-white/15 text-white/85 hover:bg-white hover:text-[#050C16] hover:border-white transition-all duration-200 opacity-0 group-hover/stage:opacity-100 backdrop-blur-xl cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label={tr("Próximo slide")}
              className="hidden md:flex absolute right-3.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-black/50 border border-white/15 text-white/85 hover:bg-white hover:text-[#050C16] hover:border-white transition-all duration-200 opacity-0 group-hover/stage:opacity-100 backdrop-blur-xl cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Mini-carrossel flutuante por cima da imagem no canto inferior central */}
            <div
              className="absolute bottom-2.5 sm:bottom-3.5 md:bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[94%] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Micro-tooltip flutuante com o nome da aba ao passar o mouse */}
              <div className="h-5 mb-1.5 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  {hoveredThumbIndex !== null && currentScreenshots[hoveredThumbIndex] && (
                    <motion.span
                      key={currentScreenshots[hoveredThumbIndex].id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 2 }}
                      transition={{ duration: 0.14 }}
                      className="px-2.5 py-0.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[11px] font-medium text-white/95 whitespace-nowrap"
                    >
                      {tr(currentScreenshots[hoveredThumbIndex].label)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div
                ref={thumbnailsContainerRef}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-black/75 md:bg-black/55 border border-white/15 backdrop-blur-xl perf-no-mobile-blur overflow-x-auto max-w-full no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {currentScreenshots.map((screenshot, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={screenshot.id}
                      type="button"
                      ref={(el) => { thumbnailRefs.current[idx] = el; }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(idx);
                      }}
                      onMouseEnter={() => setHoveredThumbIndex(idx)}
                      onMouseLeave={() => setHoveredThumbIndex(null)}
                      aria-label={tr(screenshot.label)}
                      title={tr(screenshot.label)}
                      style={isActive ? { outline: '1.5px solid #FFFFFF', outlineOffset: '0px' } : undefined}
                      className={`relative flex-none w-10 h-6 sm:w-12 sm:h-7 md:w-[54px] md:h-[33px] rounded-[6px] overflow-hidden transition-all duration-200 cursor-pointer bg-[#050C16] ${
                        isActive
                          ? 'opacity-100 scale-[1.1] z-10'
                          : 'opacity-65 hover:opacity-100 hover:scale-105 ring-1 ring-white/15'
                      }`}
                    >
                      {imageErrors[screenshot.id] ? (
                        <div className="w-full h-full flex items-center justify-center bg-byte-surface">
                          <Monitor className="w-3 h-3 text-white/50" />
                        </div>
                      ) : (
                        <img
                          src={screenshot.url}
                          alt={tr(screenshot.label)}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover block"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legenda limpa e discreta abaixo do palco (sem caixas ou bordas pesadas) */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center px-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: activeAccent }}
            />
            <span className="font-semibold text-sm text-white">
              {activeTitle}
            </span>
            {activeDesc && (
              <>
                <span className="hidden sm:inline text-white/25 text-xs">·</span>
                <span className="hidden sm:inline text-white/50 text-xs md:text-[13px] font-normal">
                  {activeDesc}
                </span>
              </>
            )}
            <span className="font-mono text-[11px] text-white/35 tabular-nums ml-1">
              {formatCounter(safeIndex + 1)}/{formatCounter(currentScreenshots.length)}
            </span>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-7 flex justify-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-byte-purple hover:bg-byte-purpleLight px-7 py-3 font-semibold text-xs md:text-sm tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 border border-white/15"
          >
            {tr("QUERO USAR ASSIM")}
          </a>
        </div>
      </div>

      {/* Full Screen Modal com o mesmo mini-carrossel flutuante minimalista (Portal no body) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isFullScreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] h-[100dvh] w-[100vw] overflow-hidden flex items-center justify-center bg-black/95 backdrop-blur-md p-3 md:p-10"
                onClick={toggleFullScreen}
              >
                <button
                  type="button"
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[210] cursor-pointer"
                  onClick={toggleFullScreen}
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white hover:text-[#050C16] transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white hover:text-[#050C16] transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <motion.img
                  key={`fs-${activeShot.id}`}
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  src={activeShot.url}
                  alt={tr(activeShot.caption)}
                  className="w-full max-w-[92vw] max-h-[82dvh] object-contain rounded-xl relative z-[205]"
                  onClick={(e) => e.stopPropagation()}
                />

                <div
                  className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[210] max-w-[92vw] flex flex-col items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar">
                    {currentScreenshots.map((screenshot, idx) => {
                      const isActive = idx === safeIndex;
                      return (
                        <button
                          key={`fs-th-${screenshot.id}`}
                          type="button"
                          onClick={() => setCurrentIndex(idx)}
                          title={tr(screenshot.label)}
                          style={isActive ? { outline: '1.5px solid #FFFFFF', outlineOffset: '0px' } : undefined}
                          className={`flex-none w-10 h-6 sm:w-12 sm:h-7 rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                            isActive ? 'opacity-100 scale-105' : 'opacity-45 hover:opacity-95'
                          }`}
                        >
                          <img src={screenshot.url} alt={tr(screenshot.label)} className="w-full h-full object-cover block" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span className="font-semibold text-white">{activeTitle}</span>
                    {activeDesc && <span className="hidden sm:inline text-white/45">· {activeDesc}</span>}
                    <span className="font-mono text-[11px] text-white/40">{formatCounter(safeIndex + 1)}/{formatCounter(currentScreenshots.length)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

