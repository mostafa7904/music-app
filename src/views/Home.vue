<template>
  <div class="home">
    <audio
      @loadeddata="onLoadedSong"
      @loadstart="loadStart"
      @playing="updateStatus"
      @pause="updateStatus"
      @canplay="updateStatus"
      @ended="nextSong"
      :src="playing.src"
      aria-hidden="true"
      hidden
      id="music"
      ref="music"
    ></audio>
    <div class="white--text font-weight-bold text-h5 d-flex justify-start my-6">
      Most popular
    </div>
    <v-row>
      <v-col
        cols="12"
        md="3"
        sm="6"
        v-for="(mostPopular, index) in mostPopulars"
        :key="index"
      >
        <v-card
          class="music-card"
          rounded="xl"
          :ripple="false"
          @click.stop="play(mostPopular)"
          :style="genShadow(mostPopular.color)"
          :color="mostPopular.color"
          min-height="310"
          max-height="350"
        >
          <v-card-title class="d-flex justify-space-between">
            <v-icon>mdi-wave</v-icon>
            <v-icon v-if="isSongPlaying(mostPopular)">mdi-speaker</v-icon>
          </v-card-title>
          <v-card-text class="font-bold-medium">{{
            mostPopular.tag
          }}</v-card-text>
          <v-img
            class="mx-auto card-image"
            :src="mostPopular.image"
            max-width="200"
            min-height="200"
            max-height="100%"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <div class="white--text font-weight-bold text-h5 d-flex justify-start my-6">
      You might like
    </div>
    <v-row>
      <v-col
        cols="12"
        md="3"
        sm="6"
        v-for="(mightLike, index) in mightLikes"
        :key="index"
      >
        <v-card
          :ripple="false"
          @click.stop="play(mightLike)"
          :style="genShadow(mightLike.color)"
          :color="mightLike.color"
          rounded="xl"
          min-height="310"
          max-height="350"
        >
          <v-card-title class="d-flex justify-space-between">
            <v-icon>mdi-wave</v-icon>
            <v-icon v-if="isSongPlaying(mightLike)">mdi-speaker</v-icon>
          </v-card-title>
          <v-card-text class="font-bold-medium">{{
            mightLike.artist
          }}</v-card-text>
          <v-img
            class="mx-auto card-image"
            :src="mightLike.image"
            max-width="200"
            min-height="200"
            max-height="100%"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <div
      class="play-bar-box d-flex flex-column flex-md-row align-center justify-space-around"
    >
      <v-avatar class="play-disk" size="100" rounded="circle">
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
        <span class="music-artist">{{ playing.artist }}</span>
      </div>
      <div class="music-controls d-flex align-center">
        <div class="music-controls-buttons">
          <v-icon @click="previousSong">mdi-skip-backward</v-icon>
          <v-icon class="mx-3" @click="play()"
            >mdi-{{ isPlaying ? "pause" : "play" }}</v-icon
          >
          <v-icon @click="nextSong">mdi-skip-forward</v-icon>
        </div>
        <v-progress-linear
          :indeterminate="loadingSong"
          @click="getTime"
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
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState({
      songs: (state) => state.songs,
      images: (state) => state.images,
      artists: (state) => state.artists,
    }),
  },
  data: () => ({
    loadingSong: false,
    isPlaying: false,
    audio: null,
    musicTime: 0,
    buffered: 0,
    loadingApp: true,
    playing: {},
    mightLikes: [],
    mostPopulars: [],
    previousSongId: 0,
  }),
  async mounted() {
    await this.init();
    const audio = document.querySelector("#music");
    this.audio = audio;
    audio.addEventListener("timeupdate", this.updateStatus);
    this.loadingApp = false;
  },
  methods: {
    onLoadedSong() {
      this.loadingSong = false;
    },
    loadStart() {
      this.loadingSong = true;
    },
    isSongPlaying(song) {
      return this.playing == song;
    },
    getTime() {
      const current = this.audio.currentTime;
      const duration = this.audio.duration;
      this.musicTime = (current / duration) * 100;
    },
    async init() {
      const mightLikes = this.getRandom(this.songs, 4);
      const mostPopular = this.getRandom(this.songs, 4);
      this.mightLikes = this.genSongsArray(mightLikes);
      this.mostPopulars = this.genSongsArray(mostPopular);
    },
    getImage(artist) {
      return this.$store.getters.getImageByArtist(artist);
    },
    getRandom(arr, n) {
      const result = new Array(n);
      let len = arr.length;
      const taken = new Array(len);
      if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    },
    genSongsArray(arr) {
      return arr.map((item) => {
        const image = this.getImage(item.artist);
        // set color
        item.color = image.color;
        item.tag = this.getSongTag(item);
        // set image
        item.image = image.src;
        return item;
      });
    },
    getCover(song) {
      const path = require("../" + song.cover);
      return path;
    },
    getSongTag(song) {
      const randomNum = Math.random();
      const randomIndex = Math.ceil(randomNum * song.category.length - 1);
      return song.category[randomIndex];
    },
    updateStatus(e) {
      this.audio = e.target;
      this.isPlaying = !e.target.paused;
      this.getTime();
    },
    pause() {
      this.audio.pause();
    },
    play(song = null) {
      if (this.isPlaying && !song) {
        this.pause();
        return;
      } else {
        if (song) {
          console.log("There is a song");
          this.playing = song;
        }
        setTimeout(() => {
          this.audio.play();
          this.isPlaying = true;
        }, 100);
      }
    },
    nextSong() {
      this.isPlaying = false;
      const songId = this.playing.id;
      this.previousSongId = songId - 1;
      if (songId === this.songs.length) {
        this.play(this.songs[0]);
      } else {
        this.play(this.songs[songId]);
      }
    },
    previousSong() {
      this.isPlaying = false;
      const previousSong = this.songs[this.previousSongId];
      this.play(previousSong);
    },
    genShadow(color) {
      return `-webkit-box-shadow: 0px 0px 35px -18px ${color}; 
              box-shadow: 0px 0px 35px -18px ${color};`;
    },
    test(attrs) {
      console.log(attrs);
    },
  },
};
</script>

<style lang="scss">
.font-bold-medium {
  position: relative;
  font-weight: 900 !important;
  color: white !important;
  font-size: 25px !important;
}
.d-hidden {
  opacity: 0;
}
.card-image {
  border-radius: 0 !important;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.play-bar-box {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  height: 100px;
  background-color: rgba($color: #000000, $alpha: 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(6px);
  -webkit-box-shadow: 15px -5px 26px 0px rgb(41, 41, 41);
  -moz-box-shadow: 15px -5px 26px 0px rgb(41, 41, 41);
  box-shadow: 15px -5px 26px 0px rgb(41, 41, 41);
}
.play-disk {
  position: relative;
  top: -50%;
  transform: translateY(10%);
}
.music-title-box {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.music-title {
  font-weight: bold;
  font-size: 0.9rem;
}
.music-artist {
  font-weight: lighter;
  font-size: 0.8rem;
}
.music-controls-slider {
  width: 300px;
}
.music-controls-volume {
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  float: right;
  margin-left: 520px;
  transform: translateY(-50%);
  & .music-controls-volume-slider {
    width: 70px;
  }
}
</style>
