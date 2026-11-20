'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, RotateCcw, Sparkles } from 'lucide-react';
import { Balloon } from './Balloon';
import { useCelebrate } from './Celebration';
import { SectionHead } from './SectionHead';
import { playChime, playPop } from '@/lib/sfx';

const BALLOONS = [
  { color: '#f0a4bd', position: 'balloon-0' },
  { color: '#c9b6ed', position: 'balloon-1' },
  { color: '#f7dca0', position: 'balloon-2' },
  { color: '#b8ddd4', position: 'balloon-3' },
];

export function CakeSection({ onNext }: { onNext: () => void }) {
  const celebrate = useCelebrate();
  const reduceMotion = useReducedMotion();
  const [popped, setPopped] = useState(() => BALLOONS.map(() => false));
  const [blown, setBlown] = useState([false, false, false]);
  const [wished, setWished] = useState(false);

  const allPopped = popped.every(Boolean);
  const allBlown = blown.every(Boolean);

  const popBalloon = (index: number) => {
    if (popped[index]) return;
    const next = popped.map((value, i) => (i === index ? true : value));
    setPopped(next);
    playPop();
    if (next.every(Boolean)) celebrate();
  };

  const blowCandle = (index: number) => {
    if (blown[index]) return;
    const next = blown.map((value, i) => (i === index ? true : value));
    setBlown(next);
    playPop();
    if (next.every(Boolean)) {
      setWished(true);
      playChime();
      celebrate();
    }
  };

  const blowAll = () => {
    if (allBlown) return;
    setBlown([true, true, true]);
    setWished(true);
    playChime();
    celebrate();
  };

  const reset = () => {
    setBlown([false, false, false]);
    setWished(false);
  };

  return (
    <section className="section birthday-section" id="birthday" aria-labelledby="birthday-title">
      <SectionHead
        id="birthday-title"
        kicker="hari ini semua tentang kamu"
        title={
          <>
            Selamat ulang tahun! <span aria-hidden="true">🎂</span>
          </>
        }
        copy="Satu putaran lagi mengelilingi matahari, satu alasan lagi untuk merayakan kamu."
      />

      <div className="party-scene">
        {BALLOONS.map((balloon, i) => (
          <motion.div
            key={balloon.color}
            className={`balloon-wrap ${balloon.position}`}
            animate={reduceMotion ? undefined : { y: [0, -16 - i * 3, 0], rotate: [-4 + i, 4 - i, -4 + i] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
          >
            {popped[i] ? (
              <span className="balloon-pop" aria-hidden="true">
                pop!
              </span>
            ) : (
              <button
                type="button"
                className="balloon-btn"
                onClick={() => popBalloon(i)}
                aria-label={`Letuskan balon ${i + 1}`}
              >
                <Balloon color={balloon.color} />
              </button>
            )}
          </motion.div>
        ))}

        <div className="cake" role="group" aria-label="Kue ulang tahun dengan tiga lilin">
          <div className="candle-row">
            {blown.map((isOut, i) => (
              <button
                key={i}
                type="button"
                className={`candle candle-${i + 1} ${isOut ? 'is-out' : ''}`}
                onClick={() => blowCandle(i)}
                disabled={isOut}
                aria-label={isOut ? `Lilin ${i + 1} sudah mati` : `Tiup lilin ${i + 1}`}
              >
                <span className="flame" aria-hidden="true" />
                <span className="smoke" aria-hidden="true" />
              </button>
            ))}
          </div>
          <span className="cake-layer cake-top" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cake-layer cake-middle" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="cake-layer cake-bottom" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cake-plate" aria-hidden="true" />
        </div>
      </div>

      <p className="scene-hint">
        {allPopped ? 'Balonnya habis! Sekarang tiup lilinnya satu-satu. 🎉' : 'Pencet balonnya, lalu tiup lilinnya satu-satu.'}
      </p>

      <div className="section-actions">
        {allBlown ? (
          <button type="button" className="pill-button pill-ghost" onClick={reset}>
            Tiup lagi <RotateCcw size={15} aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className="pill-button" onClick={blowAll}>
            Tiup semua lilin <Sparkles size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {wished && (
        <motion.p
          className="wish-result"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Semoga semua hal baik selalu menemukan jalan ke kamu.
        </motion.p>
      )}

      <button type="button" className="text-next" onClick={onNext}>
        Ada kata-kata kecil untukmu <ArrowDown size={15} aria-hidden="true" />
      </button>
    </section>
  );
}
