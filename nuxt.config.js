import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  env: {
    title: process.env.TITLE,
    desc: process.env.DESC,
    baseURL: process.env.BASE_URL,
    address: process.env.ADDRESS,
    copyright: process.env.COPYRIGHT,
    tataruang: process.env.TATARUANG,
    gisApiKey: process.env.GIS_API_KEY,
    webmapKey: process.env.WEBMAPKEY,
    latitude: process.env.LATITUDE,
    longitude: process.env.LONGITUDE,
    nameDinas: process.env.NAMA_DINAS,
    primaryColor: process.env.PRIMARY_COLOR,
    secondaryColor: process.env.SECONDARY_COLOR,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - patroltaru-web',
    title: 'patroltaru-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        rel: "stylesheet"
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/static/patroltaru_style.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/models/users.js',
    '~/models/profiles.js',
    '~/models/roles.js',
    '~/models/settings.js',
    '~/models/files.js',
    '~/models/provinces.js',
    '~/models/cities.js',
    '~/models/districts.js',
    '~/models/subdistricts.js',
    '~/models/activities.js',
    '~/models/reports.js',
    '~/models/userreports.js',
    '~/models/intensities.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      callback: '/callback',
      login: '/',
      logout: '/',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          global: true,
          property: 'accessToken',
          type: 'Bearer',
        },
        refreshToken: {
          property: 'authentication.accessToken',
        },
        user: {
          property: false,
          autoFetch: false
        },
        endpoints: {
          login: {
            url: '/authentication',
            method: 'post'
          },
          user: false,
          logout: false,
        }
      },
      customStrategy: {
        scheme: '~/schemes/customScheme',
      }
    }
  },
  router: {
    middleware: ['auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          // primary: "#e44348",
          primary: '#' + process.env.PRIMARY_COLOR,
          accent: "#4f4f4f",
          secondary: '#' + process.env.SECONDARY_COLOR,
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // server: {
  //       host: '0',
  //       port: '3000' // optional
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
