// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/v2/",
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxtjs/apollo",
  ],

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  build: {
    transpile: ["vue-sonner"],
  },

  devServer: {
    port: 8080,
  },

  // Turning off SSR until it's clear how this impacts Apollo authentication
  ssr: false,

  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3000/graphql",
        tokenStorage: "cookie",
      },
    },
  },
})