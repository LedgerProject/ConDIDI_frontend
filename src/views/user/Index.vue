<template>
  <v-container class="contentArea">
    <v-row justify="center" align="start">
      <v-col cols="12" class="text-start pb-0">
        <h1 class="text-h3">{{ greeting }}</h1>
      </v-col>
      <v-col cols="12">
        <p class="text-h6 pl-1 font-weight-light">
          Heres what`s happend in your events today
        </p>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Test</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Test</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-black">Event Calendar</h2>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-actions>
            <EventCalendar></EventCalendar>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import EventCalendar from "../../components/events/EventCalendar";

export default {
  name: "Events",
  components: { EventCalendar },
  computed: {
    ...mapGetters({
      getUser: "users/getUser",
    }),
    greeting() {
      if (!this.getUser) {
        return "Welcome back!";
      }

      if (this.getUser.first_name) {
        return `Welcome back, ${this.getUser.first_name}!`;
      }
      if (this.getUser.last_name) {
        return `Welcome back, ${this.getUser.last_name}!`;
      }

      return "Welcome back!";
    },
  },
};
</script>

<style scoped>
.contentArea {
  padding-top: 5rem;
}
</style>
