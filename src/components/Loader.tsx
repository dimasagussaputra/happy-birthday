'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export const LOADER_DURATION_MS = 3000;

export function Loader({ show, onComplete }: { show: boolean; onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;

    setProgress(0);
    const startedAt = Date.now();
    let completionTimer: number | null = null;
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.floor(((Date.now() - startedAt) / LOADER_DURATION_MS) * 100));
      setProgress(next);
      if (next === 100) {
        window.clearInterval(interval);
        completionTimer = window.setTimeout(onComplete, 200);
      }
    }, 30);

    return () => {
      window.clearInterval(interval);
      if (completionTimer !== null) window.clearTimeout(completionTimer);
    };
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <motion.div
            className="loader-bunny"
            aria-hidden="true"
            animate={reduced ? undefined : { y: [0, -12, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🐰
          </motion.div>
          <motion.div
            className="loader-star"
            aria-hidden="true"
            animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌟
          </motion.div>
          <p className="loader-title">Sebentar ya…</p>
          <p className="loader-sub">lagi menyiapkan kejutan kecil untukmu</p>
          <p className="loader-percent" aria-hidden="true">
            {progress}%
          </p>
          <div
            className="loading-track"
            role="progressbar"
            aria-label="Menyiapkan kejutan ulang tahun"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="loading-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loading-sparkles" aria-hidden="true">
            ✦ ✨ ✧ ✿ 🌟
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
