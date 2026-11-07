// Bukti pengujian: GET /products, GET /products/:id, 404, POST (201 & 400),
// PUT /products/:id (200 & 404), DELETE /products/:id (200 & 404).
// Jalankan: npm start di satu terminal, lalu `node test.js` (atau npm test).
const assert = require("node:assert/strict");

const BASE = "http://localhost:3000";

async function main() {
  // 1. GET /products — daftar produk, status 200
  const listRes = await fetch(`${BASE}/products`);
  const list = await listRes.json();
  assert.equal(listRes.status, 200);
  assert.ok(Array.isArray(list) && list.length === 3, "daftar produk berupa array 3 item");
  console.log("PASS  GET /products        -> 200, array,", list.length, "produk");

  // 2. GET /products/1 — detail produk, status 200
  const oneRes = await fetch(`${BASE}/products/1`);
  const one = await oneRes.json();
  assert.equal(oneRes.status, 200);
  assert.equal(one.name, "Laptop");
  console.log("PASS  GET /products/1      -> 200,", JSON.stringify(one));

  // 3. GET /products/999 — ID tidak ditemukan, status 404
  const nfRes = await fetch(`${BASE}/products/999`);
  const nf = await nfRes.json();
  assert.equal(nfRes.status, 404);
  assert.equal(nf.message, "Product not found");
  console.log("PASS  GET /products/999    -> 404,", JSON.stringify(nf));

  // 4. POST /products — produk baru, status 201
  const postRes = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Monitor", price: 2000000 }),
  });
  const created = await postRes.json();
  assert.equal(postRes.status, 201);
  assert.equal(created.name, "Monitor");
  assert.equal(created.price, 2000000);
  assert.ok(created.id, "produk baru punya id");
  console.log("PASS  POST /products       -> 201,", JSON.stringify(created));

  // 5. Verifikasi produk baru muncul di daftar
  const list2Res = await fetch(`${BASE}/products`);
  const list2 = await list2Res.json();
  assert.equal(list2.length, 4);
  console.log("PASS  GET /products        -> 200, sekarang", list2.length, "produk");

  // 6. POST /products — body tidak valid, status 400
  const badRes = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", price: "gratis" }),
  });
  assert.equal(badRes.status, 400);
  console.log("PASS  POST /products (invalid) -> 400");

  // 7. PUT /products/4 — perbarui produk hasil POST, status 200
  const putRes = await fetch(`${BASE}/products/${created.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Monitor 24 inch", price: 2500000 }),
  });
  const updated = await putRes.json();
  assert.equal(putRes.status, 200);
  assert.equal(updated.name, "Monitor 24 inch");
  assert.equal(updated.price, 2500000);
  console.log("PASS  PUT /products/:id      -> 200,", JSON.stringify(updated));

  // 8. PUT /products/999 — ID tidak ditemukan, status 404
  const putNfRes = await fetch(`${BASE}/products/999`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "X", price: 1 }),
  });
  assert.equal(putNfRes.status, 404);
  console.log("PASS  PUT /products/999      -> 404,", JSON.stringify(await putNfRes.json()));

  // 9. Verifikasi perubahan PUT tersimpan di database
  const verifyRes = await fetch(`${BASE}/products/${created.id}`);
  assert.equal(verifyRes.status, 200);
  assert.equal((await verifyRes.json()).name, "Monitor 24 inch");
  console.log("PASS  GET /products/:id      -> 200, hasil PUT tersimpan");

  // 10. DELETE /products/:id — hapus produk, status 200
  const delRes = await fetch(`${BASE}/products/${created.id}`, { method: "DELETE" });
  const deleted = await delRes.json();
  assert.equal(delRes.status, 200);
  assert.equal(deleted.id, created.id);
  console.log("PASS  DELETE /products/:id   -> 200,", JSON.stringify(deleted));

  // 11. DELETE /products/:id — produk sudah terhapus, status 404
  const delNfRes = await fetch(`${BASE}/products/${created.id}`, { method: "DELETE" });
  assert.equal(delNfRes.status, 404);
  console.log("PASS  DELETE /products/:id   -> 404,", JSON.stringify(await delNfRes.json()));

  // 12. GET /products/created.id — produk sudah tidak ada, status 404
  const goneRes = await fetch(`${BASE}/products/${created.id}`);
  assert.equal(goneRes.status, 404);
  console.log("PASS  GET /products/:id      -> 404, produk terhapus");

  console.log("\nSemua pengujian lulus ✔");
}

main().catch((err) => {
  console.error("GAGAL:", err.message);
  process.exit(1);
});
