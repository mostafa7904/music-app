import ColorThief from "colorthief";

export default {
  name: "visualizer",
  data: () => ({
    audioEl: null,
    canvas: null,
    audioCtx: null,
    analyser: null,
    ctx: null,
    fftSize: 512,
    canvHeight: 0,
    canvWidth: 0,
    colors: [],
  }),
  methods: {
    /**
     *
     * @async
     * @description This function gets an image element and returns an array of the main colors in the image
     * @param {HTMLImageElement} img The image element to extract the colors from
     * @param {number} [amount = 3] anount of colors extracted and returned
     * @returns {Array} An array of colors {@example {"rgb(55,52,52)", ...} }
     */
    async getColors(img, amount = 3) {
      const colorThief = new ColorThief();
      let colors = await colorThief.getPalette(img, amount);
      colors = colors.map((item) => {
        return `rgb(${item[0]},${item[1]},${item[2]})`;
      });
      this.colors = colors;
      this.colorsLength = this.colors.length + 10;
    },
    /**
     *
     * @async
     * @description This function starts the visulizing process
     * @param {HTMLImageElement} img The image which will be visulized
     * @param {HTMLAudioElement} audio The audio element which will be analized and visulized
     */
    async visulize(img) {
      try {
        await this.setup(img, this.$store.state.playBar.audio);
        if (!this.audioCtx) this.setAnalyser();

        this.mainLoop();
      } catch (e) {
        console.log("An error occurred during visulize!");
        console.error(e);
      }
    },
    /**
     * @description This is the main loop that the animation happens
     */
    mainLoop() {
      // this is the analyzing the song part
      /* -------------------------------------------------------------------------------- */
      const frqBits = this.analyser.frequencyBinCount;
      const data = new Uint8Array(frqBits);
      this.analyser.getByteFrequencyData(data);
      /* -------------------------------------------------------------------------------- */

      this.draw(data);

      // request animation frame
      // This is the loop
      requestAnimationFrame(this.mainLoop);
    },
    /**
     *
     * @param {Uint8Array} data An array buffer with the audio data
     * @description This function draws the visulizes on the canvas with the data that its given
     */
    draw(data) {
      // This is the drawing part
      this.ctx.fillStyle = "transparent";
      this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight);
      this.ctx.fillRect(0, 0, this.canvWidth, this.canvHeight);
      this.ctx.lineWidth = this.lineWidth;
      for (let i = 0; i < this.colorsLength; i++) {
        if (i >= 10) {
          const barHeight = data[i] / 2;
          this.ctx.beginPath();
          this.ctx.fillStyle = this.colors[i - 10];
          if (i % 2 === 0) {
            this.ctx.ellipse(
              0,
              i,
              barHeight,
              this.canvHeight,
              Math.PI / 4,
              0,
              2 * Math.PI
            );
          } else {
            this.ctx.ellipse(
              0,
              i,
              this.canvWidth,
              barHeight,
              Math.PI / 4,
              0,
              2 * Math.PI
            );
          }
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    },
    /**
     *
     * @async
     * @description Sets up the audio analizer and connects it to the source
     */
    async setAnalyser() {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioCtx.createAnalyser();
      const src = this.audioCtx.createMediaElementSource(this.audioEl);

      src.connect(this.analyser);
      this.analyser.fftSize = this.fftSize;
      this.analyser.connect(this.audioCtx.destination);
    },
    /**
     *
     * @async
     * @description Sets up the canvas
     * @param {HTMLImageElement} img The image which will be visulized
     * @param {HTMLAudioElement} audio The audio element which will be analized and visulized
     */
    async setup(img, audio) {
      const canvas = document.createElement("canvas");
      canvas.width = img.width + 100;
      canvas.height = img.height + 100;
      canvas.style.position = "relative";
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.id = "audio_visual";
      this.ctx = canvas.getContext("2d");
      this.audioEl = audio;
      this.canvas = canvas;
      this.canvHeight = this.canvas.height;
      this.canvWidth = this.canvas.width;
      this.getColors(img);
    },
  },
};
