const webpack = require('webpack')

// path
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = 'Intro-me | 簡単リンク作成サービス'
const siteDesc = 'SNSやネットショップ、イベント情報のまとめが簡単にできるサービスです。Instagramに掲載するURLとしてぴったりで、ハンドメイド作家などのクリエイターさんの名刺代わりにもなります。'
//const siteKeywords = '１つ目,２つ目,３つ目,４つ目'

// images
const iconImages = baseDir + 'img/icons/'
const ogpImages = basePath + 'img/ogp/'

// pwa
const shortName = 'Intro-me'
const manifestIcon = 'img/icons/icon-1024.png'
const splashscreens = baseDir + 'img/splashscreens/'

export default {

  icon: {
  iconFileName: manifestIcon
  },

  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: lang
    },

    titleTemplate: siteName,

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },

      // GoogleSearchConsole
      //{ name: 'google-site-verification', content: 'PCCqPwtzYuKPimq1JCEGEYCujiBfmqxOKrEyLysm-pk' },

      // SEO関連
      { hid: 'description', name: 'description', content: siteDesc },

      // ogp関連
      { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:title', property: 'og:title', content: siteName },
      { hid: 'og:description', property: 'og:description', content: siteDesc },
      //{ hid: 'og:image', property: 'og:image', content: `${ogpImages}home.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },

      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

    ],

    link: [
      // icons
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: iconImages + 'favicon-16.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: iconImages + 'favicon-32.png' },
      { rel: 'icon', sizes: '48x48', type: 'image/png', href: iconImages + 'favicon-48.png' },
      { rel: 'icon', sizes: '62x62', type: 'image/png', href: iconImages + 'favicon-62.png' },
      // apple touch icon
      { rel: 'apple-touch-icon', sizes: '180x180', href: iconImages + 'apple-touch-icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~plugins/persistedstate.js", ssr: false },
    '~plugins/vuetify.js',
    { src: '@/plugins/vee-validate'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-159675648-1'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    '@nuxtjs/sitemap',
    'nuxt-webfontloader',
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://intro-me.net',
  },

  webfontloader: {
    google: {
      families: ['M+PLUS+Rounded+1c|Palanquin:300,400,500'],
      //families: ['M+PLUS+Rounded+1c'],
      //families: ['Palanquin:300,400,500']
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      "vee-validate/dist/rules"
    ],
    extend (config, ctx) {
    }
  }
}
