'use client';

import { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Volume2, VolumeX } from 'lucide-react';
import { setSfxMuted } from '@/lib/sfx';

export function MusicDock({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : 0.38;
    setSfxMuted(muted);
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setFailed(true);
      setPlaying(false);
    };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (playing) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setFailed(true);
    }
  };

  return (
    <div className="dock">
      <button
        type="button"
        className="dock-btn dock-music"
        onClick={toggleMusic}
        aria-pressed={playing}
        aria-label={failed ? 'Musik belum tersedia' : playing ? 'Jeda musik' : 'Putar musik'}
        disabled={failed}
      >
        <span className="dock-icon" aria-hidden="true">
          {failed ? <Music2 size={16} /> : playing ? <Pause size={16} /> : <Music2 size={16} />}
        </span>
        <span className="equalizer" data-on={playing ? 'true' : 'false'} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="dock-label">
          {failed ? 'Musik belum ada' : playing ? 'Jeda musik' : 'Putar musik'}
        </span>
      </button>
      <button
        type="button"
        className="dock-btn dock-mute"
        onClick={() => setMuted((value) => !value)}
        aria-pressed={muted}
        aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
      >
        {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
      </button>
      <audio ref={audioRef} src={src} loop preload="metadata" />
    </div>
  );
}
