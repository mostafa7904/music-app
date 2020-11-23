<template>
  <div class="home">
    <audio :src="playing.src" hidden ref="music"></audio>
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
        <v-hover v-slot="{ hover }">
          <v-card
            @click.stop="play(mostPopular.value)"
            hover
            :style="genShadow(mostPopular.color)"
            :color="mostPopular.color"
            class="rounded-large"
            min-height="310"
            max-height="350"
          >
            <v-card-title class="d-flex justify-space-between">
              <v-icon>mdi-wave</v-icon>
              <v-icon
                :class="playing == mostPopular.title ? 'd-block' : 'd-hidden'"
                >mdi-volume-high</v-icon
              >
            </v-card-title>
            <v-card-text class="font-bold-medium">{{
              mostPopular.title
            }}</v-card-text>
            <v-img
              class="mx-auto card-image"
              :class="hover ? 'scale-image' : ''"
              :src="mostPopular.image"
              max-width="190"
              max-height="100%"
            ></v-img>
          </v-card>
        </v-hover>
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
        <v-hover v-slot="{ hover }">
          <v-card
            @click.stop="play(mightLike.value)"
            hover
            :style="genShadow(mightLike.color)"
            :color="mightLike.color"
            class="rounded-large"
            min-height="310"
            max-height="350"
          >
            <v-card-title class="d-flex justify-space-between">
              <v-icon>mdi-wave</v-icon>
              <v-icon
                :class="playing == mightLike.title ? 'd-block' : 'd-hidden'"
                >mdi-volume-high</v-icon
              >
            </v-card-title>
            <v-card-text class="font-bold-medium">{{
              mightLike.title
            }}</v-card-text>
            <v-img
              class="mx-auto card-image"
              :class="hover ? 'scale-image' : ''"
              :src="mightLike.image"
              max-width="190"
              max-height="100%"
            ></v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <div
      class="play-bar-box d-flex flex-column flex-md-row align-center justify-space-around"
    >
      <div @click="test(musicTime)" class="play-disk"></div>
      <div class="music-title-box">
        <span class="music-title">{{ playing.title }}</span>
        <span class="music-artist">{{ playing.artist }}</span>
      </div>
      <div class="music-controls d-flex align-center">
        <div class="music-controls-buttons">
          <v-icon>mdi-skip-backward</v-icon>
          <v-icon class="mx-3">mdi-{{ isPlaying ? "pause" : "play" }}</v-icon>
          <v-icon>mdi-skip-forward</v-icon>
        </div>
        <v-progress-linear
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
export default {
  name: "Home",
  computed: {
    musicTime: function() {
      if (!this.isMounted) return 10;
      const currentTime = this.$refs.music.currentTime;
      const duration = this.$refs.music.duration;
      const timePercent = Number((currentTime / duration) * 100);
      return timePercent;
    },
    isPlaying: function() {
      if (!this.isMounted) return false;
      return !this.$refs.music.paused;
    },
  },
  mounted() {
    this.isMounted = true;
  },
  data: () => ({
    isMounted: false,
    playing: {},
    mightLikes: [
      {
        value: "danceSongs",
        title: "Lana del rey",
        image:
          "https://lh3.googleusercontent.com/proxy/seEpca2K8hh7QYBUf-ZkO_QPbvOwglXvN4G2ZH-piumzPqgWbSq8Jb8GBlhrTT7Uyr8Kbn5ZDXOVeFUeKrbBm6iKDwMAK2NI63nhnCwWG7J_QL9CgdML",
        color: "#741c3b",
      },
      {
        value: "danceSongs",
        title: "Eminem",
        image:
          "https://i.pinimg.com/originals/41/ec/9b/41ec9bc1aa2956d248874d5b070fbc1d.png",
        color: "#ffa133",
      },
      {
        value: "danceSongs",
        title: "The weekend",
        image:
          "https://lh3.googleusercontent.com/proxy/Y5RPt_Z5u_CYhFv1_CDGZJNR1oC0HjLdMcsL-Ljmf2n3_Y0Y1ZcfJJzCV1WtXk9yVCuzBqHtbVPofOB7oeUwOVVXDeZT4sCBvzFLO05qBTb-hXhQrfuKoB2hNZXg7Lvi9b2QEFSN",
        color: "#2ae59d",
      },
      {
        value: "danceSongs",
        title: "Billie Eilish",
        image:
          "https://lh3.googleusercontent.com/proxy/GHbxaHbsXyJVOPSbocYoPjrD6BBOTiit1FVsPThmSdiksPFzM_6z0dchB11syvBCJO5EEl-1gKQIVnqU8qXdgpwH1N8xtsz-44Z0ZqYZuT5dL6kLqYx_bBDRfgBKyVP1",
        color: "#67a4ff",
      },
    ],
    mostPopulars: [
      {
        value: "chillSongs",
        title: "Chill Hits",
        image: require("../assets/katy-parry.png"),
        color: "#4edf92",
      },
      {
        value: "topSongs",
        title: "Top Hits",
        image: require("../assets/taylor-swift.png"),
        color: "#ff5474",
      },
      {
        value: "acousticSongs",
        title: "Acoustic",
        image: require("../assets/chris-martin.png"),
        color: "#7673fe",
      },
      {
        value: "danceSongs",
        title: "Dance",
        image: require("../assets/Lady-Gaga.png"),
        color: "#ffa133",
      },
    ],
  }),
  methods: {
    pause() {
      this.$refs.music.pause();
    },
    play(value) {
      this.playing = this.$store.state[value][0];
      setTimeout(() => {
        this.$refs.music.play();
      }, 500);
    },
    genShadow(color) {
      return `-webkit-box-shadow: 0px 0px 35px -18px ${color}; 
              box-shadow: 0px 0px 35px -18px ${color};`;
    },
    test(attrs) {
      console.log(!this.$refs.music.paused);
      console.log(attrs);
    },
  },
};
</script>

<style lang="scss">
.rounded-large {
  border-radius: 32px !important;
}
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
  background: url("https://icons.iconarchive.com/icons/harwen/simple/256/Audio-CD-icon.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 100px;
  height: 100px;
  border-radius: 50%;
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
