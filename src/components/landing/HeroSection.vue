<template>
  <v-container fluid :id="$vuetify.breakpoint.smAndDown ? 'container-mobile' : 'container'">
    <v-row class="fill-height" justify="start" align="center">
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-black">
              The future of event organization
            </h1>
          </v-col>
          <v-col cols="12">
            <h2 class="text-body-1 hero-subtitle">
              Host your events and keep track of the participants. You data was
              never this secure. Our blockchain technology guarantees the
              validity of your data.
            </h2>
          </v-col>
          <v-col cols="12" md="6" class="text-start">
            <v-btn block color="secondary" x-large to="signUp"
              ><strong>Let`s get started</strong></v-btn
            >
          </v-col>
          <v-col cols="12" md="6" class="text-start">
            <v-btn color="primary lighten-5" block x-large to="about"
              ><strong>Learn more</strong></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block text-left justify-start">
        <v-img
          src="img/clip-1004.png"
          layzy-src="img/clip-1004.png"
          alt="Man who flies into the sky with a jetpack"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped lang="scss">
#container {
  height: 100vh;
  padding-left: 8rem;
  padding-right: 8rem;
}
#container-mobile {
  height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
}

.hero-subtitle {
  font-weight: 600;
}
</style>
