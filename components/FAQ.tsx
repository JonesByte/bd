import React from 'react';
import { FAQS } from '../constants';

import { motion } from 'framer-motion';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 bg-byte-navy">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            className="text-3xl font-tech font-bold text-white mb-2"
          >
            PERGUNTAS <span className="text-byte-cyan">FREQUENTES</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
              className="bg-byte-surface border border-white/5 rounded-xl p-6 hover:border-byte-purple/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-byte-purple">?</span> {faq.question}
              </h3>
              <p className="text-gray-400 pl-6 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#pricing" style={{ fontFamily: "'Montserrat', sans-serif" }} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-byte-purple px-8 py-4 font-extrabold tracking-widest text-white transition-colors hover:bg-byte-purpleLight">
            TIRAR MINHA DUVIDA COMPRANDO
          </a>
        </div>
      </div>
    </section>
  );
};