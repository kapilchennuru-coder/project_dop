import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Link previews need an absolute image address. Set SITE_URL when building for
// the final host and the preview image will point there. Netlify provides URL itself.
const siteUrl = (process.env.SITE_URL ?? process.env.URL)?.replace(/\/$/, '');

// `base: './'` keeps every asset path relative, so the built site works on any
// static host and in any sub-folder.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'absolute-preview-image',
      transformIndexHtml: (html) => (siteUrl ? html.replace('content="./og-cover.jpg"', `content="${siteUrl}/og-cover.jpg"`) : html),
    },
  ],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 700,
  },
});
