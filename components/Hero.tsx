import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown, ShieldCheck, Sparkles, Star, Play, Volume2, VolumeX
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { THEMES, VIDEO_CHAPTERS, DEMO_VIDEO_DURATION } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

export const Hero: React.FC<{ currentThemeIndex: number }> = ({ currentThemeIndex }) => {
  const { tr } = useLanguage();
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(containerRef, { margin: '100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const viceTheme = THEMES.find((th) => /vice/i.test(th.name));
  const mainPreview = (viceTheme || THEMES[currentThemeIndex]).screenshots[0].url;

  // Playback starts only after an explicit click/tap or chapter selection.
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<number | null>(null);
  const audioRef = useRef<{ context: AudioContext; gain: GainNode } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(DEMO_VIDEO_DURATION);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const demoGain = Math.pow(10, -10 / 20);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const cancelFade = () => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  // GainNode also attenuates audio on mobile browsers that ignore video.volume.
  // Create/resume the audio graph in the user's click/tap, never on hover.
  const prepareAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    const AudioContextClass = window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!audioRef.current && AudioContextClass) {
      const context = new AudioContextClass();
      const gain = context.createGain();
      gain.gain.value = demoGain;
      const source = context.createMediaElementSource(video);
      source.connect(gain);
      gain.connect(context.destination);
      audioRef.current = { context, gain };
    }
    if (audioRef.current?.context.state === 'suspended') {
      void audioRef.current.context.resume().catch(console.warn);
    }
  };

  const fadeVolume = (targetVolume: number, ms: number, onDone?: () => void) => {
    const video = videoRef.current;
    if (!video) return;
    cancelFade();
    const gain = audioRef.current?.gain.gain;
    const from = gain ? gain.value : video.volume;
    const target = targetVolume * demoGain;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = p * p * (3 - 2 * p);
      const value = from + (target - from) * eased;
      if (gain) gain.value = value;
      else video.volume = value;
      if (p < 1) fadeRef.current = requestAnimationFrame(step);
      else {
        fadeRef.current = null;
        onDone?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => {
    cancelFade();
    void audioRef.current?.context.close();
  }, []);

  const safePause = () => {
    cancelFade();
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) safePause();
    }, { threshold: 0 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      prepareAudio();
      setHasStarted(true);
      // The permanent -10 dB gain remains even at full native player volume.
      if (audioRef.current) {
        video.volume = 1;
        audioRef.current.gain.gain.value = 0;
      } else video.volume = 0;
      await video.play();
      fadeVolume(1, 1000);
    } catch (err) {
      console.warn('Não foi possível reproduzir o vídeo:', err);
    }
  };

  const unmuteWithFade = () => {
    const video = videoRef.current;
    if (!video) return;
    prepareAudio();
    video.muted = false;
    setIsMuted(false);
    fadeVolume(1, 1000);
  };

  const seekToChapter = (start: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = start;
    setCurrentTime(start);
    void playVideo();
  };

  const currentChapterIndex = VIDEO_CHAPTERS.reduce((acc, c, i) => (currentTime >= c.start ? i : acc), 0);
  const chapterEnd = (i: number) => VIDEO_CHAPTERS[i + 1]?.start ?? duration;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  // Keep native controls visible when paused, without reacting to hover.
  const isExpanded = hasStarted;

  // Sinaliza globalmente no document.body que o vídeo está ativo / sendo assistido
  useEffect(() => {
    if (isPlaying || isExpanded) {
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
  }, [isPlaying, isExpanded]);

  const scrollTo = (target: string) => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={containerRef} className="hero-section snap-section relative min-h-[100svh] flex flex-col justify-between pt-14 sm:pt-16 pb-3 sm:pb-4 overflow-hidden bg-[#050c18]">
      {/* ===== Fundo minimalista da marca ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 65% 42% at 50% -6%, rgba(255,255,255,0.045), transparent 70%)',
            'radial-gradient(ellipse 50% 42% at 12% 20%, rgba(0,240,255,0.05), transparent 70%)',
            'radial-gradient(ellipse 55% 58% at 50% 50%, rgba(147, 51, 234, 0.22), transparent 70%)',
            'radial-gradient(ellipse 46% 42% at 50% 50%, rgba(0, 240, 255, 0.055), transparent 65%)'
          ].join(', ')
        }}
      ></div>

      {/* Auroras lentas e sutis */}
      <div className="hero-aurora hero-aurora-cyan pointer-events-none" aria-hidden="true"></div>
      <div className="hero-aurora hero-aurora-purple pointer-events-none" aria-hidden="true"></div>

      {/* Grade técnica bem sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 60% at 50% 50%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 50%, #000 30%, transparent 80%)'
        }}
        aria-hidden="true"
      ></div>

      {/* Grão bem discreto */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-overlay"></div>

      {/* Fusão suave com a próxima seção */}
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-b from-transparent to-[#050c18]" aria-hidden="true"></div>

      <div className="hero-layout w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-14 relative z-10 flex-1 flex flex-col items-center justify-center min-w-0">
        {/* Título centralizado acima da print */}
        <motion.div
          style={{ opacity }}
          className="hero-copy w-full text-center mb-2 sm:mb-3"
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title font-black font-tech text-white uppercase select-none text-center"
          >
            <span>{tr("TUDO")}</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">
              {tr("EM UM")}
            </span>
          </motion.h1>
        </motion.div>

        {/* Foco principal: Print centralizada do Byte Downloader (Vice Week) */}
        <motion.div
          className="hero-preview min-w-0 relative w-full mx-auto group"
          style={{ maxWidth: isMobile ? '100%' : 'min(1120px, 84vw, max(320px, calc((100svh - 360px) * 1.7778)))' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-2 flex justify-center pointer-events-none">
              <span className="inline-flex items-center gap-2 text-[11px] font-tech font-bold tracking-[0.18em] uppercase text-gray-300 whitespace-nowrap">
                {isPlaying ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                    <span>{tr("Clica nas Abas")}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-byte-cyan fill-byte-cyan shrink-0" />
                    <span>{tr("Clique para assistir")}</span>
                  </>
                )}
              </span>
            </div>

          {/* Container do Player / Thumbnail flutuante (16:9 exato, sem cortar laterais) */}
          <div className="relative flex items-center justify-center aspect-video w-full">
            {/* Brilho suave ambiente nas cores da print (Vice Week: rosa/magenta + roxo) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 sm:-inset-12 z-10 rounded-full opacity-55 blur-3xl transition-opacity duration-700 group-hover:opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse 68% 58% at 50% 48%, rgba(255, 92, 168, 0.24) 0%, rgba(147, 51, 234, 0.20) 48%, rgba(5, 12, 24, 0) 78%)',
              }}
            />
            <motion.div
              animate={isExpanded || !isHeroInView ? { y: 0 } : { y: [0, -6, 0] }}
              transition={isExpanded || !isHeroInView
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 5.5, ease: "easeInOut", repeat: Infinity }}
              style={{
                width: isExpanded ? (isMobile ? '100%' : 'min(110%, calc(100% + 2rem))') : '100%'
              }}
              className="relative z-20 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-[#050C16] transition-[width,border-color] duration-700 ease-out group-hover:border-white/25"
            >
              <div
                className="relative bg-[#050C16] overflow-hidden cursor-pointer aspect-video w-full"
              >
                {/* Print completo da interface em 16:9 sem cortes */}
                <img
                  src={mainPreview}
                  alt={tr("Interface do Byte Downloader")}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-contain bg-[#050C16] transition-opacity duration-300 ${
                    isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1920x1080/050C16/00F0FF?text=Screenshot+Nao+Encontrada";
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
                    prepareAudio();
                    setIsPlaying(true);
                    fadeVolume(1, 1000);
                    document.body.dataset.videoPlaying = 'true';
                  }}
                  onTimeUpdate={(e) => {
                    setCurrentTime(e.currentTarget.currentTime);
                  }}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || DEMO_VIDEO_DURATION)}
                  onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
                  onPause={() => {
                    cancelFade();
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

                {!hasStarted && (
                  <button
                    type="button"
                    onClick={() => void playVideo()}
                    aria-label={tr("Vídeo demonstrativo do Byte Downloader")}
                    className="absolute inset-0 z-20 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-byte-cyan focus-visible:outline-offset-[-4px]"
                  >
                    <span className="sr-only">{tr("Clique para assistir")}</span>
                  </button>
                )}

                {/* Botão pulsante para ativar som caso o navegador silencie o áudio inicial */}
                {isPlaying && isMuted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      unmuteWithFade();
                    }}
                    aria-label={tr("Ativar som do vídeo")}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-byte-cyan text-byte-navy font-tech font-black text-xs uppercase"
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
                    className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white text-[11px] font-tech font-black uppercase"
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

            {(isPlaying || currentTime > 0) && (
              <div className="mt-2 flex items-center justify-between gap-3 text-[11px] md:text-xs font-tech font-bold tracking-wider uppercase text-gray-300">
                <span className="truncate">
                  <span className="text-byte-cyan font-mono">{formatTime(currentTime)}</span>
                  <span className="text-gray-500 mx-1.5">·</span>
                  <span className="text-white">{tr(VIDEO_CHAPTERS[currentChapterIndex].title)}</span>
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
            )}
          </div>
          </motion.div>
        </motion.div>

        {/* Barra inferior organizada em 3 colunas (estilo Rockstar): Usuários/Win | Botão | Estrelas/Garantia */}
        <div
          className="w-full max-w-[1120px] mx-auto mt-3.5 sm:mt-4 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 md:gap-6"
        >
          {/* Esquerda: Windows primeiro (maior) + Usuários */}
          <div className="flex items-center justify-center md:justify-start gap-5 sm:gap-6 order-2 md:order-1">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 text-white font-tech font-extrabold text-sm sm:text-base tracking-[0.14em] uppercase whitespace-nowrap">
              <img
                src="/bd/windows-11.svg"
                alt="Windows 11"
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 object-contain"
                loading="eager"
              />
              <span>{t.hero.badgeWin}</span>
            </div>
            <div className="h-8 w-px bg-white/15"></div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-byte-cyan font-black text-2xl sm:text-[28px] leading-none">336+</span>
              <span className="text-[10px] sm:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold whitespace-nowrap mt-1">{t.hero.usersCount}</span>
            </div>
          </div>

          {/* Centro: Botão VER DENTRO */}
          <div className="flex flex-col items-center order-1 md:order-2">
            <button
              type="button"
              onClick={() => scrollTo('#showcase')}
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
              className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full bg-byte-purple hover:bg-byte-purpleLight text-white font-extrabold text-sm sm:text-base tracking-[0.12em] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-white/15 whitespace-nowrap"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-btn-reflex pointer-events-none" />
                <div className="btn-hover-sweep" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
              <span className="relative z-10 font-extrabold">
                {tr("VER DENTRO")}
              </span>
            </button>
          </div>

          {/* Direita: Estrelas 5/5 + Garantia 7 dias */}
          <div className="flex items-center justify-center md:justify-end gap-5 sm:gap-6 order-3">
            <button
              type="button"
              onClick={() => scrollTo('#feedbacks')}
              aria-label={tr("Ver depoimentos reais, nota 5 de 5")}
              className="group/fb flex flex-col items-center md:items-end cursor-pointer"
            >
              <span className="flex items-center gap-1 leading-none" aria-hidden="true">
                <span className="mr-1 text-white font-tech font-black text-xl sm:text-2xl tracking-wider">5/5</span>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-yellow-400 fill-yellow-400" />
                ))}
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-300 group-hover/fb:text-byte-cyan underline underline-offset-4 decoration-white/30 group-hover/fb:decoration-byte-cyan font-tech uppercase tracking-[0.1em] font-bold mt-1 transition-colors">{tr("Feedback real")}</span>
            </button>
            <div className="h-8 w-px bg-white/15"></div>
            <a
              href="https://hotmart.com/pt-br/marketplace/produtos/byte-downloader/S104243634I"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tr("Ver garantia de 7 dias na Hotmart")}
              className="group/gt flex flex-col items-center md:items-end cursor-pointer"
            >
              <span className="text-white font-black text-xl sm:text-2xl leading-none flex items-center gap-1.5 whitespace-nowrap">
                {tr("7 dias")} <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-green-400" />
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-300 group-hover/gt:text-byte-cyan underline underline-offset-4 decoration-white/30 group-hover/gt:decoration-byte-cyan font-tech uppercase tracking-[0.1em] font-bold mt-1 transition-colors">{tr("Garantia")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Setinha central inferior animada (sempre visível na primeira tela) */}
      <motion.button
        type="button"
        onClick={() => scrollTo('#features')}
        style={{ opacity: arrowOpacity }}
        aria-label={tr('Rolar para baixo')}
        data-scroll-arrow="true"
        className="relative z-20 mx-auto mt-1.5 shrink-0 flex w-10 h-8 items-center justify-center cursor-pointer text-white/70 hover:text-byte-cyan transition-colors"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="w-7 h-7" strokeWidth={2} />
        </motion.span>
      </motion.button>
    </section>
  );
};
