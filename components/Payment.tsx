import React, { useRef } from 'react';
import { PAYMENT_LINK, MERCADO_PAGO_PAYMENT_LINK, isMercadoPagoRoute, getPromoPrice } from '../constants';
import { CheckCircle, Lock, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PaymentProps {
  isMercadoPago?: boolean;
}

export const Payment: React.FC<PaymentProps> = ({ isMercadoPago }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const activeIsMercadoPago = isMercadoPago ?? isMercadoPagoRoute();
  const paymentLink = activeIsMercadoPago ? MERCADO_PAGO_PAYMENT_LINK : PAYMENT_LINK;

  const promoPrice = getPromoPrice();

  const benefits = [
    {
      bold: "Downloads ilimitados em até 8K",
      text: " e corte direto de trechos"
    },
    {
      bold: "Upscale de fotos e thumbnails por IA",
      text: " (grátis no pacote)"
    },
    {
      bold: "Conversor nativo e extrator de mídia",
      text: " para Premiere e After Effects"
    },
    {
      bold: "Atualizações vitalícias garantidas",
      text: " sem cobranças futuras"
    },
    {
      bold: "Acesso imediato",
      text: " após a confirmação do pagamento"
    }
  ];

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
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-[#081221]">
              <div>
                <h3 className="text-xs font-tech text-byte-cyan tracking-widest mb-3 font-bold">
                  LICENÇA VITALÍCIA
                </h3>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Leva o Downloader e ganha <span className="text-byte-cyan">17 ferramentas GRÁTIS</span>.
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                  Baixe vídeos em até 8K, corte trechos na hora, transcreva áudio e faça upscale com IA no mesmo app. Sem mensalidade.
                </p>
                
                <ul className="space-y-3.5">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-200 font-medium text-sm md:text-base">
                      <CheckCircle className="text-byte-cyan min-w-[18px] flex-shrink-0" size={18} />
                      <span>
                        <strong className="text-white font-bold">{item.bold}</strong>{item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <ShieldCheck className="text-byte-cyan min-w-[22px]" size={22} />
                <div className="text-xs md:text-sm text-gray-400">
                  <span className="text-white font-bold">Garantia Blindada de 7 Dias.</span> Satisfação garantida ou seu dinheiro de volta.
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 lg:p-12 bg-gradient-to-br from-byte-purple to-[#4c1d95] flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               
               <div className="relative z-10 w-full flex flex-col items-center">
                  
                  <div className="mb-3.5 inline-block px-5 py-1.5 rounded-full border border-byte-cyan/40 bg-byte-cyan/15 text-byte-cyan text-sm sm:text-base font-tech tracking-wide font-black uppercase shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                    {activeIsMercadoPago ? "Mercado Pago • 81% OFF ( Economize R$65 )" : "81% OFF ( Economize R$65 )"}
                  </div>
                  
                  <div className="flex flex-col items-center mb-0.5">
                    <div className="text-white/85 line-through decoration-white/70 decoration-2 text-xl font-bold tracking-tight">R$ 80,00</div>
                  </div>

                  <div className="text-6xl sm:text-7xl md:text-8xl font-black text-byte-highlight mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(204,255,0,0.25)] leading-none">
                    <span className="text-3xl sm:text-4xl md:text-5xl align-top font-extrabold mr-1">R$</span>15<span className="text-3xl sm:text-4xl md:text-5xl font-extrabold">,00</span>
                  </div>
                  
                  <div className="text-white/90 font-medium mb-4 text-xs sm:text-sm">
                    Pagamento Único · Acesso <span className="text-byte-highlight font-black uppercase tracking-wider">Vitalício</span> + 17 Ferramentas Grátis
                  </div>
                  
                  <div className="w-full bg-black/25 border border-white/10 rounded-xl p-3.5 mb-4 text-xs sm:text-sm text-gray-300 text-left">
                    <div className="flex items-start gap-2.5 mb-1.5">
                      <span className="text-byte-cyan font-bold min-w-fit">Byte:</span> 
                      <span className="text-white font-medium">Tudo integrado por R$ 15 único</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold min-w-fit">Outros apps:</span> 
                      <span className="text-gray-400">R$ 150/mês em assinaturas separadas</span>
                    </div>
                  </div>

                  {activeIsMercadoPago && (
                    <div className="w-full mb-4 p-3.5 rounded-2xl bg-black/40 border border-byte-highlight/40 text-left shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-byte-highlight text-xs font-tech font-bold uppercase tracking-wider mb-2">
                        <Zap size={14} className="fill-current text-byte-highlight" />
                        Instruções na Hora da Compra:
                      </div>
                      <p className="text-xs text-gray-100 font-medium leading-relaxed">
                        <strong className="text-white">Byte Downloader Vitalício</strong> (Envie o comprovante na DM do X &quot;Jones Byte&quot;, junto com o email pra ter acesso via Google Drive)
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-tech">Chave Pix / Mercado Pago</span>
                        <a 
                          href="https://x.com/JonesByte" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-byte-cyan hover:text-white font-bold inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
                        >
                          Enviar DM no X @JonesByte <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  )}

                  <a 
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-4 px-6 bg-byte-highlight hover:bg-white text-byte-navy font-black text-lg md:text-xl rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group mb-4"
                  >
                    <Zap className="fill-current group-hover:scale-110 transition-transform" size={20} />
                    {activeIsMercadoPago ? "COMPRAR COM MERCADO PAGO" : "DESBLOQUEAR MEU BYTE AGORA!"}
                  </a>
                  
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="text-xs text-white/90 flex items-center gap-1.5 font-medium">
                      <Lock size={13} className="text-byte-highlight" /> 
                      {activeIsMercadoPago 
                        ? "Pagamento Seguro via Mercado Pago. Acesso liberado na mesma hora." 
                        : "Pagamento Seguro via Pix ou Cartão. Acesso liberado na mesma hora."}
                    </div>
                    <p className="text-[10px] text-white/50 max-w-xs leading-tight">
                      {activeIsMercadoPago 
                        ? "*Após o pagamento, envie o comprovante na DM do X \"Jones Byte\" junto com seu e-mail para ter acesso imediato via Google Drive."
                        : "*O download do instalador é liberado logo após o pagamento. As atualizações são feitas pelo instalador ou automático."}
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
