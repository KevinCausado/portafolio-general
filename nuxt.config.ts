import config from './developer.json'
const siteTitle = `${config.name} | ${config.role}`

/*
 * Nuxt 3 Config File
 Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-02-28',
  devtools: { enabled: true },

  app: {
    baseURL: '/portafolio-general/',
    buildAssetsDir: 'assets',
    head: {
      htmlAttrs: {
        lang: 'es',
      },
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portafolio de desarrollador de Kevin Causado.' },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: 'Portafolio de desarrollador de Kevin Causado.' },
        { property: 'og:image', content: 'https://kevincausado.github.io/portafolio-general/og-image.png' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://kevincausado.github.io/portafolio-general/' },
        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
    viewer: false,
  },

  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
    }
  }
})