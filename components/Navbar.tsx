import React, { useState, useEffect } from 'react';
import { Building2, ChevronRight, Info, Mail, Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { TermsModal } from './TermsModal';

const LANGUAGE_LABELS = ['IDIOMA', 'LANGUAGE', 'LÍNGUA', 'LENGUA'] as const;

type InfoModalType = 'about' | 'company' | null;

export const Navbar: React.FC = () => {
  const { tr, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langLabelIdx, setLangLabelIdx] = useState(0);
  const [termsOpen, setTermsOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setLangLabelIdx(0);
      return;
    }
    const interval = window.setInterval(() => {
      setLangLabelIdx((prev) => (prev + 1) % LANGUAGE_LABELS.length);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !infoModal) return;
    document.body.classList.add('overflow-hidden');
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (infoModal) setInfoModal(null);
        else setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen, infoModal]);

  const navigateTo = (target: string) => {
    setMenuOpen(false);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(target, { duration: 0.75 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t.sections.hero, target: '#hero' },
    { label: t.navbar.features, target: '#features' },
    { label: t.navbar.showcase, target: '#showcase' },
    { label: t.navbar.feedbacks, target: '#feedbacks' },
    { label: t.navbar.faq, target: '#faq' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding,backdrop-filter] duration-300 ${
          isScrolled
            ? 'bg-[#050C16]/90 backdrop-blur-md border-b border-white/10 py-2.5'
            : 'bg-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo ampliada suavemente */}
          <button
            type="button"
            className="flex items-center cursor-pointer focus:outline-none"
            onClick={() => navigateTo('#hero')}
            aria-label={tr('Byte Downloader Logo')}
          >
            <img
              src="/bd/bd-logo-expand.png"
              alt={tr('Byte Downloader Logo')}
              className="h-[52px] sm:h-[56px] md:h-[60px] w-auto object-contain transition-all"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Hambúrguer minimalista de duas linhas (estilo Rockstar) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? tr('Fechar menu') : tr('Abrir menu')}
            aria-expanded={menuOpen}
            className="group w-12 h-12 -mr-2 flex flex-col items-center justify-center gap-[7px] rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <span className="block w-7 h-[3px] rounded-full bg-white group-hover:bg-byte-cyan transition-colors" />
            <span className="block w-7 h-[3px] rounded-full bg-white group-hover:bg-byte-cyan transition-colors" />
          </button>
        </div>
      </motion.nav>

      {/* Drawer lateral direito (estilo Rockstar Games) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[120] bg-[#030712]/70 backdrop-blur-md flex justify-end"
            role="dialog"
            aria-modal="true"
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px] h-full bg-[#060d1b] border-l border-white/10 p-6 sm:p-9 flex flex-col justify-between overflow-y-auto"
            >
              {/* Topo do Drawer */}
              <div className="flex items-center justify-between gap-4">
                <img
                  src="/bd/bd-logo-expand.png"
                  alt={tr('Byte Downloader Logo')}
                  className="h-9 sm:h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={tr('Fechar menu')}
                  className="w-10 h-10 rounded-full bg-white/[0.07] hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links grandes estilo editorial */}
              <nav className="my-6 flex flex-col gap-1.5" aria-label={tr('Menu principal')}>
                {navLinks.map((item) => (
                  <button
                    key={item.target}
                    type="button"
                    onClick={() => navigateTo(item.target)}
                    className="group w-full py-3 px-2 flex items-center justify-between text-left border-b border-white/[0.06] text-2xl sm:text-[26px] font-tech font-black uppercase tracking-wide text-white/85 hover:text-byte-cyan transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-byte-cyan group-hover:translate-x-1 transition-all" />
                  </button>
                ))}

                {/* Links institucionais: Termos, Sobre e Empresa */}
                <div className="pt-4 px-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setInfoModal('about');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-tech font-semibold uppercase tracking-[0.14em] text-gray-400 hover:text-byte-cyan transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{tr('Sobre')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setInfoModal('company');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-tech font-semibold uppercase tracking-[0.14em] text-gray-400 hover:text-byte-cyan transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{tr('Empresa')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setTermsOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-tech font-semibold uppercase tracking-[0.14em] text-gray-400 hover:text-byte-cyan transition-colors cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{tr('Termos')}</span>
                  </button>
                </div>
              </nav>

              {/* Rodapé do Drawer: CTA + Idioma */}
              <div className="space-y-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigateTo('#pricing')}
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
                  className="w-full py-4 rounded-full bg-byte-purple hover:bg-byte-purpleLight text-white font-extrabold text-sm sm:text-base tracking-[0.12em] uppercase transition-all cursor-pointer"
                >
                  {t.navbar.cta}
                </button>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <div className="relative h-6 flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={LANGUAGE_LABELS[langLabelIdx]}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm sm:text-base font-tech font-semibold uppercase tracking-[0.18em] text-gray-200 select-none"
                      >
                        {LANGUAGE_LABELS[langLabelIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <LanguageSelector direction="up" />
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Termos */}
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

      {/* Modal minimalista de Sobre & Empresa */}
      <AnimatePresence>
        {infoModal && (
          <div
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfoModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-[#0A101F] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center gap-2.5">
                  {infoModal === 'about' ? (
                    <Info className="w-5 h-5 text-byte-cyan shrink-0" />
                  ) : (
                    <Building2 className="w-5 h-5 text-byte-cyan shrink-0" />
                  )}
                  <h2 className="font-tech font-bold text-sm sm:text-lg uppercase tracking-wider text-white">
                    {infoModal === 'about' ? tr('Sobre o Byte Downloader') : tr('Sobre a Empresa')}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setInfoModal(null)}
                  aria-label={tr('Fechar')}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {infoModal === 'about' ? (
                <div className="p-5 sm:p-7 space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  <p>
                    {tr('O Byte Downloader nasceu para eliminar a rotina de abrir vários sites e pagar múltiplas assinaturas só para baixar, melhorar e editar vídeos.')}
                  </p>
                  <p>
                    {tr('Em um único aplicativo para Windows 10/11 integrado ao Adobe Premiere Pro e After Effects, ele reúne 35+ ferramentas reais: downloads em até 8K, Upscaling 4K com IA local, AutoCut, 101+ transições, legendas com IA, separação de áudio, mixer LUFS, conversor universal e assistente de IA.')}
                  </p>
                  <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                    <span>{tr('Criado por')} <strong className="text-white">Jones Byte</strong></span>
                    <span className="text-byte-cyan font-tech font-semibold uppercase tracking-wider">{tr('Licença Vitalícia · Windows 10/11')}</span>
                  </div>
                </div>
              ) : (
                <div className="p-5 sm:p-7 space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  <p>
                    {tr('O Byte Downloader é desenvolvido e mantido oficialmente pela Byte Arte Software, focada em ferramentas de alta performance para editores e criadores de conteúdo.')}
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">{tr('Razão Social / Marca')}</span>
                      <span className="text-white font-semibold">Byte Arte Software</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">CNPJ</span>
                      <span className="text-white font-mono font-semibold">68.731.745/0001-64</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">{tr('Contato Oficial')}</span>
                      <a
                        href="mailto:byteartecomercial@gmail.com"
                        className="inline-flex items-center gap-1.5 text-byte-cyan hover:text-white transition-colors font-semibold"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>byteartecomercial@gmail.com</span>
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {tr('Todas as compras contam com garantia legal de 7 dias, suporte oficial na comunidade do Discord e atualizações automáticas inclusas.')}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
