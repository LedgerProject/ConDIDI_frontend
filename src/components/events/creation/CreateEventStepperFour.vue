<template lang="pug">
  v-container(fluid)
    v-row(justify="center")
      v-col(cols="12" class="text-center justify-center")
        v-card(flat color="transparent" class="pa-0 ma-0")
          v-card-actions
            v-row
              v-col(cols="12")
                h4(class="text-h5 text-center") {{ this.$t('event.creation.step4.title') }}
              v-col(cols="12")
                p {{ editedItem.venue.location_type.toLowerCase() === 'on site'? this.$t("event.creation.step4.subtitle"): this.$t("event.creation.step4.subtitleOnline") }}
              v-col(cols="12" md="6" v-if="editedItem.venue.location_type.toLowerCase() === 'on site'")
                v-row
                  v-col(cols="12")
                    Places(:label="$t('event.creation.step4.attributes.place')" @change="onPlaceSelection")
                  v-col(cols="12")
                    v-text-field(v-model="place.city" outlined readonly label="City" )
                  v-col(cols="12")
                    v-text-field(v-model="place.postcode" outlined readonly label="Post code" )
                  v-col(cols="12")
                    v-text-field(v-model="place.country" outlined readonly label="Country" )
              v-col(cols="12" md="6" v-show="editedItem.venue.location_type.toLowerCase() === 'on site' && !$vuetify.breakpoint.xs")
                v-lazy
                  Map(:place="place")
              v-col(cols="12" md="6" v-if="editedItem.venue.location_type.toLowerCase() === 'online'")
                v-text-field(v-model="login.url" label="URL" outlined)
              v-col(cols="12" md="6" v-if="editedItem.venue.location_type.toLowerCase() === 'online'")
                v-text-field(v-model="login.password" label="Password" outlined)
              v-col(cols="12" md="6" class="text-start")
                v-btn(@click="onPreviousStep" color="primary" text) {{ this.$t('event.btnBack') }}
              v-col(cols="12" md="6" class="text-end")
                v-btn(@click="onNextStep" color="primary") {{ this.$t('event.creation.step4.create') }}
</template>

<script>
import Places from "../../places/Places";
import Map from "../../places/Map";

export default {
  name: "CreateEventStepperFour",
  components: { Map, Places },
  data() {
    return {
      loading: false,
      location: "No",
      place: {
        city: "",
        country: "",
      },
      defaultPlace: {
        city: "",
        country: "",
      },
      login: {
        url: "",
        password: "",
      },
      defaultLogin: {
        url: "",
        password: "",
      },
    };
  },
  props: {
    forceClose: {
      required: true,
      default: false,
      type: Boolean,
    },
    editedItem: {
      required: true,
      type: Object,
      default: null,
    },
  },
  watch: {
    forceClose: function () {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.loading = false;
      this.login = { ...this.defaultLogin };
      this.place = { ...this.defaultPlace };
    },
    onNextStep() {
      this.$emit("next", {
        ...this.editedItem,
        venue: {
          ...this.editedItem.venue,
          address: this.place,
          login: this.login,
        },
      });
    },
    onPreviousStep() {
      this.$emit("previous", {
        ...this.editedItem,
        venue: {
          ...this.editedItem.venue,
          address: this.place,
          login: this.login,
        },
        login: this.login,
      });
    },
    onSkipStep() {
      this.$emit("next");
      this.reset();
    },
    onPlaceSelection(value) {
      this.place = value ? value : this.defaultPlace;
    },
  },
};
</script>

<style scoped></style>
