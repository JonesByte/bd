import React from 'react';
import { motion } from 'framer-motion';
import { FEEDBACKS } from '../constants';
import { Star } from 'lucide-react';

export const Feedbacks: React.FC = () => {
  if (FEEDBACKS.length === 0) return null;
  
  // Duplicamos o array exatamente 2 vezes para que o translateY(-50%) da animação marquee 
  // faça um loop contínuo e matematicamente perfeito.
  const duplicatedFeedbacks = [...FEEDBACKS, ...FEEDBACKS];

  return (
    <section className="py-24 relative overflow-hidden bg-byte-navy">
      <div className="absolute inset-0 bg-byte-purple/5 mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black font-tech mb-4 uppercase tracking-wider">
            O QUE OS <span className="text-byte-cyan">BYTES</span> DIZEM
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Resultados reais de quem já transformou seu fluxo de trabalho usando o Byte Downloader.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-byte-navy to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-byte-navy to-transparent z-10 pointer-events-none"></div>
        
        {/* w-max faz o container ter o tamanho exato de todos os filhos. hover pausa a animação */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedFeedbacks.map((item, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[300px] md:w-[450px] lg:w-[650px] mx-3 md:mx-4 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-[#0A101F] shadow-lg hover:border-byte-cyan/40 transition-colors duration-300"
            >
              <img 
                src={item} 
                alt={`Feedback ${idx + 1}`} 
                className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x200/050C16/00F0FF?text=Feedback+Nao+Encontrado";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
