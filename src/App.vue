<template>
  <v-app id="app">
    <v-app-bar color="black" elevation="0" app class="py-4">
      <v-icon class="mb-6" @click.stop="drawerMenuClick" v-if="screenIsSmall"
        >$menu</v-icon
      >
      <v-row justify="space-between" v-if="!screenIsSmall">
        <v-col md="3" cols="12">
          <search-box />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      width="230"
      v-model="drawer"
      color="black"
      app
      :mini-variant="miniDrawer"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon size="35" v-if="!miniDrawer">$spotify</v-icon>
            <v-icon size="20" class="mr-2" v-else @click.stop="drawerMenuClick"
              >$menu</v-icon
            >
          </v-list-item-avatar>
          <v-list-item-title class="font-black">Music app</v-list-item-title>
          <v-list-item-action>
            <v-icon @click.stop="drawerMenuClick">$menu</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider inset class="mx-auto"></v-divider>
      <v-list nav color="transparent" flat class="mt-3">
        <v-list-item
          v-for="(navItem, index) in navItems"
          :key="index"
          class="pr-6"
          link
          exact
          :to="navItem.link"
          exact-active-class="active-nav-link"
        >
          <v-tooltip nudge-right="8" right :z-index="miniDrawer ? 900000 : -5">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="mr-6">{{
                navItem.icon
              }}</v-icon>
              <span>{{ navItem.title }}</span>
            </template>
            <span>{{ navItem.title }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="mb-16 pb-16 mx-md-10 mx-3">
      <v-container fluid>
        <router-view />
      </v-container>
      <keep-alive>
        <play-bar />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import PlayBar from "./components/PlayBar.vue";
import SearchBox from "./components/SearchBox.vue";
export default {
  components: { PlayBar, SearchBox },
  name: "app",
  computed: {
    ...mapGetters(["screenIsSmall"]),
  },
  data: () => ({
    drawer: true,
    miniDrawer: false,
    navItems: [
      {
        title: "Home",
        icon: "$home",
        link: "/",
      },
      {
        title: "Listen Now",
        icon: "$listen",
        link: "/listen-now",
      },
      {
        title: "Library",
        icon: "$library",
        link: "/library",
      },
      {
        title: "Trending",
        icon: "$trending",
        link: "/trending",
      },
      {
        title: "Settings",
        icon: "$settings",
        link: "/settings",
      },
      {
        title: "About",
        icon: "$info",
        link: "/about",
      },
    ],
  }),
  methods: {
    drawerMenuClick() {
      if (this.screenIsSmall) {
        this.miniDrawer = false;
        this.drawer = !this.drawer;
      } else {
        this.miniDrawer = !this.miniDrawer;
      }
    },
  },
};
</script>

<style>
svg {
  fill: currentColor;
}
path {
  fill: currentColor;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.active-nav-link {
  color: #1ed760 !important;
}
</style>
