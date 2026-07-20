import React, { useEffect, useRef, useState } from 'react';
import { getCurrentOffer, getPaymentLink, PRICE_ORIGINAL } from '../constants';
import { CheckCircle, Lock, Zap, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PromoCountdown } from './PromoCountdown';

export const Payment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offer, setOffer] = useState(() => getCurrentOffer());
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const timer = window.setInterval(() => setOffer(getCurrentOffer()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const paymentLink = getPaymentLink(offer.discountCode);
  const promoPriceDisplay = offer.promoPrice.toFixed(2).replace('.', ',');
  const hasDiscount = offer.isDiscountActive;

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
                  {hasDiscount ? 'PROMOÇÃO EXCLUSIVA' : 'PROMOÇÃO PROGRAMADA'}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {hasDiscount ? (
                    <>Desbloqueie o <span className="text-byte-purple">Byte</span> com {offer.discountPhrase}.</>
                  ) : (
                    <>O <span className="text-byte-purple">Byte</span> está no valor normal agora.</>
                  )}
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {hasDiscount
                    ? `De R$ 80,00 por R$ ${promoPriceDisplay} com o cupom ativo por tempo limitado. Baixe, melhore, converta, transcreva e prepare tudo no mesmo app.`
                    : 'Hoje o Byte fica em R$ 80,00. O cupom BYTE70 entra sozinho em 20/07/2026 às 04:54 e o site atualiza sem novo deploy.'}
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
                 <div className="mb-5">
                   <PromoCountdown />
                 </div>
                 
                 {hasDiscount && (
                   <div className="mb-2 text-white/60 line-through text-xl font-medium">De R$ {PRICE_ORIGINAL.display}</div>
                 )}
                 
                 <div className="text-6xl font-black text-byte-highlight mb-2 tracking-tight drop-shadow-[0_0_4px_rgba(204,255,0,0.18)]">
                   <span className="text-3xl align-top">R$</span>{Math.floor(offer.promoPrice)}<span className="text-3xl">,{(offer.promoPrice % 1).toFixed(2).substring(2)}</span>
                 </div>
                 
                 <div className="text-white/90 font-medium mb-8 text-base">
                   {hasDiscount && offer.discountCode ? (
                     <>Cupom <span className="text-byte-highlight font-black uppercase tracking-wider">{offer.discountCode}</span> • <span className="text-byte-highlight font-black uppercase tracking-wider">{offer.discountLabel}</span> • Licença <span className="text-byte-highlight font-black uppercase tracking-wider">Vitalícia</span></>
                   ) : (
                     <>Cupom <span className="text-byte-highlight font-black uppercase tracking-wider">BYTE70</span> começa em 20/07/2026 às 04:54 • Licença <span className="text-byte-highlight font-black uppercase tracking-wider">Vitalícia</span></>
                   )}
                 </div>

                 <a 
                   href={paymentLink}
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