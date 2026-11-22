import { TbLayoutGrid, TbList } from "react-icons/tb"
import Button from "../../atoms/Button"

type SettingsPageProps = {
    viewMode: "grid" | "list"
    onChangeViewMode: (mode: "grid" | "list") => void
}

export default function SettingsPage({
    viewMode,
    onChangeViewMode,
}: SettingsPageProps) {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Atur tata letak daftar produk pada halaman Produk.
                </p>
            </header>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h2 className="text-base font-semibold text-slate-900">
                    Mode Tampilan Daftar Produk
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Pilih tampilan Grid (kartu multi-kolom) atau List (baris
                    vertikal).
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                        variant={viewMode === "grid" ? "primary" : "secondary"}
                        onClick={() => onChangeViewMode("grid")}
                        aria-pressed={viewMode === "grid"}
                        className="inline-flex items-center gap-2"
                    >
                        <TbLayoutGrid className="h-4 w-4" aria-hidden="true" />
                        Grid
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "primary" : "secondary"}
                        onClick={() => onChangeViewMode("list")}
                        aria-pressed={viewMode === "list"}
                        className="inline-flex items-center gap-2"
                    >
                        <TbList className="h-4 w-4" aria-hidden="true" />
                        List
                    </Button>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                    Mode aktif saat ini:{" "}
                    <strong className="font-semibold text-slate-800 capitalize">
                        {viewMode}
                    </strong>
                </p>
            </section>
        </div>
    )
}
