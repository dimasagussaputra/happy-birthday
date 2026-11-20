'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Spark = {
  id: number;
  batch: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
  size: number;
  color: string;
  char: string;
};

const CHARS = ['✨', '✦', '✧', '❀'];
const COLORS = ['#e88eaa', '#d99bc4', '#e0a63c', '#9c7bbf'];

export function SparkleTrail() {
  const reduced = useReducedMotion();
  const [sparks, setSparks] = useState<Spark[]>([]);
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      const batch = ++idRef.current;
      const items = Array.from({ length: 4 }, (_, i): Spark => ({
        id: batch * 10 + i,
        batch,
        x: event.clientX + (Math.random() - 0.5) * 26,
        y: event.clientY + (Math.random() - 0.5) * 18,
        dx: (Math.random() - 0.5) * 70,
        dy: -34 - Math.random() * 42,
        rotate: (Math.random() - 0.5) * 140,
        size: 13 + Math.random() * 11,
        color: COLORS[i % COLORS.length],
        char: CHARS[i % CHARS.length],
      }));
      setSparks((old) => [...old, ...items].slice(-36));
      const timer = window.setTimeout(() => {
        setSparks((old) => old.filter((spark) => spark.batch !== batch));
      }, 900);
      timers.current.push(timer);
    };
    window.addEventListener('pointerdown', onPointerDown);
    const list = timers.current;
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      list.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced]);

  return (
    <div className="spark-layer" aria-hidden="true">
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="spark"
          style={{ left: spark.x, top: spark.y, color: spark.color, fontSize: spark.size }}
          initial={{ opacity: 0.95, scale: 0.5, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, scale: 1.25, x: spark.dx, y: spark.dy, rotate: spark.rotate }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          {spark.char}
        </motion.span>
      ))}
    </div>
  );
}
