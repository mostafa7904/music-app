import Vue from "vue";
import Vuetify from "vuetify/lib";
import minifyTheme from "minify-css-string";
import home from "../components/icons/Home.vue";
import library from "../components/icons/Library.vue";
import trending from "../components/icons/Trending.vue";
import listen from "../components/icons/Listen.vue";
import volumeHigh from "../components/icons/VolumeHigh.vue";
import volumeOff from "../components/icons/VolumeOff.vue";
import play from "../components/icons/Play.vue";
import forward from "../components/icons/Forward.vue";
import back from "../components/icons/Back.vue";
import pause from "../components/icons/Pause.vue";
import dotsVertical from "../components/icons/DotsVertical.vue";
import spotify from "../components/icons/Spotify.vue";
import search from "../components/icons/Search.vue";
import menu from "../components/icons/Menu.vue";
import microphone from "../components/icons/Microphone.vue";
import settings from "../components/icons/Settings.vue";
import info from "../components/icons/Info.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      home: { component: home },
      library: { component: library },
      trending: { component: trending },
      listen: { component: listen },
      "volume-high": { component: volumeHigh },
      "volume-off": { component: volumeOff },
      play: { component: play },
      pause: { component: pause },
      forward: { component: forward },
      back: { component: back },
      "dots-vertical": { component: dotsVertical },
      spotify: { component: spotify },
      search: { component: search },
      menu: { component: menu },
      microphone: { component: microphone },
      settings: { component: settings },
      info: { component: info },
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
