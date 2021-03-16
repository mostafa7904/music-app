<template>
  <div>
    <div class="songs-section text-left mt-12" v-if="songs.length !== 0">
      <div class="mb-2">
        <h2>Songs</h2>
      </div>
      <v-list color="transparent">
        <template v-for="(song, idx) in songs">
          <v-hover :key="idx" v-slot="{ hover }">
            <v-list-item
              :key="idx"
              class="song-item mx-4"
              @click.stop="play(song)"
            >
              <v-list-item-avatar tile size="50">
                <v-overlay :value="hover" absolute color="black" opacity="0.7">
                  <v-icon size="20">
                    $play
                  </v-icon>
                </v-overlay>
                <v-img :src="require('../' + song.cover)"> </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="d-flex justify-space-between">
                  <v-list-item-title>
                    {{ song.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ song.artist }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ song.album }}
                  </v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-hover>
          <v-divider class="mx-5 my-2" :key="'divider' + idx"> </v-divider>
        </template>
      </v-list>
    </div>
    <div class="artists-section text-left mt-12" v-if="artists.length !== 0">
      <div class="mb-2">
        <h2>Artists</h2>
      </div>
      <v-list color="transparent">
        <template v-for="(artist, idx) in artists">
          <v-list-item
            :key="idx"
            :to="`/artist/${artist.name}`"
            class="artist-item mx-4"
          >
            <v-list-item-avatar size="50">
              <v-img :src="require('../' + artist.image)"> </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ artist.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Artist
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mx-5 my-2" :key="'divider-artist' + idx">
          </v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  computed: {
    songs() {
      return this.$store.state.songs.filter(
        ({ title, artist }) =>
          title.toLowerCase().includes(this.$route.query.q) ||
          artist.toLowerCase().includes(this.$route.query.q)
      );
    },
    artists() {
      return this.$store.state.artists
        .filter((artist) => artist.toLowerCase().includes(this.$route.query.q))
        .map((item) => {
          return {
            name: item,
            image: this.$store.state.images[item].largeImage,
          };
        });
    },
    searchTerm() {
      return this.$route.query.q;
    },
  },
};
</script>

<style></style>
