import { useLanguage } from '../i18n/LanguageContext';
import React, { useEffect, useRef, useState } from 'react';
import { FEATURES } from '../constants';
import { Bot, Box, Captions, CheckCircle2, ChevronLeft, ChevronRight, Cpu, Download, Globe, Image as ImageIcon, Layers, ListChecks, RefreshCw, Scissors, Shield, SlidersHorizontal, Sparkles, Repeat2, Video, Zap, Puzzle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  download: Download,
  video: Video,
  zap: Zap,
  image: ImageIcon,
  layers: Layers,
  playlist: ListChecks,
  scissors: Scissors,
  sparkles: Sparkles,
  bot: Bot,
  convert: Repeat2,
  box: Box,
  captions: Captions,
  sliders: SlidersHorizontal,
  queue: Cpu,
  refresh: RefreshCw,
  shield: Shield,
  globe: Globe,
  puzzle: Puzzle,
  settings: Settings,
};

const featureGroups = [
  {
    id: 'capture',
    label: 'Baixar',
    title: 'Download sem fricção',
    summary: 'Vídeos, playlists, cortes, fotos e thumbnails em um fluxo único.',
    icon: 'video',
    accent: 'from-byte-cyan/20 to-byte-purple/10',
    featureIds: ['videos-8k', 'playlist-selection', 'time-cuts', 'photos', 'thumbnails']
  },
  {
    id: 'plugin',
    label: 'Plugin',
    title: 'Integração Nativa',
    summary: 'Envie mídias direto para a timeline do Premiere Pro, After Effects e DaVinci Resolve.',
    icon: 'puzzle',
    accent: 'from-byte-cyan/15 to-white/5',
    featureIds: [
      'plugin-install',
      'plugin-capture',
      'plugin-autocut',
      'plugin-flow',
      'plugin-autoloop',
      'plugin-transcription',
      'plugin-audio',
      'plugin-viral'
    ]
  },
  {
    id: 'ai',
    label: 'IA',
    title: 'IA dentro do app',
    summary: 'Upscaling local, Foto Pro e Byte Gemini para apoio direto no uso.',
    icon: 'sparkles',
    accent: 'from-byte-purple/25 to-byte-cyan/10',
    featureIds: ['ai-upscale', 'byte-gemini']
  },
  {
    id: 'conversion',
    label: 'Converter',
    title: 'Conversão de mídia',
    summary: 'Vídeo, áudio, fotos e modelos 3D sem sair do Byte Downloader.',
    icon: 'convert',
    accent: 'from-white/10 to-byte-purple/10',
    featureIds: ['media-conversion', 'photo-conversion', 'model-3d-conversion']
  },
  {
    id: 'finalize',
    label: 'Finalizar',
    title: 'Transcrição + Mixer',
    summary: 'Transforme vídeo em texto e deixe o áudio limpo, forte e pronto para publicar.',
    icon: 'sliders',
    accent: 'from-byte-cyan/10 to-white/10',
    featureIds: ['transcription', 'mixer']
  },
  {
    id: 'extras',
    label: 'Extras',
    title: 'Configurações Inteligentes',
    summary: 'Ajustes práticos para automatizar e deixar o Byte do seu jeito.',
    icon: 'settings',
    accent: 'from-white/10 to-byte-purple/15',
    featureIds: ['config-downloads', 'config-auto', 'config-folders']
  },
  {
    id: 'extension',
    label: 'Extensão',
    title: 'Extensão de Navegador',
    summary: 'Instale a extensão e baixe vídeos com um clique direto do seu navegador.',
    icon: 'globe',
    accent: 'from-byte-cyan/20 to-transparent',
    featureIds: ['browser-extension']
  }
];

export const Features: React.FC = () => {
  const { tr } = useLanguage();
  const [activeGroupId, setActiveGroupId] = useState(featureGroups[0].id);
  const [cardsPerView, setCardsPerView] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  });
  const [startIndex, setStartIndex] = useState(0);

  const activeGroupIndex = featureGroups.findIndex((group) => group.id === activeGroupId);
  const activeGroup = featureGroups[activeGroupIndex] ?? featureGroups[0];
  const activeFeatures = activeGroup.featureIds
    .map((featureId) => FEATURES.find((feature) => feature.id === featureId))
    .filter((feature): feature is typeof FEATURES[number] => Boolean(feature));

  const maxStartIndex = Math.max(0, featureGroups.length - cardsPerView);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newPerView = width < 640 ? 1 : width < 1024 ? 2 : 3;
      setCardsPerView(newPerView);
      setStartIndex((prev) => {
        const newMax = Math.max(0, featureGroups.length - newPerView);
        return Math.min(prev, newMax);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeGroupIndex < startIndex) {
      setStartIndex(activeGroupIndex);
    } else if (activeGroupIndex >= startIndex + cardsPerView) {
      setStartIndex(Math.min(maxStartIndex, activeGroupIndex - cardsPerView + 1));
    }
  }, [activeGroupIndex, cardsPerView, maxStartIndex, startIndex]);

  const goToGroup = (direction: 'prev' | 'next') => {
    const nextIndex = direction === 'next'
      ? (activeGroupIndex + 1) % featureGroups.length
      : (activeGroupIndex - 1 + featureGroups.length) % featureGroups.length;
    setActiveGroupId(featureGroups[nextIndex].id);
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      goToGroup('next');
    } else if (diff < -50) {
      goToGroup('prev');
    }
    touchStartX.current = null;
  };

  return (
    <section id="features" className="features-section snap-section pt-8 pb-12 md:pt-10 md:pb-14 lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-byte-dark relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-5 md:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-tech font-black mb-1.5 text-white tracking-wide uppercase">
            {tr("O QUE O BYTE")} <span className="text-[#00F0FF]">{tr("ENTREGA")}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            {tr("Quatro caminhos simples para criar mais rápido: baixar, melhorar, converter e finalizar.")}</p>
        </motion.div>

        {/* Carrossel de Cards perfeitamente proporcional (100% de largura, zero corte) */}
        <div 
          className="overflow-hidden -mx-1.5 sm:-mx-2 mb-3.5 py-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-stretch transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${startIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {featureGroups.map((group, index) => {
              const Icon = iconMap[group.icon] || Zap;
              const isActive = group.id === activeGroup.id;
              return (
                <div
                  key={group.id}
                  style={{ width: `${100 / cardsPerView}%`, flexShrink: 0 }}
                  className="px-1.5 sm:px-2 flex"
                >
                  <motion.button
                    type="button"
                    onClick={() => setActiveGroupId(group.id)}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className={`feature-flow-card w-full relative text-left rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? 'border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.18),0_0_8px_rgba(123,0,212,0.15)] bg-gradient-to-br from-[#120428]/90 via-[#0a1230]/85 to-[#071224]/90'
                        : 'border-white/[0.08] hover:border-[#00F0FF]/25 hover:shadow-[0_0_12px_rgba(0,240,255,0.08)] bg-gradient-to-br from-[#0b1629]/90 via-[#08111e]/90 to-[#050d1a]/90'
                    }`}
                  >
                    {/* Shimmer reflex line on active */}
                    {isActive && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-[-60%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-btn-reflex" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'border-[#00F0FF]/40 bg-gradient-to-br from-[#7B00D4]/25 to-[#00F0FF]/10 shadow-[0_0_8px_rgba(0,240,255,0.15)]'
                            : 'border-white/10 bg-white/[0.04]'
                        }`}>
                          <Icon className={isActive ? 'text-[#00F0FF]' : 'text-[#00F0FF]/50'} size={17} />
                        </div>
                        <span className={`text-[9px] font-tech font-bold tracking-[0.14em] uppercase flex-shrink-0 transition-colors ${
                          isActive ? 'text-[#00F0FF]' : 'text-gray-500'
                        }`}>
                          {tr(group.label)}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-tech font-black text-white mb-1 leading-snug line-clamp-1">
                        {tr(group.title)}
                      </h3>
                      <p className={`text-[11px] sm:text-xs leading-relaxed font-normal transition-colors line-clamp-2 ${
                        isActive ? 'text-gray-200/85' : 'text-gray-400/70'
                      }`}>
                        {tr(group.summary)}
                      </p>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Barra de Navegação Compacta */}
        <div className="features-nav flex items-center justify-center gap-2.5 mb-5 md:mb-6">
          <button
            type="button"
            onClick={() => goToGroup('prev')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/25 bg-gradient-to-r from-[#7B00D4]/15 to-[#00F0FF]/8 px-3 py-1.5 text-xs font-bold text-white hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.18)] transition-all duration-200"
            aria-label={tr("Ver fluxo anterior")}
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#00F0FF]" />  {tr("Anterior")}</button>

          {/* Indicadores dos 7 fluxos */}
          <div className="flex items-center gap-1.5 mx-1">
            {featureGroups.map((group, idx) => {
              const isGroupActive = group.id === activeGroup.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroupId(group.id)}
                  className={`transition-all duration-300 rounded-full ${
                    isGroupActive
                      ? 'w-5 h-1.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={tr('Ir para {name}', { name: tr(group.label) })}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goToGroup('next')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/25 bg-gradient-to-r from-[#00F0FF]/8 to-[#7B00D4]/15 px-3 py-1.5 text-xs font-bold text-white hover:border-[#00F0FF]/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.18)] transition-all duration-200"
            aria-label={tr("Ver proximo fluxo")}
          >
            {tr("Próximo")} <ChevronRight className="w-3.5 h-3.5 text-[#00F0FF]" />
          </button>
        </div>

        {/* Detalhes do Fluxo Ativo */}
        <motion.div
          key={activeGroup.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="features-detail rounded-2xl border border-[#00F0FF]/15 bg-gradient-to-br from-[#0d0420]/95 via-[#081426]/95 to-[#06111e]/95 overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.06),0_0_14px_rgba(123,0,212,0.08)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 md:px-6 md:py-3.5 border-b border-[#00F0FF]/10 bg-gradient-to-r from-[#7B00D4]/[0.05] to-[#00F0FF]/[0.02]">
            <div>
              <span className="text-[#00F0FF] font-tech text-[10px] tracking-[0.22em] uppercase font-bold">{tr(activeGroup.label)}</span>
              <h3 className="text-lg md:text-2xl font-tech font-black text-white">{tr(activeGroup.title)}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
              <span>{activeFeatures.length}  {tr("recursos neste fluxo")}</span>
            </div>
          </div>

          <div className="features-detail-grid grid grid-cols-1 lg:grid-cols-2 gap-0">
            {activeFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Zap;
              return (
                <div
                  key={feature.id}
                  className={`feature-detail-item p-3.5 md:p-4 border-[#00F0FF]/10 ${index % 2 === 0 ? 'lg:border-r' : ''} ${index < activeFeatures.length - 2 ? 'lg:border-b' : ''} ${index < activeFeatures.length - 1 ? 'border-b lg:border-b-0' : ''}`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center flex-none">
                      <Icon className="text-[#00F0FF]" size={16} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-0.5">{tr(feature.title)}</h4>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{tr(feature.description)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Botão de Ação */}
        <div className="mt-7 md:mt-8 flex justify-center">
          <a
            href="#pricing"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-byte-purple hover:bg-byte-purpleLight px-6 py-2.5 md:py-3 font-extrabold text-xs md:text-sm tracking-wider text-white transition-all transform hover:-translate-y-0.5 border border-white/15 shadow-lg"
          >
            {tr("QUERO O BYTE")}</a>
        </div>
      </div>
    </section>
  );
};