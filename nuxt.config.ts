// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/main-logo.svg' },
      ],
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      noscript: [
        { children: 'JavaScript is required' },
      ],
      title: 'FoodFastPass',
    },
  },
  components: true,
  css: [
    '@/assets/css/main.css',
    '@/assets/css/vue3-carousel-custom.css',
  ],
  devServerHandlers: [],
  devtools: { enabled: false },
  /*experimental: {
    payloadExtraction: false,
  },*/
  modules: [
    '@vueuse/nuxt',
    'vue3-carousel-nuxt',
    '@vite-pwa/nuxt',
    // 'nuxt-stripe-module',

    '~/modules/user-side/account',
    '~/modules/user-side/cart',
    '~/modules/user-side/dish-card',
    '~/modules/user-side/filters',
    '~/modules/user-side/menu',
    '~/modules/user-side/order',
    '~/modules/user-side/restaurants',
    '~/modules/user-side/sidebar',
    '~/modules/user-side/waitlist',
    '~/modules/user-side/cart-pre',
    '~/modules/user-side/checkout',
    '~/modules/user-side/new-dish-card',
    '~/modules/user-side/customization-card',

    '~/modules/b-o-h-side/auth',
    '~/modules/b-o-h-side/orders',
  ],
  // nitro: {
  //   prerender: {
  //     routes: [ '/' ],
  //     ignore: [ '/menu', '/confirm' ],
  //   },
  // },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'FoodFastPass',
      short_name: 'FoodFastPass',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      publishableKey: process.env.NUXT_PUBLISHABLE_KEY,
    },
  },
  ssr: false,
});
