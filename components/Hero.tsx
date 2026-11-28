import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown, Minus, Plus, RotateCcw, Search, ShieldCheck, Sparkles, Star, Play, Volume2, X
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { THEMES, VIDEO_CHAPTERS, DEMO_VIDEO_DURATION } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

// Altere para true assim que o novo vídeo demonstrativo estiver gravado
const SHOW_DEMO_VIDEO = false;

const HERO_SHOT_V = '20261125-v508-pro2';
const VW_BASE = '/bd/screenshots/v508/programa/vice-week';

type HeroAppMode = 'baixar' | 'ia' | 'estudio';

interface HeroHotspotTab {
  id: string;
  mode: HeroAppMode;
  parentSubTab?: string;
  label: string;
  url: string;
  left: string;
  width: string;
}

const HERO_MODE_HOTSPOTS: Array<{ id: HeroAppMode; label: string; defaultTab: string; left: string; width: string }> = [
  { id: 'baixar', label: 'Baixar', defaultTab: 'videos', left: '17.15%', width: '4.45%' },
  { id: 'ia', label: 'Byte IA', defaultTab: 'chat', left: '21.75%', width: '5.18%' },
  { id: 'estudio', label: 'Estúdio', defaultTab: 'plugin', left: '27.05%', width: '5.45%' },
];

const HERO_SUBTAB_HOTSPOTS: Record<HeroAppMode, HeroHotspotTab[]> = {
  baixar: [
    { id: 'videos', mode: 'baixar', label: 'Vídeos', url: `${VW_BASE}/01_videos.webp?v=${HERO_SHOT_V}`, left: '53.30%', width: '2.85%' },
    { id: 'fotos', mode: 'baixar', label: 'Fotos', url: `${VW_BASE}/02_fotos.webp?v=${HERO_SHOT_V}`, left: '56.15%', width: '2.48%' },
    { id: 'thumbnails', mode: 'baixar', label: 'Thumbnails', url: `${VW_BASE}/03_thumbnails.webp?v=${HERO_SHOT_V}`, left: '58.63%', width: '4.28%' },
  ],
  ia: [
    { id: 'chat', mode: 'ia', label: 'Chat', url: `${VW_BASE}/04_chat.webp?v=${HERO_SHOT_V}`, left: '51.55%', width: '2.22%' },
    { id: 'upscaling', mode: 'ia', label: 'Upscaling', url: `${VW_BASE}/05_upscaling_imagem.webp?v=${HERO_SHOT_V}`, left: '53.77%', width: '3.66%' },
    { id: 'separar', mode: 'ia', label: 'Separar Áudio', url: `${VW_BASE}/07_separar_audio.webp?v=${HERO_SHOT_V}`, left: '57.43%', width: '4.82%' },
    { id: 'texto', mode: 'ia', label: 'Texto', url: `${VW_BASE}/08_texto.webp?v=${HERO_SHOT_V}`, left: '62.25%', width: '2.48%' },
  ],
  estudio: [
    { id: 'plugin', mode: 'estudio', label: 'Plugin', url: `${VW_BASE}/09_plugin.webp?v=${HERO_SHOT_V}`, left: '53.65%', width: '2.68%' },
    { id: 'conversao', mode: 'estudio', label: 'Conversão', url: `${VW_BASE}/10_conversao_video_audio.webp?v=${HERO_SHOT_V}`, left: '56.33%', width: '3.85%' },
    { id: 'mixer', mode: 'estudio', label: 'Mixer', url: `${VW_BASE}/13_mixer.webp?v=${HERO_SHOT_V}`, left: '60.18%', width: '2.48%' },
  ],
};

interface HeroInnerHotspot {
  id: string;
  mode: HeroAppMode;
  parentSubTab: string;
  label: string;
  url: string;
  left: string;
  top: string;
  width: string;
  height: string;
}

const HERO_INNER_HOTSPOTS: Record<string, HeroInnerHotspot[]> = {
  upscaling: [
    { id: 'upscaling', mode: 'ia', parentSubTab: 'upscaling', label: 'Upscaling Imagem', url: `${VW_BASE}/05_upscaling_imagem.webp?v=${HERO_SHOT_V}`, left: '18.750%', top: '11.667%', width: '6.250%', height: '2.407%' },
    { id: 'upscaling_video', mode: 'ia', parentSubTab: 'upscaling', label: 'Upscaling Vídeo', url: `${VW_BASE}/06_upscaling_video.webp?v=${HERO_SHOT_V}`, left: '25.417%', top: '11.667%', width: '6.354%', height: '2.407%' },
  ],
  conversao: [
    { id: 'conversao', mode: 'estudio', parentSubTab: 'conversao', label: 'Vídeo/Áudio', url: `${VW_BASE}/10_conversao_video_audio.webp?v=${HERO_SHOT_V}`, left: '46.979%', top: '16.852%', width: '7.187%', height: '3.148%' },
    { id: 'conversao_foto', mode: 'estudio', parentSubTab: 'conversao', label: 'Foto', url: `${VW_BASE}/11_conversao_foto.webp?v=${HERO_SHOT_V}`, left: '54.479%', top: '16.852%', width: '7.292%', height: '3.148%' },
    { id: 'conversao_3d', mode: 'estudio', parentSubTab: 'conversao', label: 'Modelo 3D', url: `${VW_BASE}/12_conversao_modelo_3d.webp?v=${HERO_SHOT_V}`, left: '62.083%', top: '16.852%', width: '7.187%', height: '3.148%' },
  ],
};

const ALL_HERO_TABS: Array<{ id: string; mode: HeroAppMode; parentSubTab?: string; label: string; url: string }> = [
  ...HERO_SUBTAB_HOTSPOTS.baixar,
  ...HERO_SUBTAB_HOTSPOTS.ia,
  ...HERO_SUBTAB_HOTSPOTS.estudio,
  ...HERO_INNER_HOTSPOTS.upscaling.filter((t) => t.id !== 'upscaling'),
  ...HERO_INNER_HOTSPOTS.conversao.filter((t) => t.id !== 'conversao'),
];

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
  const defaultPreview = (viceTheme || THEMES[currentThemeIndex]).screenshots[0].url;
  const [activeHeroTabId, setActiveHeroTabId] = useState<string>('videos');
  const [lastHeroLoadedUrl, setLastHeroLoadedUrl] = useState<string>(defaultPreview);
  const activeHeroTab = ALL_HERO_TABS.find((tab) => tab.id === activeHeroTabId) || HERO_SUBTAB_HOTSPOTS.baixar[0];
  const mainPreview = SHOW_DEMO_VIDEO ? defaultPreview : activeHeroTab.url;

  const selectHeroTab = (tabId: string) => {
    setActiveHeroTabId(tabId);
  };

  const renderAppHotspots = (inFullscreen = false) => {
    const isSepararShot = activeHeroTab.id === 'separar';
    const activeParentSubTab = activeHeroTab.parentSubTab || activeHeroTab.id;
    const innerGroup = HERO_INNER_HOTSPOTS[activeParentSubTab];
    const modeTop = isSepararShot ? '3.889%' : '4.630%';
    const subTop = isSepararShot ? '7.130%' : '4.722%';
    const stopAll = (e: React.SyntheticEvent) => {
      e.stopPropagation();
    };
    const animateCue = inFullscreen || isHeroInView;
    const renderClickableCue = (delaySec: number, radiusClass: string) =>
      animateCue ? (
        <>
          <span
            aria-hidden="true"
            style={{ animationDelay: `${delaySec}s` }}
            className={`pointer-events-none absolute inset-0 ${radiusClass} hero-hotspot-ring`}
          />
          <span
            aria-hidden="true"
            style={{ animationDelay: `${delaySec}s` }}
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-[75%] hero-hotspot-sheen"
          />
        </>
      ) : null;

    return (
      <>
        {HERO_MODE_HOTSPOTS.map((modeBtn, idx) => {
          const isActive = activeHeroTab.mode === modeBtn.id;
          return (
            <button
              key={`${inFullscreen ? 'fs-' : ''}${modeBtn.id}`}
              type="button"
              data-hero-hotspot="true"
              onPointerDown={stopAll}
              onTouchStart={stopAll}
              onClick={(e) => {
                e.stopPropagation();
                selectHeroTab(modeBtn.defaultTab);
              }}
              aria-label={tr(modeBtn.label)}
              title={tr(modeBtn.label)}
              style={{
                left: modeBtn.left,
                top: modeTop,
                width: modeBtn.width,
                height: '2.593%',
              }}
              className={`absolute z-20 overflow-hidden rounded-[6px] cursor-pointer transition-colors ${
                isActive
                  ? 'bg-transparent'
                  : 'hover:bg-[#FF5289]/25 hover:ring-1 hover:ring-[#FF5289]'
              }`}
            >
              {!isActive && renderClickableCue(idx * 0.16, 'rounded-[6px]')}
            </button>
          );
        })}

        {HERO_SUBTAB_HOTSPOTS[activeHeroTab.mode].map((subTab, idx) => {
          const isActive = activeParentSubTab === subTab.id;
          return (
            <button
              key={`${inFullscreen ? 'fs-' : ''}${subTab.id}`}
              type="button"
              data-hero-hotspot="true"
              onPointerDown={stopAll}
              onTouchStart={stopAll}
              onClick={(e) => {
                e.stopPropagation();
                selectHeroTab(subTab.id);
              }}
              aria-label={tr(subTab.label)}
              title={tr(subTab.label)}
              style={{
                left: subTab.left,
                top: subTop,
                width: subTab.width,
                height: '2.407%',
              }}
              className={`absolute z-20 overflow-hidden rounded-[4px] cursor-pointer transition-colors ${
                isActive
                  ? 'bg-transparent'
                  : 'hover:bg-[#FF5289]/25 hover:ring-1 hover:ring-[#FF5289]/90'
              }`}
            >
              {!isActive && renderClickableCue(0.45 + idx * 0.14, 'rounded-[4px]')}
            </button>
          );
        })}

        {innerGroup?.map((innerBtn, idx) => {
          const isActive = activeHeroTab.id === innerBtn.id;
          return (
            <button
              key={`${inFullscreen ? 'fs-' : ''}${innerBtn.id}`}
              type="button"
              data-hero-hotspot="true"
              onPointerDown={stopAll}
              onTouchStart={stopAll}
              onClick={(e) => {
                e.stopPropagation();
                selectHeroTab(innerBtn.id);
              }}
              aria-label={tr(innerBtn.label)}
              title={tr(innerBtn.label)}
              style={{
                left: innerBtn.left,
                top: innerBtn.top,
                width: innerBtn.width,
                height: innerBtn.height,
              }}
              className={`absolute z-20 overflow-hidden rounded-[5px] cursor-pointer transition-colors ${
                isActive
                  ? 'bg-transparent'
                  : 'hover:bg-[#FF5289]/25 hover:ring-1 hover:ring-[#FF5289]'
              }`}
            >
              {!isActive && renderClickableCue(0.9 + idx * 0.16, 'rounded-[5px]')}
            </button>
          );
        })}
      </>
    );
  };

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
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const zoomModalRef = useRef<HTMLDivElement>(null);
  const zoomStageRef = useRef<HTMLDivElement>(null);
  const zoomImgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const touchPinchRef = useRef<{ dist: number; zoom: number; midX: number; midY: number; ox: number; oy: number } | null>(null);
  const touchPanRef = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const demoGain = Math.pow(10, -10 / 20);

  const clampPan = (x: number, y: number, scale: number) => {
    const stage = zoomStageRef.current;
    if (!stage || scale <= 1) return { x: 0, y: 0 };
    const rect = stage.getBoundingClientRect();
    const img = zoomImgRef.current;
    const natW = img?.naturalWidth || 1920;
    const natH = img?.naturalHeight || 1080;
    const imgRatio = natW / natH;
    const stageRatio = rect.width / Math.max(1, rect.height);
    const baseW = stageRatio > imgRatio ? rect.height * imgRatio : rect.width;
    const baseH = stageRatio > imgRatio ? rect.height : rect.width / imgRatio;
    const maxX = Math.max(0, (baseW * scale - rect.width) / 2);
    const maxY = Math.max(0, (baseH * scale - rect.height) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  const setZoomAndPan = (nextZoom: number, nextX?: number, nextY?: number) => {
    const clampedZoom = Math.min(5, Math.max(1, Number(nextZoom.toFixed(3))));
    const clampedPan = clampPan(
      nextX ?? panRef.current.x,
      nextY ?? panRef.current.y,
      clampedZoom
    );
    zoomRef.current = clampedZoom;
    panRef.current = clampedPan;
    setZoomLevel(clampedZoom);
    setPanOffset(clampedPan);
  };

  const applyZoomAtPoint = (nextZoom: number, clientX?: number, clientY?: number) => {
    const prevZoom = zoomRef.current;
    const clampedZoom = Math.min(5, Math.max(1, Number(nextZoom.toFixed(3))));
    if (clampedZoom <= 1) {
      setZoomAndPan(1, 0, 0);
      return;
    }
    const stage = zoomStageRef.current;
    if (stage && clientX !== undefined && clientY !== undefined && prevZoom > 0) {
      const rect = stage.getBoundingClientRect();
      const cx = clientX - (rect.left + rect.width / 2);
      const cy = clientY - (rect.top + rect.height / 2);
      const ratio = clampedZoom / prevZoom;
      const nx = cx - (cx - panRef.current.x) * ratio;
      const ny = cy - (cy - panRef.current.y) * ratio;
      setZoomAndPan(clampedZoom, nx, ny);
      return;
    }
    setZoomAndPan(clampedZoom);
  };

  const openZoomViewer = () => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsZoomOpen(true);
  };

  const closeZoomViewer = () => {
    setIsZoomOpen(false);
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsPanning(false);
    panStartRef.current = null;
    touchPinchRef.current = null;
    touchPanRef.current = null;
  };

  useEffect(() => {
    if (!isZoomOpen) return;
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.dataset.modalActive = 'true';
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    (window as any).lenis?.stop?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeZoomViewer();
      } else if (e.key === '+' || e.key === '=' || (e.ctrlKey && e.key === '+')) {
        e.preventDefault();
        applyZoomAtPoint(zoomRef.current + 0.5);
      } else if (e.key === '-' || (e.ctrlKey && e.key === '-')) {
        e.preventDefault();
        applyZoomAtPoint(zoomRef.current - 0.5);
      } else if (e.key === '0' || (e.ctrlKey && e.key === '0')) {
        e.preventDefault();
        setZoomAndPan(1, 0, 0);
      }
    };

    // Bloqueia rolagem da página e zoom nativo do navegador (roda do mouse, Ctrl+Scroll e pinça no trackpad/touch)
    const onWindowWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const stage = zoomStageRef.current;
      if (stage && stage.contains(e.target as Node)) {
        const next = e.ctrlKey
          ? zoomRef.current * (1 - e.deltaY * 0.012)
          : zoomRef.current + (e.deltaY < 0 ? 0.35 : -0.35);
        applyZoomAtPoint(next, e.clientX, e.clientY);
      }
    };

    const onGestureBlock = (e: Event) => {
      e.preventDefault();
    };

    const onResize = () => {
      setZoomAndPan(zoomRef.current, panRef.current.x, panRef.current.y);
    };

    const modalEl = zoomModalRef.current;
    const stageEl = zoomStageRef.current;

    const onModalTouchMoveBlock = (e: TouchEvent) => {
      e.preventDefault();
    };

    const onStageTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement | null)?.closest('[data-hero-hotspot]')) return;
      if (e.touches.length === 2) {
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        const midX = (t0.clientX + t1.clientX) / 2;
        const midY = (t0.clientY + t1.clientY) / 2;
        touchPinchRef.current = {
          dist: Math.max(1, dist),
          zoom: zoomRef.current,
          midX,
          midY,
          ox: panRef.current.x,
          oy: panRef.current.y,
        };
        touchPanRef.current = null;
        setIsPanning(true);
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        touchPanRef.current = {
          x: t.clientX,
          y: t.clientY,
          ox: panRef.current.x,
          oy: panRef.current.y,
          moved: false,
        };
        if (zoomRef.current > 1) setIsPanning(true);
      }
    };

    const onStageTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2 && touchPinchRef.current) {
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        const midX = (t0.clientX + t1.clientX) / 2;
        const midY = (t0.clientY + t1.clientY) / 2;
        const start = touchPinchRef.current;
        const nextZoom = Math.min(5, Math.max(1, start.zoom * (dist / start.dist)));
        const stage = zoomStageRef.current;
        if (stage && start.zoom > 0) {
          const rect = stage.getBoundingClientRect();
          const relX = start.midX - (rect.left + rect.width / 2);
          const relY = start.midY - (rect.top + rect.height / 2);
          const ratio = nextZoom / start.zoom;
          const nx = relX - (relX - start.ox) * ratio + (midX - start.midX);
          const ny = relY - (relY - start.oy) * ratio + (midY - start.midY);
          setZoomAndPan(nextZoom, nx, ny);
        } else {
          setZoomAndPan(nextZoom);
        }
      } else if (e.touches.length === 1 && touchPanRef.current) {
        const t = e.touches[0];
        const dx = t.clientX - touchPanRef.current.x;
        const dy = t.clientY - touchPanRef.current.y;
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          touchPanRef.current.moved = true;
        }
        if (zoomRef.current > 1) {
          setZoomAndPan(zoomRef.current, touchPanRef.current.ox + dx, touchPanRef.current.oy + dy);
        }
      }
    };

    const onStageTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 1 && touchPinchRef.current) {
        // Transição suave de pinça (2 dedos) para arrasto (1 dedo)
        touchPinchRef.current = null;
        const t = e.touches[0];
        touchPanRef.current = {
          x: t.clientX,
          y: t.clientY,
          ox: panRef.current.x,
          oy: panRef.current.y,
          moved: true,
        };
        return;
      }
      if (e.touches.length === 0) {
        const wasTap = touchPanRef.current && !touchPanRef.current.moved && !touchPinchRef.current;
        const tapX = touchPanRef.current?.x;
        const tapY = touchPanRef.current?.y;
        touchPinchRef.current = null;
        touchPanRef.current = null;
        setIsPanning(false);
        if (wasTap) {
          if (zoomRef.current > 1) setZoomAndPan(1, 0, 0);
          else applyZoomAtPoint(2.2, tapX, tapY);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('wheel', onWindowWheel, { passive: false, capture: true });
    window.addEventListener('gesturestart', onGestureBlock, { passive: false });
    window.addEventListener('gesturechange', onGestureBlock, { passive: false });
    window.addEventListener('gestureend', onGestureBlock, { passive: false });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    modalEl?.addEventListener('touchmove', onModalTouchMoveBlock, { passive: false });
    stageEl?.addEventListener('touchstart', onStageTouchStart, { passive: false });
    stageEl?.addEventListener('touchmove', onStageTouchMove, { passive: false });
    stageEl?.addEventListener('touchend', onStageTouchEnd, { passive: false });
    stageEl?.addEventListener('touchcancel', onStageTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWindowWheel, { capture: true } as EventListenerOptions);
      window.removeEventListener('gesturestart', onGestureBlock);
      window.removeEventListener('gesturechange', onGestureBlock);
      window.removeEventListener('gestureend', onGestureBlock);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      modalEl?.removeEventListener('touchmove', onModalTouchMoveBlock);
      stageEl?.removeEventListener('touchstart', onStageTouchStart);
      stageEl?.removeEventListener('touchmove', onStageTouchMove);
      stageEl?.removeEventListener('touchend', onStageTouchEnd);
      stageEl?.removeEventListener('touchcancel', onStageTouchEnd);
      delete document.body.dataset.modalActive;
      html.style.overflow = prevHtmlOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
      (window as any).lenis?.start?.();
    };
  }, [isZoomOpen]);

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
    if ((window as any).scrollToSection) {
      (window as any).scrollToSection(target);
      return;
    }
    const el = document.querySelector(target) as HTMLElement | null;
    if (!el) return;
    const navH = Math.ceil(document.querySelector('nav')?.getBoundingClientRect().height ?? 76);
    const top = target === '#hero' ? 0 : el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="hero-section snap-section relative min-h-[100svh] flex flex-col justify-between pt-14 lg:pt-[20px] pb-2 sm:pb-2.5 overflow-hidden bg-[#050c18]">
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

      {/* Fusão suave com a próxima seção */}
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-b from-transparent to-[#050c18]" aria-hidden="true"></div>

      <div className="hero-layout w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-14 relative z-10 flex-1 flex flex-col items-center justify-center lg:justify-between min-w-0">
        {/* Título alinhado na linha da logo e do menu (=) no desktop + proposta All-in-One resumida */}
        <motion.div
          style={{ opacity }}
          className="hero-copy w-full text-center mb-2.5 lg:mb-2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title font-black font-tech text-white uppercase select-none text-center lg:leading-none"
          >
            <span>{tr("TUDO")}</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">
              {tr("EM UM")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ textWrap: 'balance' }}
            className="mx-auto mt-1.5 sm:mt-2 max-w-[330px] sm:max-w-[1060px] text-[12.5px] sm:text-[14px] lg:text-[clamp(13.5px,0.85vw,15.5px)] text-slate-300/90 sm:text-slate-200/85 font-medium sm:font-semibold leading-[1.45] sm:leading-relaxed px-1 sm:px-2 lg:px-0"
          >
            {/* Mobile: versão enxuta e respirada em 2 blocos limpos sem parede de texto */}
            <span className="sm:hidden block">
              {tr("Vídeos 8K, melhoria 16x, voz/música e legendas.")}
            </span>
            <span className="sm:hidden block mt-1 text-white/95 font-bold">
              {tr("35 ferramentas + IA pra Premiere/After e PC. Sem mensalidades.")}
            </span>

            {/* Tablet / Desktop: legenda completa em 2 linhas */}
            <span className="hidden sm:inline">
              {tr("Baixe vídeos até 8K, melhore a qualidade 16x, separe voz/música e crie legendas.")}{' '}
              <span className="text-white/90 font-extrabold lg:block">
                {tr("35 ferramentas + IA que edita automático pra Premiere/After e faz tarefas no seu PC. Sem mensalidades.")}
              </span>
            </span>
          </motion.p>
        </motion.div>

        {/* Foco principal: Print centralizada do Byte Downloader (Vice Week) */}
        <motion.div
          className="hero-preview min-w-0 relative w-full mx-auto group"
          style={{ maxWidth: isMobile ? '100%' : `min(1180px, 88vw, max(320px, calc((100svh - ${SHOW_DEMO_VIDEO ? 350 : 302}px) * 1.7778)))` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {SHOW_DEMO_VIDEO && (
              <div className="mb-2 flex justify-center pointer-events-none">
                <span className="inline-flex items-center gap-2 text-[11px] font-tech font-bold tracking-[0.18em] uppercase text-gray-300 whitespace-nowrap">
                  {isPlaying ? (
                    <>
                      <span className="block h-3.5" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-byte-cyan fill-byte-cyan shrink-0" />
                      <span>{tr("Assista")}</span>
                    </>
                  )}
                </span>
              </div>
            )}

          {/* Container do Player / Thumbnail flutuante (16:9 exato, sem cortar laterais) */}
          <div className="relative flex items-center justify-center aspect-video w-full">
            {/* Brilho suave ambiente nas cores da print (radial-gradient puro sem blur-3xl custoso na GPU mobile) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 sm:-inset-20 z-10 rounded-full opacity-70 transition-opacity duration-700 group-hover:opacity-90"
              style={{
                background:
                  'radial-gradient(ellipse 62% 54% at 50% 48%, rgba(255, 92, 168, 0.22) 0%, rgba(147, 51, 234, 0.16) 42%, rgba(5, 12, 24, 0) 74%)',
              }}
            />
            <div
              style={{
                width: isExpanded ? (isMobile ? '100%' : 'min(110%, calc(100% + 2rem))') : '100%'
              }}
              className={`relative z-20 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-[#050C16] transition-[width,border-color] duration-700 ease-out group-hover:border-white/25 ${
                isExpanded || !isHeroInView ? '' : 'hero-float-idle'
              }`}
            >
              <div
                onClick={!SHOW_DEMO_VIDEO ? openZoomViewer : undefined}
                role={!SHOW_DEMO_VIDEO ? 'button' : undefined}
                tabIndex={!SHOW_DEMO_VIDEO ? 0 : undefined}
                aria-label={!SHOW_DEMO_VIDEO ? tr('Ampliar imagem da interface do Byte Downloader') : undefined}
                onKeyDown={!SHOW_DEMO_VIDEO ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openZoomViewer(); } } : undefined}
                className={`relative bg-[#050C16] overflow-hidden ${SHOW_DEMO_VIDEO ? 'cursor-pointer' : 'cursor-zoom-in'} aspect-video w-full`}
              >
                {/* Fundo com última aba carregada para troca instantânea sem piscar preto */}
                {!SHOW_DEMO_VIDEO && lastHeroLoadedUrl && lastHeroLoadedUrl !== mainPreview && (
                  <img
                    src={lastHeroLoadedUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain bg-[#050C16] pointer-events-none select-none"
                  />
                )}

                {/* Print completo da interface em 16:9 sem cortes */}
                <img
                  src={mainPreview}
                  alt={tr("Interface do Byte Downloader")}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  onLoad={() => setLastHeroLoadedUrl(mainPreview)}
                  className={`absolute inset-0 w-full h-full object-contain bg-[#050C16] transition-opacity duration-200 ${
                    SHOW_DEMO_VIDEO && isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1920x1080/050C16/00F0FF?text=Screenshot+Nao+Encontrada";
                  }}
                />

                {/* Hotspots reais invisíveis em cima dos botões da própria imagem (Baixar / Byte IA / Estúdio + sub-abas + modos internos) */}
                {!SHOW_DEMO_VIDEO && renderAppHotspots(false)}

                {!SHOW_DEMO_VIDEO && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openZoomViewer();
                    }}
                    aria-label={tr('Ampliar imagem da interface do Byte Downloader')}
                    className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-20 inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full bg-[#050C16]/85 hover:bg-byte-cyan hover:text-[#050C16] border border-white/20 hover:border-byte-cyan text-white text-xs sm:text-[13px] font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 shrink-0" strokeWidth={2.1} />
                    <span>{tr("Dar zoom")}</span>
                  </button>
                )}

                {/* Vídeo do Byte Downloader com controls para seekbar e tela cheia */}
                {SHOW_DEMO_VIDEO && (
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
                )}

                {SHOW_DEMO_VIDEO && !hasStarted && (
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
                {SHOW_DEMO_VIDEO && isPlaying && isMuted && (
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
                    <span>{tr("Ativar")}</span>
                  </button>
                )}

                {/* Indicador de som ativo */}
                {SHOW_DEMO_VIDEO && isPlaying && !isMuted && (
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
            </div>
          </div>

          {/* Capítulos: risquinhos clean com tooltip flutuante e tempo no lado esquerdo */}
          {SHOW_DEMO_VIDEO && (
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
              </div>
            )}
          </div>
          )}
          </motion.div>
        </motion.div>

        {/* Barra inferior organizada em 3 colunas alinhada pixel a pixel com as bordas da print principal */}
        <div
          style={{
            maxWidth: isMobile
              ? '100%'
              : `min(1180px, 88vw, max(320px, calc((100svh - ${SHOW_DEMO_VIDEO ? 350 : 302}px) * 1.7778)))`,
          }}
          className="w-full mx-auto mt-2.5 sm:mt-3 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 md:gap-3 2xl:gap-5"
        >
          {/* Esquerda: Windows primeiro (maior) + Usuários */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 2xl:gap-6 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 2xl:gap-2.5 text-white font-tech font-extrabold text-[13px] 2xl:text-base tracking-[0.1em] 2xl:tracking-[0.14em] uppercase whitespace-nowrap">
              <img
                src="/bd/windows-11.svg"
                alt="Windows 11"
                className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0 object-contain"
                loading="eager"
              />
              <span>{t.hero.badgeWin}</span>
            </div>
            <div className="h-7 2xl:h-8 w-px bg-white/15 shrink-0"></div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-byte-cyan font-black text-xl 2xl:text-[28px] leading-none">336+</span>
              <span className="text-[10px] 2xl:text-[11px] text-gray-300 font-tech uppercase tracking-[0.1em] font-bold whitespace-nowrap mt-1">{t.hero.usersCount}</span>
            </div>
          </div>

          {/* Centro: Botão principal de compra (limpo, proporcional ao texto) */}
          <div className="flex flex-col items-center order-1 md:order-2">
            <button
              type="button"
              onClick={() => scrollTo('#pricing')}
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
              className="group relative overflow-hidden inline-flex items-center justify-center px-7 py-2.5 2xl:px-8 2xl:py-3 rounded-full bg-[#FF0070] hover:bg-[#e60064] text-white font-black text-sm 2xl:text-base tracking-[0.08em] uppercase transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border border-white/20 whitespace-nowrap"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-btn-reflex pointer-events-none" />
                <div className="btn-hover-sweep" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
              <span className="relative z-10 font-black">
                {tr("COMPRAR")}
              </span>
            </button>
          </div>

          {/* Direita: Estrelas 5/5 + Garantia 7 dias */}
          <div className="flex items-center justify-center md:justify-end gap-3.5 2xl:gap-6 order-3">
            <button
              type="button"
              onClick={() => scrollTo('#feedbacks')}
              aria-label={tr("Ver depoimentos reais, nota 5 de 5")}
              className="group/fb flex flex-col items-center md:items-end cursor-pointer"
            >
              <span className="flex items-center gap-0.5 2xl:gap-1 leading-none" aria-hidden="true">
                <span className="mr-1 text-white font-tech font-black text-lg 2xl:text-2xl tracking-wider">5/5</span>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-3.5 h-3.5 2xl:w-4.5 2xl:h-4.5 text-yellow-400 fill-yellow-400" />
                ))}
              </span>
              <span className="text-[10px] 2xl:text-[11px] text-gray-300 group-hover/fb:text-byte-cyan underline underline-offset-4 decoration-white/30 group-hover/fb:decoration-byte-cyan font-tech uppercase tracking-[0.1em] font-bold mt-1 transition-colors">{tr("Feedback")}</span>
            </button>
            <div className="h-7 2xl:h-8 w-px bg-white/15 shrink-0"></div>
            <button
              type="button"
              onClick={() => scrollTo('#pricing')}
              aria-label={tr("Ver garantia blindada de 7 dias")}
              className="group/gt flex flex-col items-center md:items-end cursor-pointer"
            >
              <span className="text-white font-black text-lg 2xl:text-2xl leading-none flex items-center gap-1 2xl:gap-1.5 whitespace-nowrap">
                {tr("7 dias")} <ShieldCheck className="w-4 h-4 2xl:w-5.5 2xl:h-5.5 text-green-400" />
              </span>
              <span className="text-[10px] 2xl:text-[11px] text-gray-300 group-hover/gt:text-byte-cyan underline underline-offset-4 decoration-white/30 group-hover/gt:decoration-byte-cyan font-tech uppercase tracking-[0.1em] font-bold mt-1 transition-colors">{tr("Garantia")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Indicador anti-dúvida de rolagem (verbo direto + animação suave a cada ~1s 100% GPU) */}
      <motion.button
        type="button"
        onClick={() => scrollTo('#features')}
        style={{ opacity: arrowOpacity }}
        aria-label={tr('VER MAIS')}
        data-scroll-arrow="true"
        className="group relative z-20 mx-auto mt-2 shrink-0 flex flex-col items-center justify-center cursor-pointer text-white/85 hover:text-byte-cyan transition-colors"
      >
        <span className="text-[9.5px] sm:text-[10.5px] font-tech font-bold uppercase tracking-[0.18em] text-white/85 group-hover:text-byte-cyan transition-colors leading-none">
          {tr('VER MAIS')}
        </span>
        <span className="relative flex items-center justify-center w-8 h-5">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute w-8 h-8 rounded-full ${isHeroInView ? 'hero-chevron-glow' : 'opacity-0'}`}
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(0, 240, 255, 0.14) 38%, transparent 68%)',
            }}
          />
          <span className={`relative block ${isHeroInView ? 'hero-chevron-bounce' : ''}`}>
            <ChevronDown className="w-5 h-5" strokeWidth={2.2} />
          </span>
        </span>
      </motion.button>

      {/* Modal tela cheia adaptável a qualquer formato + zoom (2 dedos, mouse, botões) e bloqueio total da página */}
      {isZoomOpen && (
        <div
          ref={zoomModalRef}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={tr('Visualizador com zoom da interface do Byte Downloader')}
          className="fixed inset-0 z-[140] w-[100vw] h-[100dvh] bg-[#030712] overflow-hidden select-none touch-none overscroll-none"
        >
          {/* Barra no canto superior direito (alvos 44-48px WCAG AAA sem cobrir as abas clicáveis do centro) */}
          <div className="pointer-events-none absolute top-3 sm:top-4 inset-x-3 sm:inset-x-5 z-30 flex justify-end">
            <div className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#060E1F] border-2 border-white/25">
              <button
                type="button"
                onClick={() => applyZoomAtPoint(zoomRef.current - 0.5)}
                disabled={zoomLevel <= 1}
                aria-label={tr('Diminuir zoom')}
                title={tr('Diminuir zoom')}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Minus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.6} />
              </button>

              <span className="min-w-[58px] sm:min-w-[68px] text-center text-sm sm:text-base font-tech font-extrabold text-white tracking-wide select-none">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                type="button"
                onClick={() => applyZoomAtPoint(zoomRef.current + 0.5)}
                disabled={zoomLevel >= 5}
                aria-label={tr('Aumentar zoom')}
                title={tr('Aumentar zoom')}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-byte-cyan/20 hover:bg-byte-cyan border border-byte-cyan/60 flex items-center justify-center text-byte-cyan hover:text-[#050C16] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.6} />
              </button>

              {zoomLevel > 1 && (
                <>
                  <span className="w-px h-7 bg-white/15 mx-0.5" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => setZoomAndPan(1, 0, 0)}
                    aria-label={tr('Resetar zoom')}
                    title={tr('Resetar zoom')}
                    className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" strokeWidth={2.3} />
                    <span className="hidden sm:inline">{tr('Resetar')}</span>
                  </button>
                </>
              )}

              <span className="w-px h-7 bg-white/15 mx-0.5" aria-hidden="true" />

              <button
                type="button"
                onClick={closeZoomViewer}
                aria-label={tr('Fechar visualização')}
                title={tr('Fechar')}
                className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-full bg-[#FF0070]/20 hover:bg-[#FF0070] border border-[#FF0070]/60 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                <span className="hidden sm:inline">{tr('Fechar')}</span>
              </button>
            </div>
          </div>

          {/* Palco 100% tela cheia: ocupa o máximo de qualquer proporção (PC, ultrawide, tablet, celular) */}
          <div
            ref={zoomStageRef}
            onPointerDown={(e) => {
              if (e.pointerType === 'touch') return;
              if ((e.target as HTMLElement | null)?.closest('[data-hero-hotspot]')) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              panStartRef.current = {
                x: e.clientX,
                y: e.clientY,
                ox: panRef.current.x,
                oy: panRef.current.y,
                moved: false,
              };
              if (zoomRef.current > 1) setIsPanning(true);
            }}
            onPointerMove={(e) => {
              if (e.pointerType === 'touch') return;
              const start = panStartRef.current;
              if (!start) return;
              const dx = e.clientX - start.x;
              const dy = e.clientY - start.y;
              if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                start.moved = true;
              }
              if (zoomRef.current > 1) {
                setZoomAndPan(zoomRef.current, start.ox + dx, start.oy + dy);
              }
            }}
            onPointerUp={(e) => {
              if (e.pointerType === 'touch') return;
              const start = panStartRef.current;
              panStartRef.current = null;
              setIsPanning(false);
              try {
                e.currentTarget.releasePointerCapture(e.pointerId);
              } catch {
                // ignore
              }
              if (start && !start.moved) {
                if (zoomRef.current > 1) setZoomAndPan(1, 0, 0);
                else applyZoomAtPoint(2.2, e.clientX, e.clientY);
              }
            }}
            onPointerCancel={(e) => {
              if (e.pointerType === 'touch') return;
              panStartRef.current = null;
              setIsPanning(false);
            }}
            className={`relative w-full h-full overflow-hidden touch-none flex items-center justify-center ${
              zoomLevel > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
            }`}
          >
            <div
              style={{
                width: 'min(100vw, calc(100dvh * 16 / 9))',
                height: 'min(100dvh, calc(100vw * 9 / 16))',
                transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`,
                transition: isPanning ? 'none' : 'transform 140ms ease-out',
                willChange: 'transform',
              }}
              className="relative shrink-0 select-none"
            >
              {lastHeroLoadedUrl && lastHeroLoadedUrl !== mainPreview && (
                <img
                  src={lastHeroLoadedUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                />
              )}
              <img
                ref={zoomImgRef}
                src={mainPreview}
                alt={tr("Interface do Byte Downloader")}
                draggable={false}
                onLoad={() => {
                  setLastHeroLoadedUrl(mainPreview);
                  setZoomAndPan(zoomRef.current, panRef.current.x, panRef.current.y);
                }}
                className="relative w-full h-full object-contain pointer-events-none select-none"
              />
              {!SHOW_DEMO_VIDEO && renderAppHotspots(true)}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-3 sm:bottom-4 inset-x-3 z-30 flex justify-center">
            <p className="px-3.5 py-1.5 rounded-full bg-[#050C16]/85 border border-white/10 text-[11px] sm:text-xs text-gray-200 text-center">
              {zoomLevel > 1
                ? tr('Arraste para os lados para ler os detalhes · Clique para voltar ao normal')
                : tr('Clique na imagem, use + ou faça pinça para dar zoom e arrastar')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
