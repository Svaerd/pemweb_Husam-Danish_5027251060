import ProductListParam from "../param/product-list-param.ts"

export type ProductRemoteSource = {
    getProductListRemote: (param?: ProductListParam) => Promise<unknown>
}

type ProductRemoteOptions = {
    baseUrl?: string
    fetchImpl?: typeof fetch
}

// Sends HTTP requests and returns the unvalidated JSON payload.
export default function ProductRemote({
    baseUrl = "",
    fetchImpl = fetch,
}: ProductRemoteOptions = {}): ProductRemoteSource {
    async function getProductListRemote(
        param = new ProductListParam(),
    ): Promise<unknown> {
        if (!baseUrl.trim()) {
            throw new Error(
                "Isi VITE_API_BASE_URL di .env.local terlebih dahulu.",
            )
        }

        const url = new URL(`${baseUrl.replace(/\/+$/, "")}/products`)
        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL API harus menggunakan http atau https.")
        }
        url.search = param.toQueryString()

        const response = await fetchImpl(url, {
            method: "GET",
            headers: { Accept: "application/json" },
        })

        if (!response.ok) {
            throw new Error(`Gagal memuat produk (HTTP ${response.status}).`)
        }

        return response.json()
    }

    return { getProductListRemote }
}
