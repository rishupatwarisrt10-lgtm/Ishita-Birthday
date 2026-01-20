import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'ES2022',
      minify: true,
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            gsap: ['gsap', 'lenis'],
            icons: ['lucide-react'],
          },
        },
      },
      cssMinify: 'lightningcss',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 600,
      sourcemap: false,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'gsap', 'lenis', 'lucide-react'],
    },
  };
});
