import { useState } from "react"
import { TbPlus, TbSearch } from "react-icons/tb"
import type { Product, ProductValues } from "../../../types/product"
import { initialProducts } from "../../../data/product/initialProducts"
import ProductRemote from "../../../data/product/source/product-remote.ts"
import ProductRepository from "../../../data/product/repository/product-repository.ts"
import Button from "../../atoms/Button"
import ProductGrid from "../../organisms/ProductGrid"
import ProductFormModal from "../../organisms/ProductFormModal"
import DeleteConfirmModal from "../../organisms/DeleteConfirmModal"
import styles from "./styles.module.css"

const repository = ProductRepository(
    ProductRemote({ baseUrl: import.meta.env.VITE_API_BASE_URL ?? "" }),
)

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [searchQuery, setSearchQuery] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const normalizedQuery = searchQuery.trim().toLowerCase()
    const filteredProducts = normalizedQuery
        ? products.filter((product) =>
              product.name.toLowerCase().includes(normalizedQuery),
          )
        : products

    function openCreateModal() {
        setEditingProduct(null)
        setIsFormOpen(true)
    }

    function openEditModal(product: Product) {
        setEditingProduct(product)
        setIsFormOpen(true)
    }

    function closeFormModal() {
        setIsFormOpen(false)
        setEditingProduct(null)
    }

    function handleSaveProduct(values: ProductValues) {
        if (editingProduct) {
            setProducts((prev) =>
                prev.map((item) =>
                    item.id === editingProduct.id
                        ? { ...item, ...values }
                        : item,
                ),
            )
            setMessage(`Produk "${values.name}" berhasil diperbarui.`)
        } else {
            const nextId =
                products.length > 0
                    ? Math.max(...products.map((item) => item.id)) + 1
                    : 1
            setProducts((prev) => [...prev, { id: nextId, ...values }])
            setMessage(`Produk "${values.name}" berhasil ditambahkan.`)
        }
        setError("")
        closeFormModal()
    }

    function handleConfirmDelete(id: number) {
        const target = products.find((item) => item.id === id)
        setProducts((prev) => prev.filter((item) => item.id !== id))
        setDeletingProduct(null)
        setError("")
        if (target) {
            setMessage(`Produk "${target.name}" berhasil dihapus.`)
        }
    }

    async function handleLoadProducts() {
        setIsLoading(true)
        setError("")
        setMessage("Memuat produk…")
        try {
            const models = await repository.getProductList()
            setProducts(models.map((model) => model.toJSON()))
            setMessage(`${models.length} produk berhasil dimuat dari API.`)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Gagal memuat produk.",
            )
            setMessage("")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className={styles.title}>Manajemen Produk</h1>
                    <p className={styles.description}>
                        Kelola daftar produk dan harga dalam satu tempat.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={handleLoadProducts}
                        disabled={isLoading}
                    >
                        {isLoading ? "Memuat…" : "Muat dari API"}
                    </Button>
                    <Button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5"
                    >
                        <TbPlus className="h-4 w-4" aria-hidden="true" />
                        Tambah Produk
                    </Button>
                </div>
            </header>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <TbSearch
                        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Cari nama produk..."
                        aria-label="Cari nama produk"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm text-slate-900 shadow-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <span className="text-sm font-medium text-slate-500">
                    {filteredProducts.length} produk
                </span>
            </div>

            {error && (
                <p role="alert" className={`${styles.error} mt-4`}>
                    {error}
                </p>
            )}

            <section
                aria-label="Daftar produk"
                aria-busy={isLoading}
                className="mt-4"
            >
                {products.length === 0 ? (
                    <p className={styles.notice}>Belum ada produk.</p>
                ) : filteredProducts.length === 0 ? (
                    <p className={styles.notice}>
                        Tidak ada produk yang cocok dengan pencarian &ldquo;
                        {searchQuery}&rdquo;.
                    </p>
                ) : (
                    <ProductGrid
                        products={filteredProducts}
                        onEdit={openEditModal}
                        onDelete={setDeletingProduct}
                    />
                )}
            </section>

            <div className="mt-5 flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                    Menampilkan {filteredProducts.length} dari {products.length}{" "}
                    produk
                </p>
                {message && <p role="status">{message}</p>}
            </div>

            {isFormOpen && (
                <ProductFormModal
                    product={editingProduct}
                    onClose={closeFormModal}
                    onSubmit={handleSaveProduct}
                />
            )}

            {deletingProduct && (
                <DeleteConfirmModal
                    product={deletingProduct}
                    onClose={() => setDeletingProduct(null)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    )
}
