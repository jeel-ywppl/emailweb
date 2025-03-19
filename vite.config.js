// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [{ find: "@", replacement: "/src" }],
//   },
// })

import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/",
    plugins: [react()],
    build: {
        target: "esnext",
        sourcemap: false,
        minify: "esbuild",
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
            },
        },
        cache: {
            max: 100,
            maxAge: 1000 * 60 * 60,
        },
    },
    server: {
        port: 4000,
        hmr: {
            overlay: false,
            protocol: "ws",
            clientPort: 4000,
        },
        open: true,
        watch: {
            usePolling: true,
        },
    },
    resolve: {
        alias: [{find: "@", replacement: "/src"}],
    },
});
