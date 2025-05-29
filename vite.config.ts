import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/avorion-tools/",
    resolve: {
        alias: {
            '~components': '/src/components',
            '~constants': '/src/constants',
            '~contexts': '/src/contexts',
            '~layouts': '/src/layouts',
            '~pages': '/src/pages',
            '~hooks': '/src/hooks',
            '~reducers': '/src/reducers',
            '~utils': '/src/utils',
            '~store': '/src/store',
            '~types': '/src/types',
            '~workers': '/src/workers',
            '~data': '/src/data',
        }
    }
})
