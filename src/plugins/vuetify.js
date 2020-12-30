import Vue from "vue";
import Vuetify from "vuetify/lib";
import minifyTheme from "minify-css-string";
import home from "../components/icons/Home.vue";
import library from "../components/icons/Library.vue";
import trending from "../components/icons/Trending.vue";
import listen from "../components/icons/Listen.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      home: { component: home },
      library: { component: library },
      trending: { component: trending },
      listen: { component: listen },
    },
  },
  theme: {
    options: {
      minifyTheme,
      themeCache: {
        get: (key) => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
    themes: {
      dark: {
        background: "#000000",
        primary: "#4edf93",
        secondary: "#67a4ff",
        accent: "#7673fe",
        error: "#ff5474",
        info: "#3251f8",
        success: "#4CAF50",
        warning: "#ffa133",
      },
    },
    dark: true,
  },
});
