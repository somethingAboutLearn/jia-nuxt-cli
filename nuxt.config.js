module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'jia-nuxt-cli',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'vant/lib/vant-css/index.css',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
  ],
  /**
   * 引入全局 scss
   */
  modules: [
    ['nuxt-sass-resources-loader', '@/assets/css/main.scss']
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'element-ui',
      'axios',
      'vue-logger',
      'vant',
      'vue-quill-editor'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    {src: '@/plugins/vant', ssr: true},
    {src: '@/plugins/element-ui', ssr: true},
    {src: '@/plugins/vue-logger', ssr: true},
    {src: '@/plugins/vue-quill-editor.js', ssr: false},
    {src: '@/plugins/devide.js', ssr: false}
  ]
}
