import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/**/**/*.vue", "./src/App.vue"],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
