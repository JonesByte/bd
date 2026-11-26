import React, { useState } from 'react';
import { Youtube, Mail, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { TermsModal } from './TermsModal';
import { useLanguage } from '../i18n/LanguageContext';

const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 127.14 96.36"
    fill="currentColor"
    className={className}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.31,46,96.2,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { tr } = useLanguage();
  const { t } = useLanguage();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('byteartecomercial@gmail.com');
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = 'byteartecomercial@gmail.com';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer className="bg-[#020609] pt-10 pb-6 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 md:mb-12"
        >
          
          <div className="text-center md:text-left">
            <img 
              src="/bd/bd-logo-expand.png"
              alt={tr("Byte Downloader Logo")} 
              className="h-14 w-auto object-contain mb-3 mx-auto md:mx-0"
              referrerPolicy="no-referrer"
            />
            <p className="text-gray-400 text-sm max-w-sm">
              {tr("Ferramentas visionárias para quem não aceita limites.")}</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-7 gap-y-3">
            <button 
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-byte-cyan font-bold transition-colors text-xs sm:text-sm group cursor-pointer"
              title={tr("Clique para copiar o e-mail")}
            >
              {copied ? (
                <>
                  <Check size={16} className="text-byte-highlight" />
                  <span className="text-byte-highlight">{tr("E-mail Copiado!")}</span>
                </>
              ) : (
                <>
                  <Mail size={16} className="text-byte-cyan" />
                  <span>byteartecomercial@gmail.com</span>
                  <Copy size={12} className="text-gray-500 group-hover:text-byte-cyan transition-colors" />
                </>
              )}
            </button>
            <a
              href="https://discord.gg/RWWGkeVCRC"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-bold transition-colors text-xs sm:text-sm uppercase tracking-wider"
            >
              <DiscordIcon size={17} className="text-[#7289da]" />
              <span>{tr("Discord")}</span>
            </a>
            <a
              href="https://youtube.com/@bytearte"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white font-bold transition-colors text-xs sm:text-sm uppercase tracking-wider"
            >
              <Youtube size={17} className="text-red-500" />
              <span>{tr("YouTube")}</span>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4"
        >
          <div className="text-center md:text-left">
            <div>
              &copy; {new Date().getFullYear()} Byte Arte Software. {t.footer.rights}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              CNPJ: 68.731.745/0001-64
            </div>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-byte-cyan transition-colors font-tech text-[10px] tracking-widest uppercase cursor-pointer"
            >
              {t.footer.terms}
            </button>
          </div>
        </motion.div>
        
        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      </div>
    </footer>
  );
};
