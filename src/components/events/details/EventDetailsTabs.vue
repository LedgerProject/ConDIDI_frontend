<template>
  <v-tabs v-model="tab" color="primary" grow background-color="transparent">
    <v-tab>Overview</v-tab>
    <v-tab>Members</v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "EventDetailsTabs",
  data() {
    return {
      tab: 0,
    };
  },
};
</script>

<style scoped></style>
