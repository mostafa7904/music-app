<template>
  <div class="height-fill">
    <div class="artist-cover-filter"></div>
    <v-img
      class="artist-cover"
      :src="artistImage"
      height="400"
      min-width="100%"
    >
    </v-img>
    <div class="artist-detail">
      <div class="artist-name text-h4 font-weight-bold">
        {{ artistName }}
      </div>
      <div class="artist-bio text-caption">
        {{ artistBio }}
        <v-btn text x-small @click.stop="readMore = !readMore"
          >Read {{ readMore ? "Less" : "More" }}</v-btn
        >
      </div>
      <div class="actions mt-6">
        <v-btn color="white" light depressed class="mr-4">
          Shuffle
        </v-btn>
        <v-btn color="white" light depressed class="mr-4">
          Radio
        </v-btn>
        <v-btn depressed>
          Follow
        </v-btn>
      </div>
      <div class="songs-section mt-12">
        <div class="mb-2">
          <h2>Songs</h2>
        </div>
        <v-list color="transparent">
          <template v-for="(song, idx) in artistSongs">
            <v-hover :key="idx" v-slot="{ hover }">
              <v-list-item
                :key="idx"
                class="song-item mx-4"
                @click.stop="play(song)"
              >
                <v-list-item-avatar tile>
                  <v-overlay
                    :value="hover"
                    absolute
                    color="black"
                    opacity="0.7"
                  >
                    <v-icon size="20">
                      $play
                    </v-icon>
                  </v-overlay>
                  <v-img :src="require('../' + song.cover)"> </v-img>
                </v-list-item-avatar>
                <v-list-item-title>
                  {{ song.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ song.album }}
                </v-list-item-subtitle>
                <v-list-item-action :class="hover ? '' : 'd-hidden'">
                  <v-btn icon>
                    <v-icon>
                      $heart
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-hover>
            <v-divider class="mx-5 my-2" :key="'divider' + idx"> </v-divider>
          </template>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["images", "songs"]),
    artistImage() {
      const name = this.$route.params.name;
      const src = this.images[name].largeImage;
      return require("../" + src);
    },
    artistName() {
      return this.$route.params.name;
    },
    artistBio() {
      const bio = ` Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur vel
        exercitationem obcaecati recusandae ut ratione maxime praesentium
        accusantium neque veniam explicabo ipsum nulla, minus autem rerum
        eligendi dignissimos, necessitatibus a!`;
      if (!this.readMore) return bio.slice(0, 80) + " ...";
      return bio;
    },
    artistSongs() {
      return this.songs.filter((song) => song.artist === this.artistName);
    },
  },
  data: () => ({
    readMore: false,
  }),
  mounted() {
    this.$vuetify.goTo(0);
  },
  methods: {
    play(song) {
      this.$store.dispatch("play", song);
    },
  },
  name: "artist-page",
};
</script>

<style scoped lang="scss">
.artist-cover {
  position: absolute;
  top: -45px;
  left: 0;
  transform: scale(1.1);
}
.height-fill {
  min-height: 900px;
}
.artist-cover-filter {
  position: absolute;
  top: -45px;
  left: 0;
  z-index: 1;
  min-width: 100%;
  height: 400px;
  background: linear-gradient(
    180deg,
    rgba(18, 18, 18, 0.3) 0%,
    rgba(18, 18, 18, 0.25) 50%,
    rgba(18, 18, 18, 0.5) 77%,
    rgba(18, 18, 18, 1) 100%
  );
  transform: scale(1.1);
}
.artist-detail {
  z-index: 2;
  position: relative;
  top: 320px;
  text-align: left;
  .artist-bio {
    max-width: 300px;
  }
}
</style>
