<template>
  <div class="home">
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
        <music-card
          :isPlaying="isSongPlaying(mostPopular)"
          @musicPlay="play"
          :song="mostPopular"
          :cardTitle="getSongTag(mostPopular)"
        />
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
        <music-card
          :isPlaying="isSongPlaying(mightLike)"
          @musicPlay="play"
          :song="mightLike"
          :cardTitle="mightLike.artist"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MusicCard from "../components/MusicCard.vue";
export default {
  components: { MusicCard },
  name: "Home",
  computed: {
    ...mapState({
      isPlaying: (state) => state.playBar.isPlaying,
      playing: (state) => state.playBar.playing,
      songs: (state) => state.songs,
      images: (state) => state.images,
      artists: (state) => state.artists,
      categories: (state) => state.categories,
    }),
  },
  data: () => ({
    mightLikes: [],
    mostPopulars: [],
  }),
  async mounted() {
    await this.init();
  },
  methods: {
    isSongPlaying(song) {
      return this.playing == song;
    },
    async init() {
      const mightLikes = await this.genMightLikes();
      const mostPopular = await this.genMostPopular();
      this.mightLikes = await this.genSongsArray(mightLikes);
      this.mostPopulars = await this.genSongsArray(mostPopular);
    },
    async genMightLikes() {
      const songs = [];
      this.artists.forEach((artist) => {
        const song = this.songs.find((item) => item.artist === artist);
        songs.push(song);
      });
      return this.getRandom(songs, 4);
    },
    async genMostPopular() {
      const songs = [];
      this.categories.forEach((category) => {
        const song = this.songs.find((item) =>
          item.category.includes(category)
        );
        if (!songs.includes(song) && !this.mightLikes.includes(song)) {
          songs.push(song);
        }
      });
      return this.getRandom(songs, 4);
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
    async genSongsArray(arr) {
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

    getSongTag(song) {
      const randomNum = Math.random();
      const randomIndex = Math.ceil(randomNum * song.category.length - 1);
      return song.category[randomIndex];
    },
    play(song = null) {
      this.$store.dispatch("play", song);
    },
  },
};
</script>
