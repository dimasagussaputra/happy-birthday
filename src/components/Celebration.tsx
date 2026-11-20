'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Piece = {
  left: number;
  delay: number;
  duration: number;
  color: string;
  w: number;
  h: number;
  drift: number;
  rotate: number;
  round: boolean;
};

type Burst = { id: number; pieces: Piece[] };

const COLORS = ['#e88eaa', '#f6c7d5', '#f7dca0', '#bfe3d0', '#c9b6ed', '#b4557a'];
const CelebrationContext = createContext<() => void>(() => {});

export function useCelebrate() {
  return useContext(CelebrationContext);
}

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);

  const celebrate = useCallback(() => {
    if (reduced || typeof window === 'undefined') return;
    const id = ++idRef.current;
    const count = window.innerWidth < 640 ? 34 : 62;
    const pieces: Piece[] = Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.55,
      duration: 2.2 + Math.random() * 1.7,
      color: COLORS[i % COLORS.length],
      w: 5 + Math.random() * 5,
      h: 8 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 160,
      rotate: (Math.random() - 0.5) * 900,
      round: i % 4 === 0,
    }));
    setBursts((old) => [...old, { id, pieces }]);
    const timer = window.setTimeout(() => {
      setBursts((old) => old.filter((burst) => burst.id !== id));
    }, 4400);
    timers.current.push(timer);
  }, [reduced]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <CelebrationContext.Provider value={celebrate}>
      {children}
      <div className="confetti-layer" aria-hidden="true">
        <AnimatePresence>
          {bursts.map((burst) => (
            <motion.div
              key={burst.id}
              className="confetti-burst"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {burst.pieces.map((piece, i) => (
                <motion.i
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${piece.left}vw`,
                    width: piece.w,
                    height: piece.h,
                    background: piece.color,
                    borderRadius: piece.round ? '999px' : '2px',
                  }}
                  initial={{ y: '-12vh', x: 0, rotate: 0, opacity: 1 }}
                  animate={{ y: '112vh', x: piece.drift, rotate: piece.rotate, opacity: [1, 1, 0] }}
                  transition={{ duration: piece.duration, delay: piece.delay, ease: 'linear' }}
                />
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CelebrationContext.Provider>
  );
}
