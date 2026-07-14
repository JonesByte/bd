import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const TWEET_ID = '2077173663825068373';
const TWEET_EMBED_URL = `https://platform.twitter.com/embed/Tweet.html?id=${TWEET_ID}&theme=dark&dnt=true&hideThread=true&width=600`;

export const TwitterVideo: React.FC = () => {
  return (
    <section id="video-demo" className="py-24 bg-byte-navy relative overflow-hidden">
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

        <div className="mx-auto w-full max-w-[1500px] rounded-2xl border border-white/10 bg-[#081426] p-2 md:p-5">
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl bg-[#050C16]">
            <iframe
              title="Video do Byte Downloader no X"
              src={TWEET_EMBED_URL}
              className="absolute left-1/2 top-1/2 h-[760px] w-[600px] min-w-[600px] -translate-x-1/2 -translate-y-[34%] scale-[1.22] sm:scale-[1.48] md:scale-[1.82] xl:scale-[2.18] rounded-xl border-0 bg-transparent"
              loading="lazy"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            />
            <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-byte-cyan/30 bg-black/55 px-3 py-1 text-[10px] font-black tracking-widest text-byte-cyan">
              FRAME 1080P
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-byte-purple px-8 py-4 font-black tracking-widest text-white transition-colors hover:bg-byte-purpleLight">
            QUERO O BYTE AGORA <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};