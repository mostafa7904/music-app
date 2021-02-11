<template>
  <v-autocomplete
    outlined
    rounded
    :loading="loading"
    dense
    clearable
    :menu-props="{ contentClass: 'transparent-scroll' }"
    :items="searchItems"
    item-text="title"
    color="#4edf93"
    :search-input.sync="searchTerm"
    no-data-text="Try typing blinding lights..."
    placeholder="Search"
  >
    <template #prepend-inner>
      <v-icon size="18" class="mt-1 mr-2">$search</v-icon>
    </template>
    <template #append>
      <v-icon @click="voiceSearch" size="21">$microphone</v-icon>
    </template>

    <template #item="{item}" class="mt-12">
      <v-list-item two-line :to="`search?q=${item.title}`">
        <v-list-item-content class="text-left">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>
            $chevron-right
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "search-box",
  computed: {
    ...mapState({
      songs: (state) => {
        return state.songs.map((item) => ({
          title: item.title.toLowerCase(),
          type: "song",
        }));
      },
      artists: (state) => {
        return state.artists.map((item) => ({
          title: item.toLowerCase(),
          type: "artist",
        }));
      },
    }),
  },
  data: () => ({
    searchTerm: "",
    loading: false,
    searchItems: [],
  }),
  watch: {
    searchTerm() {
      if (!this.searchTerm) return (this.searchItems = []);
      this.loading = true;
      this.searchItems.push(
        ...this.songs.filter((item) => item.title.includes(this.searchTerm))
      );
      this.searchItems.push(
        ...this.artists.filter((item) => item.title.includes(this.searchTerm))
      );
      this.loading = false;
    },
  },
  methods: {
    async search() {},
    voiceSearch() {},
  },
};
</script>

<style>
.transparent-scroll {
  scrollbar-width: thin;
  scrollbar-color: transparent;
}
.transparent-scroll::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}
.transparent-scroll::-webkit-scrollbar-thumb {
  background: #d8dcde;
  border-radius: 4.5px;
}
.transparent-scroll::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
