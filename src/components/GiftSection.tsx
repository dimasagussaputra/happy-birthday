'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Gift } from 'lucide-react';
import { content } from '@/content';
import { useCelebrate } from './Celebration';
import { SectionHead } from './SectionHead';
import { playChime } from '@/lib/sfx';

export function GiftSection({ onTop }: { onTop: () => void }) {
  const celebrate = useCelebrate();
  const [open, setOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const openGift = () => {
    setOpen(true);
    celebrate();
    playChime();
  };

  const toggleGift = () => {
    if (open) {
      setOpen(false);
      setNoteOpen(false);
      return;
    }
    openGift();
  };

  return (
    <section className="section gift-section" id="gift" aria-labelledby="gift-title">
      <SectionHead
        id="gift-title"
        kicker="psst… masih ada"
        title={
          <>
            Satu kado <em>kecil.</em>
          </>
        }
        copy="Sebuah pesan untuk menyemangati langkahmu di usia yang baru."
      />

      <button
        type="button"
        className={`gift-box ${open ? 'is-open' : ''}`}
        onClick={toggleGift}
        aria-expanded={open}
        aria-label={open ? 'Tutup kado' : 'Buka kado'}
      >
        <span className="gift-glow" aria-hidden="true" />
        <span className="gift-spark gift-spark-a" aria-hidden="true">
          ✦
        </span>
        <span className="gift-spark gift-spark-b" aria-hidden="true">
          ✧
        </span>
        <span className="gift-body" aria-hidden="true">
          <span className="gift-ribbon" />
        </span>
        <span className="gift-lid" aria-hidden="true">
          <span className="gift-ribbon" />
        </span>
        <span className="gift-bow" aria-hidden="true">
          <i />
          <i />
          <b />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="gift-message-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45 }}
          >
            <article className="gift-message" aria-label="Pesan ulang tahun untuk Inova">
              <span className="gift-message-tape" aria-hidden="true" />
              {content.giftMessage.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === content.giftMessage.length - 1 ? 'gift-message-emphasis' : undefined}
                >
                  {paragraph}
                </p>
              ))}
              <AnimatePresence>
                {noteOpen && (
                  <motion.aside
                    id="gift-message-note"
                    className="gift-message-note"
                    aria-label="Catatan kecil"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>{content.giftNote}</p>
                  </motion.aside>
                )}
              </AnimatePresence>
              <button
                type="button"
                className="gift-message-note-button"
                aria-expanded={noteOpen}
                aria-controls={noteOpen ? 'gift-message-note' : undefined}
                onClick={() => setNoteOpen((current) => !current)}
              >
                <span aria-hidden="true">📝</span>
                {noteOpen ? 'Tutup catatan' : 'Catatan kecil'}
              </button>
            </article>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-actions">
        <button type="button" className="pill-button" onClick={open ? onTop : openGift}>
          {open ? (
            <>
              Kembali ke atas <ArrowUp size={16} aria-hidden="true" />
            </>
          ) : (
            <>
              Buka kadonya <Gift size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
