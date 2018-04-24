const colors = require('vuetify/es5/util/colors').default;

const primary = colors.cyan.darken3;
const secondary = colors.cyan.lighten2;

module.exports = {
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'theme-color', content: primary }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~/assets/css/main.css'],
  plugins: [
    { src: '@/plugins/VueParticles', ssr: false }
  ],
  modules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      primary,
      secondary
    }
  },
  build: {
    vendor: ['axios', 'lodash', 'moment', 'vue-particles'],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
