'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { content } from '@/content';
import { SectionHead } from './SectionHead';
import { playChime } from '@/lib/sfx';

export function ReasonMachine() {
  const [index, setIndex] = useState(0);

  const nextReason = () => {
    if (content.reasons.length < 2) return;
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * content.reasons.length);
    }
    setIndex(next);
    playChime();
  };

  return (
    <section className="section reason-section" aria-labelledby="reason-title">
      <SectionHead id="reason-title" kicker="harapan untuk usia baru" title="Semoga tahun ini..." />
      <div className="reason-box">
        <span className="reason-quote" aria-hidden="true">
          “
        </span>
        <div className="reason-text" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {content.reasons[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <button type="button" className="soft-button" onClick={nextReason}>
          Harapan berikutnya <RefreshCw size={14} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
