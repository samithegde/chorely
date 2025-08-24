import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Chorely',
        short_name: 'Chorely',
        description: 'Freelance for youth, made easy.',
        theme_color: '#223a5f',
        background_color: '#f0f4ff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/brankmark.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/brankmark.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})