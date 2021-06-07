<template>
  <v-card
    :to="`/user/events/${item.id}`"
    height="100%"
    rounded
    min-height="400px"
    class="card-outter"
    hover
  >
    <v-card-actions v-if="eventType">
      <v-chip color="orange" pill> {{ eventType.name }}</v-chip>
    </v-card-actions>
    <v-card-title class="text-h5 font-weight-bold">
      {{ item.name }}
    </v-card-title>
    <v-card-text class="align-start text-start">
      {{ item.subject }}
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
      </v-row>
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-btn text>Learn more <v-icon color="accent">mdi-chevron-right</v-icon></v-btn>
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
    ...mapGetters(["getGradients", "getEventTypes"]),
    createBackgroundString() {
      return `linear-gradient(${this.gradient.deg}, ${this.gradient.color1} ${this.gradient.percentage1}, ${this.gradient.color2} ${this.gradient.percentage2}, ${this.gradient.color3} ${this.gradient.percentage3})`;
    },
    gradient() {
      const item = this.getGradients.find((item) => {
        return item.id == this.item.gradient;
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
      console.log(this.item.date)
      return this.item.date
        ? format(parseISO(this.item.date), "MMMM do yyyy")
        : "No date specified";
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