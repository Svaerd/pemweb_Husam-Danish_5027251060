import { test, expect } from "@playwright/test"

for (const width of [390, 1440]) {
    test(`dashboard dan produk responsif tanpa overflow pada ${width}px`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto("/")
        await expect(
            page.getByRole("heading", { name: "Dashboard" }),
        ).toBeVisible()
        await page.getByRole("link", { name: "Kelola Produk" }).click()
        await expect(page).toHaveURL(/\/products$/)
        await expect(page.locator("article")).toHaveCount(5)
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
            ),
        ).toBe(true)
    })
}

test("CRUD produk: tambah, cari, edit, dan hapus berjalan", async ({ page }) => {
    await page.goto("/products")
    await expect(page.locator("article")).toHaveCount(5)

    // Tambah Produk
    await page.getByRole("button", { name: "Tambah Produk" }).click()
    await page.getByLabel("Nama Produk").fill("Tip-X")
    await page.getByLabel("Harga (Rp)").fill("7000")
    await page.getByRole("button", { name: "Simpan Produk" }).click()
    await expect(page.locator("article")).toHaveCount(6)
    await expect(page.getByRole("heading", { name: "Tip-X" })).toBeVisible()

    // Cari Produk
    await page.getByLabel("Cari nama produk").fill("Tip-X")
    await expect(page.locator("article")).toHaveCount(1)

    // Edit Produk
    await page.getByRole("button", { name: "Edit" }).click()
    await page.getByLabel("Nama Produk").fill("Tip-X Cair")
    await page.getByLabel("Harga (Rp)").fill("7500")
    await page.getByRole("button", { name: "Simpan Perubahan" }).click()
    await expect(
        page.getByRole("heading", { name: "Tip-X Cair" }),
    ).toBeVisible()

    // Hapus Produk
    await page.getByRole("button", { name: "Hapus" }).click()
    await page.getByRole("button", { name: "Hapus Produk" }).click()
    await expect(page.locator("article")).toHaveCount(0)

    await page.getByLabel("Cari nama produk").fill("")
    await expect(page.locator("article")).toHaveCount(5)
})

test("detail produk /products/:id, settings grid/list, dan 404 berfungsi", async ({
    page,
}) => {
    await page.goto("/products")
    await page.locator("article").nth(1).getByRole("link", { name: "Detail" }).click()
    await expect(page).toHaveURL(/\/products\/2$/)
    await expect(
        page.getByRole("heading", { name: "Buku Tulis" }),
    ).toBeVisible()

    await page.goto("/products/999")
    await expect(
        page.getByRole("heading", { name: "Produk tidak ditemukan." }),
    ).toBeVisible()

    await page.getByRole("link", { name: "Settings" }).click()
    await expect(page).toHaveURL(/\/settings$/)
    await page.getByRole("button", { name: "List" }).click()

    await page.getByRole("link", { name: "Produk", exact: true }).click()
    await expect(page.locator("[data-view-mode='list']")).toBeVisible()

    await page.goto("/alamat-salah")
    await expect(
        page.getByRole("heading", { name: "404: Halaman tidak ditemukan" }),
    ).toBeVisible()
    await page.getByRole("link", { name: "Kembali ke produk" }).click()
    await expect(page).toHaveURL(/\/products$/)
})

test("GET API opsional dan penanganan error API berjalan", async ({ page }) => {
    await page.route("http://127.0.0.1:3001/api/products", (route) =>
        route.fulfill({ status: 500, body: "error" }),
    )
    await page.goto("/products")
    await page.getByRole("button", { name: "Muat dari API" }).click()
    await expect(page.getByRole("alert")).toContainText("HTTP 500")
    await expect(page.locator("article")).toHaveCount(5)

    await page.unroute("http://127.0.0.1:3001/api/products")
    await page.route("http://127.0.0.1:3001/api/products", (route) =>
        route.fulfill({
            json: [{ id: 8, name: "Pensil API", price: 4000 }],
        }),
    )
    await page.getByRole("button", { name: "Muat dari API" }).click()
    await expect(page.getByRole("status")).toHaveText(
        "1 produk berhasil dimuat dari API.",
    )
    await expect(
        page.getByRole("heading", { name: "Pensil API" }),
    ).toBeVisible()
})
