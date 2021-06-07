<template>
  <v-btn
    color="transparent"
    text
    large
    v-ripple="{ class: 'transparent--text', background: 'transparent' }"
    class="text-left justify-left linkAsText"
    mb-0
    pb-0
    to="/"
    @click="this.$scrollToTop"
  >
    <v-img
      alt="conDIDI Logo"
      class="shrink mt-1 hidden-sm-and-down"
      contain
      min-width="100"
      src="/img/Logo.png"
    />
  </v-btn>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style scoped>
.v-btn--active.no-active::before {
  background-color: transparent !important;
}

.linkAsText {
  color: var(--secondary--text);
  text-decoration: none;
  text-shadow: none;
  box-shadow: none;
}

.v-btn::before {
  display: none;
}

.v-btn--active {
  font-weight: bold;
}
</style>
