# React Template — Pemrograman Web

Template environment praktikum Pemrograman Web menggunakan **React, TypeScript, Vite, React Router, dan Tailwind CSS**. Mahasiswa menggunakan template ini sebagai fondasi repository tugas masing-masing, lalu mengembangkan fitur sesuai instruksi perkuliahan.

## Membuat repository tugas

1. Buka [react-template](https://github.com/anasmcfudy/react-template).
2. Pilih **Use this template → Create a new repository**.
3. Isi nama repository tugas pada akun GitHub sendiri.
4. Clone repository yang baru dibuat ke komputer.

```sh
git clone https://github.com/USERNAME/NAMA-REPOSITORY.git
cd NAMA-REPOSITORY
npm ci
npm run dev
```

Ganti `USERNAME` dan `NAMA-REPOSITORY` dengan akun serta nama repository tugas sendiri. Perubahan dan pengumpulan tugas dilakukan di repository tersebut.

Untuk sekadar mencoba template dosen:

```sh
git clone https://github.com/anasmcfudy/react-template.git
cd react-template
npm ci
npm run dev
```

Gunakan Node.js **22.12 atau lebih baru** dan npm. Buka alamat yang ditampilkan Vite, biasanya `http://127.0.0.1:5173`.

## Yang sudah tersedia

- Konfigurasi React dan TypeScript dengan pemeriksaan tipe `strict`.
- Vite sebagai development server dan build tool.
- React Router dengan nested route serta layout yang menggunakan `Outlet`.
- Tailwind CSS v4 melalui PostCSS, CSS Modules, dan token tema.
- Contoh setiap tingkat Atomic Design: `Button`, `ProductCard`, `ProductGrid`, `PageLayout`, dan `ProductsPage`.
- Contoh komunikasi API GET dengan pemisahan model, parameter, source, dan repository.
- ESLint, Prettier, unit test, dan konfigurasi tes browser Playwright.

Saat dibuka, halaman menampilkan **satu produk contoh: Pulpen**. Tombol **Pilih produk** memperlihatkan callback dari kartu ke state halaman. Tidak ada request API otomatis dan belum ada penyimpanan melalui localStorage.

Template ini menyediakan environment serta contoh dasar. Fitur tugas seperti CRUD lengkap, pencarian, detail produk, halaman tambahan, dan 404 dikembangkan mahasiswa sesuai instruksi dosen.

## Struktur proyek

```text
app/
  entry.tsx             # Entry browser dan BrowserRouter
  globals.css           # Import Tailwind dan CSS global
  routes.tsx            # Deklarasi route
  page.tsx              # Pembungkus halaman root
  products/page.tsx      # Pembungkus halaman produk
src/
  components/
    atoms/              # Button
    molecules/          # ProductCard
    organisms/          # ProductGrid
    templates/          # PageLayout dan Outlet
    pages/              # State serta koordinasi halaman
  data/product/
    model/
    param/
    source/
    repository/
  styles/
  types/
  utils/
tests/
```

Alur props: `ProductsPage → ProductGrid → ProductCard → Button`. Callback berjalan kembali menuju pemilik state.

Folder `app` tetap menggunakan Vite. Nama `page.tsx` tidak otomatis membentuk route; daftarkan setiap URL di `app/routes.tsx`. Route `/` saat ini mengarahkan ke `/products`, begitu juga URL yang belum dikenali. Ubah fallback tersebut saat tugas meminta halaman 404. Hosting produksi perlu mendukung fallback SPA ke `index.html`.

## Mencoba GET API (opsional)

Aplikasi dapat berjalan dengan produk contoh tanpa backend. Untuk mencoba tombol **Muat dari API**:

```sh
cp .env.example .env.local
```

Sesuaikan alamat backend di `.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:3000/api
```

Restart Vite setelah mengubah konfigurasi. Tombol akan meminta `GET http://localhost:3000/api/products`. Backend harus mengizinkan origin frontend melalui CORS.

Response yang diharapkan adalah **array langsung**:

```json
[{ "id": 1, "name": "Pulpen", "price": 5000 }]
```

Jika backend menggunakan format lain, misalnya `{ "data": [...] }`, sesuaikan pemetaan di repository. Variabel `VITE_*` masuk ke aplikasi browser, jadi jangan menyimpan token atau secret privat di dalamnya. Berkas `.env.local` tidak ikut dipublikasikan.

## Perintah yang tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan aplikasi untuk pengembangan |
| `npm run typecheck` | Memeriksa tipe TypeScript |
| `npm run lint` | Memeriksa aturan kode |
| `npm test` | Menjalankan unit test |
| `npm run build` | Memeriksa tipe dan membuat build produksi |
| `npm run preview` | Melihat hasil build secara lokal |
| `npm run test:e2e` | Menjalankan tes browser |
| `npm run format` | Memformat berkas dengan Prettier |

Tes browser menggunakan Google Chrome yang terpasang dan memerlukan port 5173 yang belum dipakai. Request API pada tes di-mock, sehingga tidak memerlukan backend aktif.

## Mengembangkan tugas

Gunakan komponen yang tersedia sebagai contoh, lalu tambahkan fitur sesuai kebutuhan tugas. Pertahankan pemisahan tanggung jawab komponen, gunakan props/callback dengan jelas, dan tempatkan state bersama di atas halaman yang memakainya.

Mahasiswa harus dapat menjelaskan kode yang dikumpulkan, termasuk bagian yang dibuat dengan bantuan AI. Sesuaikan README pada repository tugas dengan fitur dan cara menjalankan aplikasi masing-masing.
