import { Outlet } from "react-router"
import Navbar from "../../organisms/Navbar"

export default function PageLayout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />
            <main className="mx-auto max-w-6xl p-4 sm:p-6">
                <Outlet />
            </main>
        </div>
    )
}
