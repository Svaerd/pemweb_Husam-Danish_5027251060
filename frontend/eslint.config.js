import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default tseslint.config(
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "playwright-report/**",
            "test-results/**",
        ],
    },
    js.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        extends: [...tseslint.configs.recommended],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
    },
    {
        files: ["src/**/*.{jsx,tsx}", "app/**/*.tsx"],
        plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "error",
                { allowConstantExport: true },
            ],
        },
    },
)
