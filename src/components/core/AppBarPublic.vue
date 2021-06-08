<template>
  <v-app-bar app color="primary" dark>
    <Logo></Logo>

    <v-btn v-if="!$vuetify.breakpoint.mobile" to="/stories" text large>
      <strong>Stories</strong>
    </v-btn>
    <v-btn v-if="!$vuetify.breakpoint.mobile" to="/about" text large>
      <strong>About</strong>
    </v-btn>
    <v-btn v-if="!$vuetify.breakpoint.mobile" to="/help" text large>
      <strong>Help</strong>
    </v-btn>
    <v-btn v-if="!$vuetify.breakpoint.mobile" to="/contact" text large>
      <strong>Contact</strong>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn to="/signIn" text large class="mr-4">
      <strong>Sign In</strong>
    </v-btn>
    <v-btn
      v-if="!$vuetify.breakpoint.mobile"
      to="/signUp"
      color="secondary"
      large
      class="mr-10"
    >
      <strong>Create Account</strong>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBarPublic",
  components: { Logo: () => import("./Logo") },
};
</script>

<style scoped></style>
