import { useState, type FormEvent } from "react"
import type { Product, ProductValues } from "../../../types/product"
import Button from "../../atoms/Button"
import Modal from "../../molecules/Modal"

type ProductFormModalProps = {
    product: Product | null
    onClose: () => void
    onSubmit: (values: ProductValues) => void
}

export default function ProductFormModal({
    product,
    onClose,
    onSubmit,
}: ProductFormModalProps) {
    const isEdit = product !== null
    const [name, setName] = useState(product?.name ?? "")
    const [priceInput, setPriceInput] = useState(
        product ? String(product.price) : "",
    )
    const [error, setError] = useState("")

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmedName = name.trim()
        const numericPrice = Number(priceInput)

        if (!trimmedName) {
            setError("Nama produk wajib diisi.")
            return
        }
        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            setError("Harga harus lebih dari 0.")
            return
        }

        onSubmit({
            name: trimmedName,
            price: Math.round(numericPrice),
        })
    }

    return (
        <Modal titleId="product-form-title" onClose={onClose}>
            <h2
                id="product-form-title"
                className="text-lg font-bold text-slate-900"
            >
                {isEdit ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
                {isEdit
                    ? "Perbarui informasi produk yang dipilih."
                    : "Masukkan informasi produk baru."}
            </p>
            {isEdit && (
                <p className="mt-2 text-xs font-medium text-slate-400">
                    ID: {product.id}
                </p>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label
                        htmlFor="product-name"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Nama Produk
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                            setError("")
                        }}
                        placeholder="Contoh: Pulpen"
                        autoFocus
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="product-price"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Harga (Rp)
                    </label>
                    <input
                        id="product-price"
                        type="number"
                        min={1}
                        step={1}
                        value={priceInput}
                        onChange={(event) => {
                            setPriceInput(event.target.value)
                            setError("")
                        }}
                        placeholder="Contoh: 5000"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                        Harga harus lebih dari 0.
                    </p>
                </div>

                {error && (
                    <p role="alert" className="text-sm font-medium text-red-600">
                        {error}
                    </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                    <Button type="submit">
                        {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
