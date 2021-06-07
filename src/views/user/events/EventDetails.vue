<template>
  <v-container fluid>
    <EventDetailsHeader
      :name="item.name"
      :type="eventType"
    ></EventDetailsHeader>
    <v-tabs v-model="tab" color="primary" grow background-color="transparent">
      <v-tab>Overview</v-tab>
      <v-tab>Participants</v-tab>
      <v-tab>Settings</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <EventDetailsOverview></EventDetailsOverview>
      </v-tab-item>
      <v-tab-item>
        <EventDetailsMembers></EventDetailsMembers>
      </v-tab-item>
      <v-tab-item>
        <EventDetailsSettings :item="item"></EventDetailsSettings>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import EventDetailsHeader from "../../../components/events/details/EventDetailsHeader";
import { mapGetters } from "vuex";
import EventDetailsOverview from "../../../components/events/details/EventDetailsOverview";
import EventDetailsSettings from "../../../components/events/details/EventDetailsSettings";
import EventDetailsMembers from "../../../components/events/details/EventDetailsMembers";

export default {
  name: "EventDetails",
  components: {
    EventDetailsMembers,
    EventDetailsSettings,
    EventDetailsOverview,
    EventDetailsHeader,
  },
  data() {
    return {
      tab: 0,
      loading: false,
      item: { name: "", subject: "", type: "", address: {} },
      defaultItem: { name: "", subject: "", type: "", address: {} },
    };
  },
  computed: {
    ...mapGetters("events", ["getEvents", "getEventTypes"]),
    eventType() {
      return this.getEventTypes.find((item) => {
        return item.name === this.item.type;
      });
    },
  },
  mounted() {
    const item = this.getEvents.find((item) => {
      return item.eventid.toString() === this.$router.currentRoute.params.id;
    });
    this.item = item ? item : this.defaultItem;
    this.loading = true;
  },
};
</script>
