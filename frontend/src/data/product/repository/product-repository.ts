import type { ProductRemoteSource } from "../source/product-remote.ts"
import ProductModel from "../model/product-model.ts"
import ProductListParam from "../param/product-list-param.ts"

// Maps remote payloads into validated application models.
export default function ProductRepository({
    getProductListRemote,
}: ProductRemoteSource) {
    async function getProductList(
        param = new ProductListParam(),
    ): Promise<ProductModel[]> {
        const response = await getProductListRemote(param)
        // The endpoint contract returns a direct array of products.
        if (!Array.isArray(response)) {
            throw new TypeError(
                "Contoh ini mengharapkan response API berupa array produk.",
            )
        }

        const products = response.map((item) => ProductModel.fromResponse(item))
        const ids = products.map((product) => product.getId())
        if (new Set(ids).size !== ids.length) {
            throw new TypeError("ID produk dari API harus unik.")
        }

        return products
    }

    return { getProductList }
}
