import React, { useState, useEffect } from 'react';
import { PAYMENT_LINK, MERCADO_PAGO_PAYMENT_LINK, isMercadoPagoRoute, getPromoPrice } from '../constants';
import { CheckCircle, Lock, Zap, ShieldCheck, ArrowRight, X, AlertCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useCurrency } from '../i18n/useCurrency';
import { trackCheckoutClick } from '../services/metaPixel';

interface PaymentProps {
  isMercadoPago?: boolean;
  isPreview?: boolean;
}

export const Payment: React.FC<PaymentProps> = ({ isMercadoPago, isPreview = false }) => {
  const { tr } = useLanguage();
  const { t } = useLanguage();
  const pricing = useCurrency();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const activeIsMercadoPago = isMercadoPago ?? isMercadoPagoRoute();
  const paymentLink = activeIsMercadoPago ? MERCADO_PAGO_PAYMENT_LINK : PAYMENT_LINK;

  const promoPrice = getPromoPrice();

  const handlePurchaseClick = (e: React.MouseEvent) => {
    if (activeIsMercadoPago) {
      e.preventDefault();
      setShowModal(true);
      setCountdown(3);
    } else {
      trackCheckoutClick('hotmart');
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

  useEffect(() => {
    if (showModal) {
      document.body.dataset.modalActive = 'true';
      document.body.classList.add('overflow-hidden');
      return () => {
        delete document.body.dataset.modalActive;
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [showModal]);

  const benefits = [
    {
      bold: tr("Downloads ilimitados em até 8K"),
      text: tr(" e corte direto de trechos")
    },
    {
      bold: tr("Upscale de fotos e thumbnails por IA"),
      text: tr(" (grátis no pacote)")
    },
    {
      bold: tr(isPreview ? "Plugins para Premiere e After Effects" : "Plugins para Premiere, After Effects e DaVinci"),
      text: tr(" com envio direto pra timeline")
    },
    {
      bold: tr("Atualizações vitalícias garantidas"),
      text: tr(" sem cobranças futuras")
    },
    {
      bold: tr("Acesso imediato"),
      text: tr(" após a confirmação do pagamento")
    }
  ];

  return (
    <section id="pricing" className="snap-section min-h-screen py-10 md:py-14 lg:py-16 flex flex-col justify-center bg-[#02050e] relative overflow-hidden">
      {/* Imagem de fundo estática ultra-leve (WebP) */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25"
        style={{ backgroundImage: "url('/bd/pricing-bg.webp')" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.2, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-[#040812] overflow-hidden"
        >
          <div className="grid md:grid-cols-2 items-stretch">
            {/* Coluna Esquerda - Benefícios (fundo escuro limpo, sem sombras) */}
            <div className="p-7 sm:p-9 lg:p-11 flex flex-col justify-between bg-[#030712] border-b md:border-b-0 md:border-r border-white/[0.08] relative">
              <div>
                <span className="text-[10px] font-tech text-[#00F0FF] tracking-[0.22em] uppercase font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 inline-block mb-3">
                  {tr("LICENÇA VITALÍCIA")}</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3.5 leading-tight">
                  {tr("Leve o Downloader e ganhe")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#a855f7]">{tr("22+ ferramentas GRÁTIS")}</span>.
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  {tr("Baixe vídeos em até 8K, corte trechos na hora, transcreva áudio e faça upscale com IA no mesmo app. Sem mensalidade.")}</p>
                
                <ul className="space-y-3">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-200 font-medium text-xs sm:text-sm">
                      <CheckCircle className="text-[#00F0FF] min-w-[18px] flex-shrink-0" size={18} />
                      <span>
                        <strong className="text-white font-bold">{tr(item.bold)}</strong>{tr(item.text)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <a 
                    href="#features"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#00F0FF] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-all duration-200 group"
                  >
                    <span>{tr("Ver todas as 22+ ferramentas")}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                <ShieldCheck className="text-[#00F0FF] min-w-[22px]" size={22} />
                <div className="text-xs text-gray-400">
                  <span className="text-white font-bold">{tr("Garantia Blindada de 7 Dias.")}</span>  {tr("Satisfação garantida ou seu dinheiro de volta.")}</div>
              </div>
            </div>

            {/* Coluna Direita - Preço e Checkout (Fundo escuro limpo, sem sombras ou brilhos extras) */}
            <div className="p-7 sm:p-9 lg:p-11 bg-[#060A16] flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="relative z-10 w-full flex flex-col items-center">
                  
                  {/* Badge de Desconto */}
                  <div className="mb-3.5 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#00F0FF] text-xs sm:text-sm font-tech tracking-wider font-black uppercase">
                    {activeIsMercadoPago ? `Mercado Pago • ${pricing.saveText}` : pricing.saveText}
                  </div>
                  
                  {/* Preço Anterior */}
                  <div className="flex flex-col items-center mb-1">
                    <div className="text-gray-400 line-through decoration-gray-500 decoration-2 text-base sm:text-lg font-bold tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {pricing.original}
                    </div>
                  </div>

                  {/* Preço Promocional em Montserrat Bold / Black */}
                  <div 
                    className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2 tracking-tight leading-none flex items-baseline justify-center"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                  >
                    <span className="text-2xl sm:text-3xl font-black text-[#00F0FF] mr-1" style={{ fontWeight: 900 }}>{pricing.symbol}</span>
                    <span className="font-black" style={{ fontWeight: 900 }}>{pricing.promoInt}</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#00F0FF]" style={{ fontWeight: 900 }}>{pricing.promoDec}</span>
                  </div>
                  
                  {pricing.isConverted && (
                    <p className="text-[10px] text-gray-400 max-w-xs mb-3 leading-relaxed" aria-live="polite">
                      {pricing.conversionNotice}
                    </p>
                  )}
                  {/* Informação de Acesso */}
                  <div className="text-gray-300 font-medium mb-4 text-xs sm:text-sm leading-relaxed">
                    <div>{t.pricing.oneTimePay}  {tr("· Acesso")} <span className="text-[#00F0FF] font-black uppercase tracking-wider">{tr("Vitalício")}</span></div>
                    <div className="text-white/80 font-bold mt-0.5">{tr("+ 22 Ferramentas Grátis")}</div>
                  </div>
                  
                  {/* Comparativo de Economia */}
                  <div className="w-full bg-[#030610] border border-white/10 rounded-xl p-3.5 mb-5 text-xs sm:text-sm text-left">
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.06]">
                      <span className="inline-flex items-center gap-1.5 font-bold text-[#00F0FF]">
                        <CheckCircle size={14} className="text-[#00F0FF]" /> Byte Downloader:
                      </span>
                      <span className="text-white font-black">{pricing.promoFormatted} <span className="text-gray-400 font-normal text-[11px]">{tr("vitalício")}</span></span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-gray-400 font-medium">
                        <X size={14} strokeWidth={3} className="text-red-400 shrink-0" /> {t.pricing.otherApps}
                      </span>
                      <span className="text-gray-300 font-medium inline-flex items-center gap-1">{pricing.competitor} <span className="text-gray-500 text-[11px]">{t.pricing.monthSub}</span><a href="#faq" aria-label={tr("Entenda o cálculo")} title={tr("Ver dúvidas e cálculo")} className="inline-flex shrink-0 items-center justify-center min-w-[24px] min-h-[24px] rounded-full text-byte-cyan hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-byte-cyan"><HelpCircle size={15} /></a></span>
                    </div>
                  </div>

                  {/* Botão de Compra fixo com reflexo de luz e flecha em movimento contínuo */}
                  {/* Botão de Compra em Rosa Choque com reflexo idêntico ao Hero (Ver por Dentro) + sweep no hover */}
                  <a
                    href={paymentLink}
                    target={activeIsMercadoPago ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={handlePurchaseClick}
                    className="group relative w-full py-4 px-6 rounded-2xl overflow-hidden font-black text-base sm:text-lg text-[#050C16] bg-[#FF0070] hover:bg-[#E60064] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 mb-4 cursor-pointer shadow-[0_0_20px_rgba(255,0,112,0.45)] hover:shadow-[0_0_32px_rgba(255,0,112,0.75)]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    {/* Reflexozinho contínuo passando pelo botão (idêntico ao Hero) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                      <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-btn-reflex pointer-events-none" />
                      {/* Reflexo flare ao passar o mouse em cima */}
                      <div className="btn-hover-sweep" />
                    </div>

                    {/* Reflexo sutil de borda superior */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                    <Zap className="fill-white text-white relative z-10 shrink-0" size={20} />
                    <span className="relative z-10 tracking-wide font-black text-white text-center text-xs sm:text-sm md:text-base lg:text-lg leading-snug">
                      {activeIsMercadoPago ? tr("COMPRAR COM MERCADO PAGO") : t.pricing.ctaButton}
                    </span>
                    <ArrowRight className="relative z-10 text-white animate-arrow-slide shrink-0" size={20} />
                  </a>
                  {/* Rodapé de Segurança */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="text-xs text-gray-300 flex items-center gap-1.5 font-medium">
                      <Lock size={13} className="text-[#00F0FF]" /> 
                      {activeIsMercadoPago 
                        ? tr("Pagamento Seguro via Mercado Pago. Acesso liberado na mesma hora.") 
                        : t.pricing.secureNotice}
                    </div>
                    <p className="text-[10px] text-gray-500 max-w-xs leading-tight">
                      {activeIsMercadoPago 
                        ? tr("*Após o pagamento, envie o comprovante na DM do X \"Jones Byte\" junto com seu e-mail para ter acesso imediato via Google Drive.")
                        : t.pricing.secureNoticeSub}
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
              className="relative w-full max-w-lg rounded-3xl bg-[#081326] border-2 border-[#00F0FF]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] text-left flex flex-col"
            >
              {/* Botão de Fechar */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={tr("Fechar")}
              >
                <X size={20} />
              </button>

              {/* Badge de Atenção */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-tech font-bold uppercase tracking-wider w-fit mb-3">
                <AlertCircle size={14} className="animate-pulse" />
                {tr("Instrução Obrigatória")}</div>

              <h3 className="text-xl sm:text-2xl font-black font-tech uppercase text-white tracking-wider mb-4 leading-tight">
                {tr("LEIA ANTES DE")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7B00D4]">{tr("PAGAR")}</span>
              </h3>

              {/* Passos das Instruções */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] flex items-center justify-center font-tech font-black text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {tr("Você será redirecionado para a página oficial do")} <strong className="text-white font-bold">Mercado Pago</strong>  {tr("para pagar os")} <strong className="text-[#00F0FF] font-bold">R$ 49,90</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#7B00D4]/20 border border-[#7B00D4]/50">
                  <div className="w-6 h-6 rounded-full bg-[#7B00D4] border border-[#a855f7] text-white flex items-center justify-center font-tech font-black text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {tr("Assim que concluir o pagamento,")} <strong className="text-white font-bold uppercase">{tr("é obrigatório")}</strong>  {tr("enviar o comprovante na DM do X junto com o seu e-mail:")}<div className="mt-2">
                      <a 
                        href="https://x.com/JonesByte" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[#00F0FF] hover:text-white font-bold underline underline-offset-4 text-xs sm:text-sm"
                      >
                        <span>{tr("Enviar DM no X (@JonesByte)")}</span>
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
                    {tr("Após o envio do comprovante, o seu instalador e o acesso vitalício ao Google Drive são")} <strong className="text-emerald-400 font-bold">{tr("liberados na mesma hora!")}</strong>
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
                    <div className="w-4 h-4 rounded-full border-2 border-[#00F0FF] border-t-transparent animate-spin shrink-0" />
                    <span>{tr("Leia as instruções acima (Liberando em")} {countdown}{tr("s...)")}</span>
                  </button>
                ) : (
                  <a
                    href={MERCADO_PAGO_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackCheckoutClick('mercadopago');
                      setShowModal(false);
                    }}
                    className="relative w-full py-4 px-6 rounded-xl overflow-hidden font-extrabold text-sm sm:text-base text-white tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_32px_rgba(0,240,255,0.35),0_0_16px_rgba(123,0,212,0.25)] transform hover:scale-[1.02] active:scale-95 transition-all duration-200 uppercase cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #5B00A8 0%, #7B00D4 50%, #00F0FF 100%)',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    <Zap size={18} className="fill-current text-[#00F0FF] relative z-10" />
                    <span className="relative z-10">{tr("IR PARA O MERCADO PAGO")}</span>
                    <ArrowRight size={18} className="relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-btn-reflex pointer-events-none" />
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
