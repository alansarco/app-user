// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'bootstrap-icons/font/bootstrap-icons.css'],
  postcss:{
    plugins:{
      tailwindcss:{},
      autoprefixer:{}
    }
  },
  mode: 'universal'
})
