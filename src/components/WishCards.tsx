'use client';

import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { content } from '@/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function WishCards({ onNext }: { onNext: () => void }) {
  const [openCards, setOpenCards] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenCards((old) => (old.includes(index) ? old.filter((i) => i !== index) : [...old, index]));
  };

  return (
    <section className="section wishes-section" id="wishes" aria-labelledby="wishes-title">
      <Reveal>
        <SectionHead
          id="wishes-title"
          kicker="buka kapan pun kamu butuh"
          title={
            <>
              Kartu kecil, <em>semangat besar.</em>
            </>
          }
          copy="Pilih satu, atau buka semuanya. Nggak ada aturan mainnya."
        />
      </Reveal>

      <div className="wish-grid">
        {content.wishes.map((wish, i) => {
          const isOpen = openCards.includes(i);
          return (
            <button
              key={wish.title}
              type="button"
              className={`wish-card wish-card-${i + 1} ${isOpen ? 'is-open' : ''}`}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-label={wish.title}
            >
              <span className="wish-inner">
                <span className="wish-face wish-front" aria-hidden={isOpen}>
                  <span className="wish-tape" aria-hidden="true" />
                  <span className="wish-icon" aria-hidden="true">
                    {wish.icon}
                  </span>
                  <span className="wish-when">{wish.when}</span>
                  <strong className="wish-title">{wish.title}</strong>
                  <span className="wish-hint">klik untuk buka ✨</span>
                </span>
                <span className="wish-face wish-back" aria-hidden={!isOpen}>
                  <span className="wish-icon wish-icon-small" aria-hidden="true">
                    {wish.icon}
                  </span>
                  <span className="wish-text">{wish.text}</span>
                  <span className="wish-hint">klik untuk tutup</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button type="button" className="text-next" onClick={onNext}>
        Ada satu kejutan lagi <ArrowDown size={15} aria-hidden="true" />
      </button>
    </section>
  );
}
