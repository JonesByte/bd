import React, { useRef } from 'react';
import { PAYMENT_LINK, PRICE_ORIGINAL } from '../constants';
import { CheckCircle, Lock, Zap, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Payment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="pricing" ref={containerRef} className="py-24 bg-byte-gradient relative overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[500px] bg-byte-purple/10 rounded-full"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.2, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto glass-panel rounded-3xl border border-byte-purple/40 overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-between bg-[#081221]">
              <div>
                <h3 className="text-sm font-tech text-byte-cyan tracking-widest mb-4 font-bold">
                  LICENÇA VITALÍCIA
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Desbloqueie o <span className="text-byte-purple">Byte</span> completo para sempre.
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Baixe vídeos, melhore fotos, converta arquivos, transcreva falas e prepare tudo no mesmo app. Sem mensalidades.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Baixe videos em alta qualidade",
                    "Melhore fotos com IA local",
                    "Receba atualizações sem dor de cabeça",
                    "Tenha suporte quando precisar",
                    "Liberação rápida pela Hotmart"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-200 font-medium">
                      <CheckCircle className="text-byte-highlight min-w-[20px]" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-3">
                <ShieldCheck className="text-byte-cyan" />
                <div className="text-sm text-gray-400">
                  <span className="text-white font-bold">Garantia de 7 Dias.</span> Satisfação ou seu dinheiro de volta.
                </div>
              </div>
            </div>

            <div className="p-10 md:p-14 bg-gradient-to-br from-byte-purple to-[#4c1d95] flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               
               <div className="relative z-10 w-full">
                 
                 <div className="mb-4 inline-block px-4 py-1.5 rounded-full border border-byte-cyan/30 bg-byte-cyan/10 text-byte-cyan text-xs font-tech tracking-widest font-bold uppercase">
                   Oferta Limitada • 50% OFF
                 </div>
                 
                 <div className="flex items-center justify-center gap-3 mb-1">
                   <span className="text-gray-300/70 line-through text-2xl font-bold font-tech">R$ 80,00</span>
                   <span className="bg-byte-cyan/20 text-byte-cyan border border-byte-cyan/40 text-[11px] font-bold font-tech px-2.5 py-0.5 rounded-full uppercase tracking-wider">Cupom BYTE50</span>
                 </div>

                 <div className="text-6xl font-black text-byte-highlight mb-2 tracking-tight drop-shadow-[0_0_4px_rgba(204,255,0,0.18)]">
                   <span className="text-3xl align-top">R$</span>40<span className="text-3xl">,00</span>
                 </div>
                 
                 <div className="text-white/90 font-medium mb-6 text-base">
                   Acesso <span className="text-byte-highlight font-black uppercase tracking-wider">Vitalício</span> + Atualizações
                 </div>
                 
                 <div className="bg-black/20 border border-white/5 rounded-xl p-4 mb-8 text-sm text-gray-300 text-left">
                   <div className="flex items-start gap-3 mb-2">
                     <span className="text-red-400 font-bold min-w-fit">Outros apps:</span> 
                     <span>R$ 150/mês para ter Upscale, Conversor e Downloader separados.</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <span className="text-byte-cyan font-bold min-w-fit">Byte:</span> 
                     <span>Tudo integrado por um pagamento único.</span>
                   </div>
                 </div>

                 <a 
                   href={PAYMENT_LINK}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full block py-5 px-8 bg-byte-highlight hover:bg-white text-byte-navy font-black text-xl rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group mb-6"
                 >
                   <Zap className="fill-current group-hover:scale-110 transition-transform" />
                   DESBLOQUEAR MEU BYTE AGORA!
                 </a>
                 
                 <div className="mt-6 flex flex-col items-center gap-2">
                   <div className="text-xs text-white/70 flex items-center gap-1">
                     <Lock size={12} /> Pagamento Confiável via Pix ou Cartão
                   </div>
                   <p className="text-[10px] text-white/50 max-w-xs leading-tight">
                     *O download do instalador é liberado na Hotmart logo após o pagamento. As atualizações são feitas pelo instalador ou automático.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};