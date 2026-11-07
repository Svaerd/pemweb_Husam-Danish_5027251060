# Products API (ExpressJS x PostgreSQL x Prisma)

API resource `products` dengan Express. Data disimpan di **PostgreSQL** melalui **Prisma** (ORM) — tidak lagi dalam array in-memory, sehingga data tetap tersimpan saat server dimulai ulang. Route dan controller tetap dipisah.

## Cara menjalankan

```bash
npm install

# 1. Jalankan PostgreSQL (contoh dengan Docker)
docker run -d --name pemweb-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16-alpine

# 2. Isi .env (lihat .env.example)
#    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/products_db?schema=public"

# 3. Migrasi skema + generate Prisma Client, lalu isi data awal
npx prisma migrate dev        # atau: npx prisma migrate deploy
npm run seed

npm start       # server berjalan di http://localhost:3000
```

Prisma Studio untuk melihat/memeriksa data langsung:

```bash
npx prisma studio   # buka http://localhost:5555
```

Pengujian otomatis (server harus sudah berjalan di terminal lain):

```bash
npm test
```

## .env

Salin `.env.example` menjadi `.env` dan sesuaikan `DATABASE_URL` bila perlu.

## Daftar Endpoint

| Method | Path             | Status    | Deskripsi                              |
|--------|------------------|-----------|----------------------------------------|
| GET    | `/products`      | 200       | Daftar semua produk                    |
| GET    | `/products/:id`  | 200 / 404 | Detail produk; 404 jika ID tidak ada  |
| POST   | `/products`      | 201 / 400 | Buat produk baru `{ name, price }`     |
| PUT    | `/products/:id`  | 200 / 400 / 404 | Ganti seluruh data produk        |
| DELETE | `/products/:id`  | 200 / 404 | Hapus produk                           |

## Contoh penggunaan (curl)

```bash
# Daftar produk
curl http://localhost:3000/products

# Detail produk
curl http://localhost:3000/products/1

# Buat produk baru (201)
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Monitor", "price": 2000000}'

# Perbarui produk (200)
curl -X PUT http://localhost:3000/products/4 \
  -H "Content-Type: application/json" \
  -d '{"name": "Monitor 24 inch", "price": 2500000}'

# Hapus produk (200)
curl -X DELETE http://localhost:3000/products/4
```

## Bukti pengujian

Transkrib respons HTTP aktual:
Semua test lulus ✔ 

## Struktur proyek

```
prisma/
├── schema.prisma                     # model Product (tabel "Product")
├── migrations/                       # riwayat migrasi skema database
└── seed.js                           # 3 data produk awal (npm run seed)
src/
├── app.js                            # konfigurasi Express, mount route
├── server.js                         # entry point (listen di port 3000)
├── routes/products.routes.js         # pemetaan method+URL -> controller
└── controllers/products.controller.js # logika CRUD via PrismaClient
test.js                               # pengujian semua endpoint
```

## Alur request–response (ExpressJS → Prisma → PostgreSQL)

1. Request masuk ke `app.js` → middleware `express.json()` membaca body.
2. Router (`routes/products.routes.js`) mencocokkan method + URL.
3. Controller (`controllers/products.controller.js`) memanggil PrismaClient.
4. Prisma menerjemahkan panggilan (`prisma.product.findMany()`, `create()`, ...) menjadi SQL dan menjalankannya di PostgreSQL.
5. Controller mengirim response JSON dengan status yang sesuai (200 / 201 / 400 / 404).

## Migration

Struktur database dikelola lewat `npx prisma migrate dev --name <nama>`:

```
prisma/migrations/202xxxx_init/migration.sql   # CREATE TABLE "Product"
```

- Setiap perubahan `schema.prisma` dimigrasikan sebagai langkah terpisah yang terekam, sehingga mudah melacak perubahan struktur.
- Eksekusi migrasi dilakukan via CLI, bukan langsung mengetik SQL di database, supaya SQL sudah diedit dulu.
- Rollback: edit `schema.prisma` (misal hapus kolom) lalu buat migrasi baru lagi — Prisma akan menulis SQL DOWN.

## Prisma Studio

Untuk memeriksa isi tabel dengan antarmuka visual:

```bash
npx prisma studio
```

## CQRS singkat + pencarian teks

- Pemisahan baca (query) dan tulis (command) mengarah pada pemisahan performa query vs proses tulis, dan memudahkan optimasi terpisah (mis. full-text search).
- PostgreSQL `pg_trgm` untuk pencarian teks mirip:
  ```sql
  CREATE EXTENSION IF NOT EXISTS pg_trgm;
  CREATE INDEX idx_product_name_trgm ON "Product" USING GIN (name gin_trgm_ops);
  SELECT * FROM "Product" WHERE name ILIKE '%mon%';
  ```
