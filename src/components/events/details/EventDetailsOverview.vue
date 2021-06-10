<template>
  <v-container class="contentArea" fluid>
    <v-row align="center" justify="center" class="text-center fill-height">
      <v-col cols="12">
        <v-container>
          <v-row justify="start" align="start">
            <v-col cols="12" md="6">
              <v-row class="text-start">
                <v-col cols="12">
                  <v-card width="100%" flat class="pl-0" color="transparent">
                    <v-card-title>
                      <v-row>
                        <v-col cols="12" class="pl-0">
                          <h3 class="text-h4 pl-0 text-start">Event details</h3>
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="8" md="6" class="pl-0 pr-0">
                          <v-icon>mdi-calendar</v-icon>
                          {{ computedDateFormattedDatefns }}
                        </v-col>
                        <v-col cols="4" md="6" class="pl-0">
                          <v-icon>mdi-clock</v-icon>
                          {{ timeFormatted }}
                        </v-col>

                        <v-col cols="12" md="6" class="pl-0">
                          <v-icon>mdi-web</v-icon>
                          {{ loginUrlFormatted }}
                        </v-col>
                        <v-col cols="12" md="6" class="pl-0">
                          <v-icon>mdi-lock</v-icon>
                          {{ loginPasswordFormatted }}
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <h3 class="text-h4 pb-0">Event description</h3>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <p class="subtitle-1 font-weight-light">{{ item.subject }}</p>
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="item.venue && item.venue.address" cols="12" md="6">
              <v-row>
                <v-col cols="12" class="map-content">
                  <Map
                    :fore-rerender="loading"
                    :place="item.venue.address"
                  ></Map>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="8" class="text-start">
              <v-row>
                <v-col cols="12 pb-0">
                  <h3 class="text-h4">Schedule</h3>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <p class="subtitle-1 font-weight-light">
                    {{ item.schedule }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Map from "../../../components/places/Map";
import { format, parseISO } from "date-fns";

export default {
  name: "EventDetailsOverview",
  components: { Map },
  data() {
    return {
      loading: false,
      item: { name: "", subject: "", type: "", address: {} },
      defaultItem: { name: "", subject: "", type: "", address: {} },
    };
  },
  computed: {
    ...mapGetters("events", ["getEvents", "getEventTypes"]),
    ...mapGetters("gradients", ["getGradients"]),
    createBackgroundString() {
      return "orange";
      // return `linear-gradient(${this.gradient.deg}, ${this.gradient.color1} ${this.gradient.percentage1}, ${this.gradient.color2} ${this.gradient.percentage2}, ${this.gradient.color3} ${this.gradient.percentage3})`;
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

      if (this.item.login && this.item.login.url) {
        return "Not required";
      }

      return "No password specified";
    },
    timeFormatted() {
      return this.item.time ? `${this.item.time} GMT-2:00` : "No time specified";
    },
    computedDateFormattedDatefns() {
      return this.item.date
        ? format(parseISO(this.item.date), "EEEE, MMMM do yyyy")
        : "No date specified";
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

<style scoped>
.contentArea {
  padding-top: 5rem;
}

.gradient {
  height: 100%;
  min-height: 400px;
  background: rgb(131, 58, 180);
  color: red;
}

.map-content {
  min-height: 350px;
}
</style>
