import React, { useState } from 'react';
import { FEATURES } from '../constants';
import { Bot, Box, Captions, CheckCircle2, Cpu, Download, Image as ImageIcon, Layers, ListChecks, RefreshCw, Scissors, Shield, SlidersHorizontal, Sparkles, Repeat2, Video, Zap } from 'lucide-react';
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
  globe: Video,
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
  }
];

export const Features: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState(featureGroups[0].id);
  const activeGroup = featureGroups.find((group) => group.id === activeGroupId) ?? featureGroups[0];
  const activeFeatures = activeGroup.featureIds
    .map((featureId) => FEATURES.find((feature) => feature.id === featureId))
    .filter((feature): feature is typeof FEATURES[number] => Boolean(feature));

  return (
    <section id="features" className="py-24 bg-byte-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-purple to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-cyan to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-tech font-bold mb-4 text-white">
            O QUE O BYTE <span className="text-byte-purple">ENTREGA</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Tudo fica em um caminho simples: baixar, melhorar, converter e finalizar sem se perder.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-10">
          {featureGroups.map((group, index) => {
            const Icon = iconMap[group.icon] || Zap;
            const isActive = group.id === activeGroup.id;
            return (
              <motion.button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId(group.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`text-left rounded-2xl border p-5 md:p-6 transition-all duration-300 bg-gradient-to-br ${group.accent} ${
                  isActive
                    ? 'border-byte-cyan shadow-[0_0_30px_rgba(0,240,255,0.14)] translate-y-[-2px]'
                    : 'border-white/10 hover:border-byte-cyan/40 bg-[#0F2547]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${isActive ? 'border-byte-cyan/60 bg-byte-cyan/10' : 'border-white/10 bg-[#050C16]'}`}>
                    <Icon className="text-byte-cyan" size={22} />
                  </div>
                  <span className={`text-[10px] font-tech tracking-[0.22em] uppercase ${isActive ? 'text-byte-cyan' : 'text-gray-500'}`}>
                    {group.label}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-tech font-bold text-white mb-2 leading-tight">
                  {group.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {group.summary}
                </p>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={activeGroup.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-white/10 bg-[#081426]/90 overflow-hidden shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-5 py-5 md:px-7 md:py-6 border-b border-white/10 bg-white/[0.03]">
            <div>
              <span className="text-byte-cyan font-tech text-[10px] tracking-[0.24em] uppercase">{activeGroup.label}</span>
              <h3 className="text-xl md:text-2xl font-tech font-bold text-white mt-1">{activeGroup.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-byte-cyan" />
              <span>{activeFeatures.length} recursos neste fluxo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {activeFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Zap;
              return (
                <div
                  key={feature.id}
                  className={`p-5 md:p-6 border-white/10 ${index % 2 === 0 ? 'lg:border-r' : ''} ${index < activeFeatures.length - 2 ? 'lg:border-b' : ''} ${index < activeFeatures.length - 1 ? 'border-b lg:border-b-0' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-byte-cyan/10 border border-byte-cyan/20 flex items-center justify-center flex-none">
                      <Icon className="text-byte-cyan" size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-base md:text-lg leading-tight mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
