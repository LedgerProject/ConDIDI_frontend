<template>
  <v-container class="contentArea">
    <v-row justify="center" align="start">
      <v-col cols="12" class="text-start pb-0">
        <h1 class="text-h3">User settings</h1>
      </v-col>
      <v-col cols="12" class="pt-0">
        <p class="text-h6 pl-1 font-weight-light">
          Here you can edit all user settings.
        </p>
      </v-col>
      <v-col cols="12">
        <h2 class="text-h5">Danger Zone</h2>
      </v-col>
      <v-col co="12">
        <p>
          The button will open you mail client, to write to our support. We will
          quickly get back to you and delete your user data.
        </p>
      </v-col>
      <v-col cols="12">
        <v-btn :large="$vuetify.breakpoint.mobile" color="primary" dark href="mailto:ingo.keck@tib.eu">
          Delete account
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
};
</script>

<style scoped>
.contentArea {
  padding-top: 5rem;
}
</style>
