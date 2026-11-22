import { Link } from "react-router"
import { TbLayoutGrid, TbList, TbPackage } from "react-icons/tb"
import type { Product } from "../../../types/product"
import { formatRupiah } from "../../../utils/formatRupiah"

type DashboardPageProps = {
    products: Product[]
    viewMode: "grid" | "list"
}

export default function DashboardPage({
    products,
    viewMode,
}: DashboardPageProps) {
    const totalValue = products.reduce((sum, item) => sum + item.price, 0)

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Ringkasan katalog produk dan preferensi tampilan aplikasi.
                </p>
            </header>

            <section
                aria-label="Ringkasan"
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-sm font-medium">Total Produk</span>
                        <TbPackage className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                        {products.length}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <span className="text-sm font-medium text-slate-500">
                        Total Harga Katalog
                    </span>
                    <p className="mt-2 text-2xl font-bold text-blue-600">
                        {formatRupiah(totalValue)}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-sm font-medium">
                            Tampilan Produk
                        </span>
                        {viewMode === "grid" ? (
                            <TbLayoutGrid
                                className="h-5 w-5 text-blue-600"
                                aria-hidden="true"
                            />
                        ) : (
                            <TbList
                                className="h-5 w-5 text-blue-600"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                    <p className="mt-2 text-2xl font-bold text-slate-900 capitalize">
                        {viewMode}
                    </p>
                </div>
            </section>

            <div className="flex flex-wrap gap-3">
                <Link
                    to="/products"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Kelola Produk
                </Link>
                <Link
                    to="/settings"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Atur Tampilan
                </Link>
            </div>
        </div>
    )
}
