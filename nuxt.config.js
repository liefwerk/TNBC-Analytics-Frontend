export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: true
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TNBC Analytics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300&display=swap",
      },
    ]
  },
  loading: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: "~/assets/css/styles.css", lang: 'css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/highcharts.js", mode: 'client'
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxt/http',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
  ],

  http: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api/': {
      target: 'https://tnbanalytics.pythonanywhere.com/',
      pathRewrite: { '^/api/': '' }
    }
  },

  toast: {
    position: 'bottom-right',
    duration: '3000'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // fixed thanks to this source: https://github.com/nuxt/nuxt.js/issues/9224#issuecomment-893289291
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    },
  },
  ssr: false, // Disable Server Side rendering

  env: {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:3000/',
    apiUrl: 'https://tnbanalytics.pythonanywhere.com/'
  }
}
