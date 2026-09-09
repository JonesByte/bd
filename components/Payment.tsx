import React, { useRef, useState, useEffect } from 'react';
import { PAYMENT_LINK, MERCADO_PAGO_PAYMENT_LINK, isMercadoPagoRoute, getPromoPrice } from '../constants';
import { CheckCircle, Lock, Zap, ShieldCheck, ArrowRight, X, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface PaymentProps {
  isMercadoPago?: boolean;
}

export const Payment: React.FC<PaymentProps> = ({ isMercadoPago }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const activeIsMercadoPago = isMercadoPago ?? isMercadoPagoRoute();
  const paymentLink = activeIsMercadoPago ? MERCADO_PAGO_PAYMENT_LINK : PAYMENT_LINK;

  const promoPrice = getPromoPrice();

  const handlePurchaseClick = (e: React.MouseEvent) => {
    if (activeIsMercadoPago) {
      e.preventDefault();
      setShowModal(true);
      setCountdown(3);
    }
  };

  useEffect(() => {
    if (!showModal) return;
    if (countdown <= 0) return;

    const timer = window.setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showModal, countdown]);

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
      bold: "Plugins para Premiere, After Effects e DaVinci",
      text: " com envio direto pra timeline"
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
                  Leve o Downloader e ganhe <span className="text-byte-cyan">17 ferramentas GRÁTIS</span>.
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

                <div className="mt-5">
                  <a 
                    href="#features"
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-byte-cyan hover:text-white bg-byte-cyan/10 hover:bg-byte-cyan/20 border border-byte-cyan/30 hover:border-byte-cyan/60 rounded-xl px-4 py-2 transition-all duration-200 group"
                  >
                    <span>Ver todas as 17 ferramentas</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
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
                    {activeIsMercadoPago ? "Mercado Pago • 48% OFF (ECONOMIZE R$ 47)" : "48% OFF (ECONOMIZE R$ 47)"}
                  </div>
                  
                  <div className="flex flex-col items-center mb-0.5">
                    <div className="text-white/85 line-through decoration-white/70 decoration-2 text-xl font-bold tracking-tight">R$ 97,00</div>
                  </div>

                  <div className="text-6xl sm:text-7xl md:text-8xl font-black text-byte-highlight mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(204,255,0,0.25)] leading-none">
                    <span className="text-3xl sm:text-4xl md:text-5xl align-top font-extrabold mr-1">R$</span>49<span className="text-3xl sm:text-4xl md:text-5xl font-extrabold">,90</span>
                  </div>
                  
                  <div className="text-white/90 font-medium mb-4 text-xs sm:text-sm">
                    Pagamento Único · Acesso <span className="text-byte-highlight font-black uppercase tracking-wider">Vitalício</span> + 17 Ferramentas Grátis
                  </div>
                  
                  <div className="w-full bg-black/25 border border-white/10 rounded-xl p-3.5 mb-4 text-xs sm:text-sm text-gray-300 text-left">
                    <div className="flex items-start gap-2.5 mb-1.5">
                      <span className="text-byte-cyan font-bold min-w-fit">Byte:</span> 
                      <span className="text-white font-medium">Tudo integrado por R$ 49,90 único</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold min-w-fit">Outros apps:</span> 
                      <span className="text-gray-400">R$ 150/mês em assinaturas separadas</span>
                    </div>
                  </div>

                  <a 
                    href={paymentLink}
                    target={activeIsMercadoPago ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={handlePurchaseClick}
                    className="w-full block py-4 px-6 bg-byte-highlight hover:bg-white text-byte-navy font-black text-lg md:text-xl rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group mb-4 cursor-pointer"
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

      {/* Modal de Instruções Obrigatórias do Mercado Pago com Countdown de 3s */}
      <AnimatePresence>
        {showModal && activeIsMercadoPago && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-[#091426] border-2 border-byte-cyan/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] text-left flex flex-col"
            >
              {/* Botão de Fechar */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              {/* Badge de Atenção */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-byte-highlight/15 border border-byte-highlight/50 text-byte-highlight text-xs font-tech font-bold uppercase tracking-wider w-fit mb-3">
                <AlertCircle size={14} className="animate-pulse" />
                Instrução Obrigatória
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-tech uppercase text-white tracking-wider mb-4 leading-tight">
                LEIA ANTES DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-byte-purple">PAGAR</span>
              </h3>

              {/* Passos das Instruções */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-byte-cyan/20 border border-byte-cyan/50 text-byte-cyan flex items-center justify-center font-tech font-black text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Você será redirecionado para a página oficial do <strong className="text-white font-bold">Mercado Pago</strong> para pagar os <strong className="text-byte-highlight font-bold">R$ 49,90</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-byte-purple/20 border border-byte-purple/50">
                  <div className="w-6 h-6 rounded-full bg-byte-purple border border-byte-purpleLight text-white flex items-center justify-center font-tech font-black text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Assim que concluir o pagamento, <strong className="text-white font-bold uppercase">é obrigatório</strong> enviar o comprovante na DM do X junto com o seu e-mail:
                    <div className="mt-2">
                      <a 
                        href="https://x.com/JonesByte" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-byte-cyan hover:text-white font-bold underline underline-offset-4 text-xs sm:text-sm"
                      >
                        <span>Enviar DM no X (@JonesByte)</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center font-tech font-black text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    Após o envio do comprovante, o seu instalador e o acesso vitalício ao Google Drive são <strong className="text-emerald-400 font-bold">liberados na mesma hora!</strong>
                  </div>
                </div>
              </div>

              {/* Botão com Countdown de 3 Segundos */}
              <div>
                {countdown > 0 ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-4 px-6 rounded-xl bg-white/10 border border-white/15 text-gray-300 font-tech font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-not-allowed select-none"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-byte-cyan border-t-transparent animate-spin shrink-0" />
                    <span>Leia as instruções acima (Liberando em {countdown}s...)</span>
                  </button>
                ) : (
                  <a
                    href={MERCADO_PAGO_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowModal(false)}
                    className="w-full py-4 px-6 rounded-xl bg-byte-highlight hover:bg-white text-byte-navy font-black text-sm sm:text-base tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(204,255,0,0.5)] transform hover:scale-[1.02] active:scale-95 transition-all duration-200 uppercase cursor-pointer"
                  >
                    <Zap size={18} className="fill-current" />
                    <span>IR PARA O MERCADO PAGO</span>
                    <ArrowRight size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
