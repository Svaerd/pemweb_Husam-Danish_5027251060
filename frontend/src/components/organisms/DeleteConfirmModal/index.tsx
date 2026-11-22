import { TbTrash } from "react-icons/tb"
import type { Product } from "../../../types/product"
import { formatRupiah } from "../../../utils/formatRupiah"
import Button from "../../atoms/Button"
import Modal from "../../molecules/Modal"

type DeleteConfirmModalProps = {
    product: Product
    onClose: () => void
    onConfirm: (id: number) => void
}

export default function DeleteConfirmModal({
    product,
    onClose,
    onConfirm,
}: DeleteConfirmModalProps) {
    return (
        <Modal titleId="delete-product-title" onClose={onClose}>
            <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <TbTrash className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2
                    id="delete-product-title"
                    className="mt-3 text-lg font-bold text-slate-900"
                >
                    Hapus Produk?
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Produk yang dihapus tidak dapat dikembalikan.
                </p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <p className="text-xs font-medium text-slate-400">
                    ID: {product.id}
                </p>
                <p className="mt-0.5 text-base font-bold text-slate-900">
                    {product.name}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-blue-600">
                    {formatRupiah(product.price)}
                </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>
                    Batal
                </Button>
                <Button
                    variant="danger"
                    onClick={() => onConfirm(product.id)}
                >
                    Hapus Produk
                </Button>
            </div>
        </Modal>
    )
}
