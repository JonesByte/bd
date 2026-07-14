import React from 'react';
import { FEATURES } from '../constants';
import { Bot, Box, Captions, Cpu, Download, Image as ImageIcon, Layers, ListChecks, RefreshCw, Scissors, Shield, Sparkles, Repeat2, Video, Zap } from 'lucide-react';
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
  queue: Cpu,
  refresh: RefreshCw,
  shield: Shield,
  globe: Video,
};
export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-byte-dark relative overflow-hidden">
       {/* Decorative Lines (Mantidas, mas sem causar lentidão) */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-purple to-transparent opacity-50"></div>
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-cyan to-transparent opacity-50"></div>
       
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-tech font-bold mb-4 text-white">
            O QUE O BYTE <span className="text-byte-purple">ENTREGA</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A versão atual reúne download, IA, conversão, transcrição e manutenção em um fluxo único.
          </p>
        </motion.div>

        {/* Grid ajustado para mobile (gap-4) e PC (gap-6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <motion.div 
                key={feature.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                // O segredo da cascata: o delay multiplica pelo index, carregando um de cada vez
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // Flexbox (flex flex-col h-full) para todos os cards terem a mesma altura sempre
                className="group p-6 md:p-7 rounded-2xl bg-[#0F2547] border border-white/5 hover:border-byte-cyan/30 transition-colors duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#050C16] border border-white/10 flex items-center justify-center mb-5 group-hover:border-byte-cyan/50 transition-colors">
                  <Icon className="text-byte-cyan" size={24} />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-tech group-hover:text-byte-cyan transition-colors">
                  {feature.title}
                </h3>
                {/* mt-auto empurra a descrição para alinhar perfeitamente o layout */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
