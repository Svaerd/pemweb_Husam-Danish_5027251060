import { defineConfig } from "@playwright/test"

export default defineConfig({
    testDir: "./tests/browser",
    fullyParallel: true,
    use: {
        baseURL: "http://127.0.0.1:5173",
        browserName: "chromium",
        channel: "chrome",
        viewport: { width: 1440, height: 1000 },
    },
    webServer: {
        command: "npm run dev -- --port 5173 --strictPort",
        url: "http://127.0.0.1:5173",
        reuseExistingServer: false,
        env: { VITE_API_BASE_URL: "http://127.0.0.1:3001/api" },
    },
})
