import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const TWEET_URL = 'https://x.com/JonesByte/status/2077173663825068373?s=20';

export const TwitterVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTweet = () => {
      const twttr = (window as any).twttr;
      if (twttr?.widgets && containerRef.current) {
        twttr.widgets.load(containerRef.current);
      }
    };

    if ((window as any).twttr?.widgets) {
      loadTweet();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://platform.twitter.com/widgets.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', loadTweet, { once: true });
      return () => existingScript.removeEventListener('load', loadTweet);
    }

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.onload = loadTweet;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="video-demo" className="py-24 bg-byte-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,240,255,0.05),transparent_45%,rgba(98,0,234,0.08))]"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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

        <div ref={containerRef} className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#081426] p-3 md:p-8 min-h-[560px] md:min-h-[680px] flex items-center justify-center [&_iframe]:!w-full [&_iframe]:!max-w-none">
          <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true" data-align="center" data-width="900">
            <a href={TWEET_URL}>Ver video do Byte Downloader no X</a>
          </blockquote>
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