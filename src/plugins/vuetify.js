import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
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
