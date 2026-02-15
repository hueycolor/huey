// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    name: 'Huey',
  },
  modules: [
    '@nuxt/content',
  ],
  ui: {
    colorMode: false,
  },
  css: ['~/assets/global.css'],
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff',
          href: '/fonts/Cubano.woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
