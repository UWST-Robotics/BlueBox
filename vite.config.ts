import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [
        react()
    ],
    server: {
        // Proxy Socket.IO to the server
        proxy: {
            '/socket.io': {
                target: 'ws://localhost:8080',
                ws: true,
                rewriteWsOrigin: true,
            },
        }
    },
    build: {
        outDir: "dist/public",
        emptyOutDir: true
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version)
    }
})
