'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { content } from '@/content';

export function LetterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="letter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="letter-paper"
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
            onClick={(event) => event.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34, rotate: -1.6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotate: -0.6, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              className="letter-close"
              onClick={onClose}
              aria-label="Tutup surat"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <span className="washi washi-top" aria-hidden="true" />
            <p className="letter-kicker">surat kecil untukmu</p>
            <h2 id="letter-title" className="letter-greeting">
              Inova Anisatul Ikrima,
            </h2>
            <div className="letter-body">
              {content.letter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="letter-closing">{content.letter.closing}</p>
            <p className="letter-sign">{content.letter.signature}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
