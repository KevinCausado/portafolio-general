const config = require('./developer.json')
const siteTitle = `${config.name} | ${config.role}`

/*
 * Nuxt 3 Config File
 Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-02-28',
  devtools: { enabled: true },
  
  app: {
    baseURL: '/portafolio-general/', // El nombre de tu repositorio
    buildAssetsDir: 'assets', // Para evitar problemas con guiones bajos
    head: {
      htmlAttrs: {
        lang: 'es', // Cambiado a español
      },
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Portafolio de desarrollador de Kevin Causado.' },
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        { hid: 'og:description', property: 'og:description', content: 'Portafolio de desarrollador de Kevin Causado.' },
        { hid: 'og:image', property: 'og:image', content: 'demo-share.jpg' },
        { hid: 'og:url', property: 'og:url', content: 'https://kevincausado.github.io/portafolio-general/' }, // URL final
        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        // --- INICIO DE LA CORRECCIÓN ---
        // Se comentan estas líneas porque los archivos PWA no existen en tu proyecto y causan un error de compilación.
        // { rel: 'manifest', href: 'pwa/manifest.json' },
        // { rel: 'apple-touch-icon', href: 'pwa/icons/apple-touch-icon.png' },
        // --- FIN DE LA CORRECCIÓN ---
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  components: {
    dirs: [
      '~/components',
    ],
  },
  
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true, 
    injectPosition: 0,
    viewer: false,
  },

  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
    }
  }
})