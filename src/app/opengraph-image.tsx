import { ImageResponse } from 'next/og';
import { content } from '@/content';

export const alt = `Kejutan ulang tahun untuk ${content.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(140deg, #fff1f5 0%, #ffe2ec 55%, #fffaf6 100%)',
          color: '#8f3f5e',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#b4557a',
          }}
        >
          sebuah kejutan kecil
        </div>
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 800, marginTop: 22, letterSpacing: -2 }}>
          Selamat Ulang Tahun
        </div>
        <div style={{ display: 'flex', fontSize: 48, marginTop: 6, color: '#b4557a' }}>{content.name}</div>
        <div style={{ display: 'flex', gap: 20, marginTop: 42, fontSize: 26, color: '#7d5566' }}>
          <span>surat</span>
          <span>·</span>
          <span>kue</span>
          <span>·</span>
          <span>kartu</span>
          <span>·</span>
          <span>kado</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
