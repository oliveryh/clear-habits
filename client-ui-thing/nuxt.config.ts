// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === "production" ? "/v2/" : undefined,
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
    "@nuxt/test-utils/module",
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

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL || "http://localhost:3000/graphql",
        tokenStorage: "cookie",
        httpLinkOptions: {
          credentials: process.env.NODE_ENV === "production" ? "include" : "omit",
        },
        cookieAttributes: {
          secure: false,
        },
      },
    },
  },

  vite: {
    test: {
      setupFiles: ["tests/setup.ts"],
    },
  },

  ignore: ["**/*.nuxt.spec.ts"],
})
