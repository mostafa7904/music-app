<template>
  <v-card
    :ripple="false"
    @click.stop="play(song)"
    :style="genShadow(song.color)"
    :color="song.color"
    rounded="xl"
    min-height="310"
    max-height="350"
  >
    <v-card-title>
      <v-icon class="music-playing-icon" v-show="isPlaying"
        >$volume-high</v-icon
      >
      <v-icon @click.stop="" class="dots-music-card">$dots-vertical</v-icon>
    </v-card-title>
    <v-card-text class="font-bold-medium" v-once>{{ cardTitle }}</v-card-text>
    <v-img
      class="mx-auto card-image"
      :src="song.image"
      max-width="200"
      min-height="200"
      max-height="100%"
    ></v-img>
  </v-card>
</template>

<script>
export default {
  name: "music-card",
  props: {
    song: Object,
    cardTitle: String,
    isPlaying: Boolean,
  },
  methods: {
    genShadow(color) {
      return `-webkit-box-shadow: 0px 10px 35px -8px ${color};
              box-shadow: 0px 10px 35px -8px ${color};
              -moz-box-shadow: 0px 10px 35px -8px ${color};`;
    },
    play(song) {
      this.$emit("musicPlay", song);
    },
  },
};
</script>

<style scoped>
.music-playing-icon {
  position: absolute;
  top: 20px;
  left: 20px;
}
.dots-music-card {
  position: absolute;
  top: 20px;
  right: 20px;
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
</style>
