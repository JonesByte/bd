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

  const checklist = activeIsMercadoPago
    ? [
        "Baixe videos em alta qualidade",
        "Melhore fotos com IA local",
        "Receba atualizações sem dor de cabeça",
        "Tenha suporte quando precisar",
        "Acesso via Google Drive após confirmação"
      ]
    : [
        "Baixe videos em alta qualidade",
        "Melhore fotos com IA local",
        "Receba atualizações sem dor de cabeça",
        "Tenha suporte quando precisar",
        "Liberação rápida pela Hotmart"
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
                  {checklist.map((item, i) => (
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
                    {activeIsMercadoPago ? "Mercado Pago • 81,25% OFF" : "Oferta Limitada • 81,25% OFF"}
                  </div>
                  
                  <div className="flex flex-col items-center mb-1">
                    <div className="text-gray-300/60 line-through text-xl tracking-tight">R$ 80,00</div>
                  </div>

                  <div className="text-6xl font-black text-byte-highlight mb-2 tracking-tight drop-shadow-[0_0_4px_rgba(204,255,0,0.18)]">
                    <span className="text-3xl align-top">R$</span>15<span className="text-3xl">,00</span>
                  </div>
                  
                  <div className="text-white/90 font-medium mb-6 text-base">
                    Acesso <span className="text-byte-highlight font-black uppercase tracking-wider">Vitalício</span> + Atualizações
                  </div>
                  
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4 mb-6 text-sm text-gray-300 text-left">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-byte-cyan font-bold min-w-fit">Byte:</span> 
                      <span>Tudo integrado por pagamento único.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 font-bold min-w-fit">Outros:</span> 
                      <span>R$ 150/mês em apps separados.</span>
                    </div>
                  </div>

                  {activeIsMercadoPago && (
                    <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-byte-highlight/40 text-left shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-byte-highlight text-xs font-tech font-bold uppercase tracking-wider mb-2">
                        <Zap size={14} className="fill-current text-byte-highlight" />
                        Instruções na Hora da Compra:
                      </div>
                      <p className="text-xs sm:text-sm text-gray-100 font-medium leading-relaxed">
                        <strong className="text-white">Byte Downloader Vitalício</strong> (Envie o comprovante na DM do X &quot;Jones Byte&quot;, junto com o email pra ter acesso via Google Drive)
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
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
                    className="w-full block py-5 px-8 bg-byte-highlight hover:bg-white text-byte-navy font-black text-xl rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group mb-6"
                  >
                    <Zap className="fill-current group-hover:scale-110 transition-transform" />
                    {activeIsMercadoPago ? "COMPRAR COM MERCADO PAGO" : "DESBLOQUEAR MEU BYTE AGORA!"}
                  </a>
                  
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <div className="text-xs text-white/70 flex items-center gap-1">
                      <Lock size={12} /> {activeIsMercadoPago ? "Pagamento Seguro via Mercado Pago" : "Pagamento Confiável via Pix ou Cartão"}
                    </div>
                    <p className="text-[10px] text-white/50 max-w-xs leading-tight">
                      {activeIsMercadoPago 
                        ? "*Após o pagamento, envie o comprovante na DM do X \"Jones Byte\" junto com seu e-mail para ter acesso imediato via Google Drive."
                        : "*O download do instalador é liberado na Hotmart logo após o pagamento. As atualizações são feitas pelo instalador ou automático."}
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
