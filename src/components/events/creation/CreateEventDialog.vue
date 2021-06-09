<template lang="pug">
  v-dialog(v-model="dialog" fullscreen persistent height="100%" z-index="9999")
    template(v-slot:activator="{ on, attrs }")
      v-btn(color="secondary" class="ml-6" @click="openDialog" v-bind="attrs" v-on="on") {{ $t('event.btnCreate') }}
    v-card(fill-height)
      v-toolbar(flat color="transparent")
        v-spacer
        v-btn(icon @click="closeDialog")
          v-tooltip(bottom)
            template(v-slot:activator="{ on, attrs }")
              v-icon(v-bind="attrs" v-on="on") mdi-close
            span {{ this.$t('dialog.close') }}
      v-container(fill-height)
        v-row(justify="center" align="start" class="fill-height")
          v-col(cols="12" class="justify-center")
            v-stepper(v-model="step" flat class="elevation-0" :style="{ 'background': 'transparent' }")
              v-stepper-header(v-show="step > 1" class="elevation-0" )
                v-stepper-step(step="1" :complete="step > 1") {{ this.$t('event.creation.step1.stepperName') }}
                v-divider
                v-stepper-step(step="2" :complete="step > 2")
                  | {{ this.$t('event.creation.step2.stepperName') }}
                  small Optional
                v-divider
                v-stepper-step(step="3" :complete="step > 3")
                  | {{ this.$t('event.creation.step3.stepperName') }}
                  small Optional
                v-divider
                v-stepper-step(step="4" :complete="step > 4")
                  | {{ this.$t('event.creation.step4.stepperName') }}
                  small Optional
                v-divider
                v-stepper-step(step="5" :complete="step > 5")
                  | {{ this.$t('event.creation.step5.stepperName') }}
                  small Optional
              v-stepper-items
                v-stepper-content(step="1" color="transparent")
                  CreateEventStepperOne(@close="closeDialog" @next="onNext" :force-close="dialog" :edited-item="editedItem")
                v-stepper-content(step="2" color="transparent")
                  CreateEventStepperTwo(@close="closeDialog"  @previous="onPrevious" @next="onNext" :force-close="dialog" :edited-item="editedItem")
                v-stepper-content(step="3" color="transparent")
                  CreateEventStepperThree(@close="closeDialog"  @previous="onPrevious" @next="onNext" :force-close="dialog" :edited-item="editedItem")
                v-stepper-content(step="4")
                  CreateEventStepperFour(@close="closeDialog" @previous="onPrevious" @next="onNext" :force-close="dialog" :edited-item="editedItem")
                v-stepper-content(step="5")
                  CreateEventStepperFive(@close="closeDialog" @previous="onPrevious" @next="onNext" :force-close="dialog" :edited-item="editedItem")
</template>

<script>
import { mapActions } from "vuex";
import CreateEventStepperTwo from "./CreateEventStepperTwo";
import CreateEventStepperOne from "./CreateEventStepperOne";
import CreateEventStepperThree from "./CreateEventStepperThree";
import CreateEventStepperFour from "./CreateEventStepperFour";
import CreateEventStepperFive from "./CreateEventStepperFive";

export default {
  name: "CreateEventDialog",
  components: {
    CreateEventStepperFive,
    CreateEventStepperFour,
    CreateEventStepperThree,
    CreateEventStepperOne,
    CreateEventStepperTwo,
  },
  data() {
    return {
      step: 1,
      numSteps: 5,
      dialog: false,
      loading: false,
      editedItem: {
        name: "",
        subject: "",
        schedule: "",
        type: "Conference",
        locationType: "On site",
        registration_deadline: this.getDateFormatted(
          new Date(),
          this.$i18n.locale
        ),
        date: this.getDateFormatted(new Date(), this.$i18n.locale),
        venue: {
          login: { url: "", password: "" },
          location_type: "On site",
          place: {},
        },
      },
      defaultItem: {
        name: "",
        subject: "",
        schedule: "",
        type: "Conference",
        locationType: "On site",
        registration_deadline: this.getDateFormatted(
          new Date(),
          this.$i18n.locale
        ),
        date: this.getDateFormatted(new Date(), this.$i18n.locale),
        venue: {
          login: { url: "", password: "" },
          location_type: "On site",
          place: {},
        },
      },
    };
  },
  methods: {
    ...mapActions({
      addEvent: "events/addEvent",
    }),
    reset() {
      this.step = 1;
      this.name = "";
      this.members = ["", "", ""];
      this.dialog = false;
    },
    closeDialog() {
      // Create the event with the data we currently have
      // The user can create an event with only the name present, everything else is optional
      this.reset();
    },
    openDialog() {},
    onNext(item) {
      // Go to next step of the creation process
      this.step += 1;

      this.editedItem = item;

      // Team creation is completed
      if (this.step > this.numSteps) {
        this.createEvent(this.editedItem);
        this.closeDialog(false);
        this.editedItem = { ...this.defaultItem };
      }
    },
    onPrevious(item) {
      // Go to previous step of the creation process
      this.step = this.step > 1 ? this.step - 1 : 1;
      this.editedItem = item;
    },
    createEvent() {
      this.addEvent(this.editedItem);
    },
  },
};
</script>

<style scoped>
.creation-dialog {
  padding-top: 0.3vh;
  transform: translateY(-0.5vh);
}
</style>
