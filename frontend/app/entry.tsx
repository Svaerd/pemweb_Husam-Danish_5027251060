import "./globals.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import AppRoutes from "./routes"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element is missing.")

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </StrictMode>,
)
