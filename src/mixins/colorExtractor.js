import Vue from "vue";
import ColorThief from "colorthief";

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
  methods: {
    async getColors(img, amount = 3) {
      const colorThief = new ColorThief();
      let colors = await colorThief.getPalette(img, amount);
      colors = colors.map((item) => {
        return `rgb(${item[0]},${item[1]},${item[2]})`;
      });
      return colors;
    },
    async visulize(
      img = document.createElement("img"),
      audio = document.createElement("audio"),
      options
    ) {
      options = options || { fftSize: 512 };
      const { canvas, ctx } = await this.setupCanvas(img);
    },
    async setupCanvas(img) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width + 100;
      canvas.height = img.height + 100;
      canvas.id = "audio_visual";
      const ctx = canvas.getContext("2d");

      return {
        canvas,
        ctx,
      };
    },
  },
});
