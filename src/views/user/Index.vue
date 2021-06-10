<template>
  <v-container class="contentArea">
    <v-row justify="center" align="start">
      <v-col cols="12" class="text-start pb-0">
        <h1 class="text-h3">{{ greeting }}</h1>
      </v-col>
      <v-col cols="12">
        <p class="text-h6 pl-1 font-weight-light">
          Heres what`s happend in your events today.
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat color="transparent" class="mt-4 pa-0">
          <v-card-title class="pl-0">Today's events</v-card-title>
          <v-card-actions v-if="eventsOfToday && eventsOfToday.length >= 1" class="pl-0">
            <v-row>
              <v-col
                cols="12"
                v-for="event in eventsOfToday"
                :key="event.eventid"
              >
                <v-card
                  width="100%"
                  color="primary"
                  dark
                  :to="`user/events/${event.eventid}`"
                >
                  <v-card-title>
                    {{ event.name }}
                    <v-spacer></v-spacer>
                    <v-icon>mdi-clock</v-icon>
                    {{ event.time }}</v-card-title
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions v-else class="pl-0">
            <v-row>
              <v-col cols="12" class="pl-0">
                <p class="text-subtitle-1 pl-3">
                  You have no events for today ...
                </p>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="6" class="d-none d-md-block">
        <v-card flat color="transparent">
          <v-card-actions>
            <v-img
              src="img/clip-992.png"
              layzy-src="img/clip-992.png"
              alt="Man who flies into the sky with a jetpack"
              contain
            ></v-img>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Events",
  watch: {
    $route: "fetchData",
  },
  computed: {
    ...mapGetters({
      getUser: "users/getUser",
      events: "events/getEvents",
    }),
    eventsOfToday() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return this.events
        .filter((event) => {
          return !!event.date;
        })
        .map((event) => {
          return {
            ...event,
            date: event.date
              ? new Date(event.date).setHours(0, 0, 0, 0)
              : event.date,
          };
        })
        .filter((event) => {
          return event.date.valueOf() === today.valueOf();
        })
        .slice(0, 4);
    },
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
  methods: {
    ...mapActions({
      fetchEvents: "events/fetchEvents",
    }),
    fetchData() {
      this.fetchEvents();
    },
    formatDate(date) {
      return date ? format(parseISO(date), "EEEE, MMMM do yyyy") : "";
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>

<style scoped>
.contentArea {
  padding-top: 5rem;
}
</style>
