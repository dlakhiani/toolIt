import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1a202c",
                secondary: "#2d3748",
            },
        },
    },
    plugins: [],
}

export default config
