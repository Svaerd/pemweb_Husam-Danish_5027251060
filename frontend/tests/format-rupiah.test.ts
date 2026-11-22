import { test } from "node:test"
import assert from "node:assert/strict"
import { formatRupiah } from "../src/utils/formatRupiah.ts"

test("harga ditampilkan sebagai rupiah tanpa pecahan", () => {
    assert.equal(formatRupiah(12000).replace(/\s/g, ""), "Rp12.000")
})
