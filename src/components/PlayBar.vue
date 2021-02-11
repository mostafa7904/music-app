<template>
  <div>
    <audio
      @loadeddata="onLoadedSong"
      @loadstart="loadStart"
      @ended="nextSong"
      :src="playing.src"
      aria-hidden="true"
      hidden
      id="music"
      ref="music"
    ></audio>

    <div class="play-bar-box d-flex align-center justify-space-around">
      <v-avatar
        class="play-disk"
        :size="screenIsSmall ? 60 : 100"
        rounded="circle"
      >
        <v-img
          :src="
            playing.cover
              ? getCover(playing)
              : require('../assets/covers/music-disk.png')
          "
        >
        </v-img>
      </v-avatar>
      <div class="music-title-box">
        <span class="music-title">{{ playing.title }}</span>
        <router-link class="music-artist" :to="'/artist/' + playing.artist">{{
          playing.artist
        }}</router-link>
      </div>
      <div class="music-controls d-flex align-center">
        <div class="music-controls-buttons">
          <v-icon @click="previousSong">$back</v-icon>
          <v-icon class="mx-3" @click="isPlaying ? pause() : play()"
            >${{ isPlaying ? "pause" : "play" }}</v-icon
          >
          <v-icon @click="nextSong">$forward</v-icon>
        </div>
        <v-progress-linear
          :indeterminate="loadingSong"
          height="2"
          background-color="grey"
          color="white"
          :value.sync="musicTime"
          class="music-controls-slider ml-6"
        ></v-progress-linear>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "play-bar",
  data: () => ({
    musicTime: 0,
    loadingSong: false,
  }),
  computed: {
    ...mapState({
      songs: (state) => state.songs,
      playing: (state) => state.playBar.playing,
      isPlaying: (state) => state.playBar.isPlaying,
      audio: (state) => state.playBar.audio,
      previousSongId: (state) => state.playBar.previousSongId,
    }),
    ...mapGetters(["screenIsSmall"]),
  },
  async mounted() {
    const audio = document.querySelector("audio#music");
    this.$store.commit("setAudio", audio);
    this.audio.addEventListener("timeupdate", this.updateStatus);
  },
  methods: {
    getCover(song) {
      const path = require("../" + song.cover);
      return path;
    },
    getTime() {
      const current = this.audio.currentTime;
      const duration = this.audio.duration;
      this.musicTime = (current / duration) * 100;
    },
    updateStatus(e) {
      this.$store.commit("setAudio", e.target);
      this.$store.commit("changeIsPlaying", !e.target.paused);
      this.getTime();
    },
    nextSong() {
      this.$store.commit("changeIsPlaying", false);
      const songId = this.playing.id;
      this.$store.commit("setPreviousSongId", songId - 1);
      if (songId === this.songs.length) {
        this.play(this.songs[0]);
      } else {
        this.play(this.songs[songId]);
      }
    },
    previousSong() {
      this.$store.commit("changeIsPlaying", false);
      const previousSong = this.songs[this.previousSongId];
      this.play(previousSong);
    },
    onLoadedSong() {
      this.loadingSong = false;
    },
    loadStart() {
      this.loadingSong = true;
    },
    pause() {
      this.$store.dispatch("pause");
    },
    play(song = null) {
      this.$store.dispatch("play", song);
    },
  },
};
</script>

<style lang="scss" scoped>
.play-bar-box {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  width: 60%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  height: 100px;
  background-color: rgba($color: #000000, $alpha: 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 15px -5px 26px 0px rgb(41, 41, 41);
  -webkit-box-shadow: 15px -5px 26px 0px rgb(41, 41, 41);
  -moz-box-shadow: 15px -5px 26px 0px rgb(41, 41, 41);
  @media screen and (max-width: 960px) {
    transform: none;
    -webkit-transform: none;
    -o-transform: none;
    -ms-transform: none;
    -moz-transform: none;
    left: 0;
    width: 100%;
  }
}
.play-disk {
  animation: spin infinite 15s linear;
  -moz-animation: spin infinite 15s linear;
  -o-animation: spin infinite 15s linear;
  -webkit-animation: spin infinite 15s linear;
  position: relative;
  top: -50%;
  transform: translateY(10%);
  -webkit-transform: translateY(10%);
  -o-transform: translateY(10%);
  -ms-transform: translateY(10%);
  -moz-transform: translateY(10%);
  @media screen and (max-width: 960px) {
    top: 0;
    left: 10px;
    float: left;
  }
}
.music-title-box {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 425px) {
    max-width: 150px;
  }
}
.music-title {
  font-weight: bold;
  font-size: 0.9rem;
  @media screen and (max-width: 425px) {
    font-size: 0.8rem;
  }
}
.music-artist {
  color: white !important;
  text-decoration: none;
  font-weight: lighter;
  font-size: 0.8rem;
  @media screen and (max-width: 425px) {
    font-size: 0.7rem;
  }
}
.music-controls-slider {
  width: 300px;
  @media screen and (max-width: 960px) {
    display: none;
  }
}
.music-controls-buttons {
  @media screen and (max-width: 960px) {
    & .v-icon {
      height: 18px !important;
      width: 18px !important;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
</style>
