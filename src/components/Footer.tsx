import { content } from '@/content';

export function Footer({ onOpenLetter }: { onOpenLetter: () => void }) {
  return (
    <footer className="footer">
      <div className="footer-stars" aria-hidden="true">
        ✨ 🌟 ✨
      </div>
      <p className="footer-copy">Selamat ulang tahun! Semoga semua harapan baikmu terwujud.</p>
      <strong className="footer-name">
        {content.name} <span aria-hidden="true">✨</span>
      </strong>
      <p className="footer-sign">Dari, {content.from}</p>
      <button type="button" className="soft-button" onClick={onOpenLetter}>
        Baca suratnya lagi
      </button>
      <small>Ucapan ulang tahun khusus untukmu</small>
    </footer>
  );
}
