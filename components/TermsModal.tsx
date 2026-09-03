
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Cookie, Lock } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0A101F] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <Shield className="text-byte-cyan w-6 h-6" />
                <h2 className="font-tech font-bold text-lg tracking-wider text-white">TERMO DE RESPONSABILIDADE</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 text-gray-300 leading-relaxed">
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-byte-cyan">
                  <Cookie size={20} />
                  <h3 className="font-bold uppercase tracking-tight">Privacidade & Cookies</h3>
                </div>
                <p>
                  O <span className="text-white font-bold">Byte Downloader</span> preza pela sua total privacidade. 
                  Diferente de outras plataformas, nosso site <span className="text-byte-cyan font-bold">não grava cookies</span> no seu navegador 
                  e <span className="text-byte-cyan font-bold">não solicita permissões</span> de rastreamento, localização ou acesso a dados pessoais. 
                  Sua navegação aqui é 100% anônima e segura.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-byte-purple">
                  <Lock size={20} />
                  <h3 className="font-bold uppercase tracking-tight">Uso do Software</h3>
                </div>
                <p>
                  Ao adquirir e utilizar o software Byte Downloader, o usuário declara estar ciente de que a ferramenta 
                  foi desenvolvida para fins de backup pessoal e uso educativo. 
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                  <li>O usuário é o único responsável legal pelo conteúdo que decide baixar.</li>
                  <li>Não incentivamos ou apoiamos a pirataria ou a distribuição ilegal de conteúdos protegidos.</li>
                  <li>O software deve ser utilizado em conformidade com as leis de direitos autorais do seu país.</li>
                  <li>A Byte Arte Software não se responsabiliza pelo uso indevido da ferramenta por parte de terceiros.</li>
                </ul>
              </section>

              <div className="p-4 bg-byte-cyan/5 border border-byte-cyan/20 rounded-xl text-xs text-center italic">
                "Tecnologia visionária exige uso consciente. Explore com responsabilidade."
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 flex justify-center bg-white/5">
              <button 
                onClick={onClose}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="px-8 py-3 bg-byte-purple hover:bg-byte-purpleLight text-white font-extrabold rounded-xl transition-all shadow-lg text-sm tracking-widest"
              >
                ENTENDI E CONCORDO
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
