import { NavLink } from "react-router"
import { TbBox } from "react-icons/tb"

const navItems = [
    { to: "/", label: "Dashboard", end: true },
    { to: "/products", label: "Produk", end: false },
    { to: "/settings", label: "Settings", end: false },
]

export default function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <NavLink
                    to="/"
                    end
                    className="inline-flex items-center gap-2 text-base font-bold text-slate-900"
                >
                    <TbBox
                        className="h-5 w-5 text-blue-600"
                        aria-hidden="true"
                    />
                    <span>Manajemen Produk</span>
                </NavLink>
                <nav
                    aria-label="Navigasi utama"
                    className="flex items-center gap-1 sm:gap-2"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-1.5 text-sm transition ${
                                    isActive
                                        ? "bg-blue-50 font-bold text-blue-700"
                                        : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}
