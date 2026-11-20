'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { content } from '@/content';
import { Balloon } from './Balloon';
import { useCelebrate } from './Celebration';
import { playChime } from '@/lib/sfx';

export function Hero({ opened, onOpen, onContinue }: { opened: boolean; onOpen: () => void; onContinue: () => void }) {
  const reduceMotion = useReducedMotion();
  const celebrate = useCelebrate();

  const openLetter = () => {
    celebrate();
    playChime();
    onOpen();
  };

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <span className="hero-spark hero-spark-a" aria-hidden="true">
        ✦
      </span>
      <span className="hero-spark hero-spark-b" aria-hidden="true">
        ✧
      </span>

      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <Sparkles size={13} aria-hidden="true" />
        {content.hero.eyebrow}
      </motion.span>

      <motion.h1
        id="hero-title"
        className="hero-title"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {content.name}
        <span aria-hidden="true"></span>
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {content.hero.subtitle}
      </motion.p>

      <div className="envelope-stage">
        <span className="envelope-glow" aria-hidden="true" />
        <motion.div
          className="envelope-float"
          animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <button
            type="button"
            className={`envelope ${opened ? 'is-open' : ''}`}
            onClick={openLetter}
            aria-haspopup="dialog"
            aria-label={opened ? 'Baca suratnya lagi' : 'Buka surat ulang tahun'}
          >
            <span className="envelope-back" aria-hidden="true" />
            <span className="letter-peek" aria-hidden="true">
              <strong>{content.name}</strong>
              <b>✧</b>
            </span>
            <span className="envelope-front" aria-hidden="true" />
            <span className="envelope-flap" aria-hidden="true" />
          </button>
        </motion.div>

        <motion.div
          className="hero-balloon hero-balloon-left"
          animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [-4, 3, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Balloon color="#f0a4bd" />
        </motion.div>
        <motion.div
          className="hero-balloon hero-balloon-right"
          animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [4, -3, 4] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <Balloon color="#c9b6ed" />
        </motion.div>
      </div>

      <div className="hero-actions">
        <AnimatePresence mode="wait" initial={false}>
          {opened ? (
            <motion.button
              key="next"
              type="button"
              className="pill-button"
              onClick={onContinue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              Lanjut ke pestanya <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
          ) : (
            <motion.button
              key="open"
              type="button"
              className="pill-button"
              onClick={openLetter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              Buka suratnya <Sparkles size={15} aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <button type="button" className="scroll-hint" onClick={onContinue}>
        <span>masih ada lagi di bawah</span>
        <ArrowDown size={15} aria-hidden="true" />
      </button>
    </section>
  );
}
