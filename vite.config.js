import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
    build: {
        outDir: 'dist',  // Output directory for build files
        rollupOptions: {
            plugins: [
                terser({
                    format: {
                        comments: false,
                    },
                    compress: {
                        drop_console: true,
                    },
                }),
            ],
        },
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
    ],
});
