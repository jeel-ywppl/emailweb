import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/",
    plugins: [react()],
    build: {
        target: "esnext",
        sourcemap: false,
        minify: "esbuild",
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
