import React, { useState, useEffect } from 'react';
import { PAYMENT_LINK, MERCADO_PAGO_PAYMENT_LINK, isMercadoPagoRoute, getPromoPrice, getPaymentLink } from '../constants';
import { CheckCircle, Lock, Zap, ShieldCheck, ArrowRight, X, AlertCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useCurrency } from '../i18n/useCurrency';

interface PaymentProps {
  isMercadoPago?: boolean;
}

export const Payment: React.FC<PaymentProps> = ({ isMercadoPago }) => {
  const { tr } = useLanguage();
  const { t } = useLanguage();
  const pricing = useCurrency();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const activeIsMercadoPago = isMercadoPago ?? isMercadoPagoRoute();
  const paymentLink = activeIsMercadoPago ? MERCADO_PAGO_PAYMENT_LINK : getPaymentLink();

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
      text: tr(" — vídeos, lives, fotos e recortes")
    },
    {
      bold: tr("Qualidade 4K por IA no seu PC"),
      text: tr(" — sem créditos extras nem limites")
    },
    {
      bold: tr("Plugin para Premiere e After Effects"),
      text: tr(" — corte automático, transições e legendas")
    },
    {
      bold: tr("IA, roteiros, áudio e conversor"),
      text: tr(" — com atualizações vitalícias inclusas")
    },
    {
      bold: tr("Acesso imediato"),
      text: tr(" assim que o pagamento for confirmado")
    }
  ];

  return (
    <section id="pricing" className="snap-section min-h-[100svh] py-[clamp(3.5rem,6svh,5rem)] flex flex-col justify-center bg-[#060b18] relative overflow-hidden">
      {/* Textura cinematográfica ultra-sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Imagem de fundo sutil com fade orgânico nas bordas */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-12"
        style={{
          backgroundImage: "url('/bd/pricing-bg.webp')",
          maskImage: 'linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Brilho ambiente sutil centralizado atrás do bloco de compra */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[680px] h-[360px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,112,0.38) 0%, rgba(112,0,255,0.28) 55%, rgba(0,240,255,0.10) 100%)',
        }}
      />

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* 1. Título único e direto — cada frase na sua linha */}
          <h2
            className="font-tech font-black text-white uppercase tracking-tight leading-[1.06] max-w-4xl"
            style={{
              fontSize: 'clamp(1.6rem, min(3.8vw, 4.5svh), 2.95rem)',
              marginBottom: 'clamp(1.25rem, 3svh, 2.25rem)',
            }}
          >
            <span className="block">{tr("PAGUE UMA VEZ.")}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-byte-cyan to-[#8b5cf6]">
              {tr("TENHA TUDO PARA SEMPRE.")}
            </span>
          </h2>

          {/* 2. Card central focado apenas no essencial: Desconto -> Preço -> Botão -> Confiança */}
          <div
            className="w-full max-w-xl rounded-3xl border border-white/15 bg-[#050a16]/90 backdrop-blur-md px-6 sm:px-11 flex flex-col items-center shadow-[0_30px_100px_rgba(0,0,0,0.75)]"
            style={{
              paddingTop: 'clamp(1.75rem, 4svh, 2.75rem)',
              paddingBottom: 'clamp(1.5rem, 3.5svh, 2.5rem)',
            }}
          >
            <span className="text-xs font-tech font-bold uppercase tracking-[0.24em] text-byte-cyan mb-3">
              {activeIsMercadoPago ? `Mercado Pago · ${pricing.saveText}` : pricing.saveText}
            </span>

            {pricing.hasDiscount && (
              <div
                className="text-gray-500 line-through decoration-gray-500/80 decoration-2 text-base sm:text-lg font-bold tracking-tight mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {pricing.original}
              </div>
            )}

            {/* Preço como foco visual #1 */}
            <div
              className="font-black text-white tracking-tight leading-none flex items-baseline justify-center mb-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3.25rem, min(11vw, 9.5svh), 5.5rem)',
              }}
            >
              <span className="text-2xl sm:text-3xl font-black text-byte-cyan mr-1.5">{pricing.symbol}</span>
              <span>{pricing.promoInt}</span>
              <span className="text-2xl sm:text-3xl font-black text-byte-cyan">{pricing.promoDec}</span>
            </div>

            {pricing.isConverted && (
              <p className="text-[11px] text-gray-400 max-w-xs mb-2 leading-snug" aria-live="polite">
                {pricing.conversionNotice}
              </p>
            )}

            {/* 1 linha de valor + comparativo */}
            <p className="text-gray-300 text-xs sm:text-sm font-medium mb-6">
              {t.pricing.oneTimePay} ·{' '}
              <span className="text-gray-400">
                {tr("5 apps separados:")} <span className="line-through text-gray-500">{pricing.competitor}</span>
              </span>{' '}
              <a
                href="#faq"
                aria-label={tr("Entenda o cálculo dos 5 apps")}
                className="inline-flex items-center gap-1 text-byte-cyan hover:text-white underline underline-offset-2 transition-colors ml-1"
              >
                {tr("ver cálculo")}
              </a>
            </p>

            {/* Botão CTA como foco visual #2 */}
            <a
              href={paymentLink}
              target={activeIsMercadoPago ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={handlePurchaseClick}
              className="group relative w-full px-6 sm:px-8 py-4 sm:py-[18px] rounded-full overflow-hidden font-black text-xs sm:text-sm md:text-base text-white bg-[#FF0070] hover:bg-[#e60064] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 mb-5 cursor-pointer shadow-[0_14px_40px_rgba(255,0,112,0.5)] hover:shadow-[0_18px_52px_rgba(255,0,112,0.75)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
                <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-btn-reflex pointer-events-none" />
                <div className="btn-hover-sweep" />
              </div>
              <Zap className="fill-white text-white relative z-10 shrink-0" size={18} />
              <span className="relative z-10 tracking-wide font-black text-center whitespace-nowrap">
                {activeIsMercadoPago ? tr("COMPRAR COM MERCADO PAGO") : t.pricing.ctaButton}
              </span>
              <ArrowRight className="relative z-10 text-white animate-arrow-slide shrink-0" size={18} />
            </a>

            {/* 1 linha limpa de segurança + garantia */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-200 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={13} className="text-byte-cyan shrink-0" />
                {activeIsMercadoPago
                  ? tr("Mercado Pago · Acesso imediato")
                  : t.pricing.secureNotice}
              </span>
              <span className="text-white/25 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-white">
                <ShieldCheck size={14} className="text-byte-cyan shrink-0" />
                {tr("Garantia Blindada de 7 Dias.")}
              </span>
            </div>

            {activeIsMercadoPago && (
              <p className="text-xs text-gray-300 max-w-sm leading-snug mt-2">
                {tr('*Após o pagamento, envie o comprovante na DM do X "Jones Byte" junto com seu e-mail para ter acesso imediato via Google Drive.')}
              </p>
            )}
          </div>

          {/* 3. Rodapé discreto com os 4 pilares resumidos em 1 linha */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-sm text-gray-200 font-medium">
            <span className="inline-flex items-center gap-2">
              <CheckCircle size={15} className="text-byte-cyan shrink-0" />
              {tr("Downloads ilimitados em até 8K")}
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle size={15} className="text-byte-cyan shrink-0" />
              {tr("Qualidade 4K por IA no seu PC")}
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle size={15} className="text-byte-cyan shrink-0" />
              {tr("Plugin para Premiere e After Effects")}
            </span>
            <a
              href="#features"
              className="inline-flex items-center gap-1.5 font-bold text-byte-cyan hover:text-white transition-colors group"
            >
              <span>{tr("Ver todas as 22+ ferramentas")}</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
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
                    {tr("Você será redirecionado para a página oficial do")} <strong className="text-white font-bold">Mercado Pago</strong>  {tr("para pagar os")} <strong className="text-[#00F0FF] font-bold">{pricing.promoFormatted}</strong>.
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
                    onClick={() => setShowModal(false)}
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
