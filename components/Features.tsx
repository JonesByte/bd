import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Maximize2,
  MoveHorizontal,
  Palette,
  Repeat2,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const BENTO_V = '20261125-v509-real4x';

interface PreviewTab {
  id: string;
  accent: string;
  label: string;
  desc: string;
  img: string;
}

type LightboxState =
  | { type: 'image'; title: string; desc: string; img: string; badge: string }
  | { type: 'tabs'; group: 'plugin' | 'studio'; badge: string; index: number }
  | { type: 'upscale'; badge: string; title: string; desc: string }
  | null;

const PLUGIN_MODES: PreviewTab[] = [
  {
    id: 'autocut',
    accent: '#00F0FF',
    label: 'Corte Automático',
    desc: 'Remove silêncios e pausas em segundos direto na timeline, mantendo a fala natural.',
    img: `/bd/screenshots/v508/plugin/byte/01_autocut.webp?v=${BENTO_V}`,
  },
  {
    id: 'transicoes',
    accent: '#BD93F9',
    label: '101+ Transições',
    desc: 'Animações e transições de texto prontas em 1 clique, já alinhadas no seu vídeo.',
    img: `/bd/screenshots/v508/plugin/dracula/04_transicoes.webp?v=${BENTO_V}`,
  },
  {
    id: 'legendas',
    accent: '#00FF66',
    label: 'Legendas com IA',
    desc: 'Cria legendas automáticas precisas e traduz qualquer idioma direto na timeline.',
    img: `/bd/screenshots/v508/plugin/hacker/06_transcricao.webp?v=${BENTO_V}`,
  },
  {
    id: 'sueive',
    accent: '#FF5CA8',
    label: 'Curvas & Busca Rápida',
    desc: 'Movimentos suaves, busca instantânea de efeitos pelo teclado e proxies em 1 clique.',
    img: `/bd/screenshots/v508/plugin/vice-week/03_sueive.webp?v=${BENTO_V}`,
  },
  {
    id: 'mixer',
    accent: '#FF2E4C',
    label: 'Áudio & Importação',
    desc: 'Baixe da internet direto para a timeline e ajuste o som sem sair do editor.',
    img: `/bd/screenshots/v508/plugin/red-laki/08_mixer.webp?v=${BENTO_V}`,
  },
];

const STUDIO_MODES: PreviewTab[] = [
  {
    id: 'chat',
    accent: '#BD93F9',
    label: 'Assistente de IA',
    desc: 'Fala, e a IA edita, corta, ajusta e conserta problemas direto no seu editor — de verdade.',
    img: `/bd/screenshots/v508/programa/dracula/04_chat.webp?v=${BENTO_V}`,
  },
  {
    id: 'texto',
    accent: '#E2E8F0',
    label: 'Roteiros e Notas',
    desc: 'Organize roteiros, ideias, links e transcrições sem abrir outro aplicativo.',
    img: `/bd/screenshots/v508/programa/black/08_texto.webp?v=${BENTO_V}`,
  },
  {
    id: 'stems',
    accent: '#00FF66',
    label: 'Separar Voz e Música',
    desc: 'Isole voz, trilha e efeitos de qualquer vídeo ou áudio em alta qualidade.',
    img: `/bd/screenshots/v508/programa/hacker/07_separar_audio.webp?v=${BENTO_V}`,
  },
  {
    id: 'mixer',
    accent: '#FF2E4C',
    label: 'Mixer de Áudio',
    desc: 'Equalizador, compressor e volume equilibrado prontos para publicar.',
    img: `/bd/screenshots/v508/programa/red-laki/13_mixer.webp?v=${BENTO_V}`,
  },
];

interface UpscaleCompareSliderProps {
  variant?: 'portrait' | 'fullscreen';
  onOpenFullscreen?: () => void;
}

const UpscaleCompareSlider: React.FC<UpscaleCompareSliderProps> = ({
  variant = 'portrait',
  onOpenFullscreen,
}) => {
  const { tr } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(92, Math.max(8, next)));
  };

  const isPortrait = variant === 'portrait';
  const imgFocusClass = isPortrait
    ? 'object-cover object-[21%_15%]'
    : 'object-cover object-center';

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={tr('Comparar antes e depois da melhoria de qualidade para 4K com IA')}
      aria-valuemin={8}
      aria-valuemax={92}
      aria-valuenow={Math.round(percent)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPercent((p) => Math.max(8, p - 4));
        if (e.key === 'ArrowRight') setPercent((p) => Math.min(92, p + 4));
      }}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        if (dragging) {
          setDragging(false);
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      }}
      onPointerCancel={() => setDragging(false)}
      className={`relative w-full ${
        isPortrait
          ? 'aspect-[5/6] max-h-[680px] rounded-lg'
          : 'aspect-video max-h-[78vh] rounded-lg'
      } overflow-hidden ring-1 ring-white/10 bg-[#040914] select-none touch-none cursor-ew-resize group shadow-[0_40px_120px_rgba(255,92,168,0.22)]`}
    >
      {/* Depois — 4K IA + HDR + Nitidez Pro 3x */}
      <img
        src={`/bd/screenshots/v508/bento/upscale_after.webp?v=${BENTO_V}`}
        alt={tr('Depois da melhoria de qualidade 4K com IA')}
        draggable={false}
        loading="lazy"
        className={`absolute inset-0 w-full h-full ${imgFocusClass}`}
      />

      {/* Antes — 300p Original */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <img
          src={`/bd/screenshots/v508/bento/upscale_before.webp?v=${BENTO_V}`}
          alt={tr('Imagem original em 480p antes da melhoria com IA')}
          draggable={false}
          loading="lazy"
          className={`absolute inset-0 w-full h-full ${imgFocusClass}`}
        />
      </div>

      {/* Labels minimalistas */}
      <span className="pointer-events-none absolute top-4 left-4 px-2.5 py-1 rounded-sm bg-[#050C16]/75 backdrop-blur-md text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-gray-200">
        {tr('Original')}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 px-2.5 py-1 rounded-sm bg-[#050C16]/75 backdrop-blur-md text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-byte-cyan">
        {tr('4K IA + HDR')}
      </span>

      {/* Divisória central */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-byte-cyan/90 shadow-[0_0_18px_rgba(0,240,255,0.75)]"
        style={{ left: `${percent}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#050C16]/90 border border-byte-cyan text-byte-cyan flex items-center justify-center shadow-[0_0_24px_rgba(0,240,255,0.45)] transition-transform duration-150 group-hover:scale-110">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>

      {/* Botão discreto de Tela Cheia */}
      {isPortrait && onOpenFullscreen && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenFullscreen();
          }}
          className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-[#050C16]/75 hover:bg-byte-cyan hover:text-[#050C16] border border-white/15 hover:border-byte-cyan text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer"
          aria-label={tr('Ver comparação 4K em tela cheia')}
          title={tr('Tela cheia')}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const SectionAccent: React.FC<{ accent: string; minimal?: boolean }> = ({ accent, minimal }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 h-[200px]"
    animate={{ backgroundColor: accent }}
    transition={{ duration: 0.6 }}
    style={{
      opacity: minimal ? 0.045 : 0.08,
      maskImage: 'linear-gradient(to bottom, #000, transparent)',
      WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
    }}
  />
);

export const Features: React.FC = () => {
  const { tr } = useLanguage();
  const panoramaRef = useRef<HTMLDivElement>(null);
  const [activePluginIdx, setActivePluginIdx] = useState(0);
  const [activeStudioIdx, setActiveStudioIdx] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const activePlugin = PLUGIN_MODES[activePluginIdx];
  const activeStudio = STUDIO_MODES[activeStudioIdx];

  const { scrollYProgress: panoramaProgress } = useScroll({
    target: panoramaRef,
    offset: ['start end', 'end start'],
  });
  const panoramaScale = useTransform(panoramaProgress, [0, 0.5, 1], [1.05, 1.0, 1.02]);

  useEffect(() => {
    if (!lightbox) return;
    document.body.dataset.modalActive = 'true';
    document.body.classList.add('overflow-hidden');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (lightbox.type === 'tabs' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const list = lightbox.group === 'plugin' ? PLUGIN_MODES : STUDIO_MODES;
        const delta = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = (lightbox.index + delta + list.length) % list.length;
        setLightbox({ ...lightbox, index: nextIdx });
        if (lightbox.group === 'plugin') setActivePluginIdx(nextIdx);
        else setActiveStudioIdx(nextIdx);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.modalActive;
      document.body.classList.remove('overflow-hidden');
    };
  }, [lightbox]);

  const navigateLightboxTab = (delta: number) => {
    if (!lightbox || lightbox.type !== 'tabs') return;
    const list = lightbox.group === 'plugin' ? PLUGIN_MODES : STUDIO_MODES;
    const nextIdx = (lightbox.index + delta + list.length) % list.length;
    setLightbox({ ...lightbox, index: nextIdx });
    if (lightbox.group === 'plugin') setActivePluginIdx(nextIdx);
    else setActiveStudioIdx(nextIdx);
  };

  return (
    <section
      id="features"
      className="features-section bg-[#050C16] relative overflow-x-clip"
    >
      {/* Textura cinematográfica ultra-sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"
        aria-hidden="true"
      />

      {/* =========================================================
          ABERTURA EDITORIAL (Minimalista, escala Rockstar GTA VI)
         ========================================================= */}
      <div className="relative pt-24 pb-16 md:pt-36 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-20 relative z-10"
        >
          <span className="block text-[14px] font-tech font-bold uppercase tracking-[0.28em] text-byte-cyan mb-4">
            {tr('Tudo em um só programa')}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <h2 className="lg:col-span-7 text-4xl sm:text-6xl lg:text-[74px] font-tech font-black text-white uppercase tracking-tight leading-[0.95]">
              {tr('DO DOWNLOAD À')}{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-[#8b5cf6]">
                {tr('EDIÇÃO FINAL')}
              </span>
            </h2>

            <p className="lg:col-span-5 text-gray-400 text-lg sm:text-xl leading-relaxed lg:pb-2 max-w-lg lg:ml-auto">
              {tr('Baixe em até 8K, transforme imagens para 4K com IA e edite mais rápido no Premiere e After Effects.')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          01 — NO SEU EDITOR (4 cols minimalistas + 8 cols tela gigante)
         ========================================================= */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#050a18' }}>
        <SectionAccent accent={activePlugin.accent} minimal />
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Texto limpo e curto à esquerda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
            >
              <div>
                <span className="block text-[13px] font-tech font-bold uppercase tracking-[0.24em] mb-3 transition-colors duration-500" style={{ color: activePlugin.accent }}>
                  {tr('01 · Premiere & After Effects')}
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-[56px] font-tech font-black text-white uppercase tracking-tight leading-[0.98] mb-4">
                  {tr('NO SEU EDITOR')}
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed min-h-[48px]">
                  {tr(activePlugin.desc)}
                </p>
              </div>

              <div className="space-y-1 pt-2">
                {PLUGIN_MODES.map((m, idx) => {
                  const selected = idx === activePluginIdx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActivePluginIdx(idx)}
                      style={selected ? { borderColor: m.accent } : undefined}
                      className={`w-full py-3 pl-4 text-left text-base sm:text-[18px] font-semibold border-l-2 transition-all duration-200 cursor-pointer ${
                        selected
                          ? 'text-white'
                          : 'border-white/10 text-gray-500 hover:text-gray-200 hover:border-white/30'
                      }`}
                    >
                      {tr(m.label)}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Mídia gigante (8 cols) sem textos sobrepostos */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-3"
            >
              <div
                onClick={() =>
                  setLightbox({
                    type: 'tabs',
                    group: 'plugin',
                    badge: tr('01 · Premiere & After Effects'),
                    index: activePluginIdx,
                  })
                }
                className="group/media relative w-full aspect-video rounded-lg overflow-hidden ring-1 ring-white/10 bg-[#040914] cursor-zoom-in shadow-[0_35px_100px_rgba(0,0,0,0.65)]"
                style={{ boxShadow: `0 40px 120px ${activePlugin.accent}3a, 0 0 0 1px ${activePlugin.accent}22`, transition: 'box-shadow .6s ease' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePlugin.id}
                    initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                    transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                    src={activePlugin.img}
                    alt={tr(activePlugin.label)}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                </AnimatePresence>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox({
                      type: 'tabs',
                      group: 'plugin',
                      badge: tr('01 · Premiere & After Effects'),
                      index: activePluginIdx,
                    });
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#050C16]/75 hover:bg-byte-cyan hover:text-[#050C16] border border-white/15 hover:border-byte-cyan text-white flex items-center justify-center backdrop-blur-md opacity-80 group-hover/media:opacity-100 transition-all duration-200 cursor-pointer"
                  aria-label={tr('Ver imagem em tela cheia')}
                  title={tr('Tela cheia')}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {PLUGIN_MODES.map((m, idx) => {
                  const selected = idx === activePluginIdx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActivePluginIdx(idx)}
                      style={selected ? ({ ['--tw-ring-color' as string]: m.accent } as React.CSSProperties) : undefined}
                      className={`relative aspect-video rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                        selected
                          ? 'ring-2 opacity-100'
                          : 'ring-1 ring-white/10 opacity-40 hover:opacity-80'
                      }`}
                      aria-label={tr(m.label)}
                    >
                      <img src={m.img} alt={tr(m.label)} loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          02 — 4K POR IA (Retrato Vertical Gigante + Copy Ultra-Limpa)
         ========================================================= */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0a0716' }}>
        <SectionAccent accent="#FF5CA8" />

        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <UpscaleCompareSlider
                variant="portrait"
                onOpenFullscreen={() =>
                  setLightbox({
                    type: 'upscale',
                    badge: tr('02 · Qualidade 4K por IA'),
                    title: tr('4K POR IA'),
                    desc: tr('Arraste para comparar a imagem original (480p) com o resultado em 4K + HDR + Nitidez Pro 1.2x.'),
                  })
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="block text-[13px] font-tech font-bold uppercase tracking-[0.24em] text-[#ff5ea8] mb-3">
                  {tr('02 · Qualidade 4K por IA')}
                </span>
                <h3 className="text-4xl sm:text-6xl lg:text-[62px] font-tech font-black text-white uppercase tracking-tight leading-[0.96] mb-5">
                  {tr('4K POR IA')}
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-md">
                  {tr('Transforme fotos e vídeos borrados em 4K nítido direto no seu PC — sem limites e sem pagar créditos extras.')}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <span className="block text-3xl sm:text-4xl font-tech font-black text-white">4x</span>
                  <span className="text-xs text-gray-500">{tr('Resolução')}</span>
                </div>
                <div>
                  <span className="block text-3xl sm:text-4xl font-tech font-black text-byte-cyan">100%</span>
                  <span className="text-xs text-gray-500">{tr('Local no PC')}</span>
                </div>
                <div>
                  <span className="block text-3xl sm:text-4xl font-tech font-black text-[#ff5ea8]">0</span>
                  <span className="text-xs text-gray-500">{tr('Créditos')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          03 — DOWNLOADS 8K (Panorama Cinema Full-Width)
         ========================================================= */}
      <div ref={panoramaRef} className="relative py-20 md:py-28 overflow-hidden bg-[#050C16]">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8"
          >
            <div className="lg:col-span-6">
              <span className="block text-[13px] font-tech font-bold uppercase tracking-[0.24em] text-byte-cyan mb-3">
                {tr('03 · Downloads sem limite')}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-[48px] font-tech font-black text-white uppercase tracking-tight leading-[0.96]">
                {tr('DOWNLOADS 8K')}
              </h3>
            </div>

            <p className="lg:col-span-6 text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl lg:ml-auto lg:pb-1">
              {tr('Vários links em fila, recorte de lives ao vivo, fotos em lote e navegador integrado para sites com login.')}
            </p>
          </motion.div>

          <div
            onClick={() =>
              setLightbox({
                type: 'image',
                badge: tr('03 · Downloads sem limite'),
                title: tr('DOWNLOADS 8K'),
                desc: tr('Vários links em fila, recorte de lives ao vivo, fotos em lote e navegador integrado para sites com login.'),
                img: `/bd/screenshots/v508/programa/byte/01_videos.webp?v=${BENTO_V}`,
              })
            }
            className="group/media relative w-full aspect-video rounded-lg overflow-hidden ring-1 ring-white/15 bg-[#040914] cursor-zoom-in shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
          >
            <motion.img
              style={{ scale: panoramaScale }}
              src={`/bd/screenshots/v508/programa/byte/01_videos.webp?v=${BENTO_V}`}
              alt={tr('Download de vídeos em até 8K no Byte Downloader')}
              loading="lazy"
              className="w-full h-full object-cover object-top block will-change-transform"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox({
                  type: 'image',
                  badge: tr('03 · Downloads sem limite'),
                  title: tr('DOWNLOADS 8K'),
                  desc: tr('Vários links em fila, recorte de lives ao vivo, fotos em lote e navegador integrado para sites com login.'),
                  img: `/bd/screenshots/v508/programa/byte/01_videos.webp?v=${BENTO_V}`,
                });
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#050C16]/75 hover:bg-byte-cyan hover:text-[#050C16] border border-white/15 hover:border-byte-cyan text-white flex items-center justify-center backdrop-blur-md opacity-80 group-hover/media:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label={tr('Ver imagem em tela cheia')}
              title={tr('Tela cheia')}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          04 — ESTÚDIO & IA (8 cols tela gigante + 4 cols minimalistas)
         ========================================================= */}
      <div className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#080a1e' }}>
        <SectionAccent accent={activeStudio.accent} />
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Mídia gigante (8 cols) sem textos sobrepostos */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 order-2 lg:order-1 space-y-3"
            >
              <div
                onClick={() =>
                  setLightbox({
                    type: 'tabs',
                    group: 'studio',
                    badge: tr('04 · Estúdio integrado'),
                    index: activeStudioIdx,
                  })
                }
                className="group/media relative w-full aspect-video rounded-lg overflow-hidden ring-1 ring-white/10 bg-[#040914] cursor-zoom-in shadow-[0_35px_100px_rgba(0,0,0,0.65)]"
                style={{ boxShadow: `0 40px 120px ${activeStudio.accent}3a, 0 0 0 1px ${activeStudio.accent}22`, transition: 'box-shadow .6s ease' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStudio.id}
                    initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                    transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                    src={activeStudio.img}
                    alt={tr(activeStudio.label)}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                </AnimatePresence>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox({
                      type: 'tabs',
                      group: 'studio',
                      badge: tr('04 · Estúdio integrado'),
                      index: activeStudioIdx,
                    });
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#050C16]/75 hover:bg-byte-cyan hover:text-[#050C16] border border-white/15 hover:border-byte-cyan text-white flex items-center justify-center backdrop-blur-md opacity-80 group-hover/media:opacity-100 transition-all duration-200 cursor-pointer"
                  aria-label={tr('Ver imagem em tela cheia')}
                  title={tr('Tela cheia')}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {STUDIO_MODES.map((m, idx) => {
                  const selected = idx === activeStudioIdx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveStudioIdx(idx)}
                      style={selected ? ({ ['--tw-ring-color' as string]: m.accent } as React.CSSProperties) : undefined}
                      className={`relative aspect-video rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                        selected
                          ? 'ring-2 opacity-100'
                          : 'ring-1 ring-white/10 opacity-40 hover:opacity-80'
                      }`}
                      aria-label={tr(m.label)}
                    >
                      <img src={m.img} alt={tr(m.label)} loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Texto limpo e curto à direita */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-28 space-y-6"
            >
              <div>
                <span className="block text-[13px] font-tech font-bold uppercase tracking-[0.24em] mb-3 transition-colors duration-500" style={{ color: activeStudio.accent }}>
                  {tr('04 · Estúdio integrado')}
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-[56px] font-tech font-black text-white uppercase tracking-tight leading-[0.98] mb-4">
                  {tr('ESTÚDIO & IA')}
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed min-h-[48px]">
                  {tr(activeStudio.desc)}
                </p>
              </div>

              <div className="space-y-1 pt-2">
                {STUDIO_MODES.map((m, idx) => {
                  const selected = idx === activeStudioIdx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveStudioIdx(idx)}
                      style={selected ? { borderColor: m.accent } : undefined}
                      className={`w-full py-3 pl-4 text-left text-base sm:text-[18px] font-semibold border-l-2 transition-all duration-200 cursor-pointer ${
                        selected
                          ? 'text-white'
                          : 'border-white/10 text-gray-500 hover:text-gray-200 hover:border-white/30'
                      }`}
                    >
                      {tr(m.label)}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          EXTRAS — 3 Colunas Minimalistas
         ========================================================= */}
      <div className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: '#050C16' }}>
        <SectionAccent accent="#6200EA" />
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-16 xl:pl-12 xl:pr-20 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="border-t border-white/15 pt-5 space-y-2">
            <Repeat2 className="w-4 h-4 text-byte-cyan" />
            <h4 className="text-base font-tech font-bold uppercase tracking-wider text-white">
              {tr('Conversor Universal')}
            </h4>
            <p className="text-base text-gray-400 leading-relaxed">
              {tr('Vídeo, áudio, imagem e 3D convertidos em segundos.')}
            </p>
          </div>

          <div className="border-t border-white/15 pt-5 space-y-2">
            <Palette className="w-4 h-4 text-byte-cyan" />
            <h4 className="text-base font-tech font-bold uppercase tracking-wider text-white">
              {tr('Visual do seu jeito')}
            </h4>
            <p className="text-base text-gray-400 leading-relaxed">
              {tr('6 temas exclusivos, modo nativo do Premiere e PT, EN e ES.')}
            </p>
          </div>

          <div className="border-t border-white/15 pt-5 space-y-2">
            <Cpu className="w-4 h-4 text-byte-cyan" />
            <h4 className="text-base font-tech font-bold uppercase tracking-wider text-white">
              {tr('Leve no seu PC')}
            </h4>
            <p className="text-base text-gray-400 leading-relaxed">
              {tr('Baixo uso de memória e limpeza de cache em 1 clique.')}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          LIGHTBOX CINEMATOGRÁFICO EM TELA CHEIA
         ========================================================= */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-[#030712]/94 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[92vw] xl:max-w-[1440px] flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[13px] font-tech font-bold uppercase tracking-[0.22em] text-byte-cyan block mb-1">
                    {lightbox.badge}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-tech font-black uppercase tracking-wide text-white">
                    {lightbox.type === 'tabs'
                      ? tr(
                          (lightbox.group === 'plugin' ? PLUGIN_MODES : STUDIO_MODES)[lightbox.index]
                            .label
                        )
                      : lightbox.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  aria-label={tr('Fechar tela cheia')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {lightbox.type === 'upscale' && <UpscaleCompareSlider variant="fullscreen" />}

              {lightbox.type === 'image' && (
                <div className="relative w-full rounded-lg overflow-hidden ring-1 ring-white/15 bg-[#040914] shadow-2xl">
                  <img
                    src={lightbox.img}
                    alt={lightbox.title}
                    className="w-full max-h-[78vh] object-contain mx-auto block"
                  />
                </div>
              )}

              {lightbox.type === 'tabs' && (() => {
                const list = lightbox.group === 'plugin' ? PLUGIN_MODES : STUDIO_MODES;
                const current = list[lightbox.index];
                return (
                  <div className="space-y-3">
                    <div className="relative w-full rounded-lg overflow-hidden ring-1 ring-white/15 bg-[#040914] shadow-2xl">
                      <img
                        src={current.img}
                        alt={tr(current.label)}
                        className="w-full max-h-[74vh] object-contain mx-auto block"
                      />
                      <button
                        type="button"
                        onClick={() => navigateLightboxTab(-1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#050C16]/85 hover:bg-byte-cyan hover:text-[#050C16] border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                        aria-label={tr('Anterior')}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateLightboxTab(1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#050C16]/85 hover:bg-byte-cyan hover:text-[#050C16] border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                        aria-label={tr('Próximo')}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {list.map((m, idx) => {
                        const selected = idx === lightbox.index;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setLightbox({ ...lightbox, index: idx });
                              if (lightbox.group === 'plugin') setActivePluginIdx(idx);
                              else setActiveStudioIdx(idx);
                            }}
                            className={`px-3 py-1.5 rounded-sm text-xs font-tech font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                              selected
                                ? 'bg-byte-cyan/15 border-byte-cyan/50 text-byte-cyan'
                                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {tr(m.label)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                {lightbox.type === 'tabs'
                  ? tr(
                      (lightbox.group === 'plugin' ? PLUGIN_MODES : STUDIO_MODES)[lightbox.index]
                        .desc
                    )
                  : lightbox.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
