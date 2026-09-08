import React, { useState } from 'react';
import { Youtube, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { TermsModal } from './TermsModal';

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
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="bg-[#020609] pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12"
        >
          
          <div className="text-center md:text-left">
            <img 
              src="/bd/bd-logo-expand.png"
              alt="Byte Downloader Logo" 
              className="h-14 w-auto object-contain mb-4 mx-auto md:mx-0"
              referrerPolicy="no-referrer"
            />
            <p className="text-gray-500 text-sm max-w-sm mb-2">
              Ferramentas visionárias para quem não aceita limites.
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 justify-center md:justify-start">
              <span className="text-gray-500">Suporte:</span>
              <a href="mailto:byteartecomercial@gmail.com" className="text-byte-cyan hover:underline font-medium">
                byteartecomercial@gmail.com
              </a>
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <a 
              href="mailto:byteartecomercial@gmail.com" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-byte-cyan/40 text-gray-200 hover:text-white font-bold transition-all text-sm group"
            >
              <Mail size={18} className="text-byte-cyan group-hover:scale-110 transition-transform" />
              <span>byteartecomercial@gmail.com</span>
            </a>
            <a href="https://discord.gg/RWWGkeVCRC" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-all text-sm">
              <DiscordIcon size={18} /> Suporte no Discord
            </a>
            <a href="https://youtube.com/@bytearte" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-all text-sm">
              <Youtube size={18} /> Canal Oficial
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
          <div>
            &copy; {new Date().getFullYear()} Byte Arte Software. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-byte-cyan transition-colors font-tech text-[10px] tracking-widest uppercase"
            >
              Termo de Responsabilidade
            </button>
          </div>
        </motion.div>
        
        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      </div>
    </footer>
  );
};
