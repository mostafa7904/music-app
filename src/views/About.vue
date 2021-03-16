<template>
  <div class="about-page text-left pa-12">
    <h1>About</h1>
    <p>
      This website is made by
      <a href="https://mostafa-rahmati.ir" target="_blank">Mostafa Rahmati</a>.
      The desing is inspired from
      <a
        href="https://twitter.com/SMohammadiNia"
        target="_blank"
        rel="noopener noreferrer"
        >Sajad mohamd nia's</a
      >
      desing on
      <a
        href="https://dribbble.com/shots/14623432-Music-Streaming-Desktop-app/attachments/6316751?mode=media"
        target="_blank"
        rel="noopener noreferrer"
        >dribble</a
      >. Make sure to check him out. <br />
      There are no copyright issues with the songs. Unless the website that we
      use tells me to stop using their songs. This is a small project that I've
      built in my free time. I first made this website cause I was sick of ads
      and I wanted all my songs in the same place. I'm not planning to make
      money out of this website.
      <br />
      If you enjoy this project and want to help maybe star it on GitHub or
      follow me on my social medias.
    </p>
    <div>
      <v-row justify="center" class="mt-12">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              depressed
              link
              name="gitlab"
              v-bind="attrs"
              v-on="on"
              href="https://gitlab.com/mostafa7904"
              rel="noreferrer noopener"
              target="_blank"
              title="gitlab"
            >
              <v-icon>$gitlab</v-icon>
            </v-btn>
          </template>
          <span>Gitlab</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-6"
              icon
              small
              depressed
              link
              name="gitlab"
              v-bind="attrs"
              v-on="on"
              href="https://codepen.io/mostafa7904"
              rel="noreferrer noopener"
              target="_blank"
              title="codepen"
            >
              <v-icon>$codepen</v-icon>
            </v-btn>
          </template>
          <span>Codepen</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              depressed
              link
              name="github"
              v-bind="attrs"
              v-on="on"
              href="https://github.com/mostafa7904"
              rel="noreferrer noopener"
              target="_blank"
              title="github"
            >
              <v-icon>$github</v-icon>
            </v-btn>
          </template>
          <span>Github</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              depressed
              class="ml-6"
              link
              name="website"
              v-bind="attrs"
              v-on="on"
              href="https://mostafa-rahmati.ir"
              rel="noreferrer noopener"
              target="_blank"
              title="website"
            >
              <v-icon>$website</v-icon>
            </v-btn>
          </template>
          <span>Website</span>
        </v-tooltip>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
