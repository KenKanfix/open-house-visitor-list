import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/open-house-visitor-list/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        id: 'open-house-visitor-list',
        name: 'Open House Visitor List',
        short_name: 'Visitors',
        description: 'Register visitors at your open house and track how each visit went.',
        theme_color: '#1f6feb',
        background_color: '#f5f7fa',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'portrait',
        start_url: '/open-house-visitor-list/',
        scope: '/open-house-visitor-list/',
        lang: 'en',
        dir: 'ltr',
        categories: ['business', 'productivity'],
        prefer_related_applications: false,
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})

