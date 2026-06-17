import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#02060C] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-byte-purple/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-byte-cyan/10 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <img 
            src="/bd/bd-logo-expand.png"  
            alt="Byte Downloader Logo" 
            className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            referrerPolicy="no-referrer"
          />
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-byte-purple/20 blur-2xl -z-10 rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={onStart}
            className="group relative flex items-center gap-4 px-10 py-5 bg-transparent border-2 border-byte-purple/50 hover:border-byte-purple text-white font-tech font-black text-xl tracking-[0.2em] rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-byte-purple/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">INICIAR TOUR</span>
            <Play className="relative z-10 w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
          </button>
          
          <p className="text-gray-500 font-tech text-[10px] tracking-[0.4em] uppercase opacity-60">
            Clique para entrar na experiência
          </p>
        </motion.div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-purple/30 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-byte-cyan/30 to-transparent" />
    </motion.div>
  );
};
