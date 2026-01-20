import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Optimize build output
        target: 'ES2022',
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: mode === 'production', // Remove console logs in production
          },
        },
        // Code splitting for better caching
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom'],
              'motion': ['framer-motion'],
              'gsap': ['gsap', 'lenis'],
              'icons': ['lucide-react'],
            },
          },
        },
        // Optimize CSS
        cssMinify: 'lightningcss',
        // Report compressed size
        reportCompressedSize: true,
        // Chunk size warnings
        chunkSizeWarningLimit: 600,
        sourcemap: false, // Disable sourcemaps in production for smaller builds
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', 'gsap', 'lenis', 'lucide-react'],
      },
    };
});
