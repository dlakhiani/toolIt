import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default ({ mode }) => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd()),
    }

    return defineConfig({
        define: {
            "process.env": process.env,
        },
        plugins: [vue(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: {
            outDir: "build/src",
        },
        server: {
            proxy: {
                "/api": {
                    target: process.env.VITE_API_URL,
                    changeOrigin: true,
                },
            },
        },
    })
}
