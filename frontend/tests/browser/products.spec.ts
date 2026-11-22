import { test, expect } from "@playwright/test"

for (const width of [390, 1440]) {
    test(`starter menampilkan satu contoh dan callback pada ${width}px`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto("/")
        await expect(page).toHaveURL(/\/products$/)
        await expect(page.locator("article")).toHaveCount(1)
        await expect(
            page.getByRole("heading", { name: "Pulpen" }),
        ).toBeVisible()
        await page.getByRole("button", { name: "Pilih produk" }).click()
        await expect(page.getByRole("status")).toHaveText(
            "Produk dipilih: Pulpen.",
        )
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
            ),
        ).toBe(true)
        await page.screenshot({
            path: `test-results/starter-${width}.png`,
            fullPage: true,
        })
    })
}

test("tidak ada request otomatis, GET opsional berhasil menampilkan hasil API", async ({
    page,
}) => {
    let requests = 0
    await page.route("http://127.0.0.1:3001/api/products", async (route) => {
        requests++
        await route.fulfill({
            json: [{ id: 8, name: "Pensil API", price: 4000 }],
        })
    })
    await page.goto("/products")
    await expect(page.locator("article")).toHaveCount(1)
    expect(requests).toBe(0)
    await page.getByRole("button", { name: "Muat dari API" }).click()
    await expect(page.getByRole("status")).toHaveText(
        "1 produk berhasil dimuat dari API.",
    )
    await expect(
        page.getByRole("heading", { name: "Pensil API" }),
    ).toBeVisible()
    expect(requests).toBe(1)
})

test("error API mempertahankan contoh dan hasil kosong ditangani", async ({
    page,
}) => {
    await page.route("http://127.0.0.1:3001/api/products", (route) =>
        route.fulfill({ status: 500, body: "error" }),
    )
    await page.goto("/products")
    await page.getByRole("button", { name: "Muat dari API" }).click()
    await expect(page.getByRole("alert")).toContainText("HTTP 500")
    await expect(page.getByRole("heading", { name: "Pulpen" })).toBeVisible()
    await page.unroute("http://127.0.0.1:3001/api/products")
    await page.route("http://127.0.0.1:3001/api/products", (route) =>
        route.fulfill({ json: [] }),
    )
    await page.getByRole("button", { name: "Muat dari API" }).click()
    await expect(page.getByRole("alert")).toHaveCount(0)
    await expect(page.getByText("Belum ada produk dari API.")).toBeVisible()
    await expect(page.locator("article")).toHaveCount(0)
})
