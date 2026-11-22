import { Link } from "react-router"

export default function NotFoundPage() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <p className="text-sm font-semibold text-blue-600">404</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
                404: Halaman tidak ditemukan
            </h1>
            <p className="mt-2 text-sm text-slate-600">
                Alamat yang Anda buka tidak tersedia.
            </p>
            <Link
                to="/products"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                Kembali ke produk
            </Link>
        </div>
    )
}
