<template>
  <v-btn
    color="transparent"
    text
    large
    v-ripple="{ class: 'transparent--text', background: 'transparent' }"
    class="text-left justify-left linkAsText"
    mb-0
    pb-0
    :to="signedIn ? '/user' : '/'"
    @click="this.$scrollToTop"
  >
    <v-img
      v-if="dark"
      alt="conDIDI Logo"
      class="mt-1"
      contain
      min-width="100"
      src="img/logo_white.png"
      lazy-src="img/logo_white.png"
    />
    <v-img
      v-else
      alt="conDIDI Logo"
      class="mt-1"
      contain
      min-width="100"
      src="img/logo_black.png"
      lazy-src="img/logo_black.png"
    />
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Logo",
  props: {
    dark: {
      required: false,
      default: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      signedIn: "users/isSignedIn",
    }),
  },
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
