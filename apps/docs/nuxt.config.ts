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
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
        },
      ],
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
