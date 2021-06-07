<template>
  <v-container fluid class="fill-height pa-0 ma-0">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" class="pa-0 landing-banner-section-bg">
        <HeroSection></HeroSection>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    HeroSection: () => import("../components/landing/HeroSection"),
  },
};
</script>

<style scoped>
.landing-banner-section-bg {
  background: #f1f1f1;
}
</style>
