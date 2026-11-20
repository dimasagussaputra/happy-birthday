'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Ambient } from '@/components/Ambient';
import { CakeSection } from '@/components/CakeSection';
import { CelebrationProvider } from '@/components/Celebration';
import { Footer } from '@/components/Footer';
import { GiftSection } from '@/components/GiftSection';
import { Hero } from '@/components/Hero';
import { LetterModal } from '@/components/LetterModal';
import { Loader } from '@/components/Loader';
import { MusicDock } from '@/components/MusicDock';
import { ReasonMachine } from '@/components/ReasonMachine';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SparkleTrail } from '@/components/SparkleTrail';
import { WishCards } from '@/components/WishCards';
import { content } from '@/content';

export default function Home() {
  return (
    <CelebrationProvider>
      <BirthdayPage />
    </CelebrationProvider>
  );
}

function BirthdayPage() {
  const [loading, setLoading] = useState(true);
  const [letterOpen, setLetterOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const letterTimer = useRef<number | null>(null);

  const completeLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      if (letterTimer.current) window.clearTimeout(letterTimer.current);
    };
  }, []);

  const openLetter = useCallback(() => {
    setOpened(true);
    if (letterTimer.current) window.clearTimeout(letterTimer.current);
    letterTimer.current = window.setTimeout(() => setLetterOpen(true), 320);
  }, []);

  const closeLetter = useCallback(() => setLetterOpen(false), []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <Loader show={loading} onComplete={completeLoading} />
      <ScrollProgress />
      <Ambient />
      <SparkleTrail />
      <MusicDock src={content.music} />
      <main id="main">
        <Hero opened={opened} onOpen={openLetter} onContinue={() => scrollTo('birthday')} />
        <CakeSection onNext={() => scrollTo('wishes')} />
        <WishCards onNext={() => scrollTo('gift')} />
        <ReasonMachine />
        <GiftSection onTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <Footer onOpenLetter={openLetter} />
      </main>
      <LetterModal open={letterOpen} onClose={closeLetter} />
    </>
  );
}
