export default {
  state: () => ({
    isPlaying: false,
    previousSongId: 0,
    playing: {},
    audio: null,
  }),
  mutations: {
    setPreviousSongId(state, id) {
      state.previousSongId = id;
    },
    setAudio(state, audio) {
      state.audio = audio;
    },
    changeIsPlaying(state, payload) {
      state.isPlaying = payload;
    },
    changePlaying(state, newSong) {
      state.playing = newSong;
    },
  },
  actions: {
    async play({ dispatch, commit, state }, song = null) {
      try {
        if (state.isPlaying && !song) {
          await dispatch("pause");
        } else {
          if (song) commit("changePlaying", song);

          setTimeout(() => {
            state.audio.play();
            state.isPlaying = true;
          }, 100);
        }
      } catch (e) {
        console.log("Error in playing!");
        console.error(e);
      }
    },
    async pause({ state, commit }) {
      try {
        commit("changeIsPlaying", false);
        state.audio.pause();
      } catch (e) {
        console.log("Error in pause!");
        console.error(e);
      }
    },
  },
  getters: {},
};
