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
    <v-card-title class="d-flex justify-space-between">
      <v-icon>mdi-wave</v-icon>
      <v-icon v-if="isPlaying">$volume-high</v-icon>
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

<style></style>
