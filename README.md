# Kejutan Ulang Tahun 🎀

Website ucapan ulang tahun interaktif: surat, kue, kartu, kupon kado, dan confetti. Frontend-only, tanpa database atau backend.

## Menjalankan project

1. Install Node.js versi 20.9 atau lebih baru.
2. Buka terminal di folder project, lalu jalankan:

```bash
npm install
npm run dev
```

3. Buka **http://localhost:3002**

Port 3002 dipakai supaya tidak bentrok dengan project lain di port 3000/3001. Kalau perlu port lain, ubah flag `-p` di `package.json`.

## Personalisasi

Hampir semua isi hadiah ada di **`src/content.ts`**:

- `name` — nama yang berulang tahun (dipakai di judul, surat, dan footer).
- `letter` — isi surat yang muncul saat amplop dibuka.
- `wishes` — tiga kartu "buka kalau…". Ganti `icon`, `when`, `title`, dan `text`.
- `coupons` — kupon hadiah di dalam kado.
- `reasons` — daftar alasan di bagian "Kenapa kamu keren?".
- `music` — path file musik (default `public/music/birthday-song.mp3`).

Tips: ganti `name` dengan nama yang berulang tahun (otomatis dipakai di judul, surat, dan footer), lalu sesuaikan `from` dan `letter.signature`.

## Fitur

- Amplop interaktif yang membuka surat tulisan tangan.
- Balon bisa dipencet meletus, lilin bisa ditiup satu per satu.
- Kartu "buka kalau" dengan animasi flip 3D.
- Mesin alasan random.
- Kado berisi kupon hadiah.
- Confetti, sparkle saat klik, dan suara kecil (Web Audio, tanpa file tambahan).
- Musik latar dengan kontrol putar/jeda dan mute.
- Responsif, mendukung keyboard, `focus-visible`, dan `prefers-reduced-motion`.
- Open Graph image otomatis untuk preview saat link dibagikan.

## Build production

```bash
npm run build
npm start
```

Saat deploy, set `NEXT_PUBLIC_SITE_URL` ke domain asli supaya preview Open Graph memakai URL yang benar:

```bash
NEXT_PUBLIC_SITE_URL=https://domainkamu.com
```

## Catatan

- File musik sudah dikompres ke sekitar 2,5 MB. Ganti dengan lagu yang kamu punya hak untuk memakainya.
- Font dimuat lewat `next/font` (Google Fonts di-build saat proses build), jadi build pertama butuh koneksi internet.
- Website memakai `robots: noindex` karena ini halaman hadiah pribadi.
