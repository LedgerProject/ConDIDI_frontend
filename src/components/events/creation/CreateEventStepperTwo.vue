<template lang="pug">
  v-row(justify="center")
    v-col(cols="12" class="text-center")
      v-card(flat color="transparent")
        v-card-actions
          v-row
            v-col(cols="12")
              h4(class="text-h5 text-center") {{ this.$t("event.creation.step2.title") }}
            v-col(cols="12" class="pt-0 pb-0")
              p {{ this.$t("event.creation.step2.subtitle") }}
            v-col(cols="6")
              v-select(
                v-model="type"
                :items="getEventTypes"
                item-text="name"
                eager
                return-object
                outlined
                label="Event type")
            v-col(cols="6")
              v-select(
                v-model="location_type"
                :items="locationTypeItems"
                outlined
                label="Location type")
            v-col(cols="6")
              v-dialog(
                v-model="menuDate"
                max-width="290"
                ref="dialogDate"
                persistent
              )
                template(v-slot:activator="{ on, attrs }")
                  v-text-field(
                    :value="computedDateFormattedDatefns"
                    clearable
                    :label="$t('event.creation.step2.attributes.date')"
                    readonly
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date = null")
                v-date-picker(
                  v-model="date"
                  :locale="$i18n.locale"
                  @change="menuDate = false")
            v-col(cols="6")
              v-dialog(
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px")
                template(v-slot:activator="{ on, attrs }")
                  v-text-field(
                    v-model="time"
                    outlined
                    label="Time the event starts"
                    prepend-inner-icon="mdi-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on")
                v-time-picker(
                  v-if="modal2"
                  v-model="time"
                  format="24hr"
                  full-width)

                  v-spacer
                  v-btn(
                    text
                    color="primary"
                    @click="modal2 = false"
                  )
                    Cancel

                  v-btn(
                    text
                    color="primary"
                    @click="$refs.dialog.save(time)"
                  ) OK

            v-col(cols="12" class="pb-0")
              v-textarea(
                :label="$t('event.creation.step2.attributes.subject')"
                v-model="subject"
                :error-messages="subjectErrors"
                outlined
                autofocus
                @input="$v.subject.$touch()"
                @blur="$v.subject.$touch()"
                @keyup.enter.native="createEvent")
            v-col(cols="12" class="pb-0")
              v-textarea(
                :label="$t('event.creation.step2.attributes.schedule')"
                v-model="schedule"
                :error-messages="scheduleErrors"
                outlined
                autofocus
                @input="$v.schedule.$touch()"
                @blur="$v.schedule.$touch()"
                @keyup.enter.native="createEvent")
            v-col(cols="6" class="pt-0 mt-0 text-start")
              v-btn(@click="onPreviousStep" text color="primary") {{ this.$t('event.btnBack') }}
            v-col(cols="6" class="pt-0 mt-0 text-end")
              v-btn(@click="createEvent" :loading="loading" color="primary" :disabled="$v.$invalid") {{ this.$t('event.creation.step2.create') }}
</template>

<script>
import { validationMixin } from "vuelidate";
import { maxLength, minLength, required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { format, parseISO } from "date-fns";

export default {
  name: "CreateEventStepperTwo",
  mixins: [validationMixin],
  validations: {
    subject: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(2500),
    },
    schedule: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(2500),
    },
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
  data() {
    return {
      loading: false,
      subject: "",
      schedule: "",
      type: "Conference",
      menuDate: false,
      date: null,
      time: null,
      modal2: false,
      dialog: false,
      location_type: "On site",
      locationTypeItems: ["Online", "On site"],
    };
  },
  computed: {
    ...mapGetters("events", ["getEventTypes"]),
    subjectErrors() {
      const errors = [];
      if (!this.$v.subject.$dirty) return errors;
      !this.$v.subject.minLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.rules.mincharacters", 1));
      !this.$v.subject.maxLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.rules.maxcharacters", 256));
      return errors;
    },
    scheduleErrors() {
      const errors = [];
      if (!this.$v.schedule.$dirty) return errors;
      !this.$v.schedule.minLength &&
      errors.push(this.$vuetify.lang.t("$vuetify.rules.mincharacters", 1));
      !this.$v.schedule.maxLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.rules.maxcharacters", 256));
      return errors;
    },
    computedDateFormattedDatefns() {
      return this.date ? format(parseISO(this.date), "EEEE, MMMM do yyyy") : "";
    },
    computedRegistrationDeadlineFormattedDatefns() {
      return this.registration_deadline
        ? format(parseISO(this.registration_deadline), "EEEE, MMMM do yyyy")
        : "";
    },
  },
  methods: {
    createEvent() {
      this.$v.subject.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;

      this.$emit("next", {
        ...this.editedItem,
        type: this.type,
        attendanceConfirmation: this.attendanceConfirmation,
        subject: this.subject,
        schedule: this.schedule,
        date: this.date,
        time: this.time,
        location_type: this.location_type,
      });

      this.loading = false;
    },
    onPreviousStep() {
      this.$emit("previous", {
        ...this.editedItem,
        type: this.type,
        attendanceConfirmation: this.attendanceConfirmation,
        subject: this.subject,
        schedule: this.schedule,
        date: this.date,
        time: this.time,
        location_type: this.location_type,
      });
    },
    reset() {
      this.subject = "";
      this.type = "Conference";
      this.menuDate = false;
      this.menuRegistration_deadline = false;
      this.date = null;
      this.time = null;
      this.loading = false;
    },
    closeDialog() {
      this.reset();
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
