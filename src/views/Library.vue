<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="text-left"><h2>History</h2></div>
      </v-col>
      <v-col cols="12">
        <v-slide-group
          show-arrows
          dark
          next-icon="$chevron-right"
          prev-icon="$chevron-left"
        >
          <v-slide-item v-for="(item, idx) in history" :key="idx">
            <v-hover v-slot="{ hover }">
              <v-card
                :ripple="false"
                max-height="150"
                @click="historyCardClick(item)"
                flat
                color="transparent"
                max-width="150"
                class="mr-4 rounded-circle "
              >
                <v-avatar size="150" :tile="item.type === 'song'">
                  <v-overlay
                    :value="hover && item.type === 'song'"
                    absolute
                    color="black"
                    opacity="0.7"
                  >
                    <v-icon size="40">
                      $play
                    </v-icon>
                  </v-overlay>
                  <v-img
                    :src="
                      item.type === 'song'
                        ? require('../' + item.cover)
                        : item.image
                    "
                  >
                  </v-img>
                </v-avatar>
              </v-card>
            </v-hover>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import History from "../utils/history";
export default {
  name: "Library",
  data: () => ({
    history: [],
  }),
  async mounted() {
    const history = new History();
    this.history = await history.getHistory();
  },
  methods: {
    historyCardClick(item) {
      if (item.type === "song") this.$store.dispatch("play", item);
      else this.$router.push(`/artist/${item.name}`);
    },
  },
};
</script>

<style>
.cd {
  white-space: normal;
}
</style>
