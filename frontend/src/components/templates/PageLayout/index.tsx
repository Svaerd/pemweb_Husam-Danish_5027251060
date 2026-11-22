import styles from "./styles.module.css"
import { Outlet } from "react-router"

export default function PageLayout() {
    return (
        <main className={styles.container}>
            <Outlet />
        </main>
    )
}
