import { Link } from "react-router"
import { TbPackage } from "react-icons/tb"
import type { Product } from "../../../types/product"
import Button from "../../atoms/Button"
import { formatRupiah } from "../../../utils/formatRupiah"
import styles from "./styles.module.css"

type Props = {
    product: Product
    viewMode?: "grid" | "list"
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export default function ProductCard({
    product,
    viewMode = "grid",
    onEdit,
    onDelete,
}: Props) {
    if (viewMode === "list") {
        return (
            <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <TbPackage className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                        <span className="text-xs font-medium text-slate-400">
                            ID: {product.id}
                        </span>
                        <h2 className="text-base font-bold text-slate-900">
                            {product.name}
                        </h2>
                        <p className="text-sm font-semibold text-blue-600">
                            {formatRupiah(product.price)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        to={`/products/${product.id}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                        Detail
                    </Link>
                    <Button variant="secondary" onClick={() => onEdit(product)}>
                        Edit
                    </Button>
                    <Button
                        variant="subtleDanger"
                        onClick={() => onDelete(product)}
                    >
                        Hapus
                    </Button>
                </div>
            </article>
        )
    }

    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.id}>ID: {product.id}</span>
                <TbPackage className={styles.icon} aria-hidden="true" />
            </div>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>{formatRupiah(product.price)}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
                <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                >
                    Detail
                </Link>
                <Button variant="secondary" onClick={() => onEdit(product)}>
                    Edit
                </Button>
                <Button
                    variant="subtleDanger"
                    onClick={() => onDelete(product)}
                >
                    Hapus
                </Button>
            </div>
        </article>
    )
}
