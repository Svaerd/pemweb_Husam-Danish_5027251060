import { useState } from "react"
import { Route, Routes } from "react-router"
import type { Product } from "../src/types/product"
import { initialProducts } from "../src/data/product/initialProducts"
import PageLayout from "../src/components/templates/PageLayout"
import DashboardPage from "../src/components/pages/DashboardPage"
import ProductsPage from "../src/components/pages/ProductsPage"
import ProductDetailPage from "../src/components/pages/ProductDetailPage"
import SettingsPage from "../src/components/pages/SettingsPage"
import NotFoundPage from "../src/components/pages/NotFoundPage"

export default function AppRoutes() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    return (
        <Routes>
            <Route path="/" element={<PageLayout />}>
                <Route
                    index
                    element={
                        <DashboardPage
                            products={products}
                            viewMode={viewMode}
                        />
                    }
                />
                <Route
                    path="products"
                    element={
                        <ProductsPage
                            products={products}
                            onChangeProducts={setProducts}
                            viewMode={viewMode}
                        />
                    }
                />
                <Route
                    path="products/:id"
                    element={<ProductDetailPage products={products} />}
                />
                <Route
                    path="settings"
                    element={
                        <SettingsPage
                            viewMode={viewMode}
                            onChangeViewMode={setViewMode}
                        />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
