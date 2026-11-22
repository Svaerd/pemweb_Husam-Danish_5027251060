import { Link, useParams } from "react-router"
import { TbArrowLeft, TbPackage } from "react-icons/tb"
import type { Product } from "../../../types/product"
import { formatRupiah } from "../../../utils/formatRupiah"

type ProductDetailPageProps = {
    products: Product[]
}

export default function ProductDetailPage({
    products,
}: ProductDetailPageProps) {
    const { id } = useParams()
    const product = products.find((item) => String(item.id) === id)

    if (!product) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <h1 className="text-xl font-bold text-slate-900">
                    Produk tidak ditemukan.
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                    Produk dengan ID {id} tidak tersedia di daftar saat ini.
                </p>
                <Link
                    to="/products"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <TbArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Kembali ke produk
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
                <TbArrowLeft className="h-4 w-4" aria-hidden="true" />
                Kembali ke produk
            </Link>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        ID: {product.id}
                    </span>
                    <TbPackage
                        className="h-6 w-6 text-slate-400"
                        aria-hidden="true"
                    />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-slate-900">
                    {product.name}
                </h1>
                <p className="mt-2 text-xl font-bold text-blue-600">
                    {formatRupiah(product.price)}
                </p>
            </article>
        </div>
    )
}
