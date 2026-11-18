import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/website/',
    ssgOptions: {
        // Helmet puts <title>/<meta> first; the charset declaration must stay within the first 1024 bytes.
        onPageRendered: (_route, html) => html.replace(/<meta charset="UTF-8"\s*\/?>/i, '').replace('<head>', '<head><meta charset="UTF-8">'),
    },
})
