import type { Product } from "../../../types/product"
import { TbPackage } from "react-icons/tb"
import Button from "../../atoms/Button"
import { formatRupiah } from "../../../utils/formatRupiah"
import styles from "./styles.module.css"

type Props = {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.id}>ID: {product.id}</span>
                <TbPackage className={styles.icon} aria-hidden="true" />
            </div>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>{formatRupiah(product.price)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
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
