<template>
  <v-card
    :to="`/user/events/${item.eventid}`"
    height="100%"
    rounded
    min-height="400px"
    class="card-outter"
    hover
  >
    <v-card-actions v-if="eventType">
      <v-chip color="blue darken-2" pill dark> {{ eventType.name }}</v-chip>
    </v-card-actions>
    <v-card-title class="text-h5 font-weight-bold">
      {{ item.name }}
    </v-card-title>
    <v-card-text class="align-start text-start">
      {{ subjectSpliced }}
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-icon>mdi-calendar</v-icon>
          {{ computedDateFormattedDatefns }}
        </v-col>
        <v-col cols="6">
          <v-icon>mdi-clock</v-icon>
          {{ timeFormatted }}
        </v-col>

        <v-col v-if="onlineEvent" cols="6">
          <v-icon>mdi-web</v-icon>
          {{ loginUrlFormatted }}
        </v-col>
        <v-col v-if="onlineEvent" cols="6">
          <v-icon>mdi-lock</v-icon>
          {{ loginPasswordFormatted }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-btn text
        >Learn more <v-icon color="accent">mdi-chevron-right</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { format, parseISO } from "date-fns";

export default {
  name: "EventCard",
  props: {
    item: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
    ...mapGetters("events", ["getEventTypes"]),
    ...mapGetters("gradients", ["getGradients"]),
    createBackgroundString() {
      return `linear-gradient(${this.gradient.deg}, ${this.gradient.color1} ${this.gradient.percentage1}, ${this.gradient.color2} ${this.gradient.percentage2}, ${this.gradient.color3} ${this.gradient.percentage3})`;
    },
    gradient() {
      const item = this.getGradients.find((item) => {
        return item.eventid == this.item.gradient;
      });
      return item ? item : this.getGradients[0];
    },
    eventType() {
      return this.getEventTypes.find((item) => {
        return item.name === this.item.type;
      });
    },
    timeFormatted() {
      return this.item.time
        ? `${this.item.time} GMT-2:00`
        : "No time specified";
    },
    computedDateFormattedDatefns() {
      return this.item.date
        ? format(parseISO(this.item.date), "MMMM do yyyy")
        : "No date specified";
    },
    subjectSpliced() {
      let subject = this.item.subject;
      const maxSpliceLength = 200;
      return subject
        ? subject.substring(0, Math.min(maxSpliceLength, subject.length))
        : "";
    },
    onlineEvent() {
      return (
        this.item.venue &&
        this.item.venue.location_type &&
        this.item.venue.location_type.toLowerCase() === "online"
      );
    },
    loginUrlFormatted() {
      if (
        this.item.venue &&
        this.item.venue.login &&
        this.item.venue.login.url
      ) {
        return this.item.venue.login.url;
      }

      return "No URL specified";
    },
    loginPasswordFormatted() {
      if (
        this.item.venue &&
        this.item.venue.login &&
        this.item.venue.login.password
      ) {
        return this.item.venue.login.password;
      }

      if (this.item.venue.login && this.item.venue.login.url) {
        return "Not required";
      }

      return "No password specified";
    },
  },
};
</script>

<style scoped>
.card-outter {
  position: relative;
  padding-bottom: 2rem;
}
.card-actions {
  position: absolute;
  bottom: 1rem;
}
</style>
