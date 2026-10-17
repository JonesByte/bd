import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck, Sparkles, Star, Play, Volume2, VolumeX
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { THEMES, VIDEO_CHAPTERS, DEMO_VIDEO_DURATION } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

export const Hero: React.FC<{ currentThemeIndex: number }> = ({ currentThemeIndex }) => {
  const { tr } = useLanguage();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mainPreview = THEMES[currentThemeIndex].screenshots[0].url;

  // --- Vídeo demo no preview: thumbnail -> hover no desktop / toque no mobile com áudio e fade suave ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<number | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoveringRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEMO_VIDEO_DURATION);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detecção de mobile estritamente por largura de tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lastScrollY = useRef(0);
  const triggeredByTouch = useRef(false);

  // Se a pessoa tocar no mobile e rolar/arrastar a tela para baixo, pausa o vídeo suavemente
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (isPlaying && triggeredByTouch.current && Math.abs(currentY - lastScrollY.current) > 30) {
        const video = videoRef.current;
        if (video && !video.paused) {
          fadeVolume(0, 300, () => {
            safePause();
            triggeredByTouch.current = false;
          });
        }
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  const cancelFade = () => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  // Rampa suave de volume (ease-in-out) para não assustar o usuário
  const fadeVolume = (targetVolume: number, ms: number, onDone?: () => void) => {
    const video = videoRef.current;
    if (!video) return;
    cancelFade();
    const from = video.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = p * p * (3 - 2 * p);
      video.volume = Math.min(1, Math.max(0, from + (targetVolume - from) * eased));
      if (p < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        video.volume = targetVolume;
        onDone?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => {
    cancelFade();
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
  }, []);

  // Pausa segura que aguarda qualquer promessa de play() pendente terminar
  const safePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          if (!hoveringRef.current && !triggeredByTouch.current) {
            video.pause();
            setIsPlaying(false);
          }
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Iniciar reprodução com tentativa de áudio e fallback suave garantido
  const playVideo = async (withAudio = true) => {
    const video = videoRef.current;
    if (!video) return;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    if (!video.paused && isPlaying) {
      if (withAudio && video.muted) {
        unmuteWithFade();
      }
      return;
    }

    try {
      if (withAudio) {
        video.volume = 0;
        video.muted = false;
        setIsMuted(false);
        const p = video.play();
        playPromiseRef.current = p;
        await p;
        if (hoveringRef.current || triggeredByTouch.current) {
          setIsPlaying(true);
          fadeVolume(1, 1200);
        } else {
          safePause();
        }
      } else {
        video.muted = true;
        setIsMuted(true);
        const p = video.play();
        playPromiseRef.current = p;
        await p;
        if (hoveringRef.current || triggeredByTouch.current) {
          setIsPlaying(true);
        } else {
          safePause();
        }
      }
    } catch {
      // Autoplay com som bloqueado pela política do navegador -> fallback imediato mudo
      if (!hoveringRef.current && !triggeredByTouch.current) return;
      try {
        video.muted = true;
        setIsMuted(true);
        const p = video.play();
        playPromiseRef.current = p;
        await p;
        if (hoveringRef.current || triggeredByTouch.current) {
          setIsPlaying(true);
        } else {
          safePause();
        }
      } catch (err) {
        console.warn("Autoplay bloqueado:", err);
      }
    } finally {
      playPromiseRef.current = null;
    }
  };

  // Ativar som com fade imediato após clique/toque
  const unmuteWithFade = () => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = 0;
    video.muted = false;
    setIsMuted(false);
    fadeVolume(1, 1000);
  };

  // Hover no desktop (inicia automaticamente e pausa ao tirar o mouse)
  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    triggeredByTouch.current = false;
    hoveringRef.current = true;
    setIsHovering(true);
    playVideo(true);
  };

  const handleMouseLeave = () => {
    if (triggeredByTouch.current) return;
    hoveringRef.current = false;
    setIsHovering(false);
    setHoveredChapter(null);
    fadeVolume(0, 200);
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      if (!hoveringRef.current && !triggeredByTouch.current) {
        safePause();
      }
    }, 150);
  };

  // Toque ou clique direto no card
  const handleCardClick = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (isMobile) {
      triggeredByTouch.current = true;
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      hoveringRef.current = true;
      setIsHovering(true);
      playVideo(true);
    } else {
      if (video.muted) {
        unmuteWithFade();
      } else {
        safePause();
      }
    }
  };

  // Pular direto para o capítulo selecionado
  const seekToChapter = (start: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = start;
    setCurrentTime(start);
    hoveringRef.current = true;
    setIsHovering(true);
    playVideo(true);
  };

  const currentChapterIndex = VIDEO_CHAPTERS.reduce((acc, c, i) => (currentTime >= c.start ? i : acc), 0);
  const chapterEnd = (i: number) => VIDEO_CHAPTERS[i + 1]?.start ?? duration;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  // Card expande suavemente para proporção real do vídeo (16:9) ao tocar ou passar mouse
  const isExpanded = isHovering || isPlaying;

  // Sinaliza globalmente no document.body que o vídeo está ativo / sendo assistido
  useEffect(() => {
    if (isPlaying || isHovering || isExpanded) {
      document.body.dataset.videoActive = 'true';
      if (isPlaying) {
        document.body.dataset.videoPlaying = 'true';
      }
      return () => {
        delete document.body.dataset.videoActive;
        delete document.body.dataset.videoPlaying;
      };
    } else {
      delete document.body.dataset.videoActive;
      delete document.body.dataset.videoPlaying;
    }
  }, [isPlaying, isHovering, isExpanded]);

  const scrollTo = (target: string) => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={containerRef} className="hero-section snap-section relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#050c18]">
      {/* ===== Fundo premium em camadas (estilo Linear / Raycast / Vercel) ===== */}

      {/* 1. Brilhos base das cores da marca (Roxo luminoso + suave ambient light atrás do player para não ficar próximo de preto) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 70% 45% at 50% -8%, rgba(255,255,255,0.06), transparent 70%)',
            'radial-gradient(ellipse 55% 45% at 12% 18%, rgba(0,240,255,0.06), transparent 70%)',
            'radial-gradient(ellipse 55% 60% at 78% 50%, rgba(147, 51, 234, 0.30), transparent 70%)',
            'radial-gradient(ellipse 50% 45% at 74% 54%, rgba(0, 240, 255, 0.07), transparent 65%)'
          ].join(', ')
        }}
      ></div>

      {/* 2. Auroras que flutuam bem devagar (vida sutil sem distrair) */}
      <div className="hero-aurora hero-aurora-cyan pointer-events-none" aria-hidden="true"></div>
      <div className="hero-aurora hero-aurora-purple pointer-events-none" aria-hidden="true"></div>

      {/* 3. Grade técnica fina com fade radial (só aparece atrás do conteúdo) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 60% at 60% 45%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 60% 45%, #000 30%, transparent 80%)'
        }}
        aria-hidden="true"
      ></div>

      {/* 4. Textura de grão para tirar o aspecto "chapado" digital */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] pointer-events-none mix-blend-overlay"></div>

      {/* 5. Linha de luz fina no topo */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-byte-cyan/30 to-transparent" aria-hidden="true"></div>

      {/* 6. Fusão suave com a próxima seção */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-b from-transparent to-[#050c18]" aria-hidden="true"></div>

      <div className="hero-layout container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-w-0">
        <motion.div 
          style={{ opacity }}
          className="hero-copy min-w-0 space-y-6 lg:space-y-8 text-center lg:text-left mt-6 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 lg:space-y-8"
          >
          <h1 className="hero-title font-black font-tech text-white uppercase select-none">
            <span className="block">{t.hero.title1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">{t.hero.title2}</span>
            <span className="block">{t.hero.title3}</span>
          </h1>
          
          <p className="hero-subtitle max-w-lg mx-auto lg:mx-0 px-2 lg:px-0 text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-200/90 font-medium">
            {t.hero.subtitle}
            <span className="block mt-1 text-white font-bold">{t.hero.subtitleBold}</span>
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-3 my-5 sm:my-3">
            <button
              type="button"
              onClick={() => scrollTo('#showcase')}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="group relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto px-8 py-5 rounded-2xl bg-byte-purple hover:bg-byte-purpleLight text-white font-extrabold text-sm md:text-base tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 cursor-pointer"
            >
              {/* Reflexozinho contínuo passando pelo botão */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-btn-reflex pointer-events-none" />
                <div className="btn-hover-sweep" />
              </div>
              
              {/* Reflexo sutil de borda superior */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              <span className="relative z-10">
                {t.hero.cta}
              </span>
            </button>
          </div>

          <div className="hero-features flex flex-col items-center lg:items-start gap-3 my-6 text-xs md:text-sm text-gray-300">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.08] text-white font-tech font-bold text-xs md:text-[13px] tracking-[0.16em] uppercase">
              <span className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5" aria-hidden="true">
                <span className="bg-byte-cyan rounded-[1px]"></span>
                <span className="bg-byte-cyan rounded-[1px]"></span>
                <span className="bg-byte-cyan rounded-[1px]"></span>
                <span className="bg-byte-cyan rounded-[1px]"></span>
              </span>
              {t.hero.badgeWin}
            </div>
          </div>
          
          <div className="hero-stats flex items-center justify-center lg:justify-start gap-4 md:gap-8 pt-4 md:pt-6 pb-6 lg:pb-0">
            <div className="flex flex-col items-center lg:items-start">
               <span className="text-byte-cyan font-black text-xl md:text-2xl">308+</span>
               <span className="text-[9px] md:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold whitespace-nowrap">{t.hero.usersCount}</span>
            </div>
            <button
              type="button"
              onClick={() => scrollTo('#feedbacks')}
              aria-label={tr("Ver depoimentos reais, nota 5 de 5")}
              className="group/fb flex flex-col items-center lg:items-start cursor-pointer"
            >
               <span className="flex items-center gap-1.5" aria-hidden="true">
                 <span className="mr-1 text-white font-tech font-black text-xl md:text-2xl tracking-wider">
                   5/5
                 </span>
                 {[...Array(5)].map((_, index) => (
                   <Star key={index} className="w-4.5 h-4.5 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                 ))}
               </span>
               <span className="text-[9px] md:text-[11px] text-gray-300 group-hover/fb:text-byte-cyan underline underline-offset-4 decoration-white/30 group-hover/fb:decoration-byte-cyan font-tech uppercase tracking-[0.1em] font-bold mt-1 transition-colors">{tr("Feedback real")}</span>
            </button>
            <div className="h-8 md:h-12 w-px bg-white/20"></div>
            <a
              href="https://hotmart.com/pt-br/marketplace/produtos/byte-downloader/S104243634I"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tr("Ver garantia de 7 dias na Hotmart")}
              className="group/gt flex flex-col items-center lg:items-start cursor-pointer"
            >
               <span className="text-white font-black text-xl md:text-2xl flex items-center gap-1 md:gap-2 whitespace-nowrap">{tr("7 dias")} <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-400 shrink-0" /></span>
               <span className="text-[9px] md:text-[11px] text-gray-300 group-hover/gt:text-byte-cyan underline underline-offset-4 decoration-white/30 group-hover/gt:decoration-byte-cyan font-tech uppercase tracking-[0.1em] font-bold transition-colors">{tr("Garantia")}</span>
            </a>
          </div>
          </motion.div>
        </motion.div>

        {/* Preview / Vídeo Demonstrativo: limpo, thumbnail nítida e risquinhos com tooltip */}
        <motion.div 
          style={{ rotateY: isMobile ? 0 : rotate }}
          className="hero-preview min-w-0 relative w-full group perspective-1000 mt-2 lg:mt-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
          {/* Instruções no topo: Passe o Mouse ou Toque / Clica nas Abas */}
          <div className="mb-3 flex justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-xs font-tech font-bold tracking-[0.16em] uppercase text-white whitespace-nowrap">
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span>{tr("Clica nas Abas")}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-byte-cyan fill-byte-cyan shrink-0" />
                  <span>{tr("Passe o Mouse ou Toque")}</span>
                </>
              )}
            </span>
          </div>

          {/* Container do Player / Thumbnail flutuante */}
          <div className="relative flex items-center justify-center aspect-[1280/850] w-full">
            <motion.div
              animate={isExpanded ? { y: 0 } : { y: [0, -8, 0] }}
              transition={isExpanded
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 5.5, ease: "easeInOut", repeat: Infinity }}
              style={{
                width: isExpanded ? (isMobile ? '100%' : 'min(114%, calc(100% + 2.5rem))') : '100%'
              }}
              className="relative z-20 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-[#0d1a2d] transition-[width,border-color] duration-700 ease-out group-hover:border-white/40"
            >
              <div
                className="relative bg-black overflow-hidden transition-[aspect-ratio] duration-700 ease-out cursor-pointer"
                style={{ aspectRatio: isExpanded ? '16 / 9' : '1280 / 850' }}
                onClick={handleCardClick}
              >
                {/* Print da interface (thumbnail 100% limpa, sem blur e sem botão de play cobrindo) */}
                <img
                  src={mainPreview}
                  alt={tr("Interface do Byte Downloader")}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1280x850/050C16/00F0FF?text=Screenshot+Nao+Encontrada";
                  }}
                />

                {/* Vídeo do Byte Downloader com controls para seekbar e tela cheia */}
                <video
                  ref={videoRef}
                  src="/bd/byte-demo.mp4"
                  controls={isExpanded}
                  playsInline
                  muted={isMuted}
                  preload="metadata"
                  onPlay={() => {
                    setIsPlaying(true);
                    document.body.dataset.videoPlaying = 'true';
                  }}
                  onTimeUpdate={(e) => {
                    setCurrentTime(e.currentTarget.currentTime);
                    document.body.dataset.videoPlaying = 'true';
                  }}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || DEMO_VIDEO_DURATION)}
                  onPause={() => {
                    setIsPlaying(false);
                    delete document.body.dataset.videoPlaying;
                  }}
                  onEnded={() => {
                    setIsPlaying(false);
                    delete document.body.dataset.videoPlaying;
                  }}
                  aria-label={tr("Vídeo demonstrativo do Byte Downloader")}
                  className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />

                {/* Botão pulsante para ativar som caso o navegador silencie o áudio inicial */}
                {isPlaying && isMuted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      unmuteWithFade();
                    }}
                    aria-label={tr("Ativar som do vídeo")}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-byte-cyan text-byte-navy font-tech font-black text-xs uppercase tracking-wider animate-pulse hover:scale-105 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{tr("Ativar Som")}</span>
                  </button>
                )}

                {/* Indicador de som ativo */}
                {isPlaying && !isMuted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = videoRef.current;
                      if (video) {
                        video.muted = true;
                        setIsMuted(true);
                      }
                    }}
                    aria-label={tr("Silenciar áudio")}
                    className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white text-[11px] font-tech font-bold backdrop-blur transition-all cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-byte-cyan" />
                    <span className="hidden sm:inline">{tr("Som ativo")}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Capítulos: risquinhos clean com tooltip flutuante e tempo no lado esquerdo */}
          <div className="mt-4 relative">
            {hoveredChapter !== null && (
              <div
                className="absolute bottom-full mb-2 z-30 -translate-x-1/2 pointer-events-none rounded-xl border border-byte-cyan/40 bg-[#050C16]/95 backdrop-blur px-3 py-1.5 whitespace-nowrap"
                style={{ left: `${Math.min(88, Math.max(12, ((hoveredChapter + 0.5) / VIDEO_CHAPTERS.length) * 100))}%` }}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <span className="text-byte-cyan font-mono text-[10px]">{formatTime(VIDEO_CHAPTERS[hoveredChapter].start)}</span>
                  <span>{tr(VIDEO_CHAPTERS[hoveredChapter].title)}</span>
                </div>
                <span className="block text-[10px] text-gray-400">{tr(VIDEO_CHAPTERS[hoveredChapter].desc)}</span>
              </div>
            )}

            <div className="flex items-center gap-1 h-3 cursor-pointer" role="list" aria-label={tr("Linha do tempo dos capítulos")}>
              {VIDEO_CHAPTERS.map((chapter, i) => {
                const end = chapterEnd(i);
                const isPast = i < currentChapterIndex;
                const isCurrent = i === currentChapterIndex && (isPlaying || currentTime > 0);
                const pct = isCurrent ? Math.min(100, Math.max(0, ((currentTime - chapter.start) / (end - chapter.start)) * 100)) : 0;
                return (
                  <button
                    key={chapter.start}
                    type="button"
                    role="listitem"
                    aria-label={`${formatTime(chapter.start)} – ${tr(chapter.title)}`}
                    onClick={() => seekToChapter(chapter.start)}
                    onMouseEnter={() => setHoveredChapter(i)}
                    onMouseLeave={() => setHoveredChapter(null)}
                    className="group/seg flex-1 h-6 -my-1.5 flex items-center cursor-pointer"
                  >
                    <span
                      className={`block w-full rounded-full transition-all duration-200 group-hover/seg:h-3 ${
                        hoveredChapter === i ? 'h-3 ring-2 ring-byte-cyan' : isCurrent ? 'h-2.5' : 'h-1.5'
                      } ${isPast ? 'bg-byte-cyan' : ''}`}
                      style={isPast ? undefined : { background: `linear-gradient(to right, #00F0FF ${pct}%, rgba(255,255,255,0.18) ${pct}%)` }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] md:text-xs font-tech font-bold tracking-wider uppercase text-gray-300">
              <span className="truncate">
                {isPlaying || currentTime > 0 ? (
                  <>
                    <span className="text-byte-cyan font-mono">{formatTime(currentTime)}</span>
                    <span className="text-gray-500 mx-1.5">·</span>
                    <span className="text-white">{tr(VIDEO_CHAPTERS[currentChapterIndex].title)}</span>
                  </>
                ) : (
                  tr('Pule direto para a aba que quiser')
                )}
              </span>
              {isPlaying && isMuted && (
                <button
                  type="button"
                  onClick={unmuteWithFade}
                  className="inline-flex items-center gap-1.5 shrink-0 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{tr("Clique para ativar o som")}</span>
                </button>
              )}
            </div>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
