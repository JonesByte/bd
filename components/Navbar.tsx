import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-2 shadow-lg' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <img 
            src="/bd/bd-logo-expand.png"
            alt="Byte Downloader Logo" 
            className="h-12 md:h-14 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-byte-cyan transition-colors font-tech font-bold text-xs tracking-widest">RECURSOS</a>
          <a href="#showcase" className="text-gray-300 hover:text-byte-cyan transition-colors font-tech font-bold text-xs tracking-widest">INTERFACE</a>
          <a href="#faq" className="text-gray-300 hover:text-byte-cyan transition-colors font-tech font-bold text-xs tracking-widest">DÚVIDAS</a>
          <button 
            onClick={() => {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo('#pricing');
              } else {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-2 bg-byte-purple hover:bg-byte-purpleLight text-white font-tech font-bold rounded-full transition-all shadow-lg shadow-byte-purple/30 hover:shadow-byte-purple/60 transform hover:-translate-y-0.5 text-xs tracking-wider"
          >
            BAIXAR
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#050C16] border-t border-gray-800 flex flex-col p-6 gap-6 shadow-2xl overflow-hidden"
          >
             <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-byte-cyan text-lg font-tech font-bold tracking-widest uppercase">Recursos</a>
            <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-byte-cyan text-lg font-tech font-bold tracking-widest uppercase">Interface</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-byte-cyan text-lg font-tech font-bold tracking-widest uppercase">Dúvidas</a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo('#pricing');
                } else {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-4 bg-byte-purple text-white font-tech font-bold rounded-lg shadow-lg tracking-widest"
            >
              BAIXAR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
