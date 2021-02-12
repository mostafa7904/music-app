import Vue from "vue";
import ColorThief from "colorthief";

Vue.mixin({
  data: () => ({
    audioEl: null,
    canvas: null,
    audioCtx: null,
    analyser: null,
    ctx: null,
    fftSize: 512,
    canvHeight: 0,
    canvWidth: 0,
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
      return colors;
    },
    /**
     *
     * @async
     * @description This function starts the visulizing process
     * @param {HTMLImageElement} img The image which will be visulized
     * @param {HTMLAudioElement} audio The audio element which will be analized and visulized
     */
    async visulize(img, audio) {
      try {
        await this.setup(img, audio);
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
      this.ctx.fillStyle = "white";
      this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight);
      this.ctx.fillRect(0, 0, this.canvWidth, this.canvHeight);
      this.ctx.lineWidth = this.lineWidth;
      data.forEach((_, index) => {
        const barHeight = data[index] / 2;
        this.ctx.strokeStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        this.ctx.beginPath();
        this.ctx.moveTo(index * this.lineWidth + this.lineSpace, 0);
        this.ctx.lineTo(index * this.lineWidth + this.lineSpace, barHeight);
        this.ctx.stroke();
        this.ctx.closePath();
      });
    },
    /**
     *
     * @async
     * @description Sets up the audio analizer and connects it to the source
     */
    async setAnalyser() {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioCtx.createAnalyser();
      const src = this.audioCtx.createMediaElementSource(this.audio);

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
      canvas.id = "audio_visual";
      const ctx = canvas.getContext("2d");
      this.ctx = ctx;
      this.audioEl = audio;
      this.canvas = canvas;
      this.canvHeight = this.canvas.height;
      this.canvWidth = this.canvas.width;
    },
  },
});
