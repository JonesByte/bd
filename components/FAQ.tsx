import React, { useState } from 'react';
import { getFaqs, isMercadoPagoRoute } from '../constants';
import { ArrowRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

interface FAQProps {
  isMercadoPago?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ isMercadoPago }) => {
  const { tr, t, lang } = useLanguage();
  const activeIsMercadoPago = isMercadoPago ?? isMercadoPagoRoute();
  const faqs = getFaqs(activeIsMercadoPago);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 md:py-14 bg-[#050C16] relative overflow-hidden">
      {/* Textura cinematográfica ultra-sutil */}
      <div
        className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Cabeçalho centralizado minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[50px] font-tech font-black text-white uppercase tracking-tight leading-[0.98]">
            {t.faq.title}
          </h2>
        </motion.div>

        {/* Acordeão orgânico centralizado */}
        <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-6 sm:py-7 flex items-start justify-between gap-6 text-left cursor-pointer"
                >
                  <h3
                    className={`text-lg sm:text-xl font-bold leading-snug transition-colors duration-200 ${
                      isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'
                    }`}
                  >
                    {tr(faq.question)}
                  </h3>
                  <span
                    className={`mt-1 w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-byte-cyan/60 bg-byte-cyan/10 text-byte-cyan rotate-45'
                        : 'border-white/15 bg-white/[0.03] text-gray-400 group-hover:border-white/30 group-hover:text-white'
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 sm:pb-7 pr-8 text-gray-400 text-base sm:text-[17px] leading-relaxed whitespace-pre-line">
                        {tr(faq.answer)}
                        {faq.sources && (
                          <span className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm">
                            {faq.sources
                              .filter((source) => source.label !== "Câmbio de referência" || lang === 'pt-BR')
                              .map((source) => (
                                <a
                                  key={source.url}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-byte-cyan underline underline-offset-4 hover:text-white transition-colors"
                                >
                                  {tr(source.label)}
                                </a>
                              ))}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA final centralizado */}
        <div className="mt-12 flex justify-center">
          <a
            href="#pricing"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-byte-purple hover:bg-byte-purpleLight px-8 py-4 font-extrabold text-xs sm:text-sm tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>{tr("QUERO O MEU AGORA")}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
