import type { Product } from "../../../types/product"
import ProductCard from "../../molecules/ProductCard"

type Props = {
    products: Product[]
    viewMode?: "grid" | "list"
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export default function ProductGrid({
    products,
    viewMode = "grid",
    onEdit,
    onDelete,
}: Props) {
    return (
        <div
            data-view-mode={viewMode}
            className={
                viewMode === "list"
                    ? "flex flex-col gap-3"
                    : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            }
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
