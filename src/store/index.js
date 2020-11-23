import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chillSongs: [
      {
        title: "Dancing with a stranger",
        artist: "Sam Smith",
        src:
          "https://musicfeed.ir/files/2019/07/Sam-Smith-Normani-Dancing-With-A-Stranger-128.mp3",
      },
      {
        title: "Natural",
        artist: "Imagine dragons",
        src:
          "https://musicfeed.ir/files/dir/2020/11/Imagine%20Dragons%20Natural.mp3",
      },
    ],
    topSongs: [
      {
        title: "Natural",
        artist: "Imagine dragons",
        src:
          "https://musicfeed.ir/files/dir/2020/11/Imagine%20Dragons%20Natural.mp3",
      },
    ],
    acousticSongs: [
      {
        title: "Love me like you do",
        artist: "Ellie Goulding",
        src:
          "https://musicfeed.ir/files/2019/04/Ellie-Goulding-Love-Me-Like-You-Do-128.mp3",
      },
    ],
    danceSongs: [
      {
        title: "Blue jeans",
        artist: "Lana del rey",
        src:
          "https://musicfeed.ir/files/2019/07/Lana-Del-Rey-Blue-Jeans-128.mp3",
      },
    ],
  },
  mutations: {},
  actions: {
    getSong({ state }, id) {
      state.chillSongs[id];
    },
  },
  modules: {},
});
