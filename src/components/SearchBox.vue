<template>
  <v-autocomplete
    outlined
    rounded
    :loading="loading"
    dense
    :items="searchItems"
    dark
    @input="search"
    color="#4edf93"
    v-model="searchTerm"
    no-data-text="Try typing katy perry..."
    placeholder="Search"
  >
    <template #prepend-inner>
      <v-icon size="18" class="mt-1 mr-2">$search</v-icon>
    </template>
    <template #append>
      <v-icon @click="voiceSearch" size="21">$microphone</v-icon>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "search-box",
  data: () => ({
    searchTerm: "",
    loading: false,
    searchItems: [],
  }),
  methods: {
    search() {
      console.log(this.searchTerm);
    },
    voiceSearch() {},
  },
};
</script>

<style></style>
