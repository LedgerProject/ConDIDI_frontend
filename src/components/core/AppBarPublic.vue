<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <!--        <v-img-->
      <!--          alt="conDIDI Logo"-->
      <!--          class="shrink mr-2"-->
      <!--          contain-->
      <!--          src="/img/Logo.png"-->
      <!--          transition="scale-transition"-->
      <!--          width="40"-->
      <!--        />-->
      <Logo></Logo>
    </div>

    <v-btn to="/stories" text large> <strong>Stories</strong> </v-btn>
    <v-btn to="/about" text large> <strong>About</strong> </v-btn>
    <v-btn to="/help" text large> <strong>Help</strong> </v-btn>
    <v-btn to="/contact" text large> <strong>Contact</strong> </v-btn>

    <v-spacer></v-spacer>

    <v-btn to="/signIn" text large class="mr-4">
      <strong>Sign In</strong>
    </v-btn>
    <v-btn to="/signUp" color="secondary" large class="mr-10">
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
