export default {
  target: 'server',

  head: {
    title: 'WOGI - Brands',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Browse brands and issue gift cards' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'
      }
    ]
  },

  css: ['~/assets/css/main.css'],

  loading: { color: '#0a7cff', height: '3px' },

  // Components are imported explicitly in each file so dependencies are easy to follow.
  components: false,

  router: {
    linkExactActiveClass: 'is-active'
  },

  build: {}
}
