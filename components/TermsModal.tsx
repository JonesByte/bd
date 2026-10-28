import { useLanguage } from '../i18n/LanguageContext';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Cookie, Lock } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const { tr } = useLanguage();
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-[#0A101F] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/5 flex justify-between items-center bg-white/5 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Shield className="text-byte-cyan w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <h2 className="font-tech font-bold text-sm sm:text-lg tracking-wider text-white">{tr("TERMO DE RESPONSABILIDADE")}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white cursor-pointer"
                aria-label={tr("Fechar")}
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-7 md:p-8 space-y-4 sm:space-y-6 text-gray-300 text-xs sm:text-sm leading-relaxed">
              <section className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-2.5 text-byte-cyan">
                  <Cookie size={17} className="shrink-0" />
                  <h3 className="font-bold uppercase tracking-tight text-xs sm:text-sm">{tr("Privacidade & Cookies")}</h3>
                </div>
                <p>
                  {tr("O")} <span className="text-white font-bold">Byte Downloader</span>  {tr("preza pela sua total privacidade. Diferente de outras plataformas, nosso site")} <span className="text-byte-cyan font-bold">{tr("não grava cookies")}</span>  {tr("no seu navegador e")} <span className="text-byte-cyan font-bold">{tr("não solicita permissões")}</span>  {tr("de rastreamento, localização ou acesso a dados pessoais. Sua navegação aqui é 100% anônima e segura.")}</p>
              </section>

              <section className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-2.5 text-byte-purple">
                  <Lock size={17} className="shrink-0" />
                  <h3 className="font-bold uppercase tracking-tight text-xs sm:text-sm">{tr("Uso do Software")}</h3>
                </div>
                <p>
                  {tr("Ao adquirir e utilizar o software Byte Downloader, o usuário declara estar ciente de que a ferramenta foi desenvolvida para fins de backup pessoal e uso educativo.")}</p>
                <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-gray-400">
                  <li>{tr("O usuário é o único responsável legal pelo conteúdo que decide baixar.")}</li>
                  <li>{tr("Não incentivamos ou apoiamos a pirataria ou a distribuição ilegal de conteúdos protegidos.")}</li>
                  <li>{tr("O software deve ser utilizado em conformidade com as leis de direitos autorais do seu país.")}</li>
                  <li>{tr("A Byte Arte Software não se responsabiliza pelo uso indevido da ferramenta por parte de terceiros.")}</li>
                  <li>{tr("Empresa responsável: Byte Arte Software — CNPJ: 68.731.745/0001-64.")}</li>
                </ul>
              </section>

              <div className="p-3 sm:p-4 bg-byte-cyan/5 border border-byte-cyan/20 rounded-xl text-[11px] sm:text-xs text-center italic text-gray-300">
                {tr("\"Tecnologia visionária exige uso consciente. Explore com responsabilidade.\"")}</div>
            </div>

            {/* Footer */}
            <div className="p-3.5 sm:p-5 border-t border-white/5 flex justify-center bg-white/5 shrink-0">
              <button 
                onClick={onClose}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-byte-purple hover:bg-byte-purpleLight text-white font-extrabold rounded-xl transition-all shadow-md text-xs sm:text-sm tracking-widest cursor-pointer"
              >
                {tr("ENTENDI E CONCORDO")}</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
