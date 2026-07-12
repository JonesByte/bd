import React, { useRef } from 'react';
import { Check, X, AlertTriangle, HelpCircle } from 'lucide-react';
import { PRICE_PROMO } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ComparisonTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const formattedPrice = `R$ ${PRICE_PROMO.toFixed(2).replace('.', ',')}`;

  return (
    <section ref={containerRef} className="py-24 bg-byte-navy relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        // Adicionado overflow-hidden e limite de max-w para a sombra não vazar a tela
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-full h-full max-w-4xl bg-byte-purple/5 blur-[80px] md:blur-[100px] pointer-events-none"
      ></motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            // Ajuste do título para o mobile com a regra md:
            className="text-3xl md:text-5xl font-tech font-bold text-white mb-6"
          >
            COMPARE E <span className="text-byte-cyan">COMPROVE</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 1, 0.3, 1] }}
            // Texto adaptado com padding lateral no mobile
            className="text-gray-400 max-w-2xl mx-auto px-4 md:px-0 text-sm md:text-base"
          >
            Não desperdice seu tempo com ferramentas amadoras. Veja a diferença real.
          </motion.p>
        </div>

        {/* Desktop/Tablet Grid View */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
          className="hidden md:block overflow-hidden rounded-3xl border border-byte-purple/20 shadow-2xl bg-[#081221]/80 backdrop-blur-sm"
        >
          <div className="grid grid-cols-4">
            {/* Headers */}
            <div className="p-6 text-gray-400 font-medium border-b border-white/5 bg-byte-navy/50 flex items-center justify-start pl-8">Recurso</div>
            <div className="p-6 text-gray-400 font-medium border-b border-white/5 bg-byte-navy/50 text-center flex items-center justify-center">Sites "Grátis"</div>
            <div className="p-6 text-gray-400 font-medium border-b border-white/5 bg-byte-navy/50 text-center flex items-center justify-center">Concorrentes (R$ 80+)</div>
            <div className="p-6 text-byte-cyan font-bold border-b border-byte-cyan/30 bg-byte-purple/10 text-center relative flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-byte-cyan shadow-[0_0_10px_#00F0FF]"></div>
              Byte Downloader
            </div>

            {/* Row 1: Vírus/Ads */}
            <div className="p-6 text-white font-medium border-b border-white/5 flex items-center pl-8 bg-byte-navy/30">Vírus / Anúncios</div>
            <div className="p-6 text-red-400 font-bold border-b border-white/5 text-center bg-byte-navy/30 flex items-center justify-center gap-2">
              <AlertTriangle size={20} /> Muitos
            </div>
            <div className="p-6 text-gray-300 border-b border-white/5 text-center bg-byte-navy/30 flex items-center justify-center">Não (Geralmente)</div>
            <div className="p-6 text-white font-black border-b border-white/5 bg-byte-purple/10 text-center flex items-center justify-center text-lg">
              ZERO
            </div>

            {/* Row 2: 4K/8K */}
            <div className="p-6 text-white font-medium border-b border-white/5 flex items-center pl-8 bg-byte-navy/30">Qualidade 4K / 8K</div>
            <div className="p-6 text-red-500 border-b border-white/5 text-center bg-byte-navy/30 flex items-center justify-center gap-2">
              <X size={20} /> Não
            </div>
            <div className="p-6 text-green-400 border-b border-white/5 text-center bg-byte-navy/30 flex items-center justify-center gap-2">
              <Check size={20} /> Sim
            </div>
            <div className="p-6 text-byte-cyan font-bold border-b border-white/5 bg-byte-purple/10 text-center flex items-center justify-center gap-2">
              <Check size={20} /> Sim (Com HDR)
            </div>

            {/* Row 3: Corte de trecho */}
            <div className="p-6 text-white font-medium border-b border-white/5 flex items-center pl-8 bg-byte-navy/30">Corte de trecho</div>
            <div className="p-6 text-red-500 border-b border-white/5 text-center bg-byte-navy/30 flex items-center justify-center gap-2">
              <X size={20} /> Não
            </div>
            <div className="p-6 text-red-500 border-b border-white/5 text-center bg-byte-navy/30 flex items-center justify-center gap-2">
              <X size={20} /> Não
            </div>
            <div className="p-6 text-byte-cyan font-bold border-b border-white/5 bg-byte-purple/10 text-center flex items-center justify-center gap-2">
              <Check size={20} /> Sim
            </div>

            {/* Row 4: Preço */}
            <div className="p-6 text-white font-medium flex items-center pl-8 bg-byte-navy/30">Preço</div>
            <div className="p-6 text-gray-500 italic text-center bg-byte-navy/30 flex items-center justify-center">"Grátis" (Custa sua paz)</div>
            <div className="p-6 text-gray-300 text-center bg-byte-navy/30 flex items-center justify-center">R$ 80,00+</div>
            <div className="p-6 text-byte-highlight font-extrabold text-2xl bg-byte-purple/10 text-center flex items-center justify-center">
              {formattedPrice}
            </div>
          </div>
        </motion.div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-6">
           {/* Card: Byte Downloader */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.5 }}
             className="bg-byte-surface rounded-2xl border border-byte-cyan/50 shadow-lg overflow-hidden relative"
           >
              <div className="absolute top-0 left-0 w-full h-1 bg-byte-cyan"></div>
              <div className="p-4 bg-byte-purple/20 text-center font-bold text-byte-cyan text-xl border-b border-white/10">
                Byte Downloader
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-gray-400 text-sm">Vírus / Ads</span>
                   <span className="text-white font-black text-sm">ZERO</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-gray-400 text-sm">4K / 8K</span>
                   <span className="text-byte-cyan font-bold flex items-center gap-1 text-sm"><Check size={16}/> Sim (HDR)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-gray-400 text-sm">Corte de trecho</span>
                   <span className="text-byte-cyan font-bold flex items-center gap-1 text-sm"><Check size={16}/> Sim</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                   <span className="text-gray-400 text-sm">Preço</span>
                   <span className="text-byte-highlight font-extrabold text-xl">{formattedPrice}</span>
                </div>
              </div>
           </motion.div>

           {/* Card: Concorrentes */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.5 }}
             className="bg-[#081221] rounded-2xl border border-white/5 p-5 opacity-90"
           >
             <h3 className="text-center font-bold text-gray-400 mb-4 pb-2 border-b border-white/5 text-sm">Concorrentes / Sites</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-red-400">
                   <span>Vírus</span>
                   <span className="flex items-center gap-1"><AlertTriangle size={14}/> Muitos</span>
                </div>
                <div className="flex justify-between text-red-500">
                   <span>Qualidade</span>
                   <span className="flex items-center gap-1"><X size={14}/> Limitada</span>
                </div>
                 <div className="flex justify-between text-red-500">
                   <span>Corte de trecho</span>
                   <span className="flex items-center gap-1"><X size={14}/> Não</span>
                </div>
              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
};
