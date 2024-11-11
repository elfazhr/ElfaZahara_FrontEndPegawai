// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Pastikan ini ada atau tidak diatur ke false
  pages: true,

  devtools: { enabled: true },

  css: [
    '@/assets/css/main.css', // Pastikan menggunakan path relatif dari folder 'assets'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  

  compatibilityDate: '2024-11-10',
})