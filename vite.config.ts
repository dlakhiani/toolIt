import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
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
        plugins: [vue()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@interfaces": path.resolve(__dirname, "./interfaces"),
            },
        },
        build: {
            outDir: "build/src",
        },
        server: {
            host: true,
            proxy: {
                "/api": {
                    target: process.env.VITE_API_URL,
                    changeOrigin: true,
                },
            },
        },
    })
}
