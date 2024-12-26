const axiosConfig = require("./config/axios.env");
let production = process.env.NODE_ENV === "production";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "web-builder-cms",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "/css/bootstrap.min.css",
      },
    ],
    script: [
      {
        src: "/js/bootstrap.bundle.min.js",
        type: "text/javascript",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "./assets/scss/style.scss",
    "./assets/css/nucleo-icons.css",
    "./assets/css/nucleo-svg.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios.js", ssr: false },
    { src: "~/plugins/quilleditor.js", ssr: false },
    { src: "~/plugins/element-ui.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: production
      ? axiosConfig.PROD_BASE_URL_API
      : axiosConfig.DEV_BASE_URL_API,
  },

  server: {
    port: 3600,
    host: "localhost",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
