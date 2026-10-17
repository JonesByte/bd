import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProblemSolution: React.FC = () => {
  const { tr } = useLanguage();
  return (
    <section className="py-20 bg-byte-navy relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold text-white mb-4">
            {tr("POR QUE ESCOLHER O")} <span className="text-byte-cyan">BYTE DOWNLOADER</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {tr("A diferença é brutal. Veja o que separa uma ferramenta profissional dos sites amadores.")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* The Bad Way */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
              <XCircle className="w-8 h-8" />
              {tr("Sites & Outros Programas")}</h3>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-gray-300">
                <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>{tr("Limitam a qualidade a 1080p, mesmo quando o vídeo é 4K ou 8K.")}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>{tr("Não baixam 2k+ em formatos compatíveis para edição profissional.")}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>{tr("Sem opção de cortar trechos: você é obrigado a baixar o vídeo todo.")}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>{tr("Param de funcionar rápido e custa receber atualizações.")}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>{tr("Suporte inexistente: se algo der errado, é \"você com você mesmo\".")}</span>
              </li>
            </ul>
          </motion.div>

          {/* The Byte Way */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            className="relative p-8 rounded-2xl bg-byte-surface/80 border border-byte-cyan/30 backdrop-blur-sm shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 p-3 bg-byte-cyan text-byte-navy font-bold text-xs rounded-bl-xl rounded-tr-xl">
              {tr("RECOMENDADO")}</div>
            <h3 className="text-2xl font-bold text-byte-cyan mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              {tr("O Jeito Byte")}</h3>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-byte-cyan mt-1 flex-shrink-0" />
                <span><strong>{tr("Suíte Completa:")}</strong>  {tr("Baixe vídeos, thumbnails e fotos de qualquer site da internet.")}</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-byte-cyan mt-1 flex-shrink-0" />
                <span><strong>{tr("Qualidade Extrema:")}</strong>  {tr("Downloads em 4K/8K reais e compatíveis com editores .mp4.")}</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-byte-cyan mt-1 flex-shrink-0" />
                <span><strong>{tr("Playlists Inteligentes:")}</strong>  {tr("Escolha exatamente o que e como baixar de qualquer playlist.")}</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-byte-cyan mt-1 flex-shrink-0" />
                <span><strong>{tr("Corte de Trechos:")}</strong>  {tr("Baixe apenas a parte que interessa, direto da fonte.")}</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-byte-cyan mt-1 flex-shrink-0" />
                <span><strong>{tr("Ferramentas Integradas:")}</strong>  {tr("Conversor de formatos, transcrição de áudio e Upscale com IA local.")}</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-byte-cyan mt-1 flex-shrink-0" />
                <span><strong>{tr("Updates & Suporte:")}</strong>  {tr("Atualizações constantes e suporte direto com quem entende.")}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};