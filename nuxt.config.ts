// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import { fileURLToPath, URL } from 'url'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  css: ['@/assets/css/main.css', '@arcgis/core/assets/esri/themes/light/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: [
    [
      'unplugin-icons/nuxt',
      {
        autoInstall: true
      }
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Lexend Deca': [400, 500, 700]
        },
        download: true,
        inject: true,
        display: 'swap'
      }
    ]
  ],
  app: {
    pageTransition: {
      name: 'slide-up',
      mode: 'out-in'
    }
  },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.NUXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: process.env.NUXT_PUBLIC_SUPABASE_KEY
    },
    SUPABASE_SERVICE_ROLE: process.env.NUXT_PRIVATE_SUPABASE_SERVICE_ROLE
  }
})
