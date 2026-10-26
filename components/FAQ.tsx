import React from 'react';
import { getFaqs, isMercadoPagoRoute } from '../constants';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

interface FAQProps {
  isMercadoPago?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ isMercadoPago }) => {
  const { tr, t, lang } = useLanguage();
  const activeIsMercadoPago = isMercadoPago ?? isMercadoPagoRoute();
  const faqs = getFaqs(activeIsMercadoPago);

  return (
    <section id="faq" className="pt-16 sm:pt-20 md:pt-24 pb-20 md:pb-28 bg-byte-navy relative overflow-hidden">
      {/* Efeitos de iluminação de fundo */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_25%,rgba(0,240,255,0.06),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_85%,rgba(112,0,255,0.05),transparent_70%)]" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-byte-cyan/10 border border-byte-cyan/20 text-byte-cyan font-tech text-xs tracking-[0.2em] mb-3 uppercase"
          >
            <HelpCircle size={14} className="text-byte-cyan" /> {t.faq.badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-tech font-bold text-white tracking-wider mb-4 uppercase"
          >
            {t.faq.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto"
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="group rounded-2xl bg-[#050C16]/80 p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-colors duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2.5 mb-2">
                <span className="text-byte-cyan font-bold text-base sm:text-lg shrink-0">?</span>
                <span>{tr(faq.question)}</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed pl-5 sm:pl-6 whitespace-pre-line">
                {tr(faq.answer)}
                {faq.sources && (
                  <span className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs">
                    {faq.sources
                      .filter((source) => source.label !== "Câmbio de referência" || lang === 'pt-BR')
                      .map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="text-byte-cyan underline underline-offset-4 hover:text-white">{tr(source.label)}</a>
                    ))}
                  </span>
                )}
              </p>
            </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 flex justify-center">
          <a 
            href="#pricing" 
            style={{ fontFamily: "'Montserrat', sans-serif" }} 
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-byte-purple hover:bg-byte-purpleLight px-8 sm:px-10 py-4 font-black text-sm sm:text-base tracking-widest text-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_35px_rgba(112,0,255,0.35)] hover:shadow-[0_0_50px_rgba(112,0,255,0.65)] border border-white/20 active:translate-y-0"
          >
            <span>{tr("TIRAR MINHA DÚVIDA COMPRANDO")}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};