import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const TwitterVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="video-demo" className="scroll-mt-32 pt-32 pb-20 bg-byte-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,240,255,0.05),transparent_45%,rgba(98,0,234,0.08))]"></div>
      <div className="mx-auto w-full max-w-[1760px] px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 text-byte-cyan font-tech text-[10px] md:text-xs tracking-[0.22em] uppercase mb-4">
            <Play className="w-4 h-4" /> Video real do Byte
          </div>
          <h2 className="text-3xl md:text-5xl font-tech font-black text-white mb-4">
            VEJA O BYTE <span className="text-byte-purple">FUNCIONANDO</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
            Antes de ver todas as telas, veja o programa em movimento. Isso mostra o que mais importa: ele existe, roda e entrega.
          </p>
        </motion.div>

        {/* Video Player Window - Segue exatamente as proporções 16:9 sem bordas sobressalentes ou elementos do X */}
        <div className="mx-auto w-full max-w-[860px]">
          <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
            <video
              ref={videoRef}
              src="/bd/byte-demo.mp4"
              poster="/bd/byte-demo-thumb.jpg"
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain bg-black"
            />

            {/* Custom Overlay Play Button quando pausado */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproduzir vídeo"
                className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/20 transition-all duration-300 z-10 cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-byte-purple/90 hover:bg-byte-purpleLight text-white flex items-center justify-center shadow-[0_0_30px_rgba(98,0,234,0.7)] transform hover:scale-110 transition-all">
                  <Play className="w-7 h-7 md:w-9 md:h-9 fill-current ml-1" />
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#pricing"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-byte-purple px-8 py-4 font-extrabold tracking-widest text-white transition-colors hover:bg-byte-purpleLight"
          >
            QUERO O BYTE AGORA
          </a>
        </div>
      </div>
    </section>
  );
};