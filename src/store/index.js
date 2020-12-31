import Vue from "vue";
import Vuex from "vuex";
const images = require("./images.json");
const songs = require("./songs.json");
const artists = require("./artists.json");
const categories = require("./categories.json");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images,
    songs,
    artists,
    categories,
  },
  getters: {
    getImageByArtist: ({ images }) => (artist) => {
      // This is here because of a stupid error
      //  https://stackoverflow.com/questions/37241662/using-require-with-a-variable-vs-using-a-string-in-webpack/37241982
      const image = images[artist];
      return { src: require("../" + image.src), color: image.color };
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
