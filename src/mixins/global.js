import Vue from "vue";

Vue.mixin({
  computed: {
    screenIsSmall: function() {
      return (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.sm ||
        this.$vuetify.breakpoint.xs
      );
    },
  },
});
