<template>
  <v-container
    fluid
    :id="$vuetify.breakpoint.smAndDown ? 'container-mobile' : 'container'"
  >
    <v-row class="fill-height" justify="start" align="center">
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-black">
              Got any questions?
            </h1>
          </v-col>
          <v-col cols="12">
            <h2 class="text-h6 font-weight-light">
              Just write us a quick email and let us know your thoughts. No
              matter if you have any questions regarding the product or having
              technical problems. Just message us directly!
            </h2>
          </v-col>
          <v-col cols="12" md="6" class="text-start">
            <v-btn block color="secondary" x-large href="mailto:ingo.keck@tib.eu"
              ><strong>Write a message</strong></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="d-none d-md-block text-left justify-start">
        <v-img
          src="img/clip-hardworking-man.png"
          layzy-src="img/clip-hardworking-man.png"
          alt="Man who flies into the sky with a jetpack"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContactSection",
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
