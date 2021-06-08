<template lang="pug">
  v-row(justify="center")
    v-col(cols="12" lg="8" class="text-center")
      v-card(flat color="transparent")
        v-card-actions
          v-row
            v-col(cols="12")
              h4(class="text-h5 text-center") {{ this.$t("event.creation.step5.title") }}
            v-col(cols="12" class="pt-0 pb-0 text-center")
              p {{ this.$t("event.creation.step5.subtitle") }}
            v-col(cols="12" md="6" class="pb-0")
              v-dialog(
                v-model="menuRegistrationDeadline"
                max-width="290"
                ref="dialogDate"
                persistent
              )
                template(v-slot:activator="{ on, attrs }")
                  v-text-field(
                    :value="computedRegistrationDeadlineFormattedDatefns"
                    clearable
                    :label="$t('event.creation.step5.attributes.registrationDeadline')"
                    readonly
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="registration_deadline = null")
                v-date-picker(
                  v-model="registration_deadline"
                  :locale="$i18n.locale"
                  @change="menuRegistrationDeadline = false")
            v-col(cols="12" md="6" class="pb-0")
              v-dialog(
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time_registration_deadline"
                persistent
                width="290px")
                template(v-slot:activator="{ on, attrs }")
                  v-text-field(
                    v-model="time_registration_deadline"
                    outlined
                    :label="$t('event.creation.step5.attributes.timeRegistrationDeadline')"
                    prepend-inner-icon="mdi-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on")
                v-time-picker(
                  v-if="modal2"
                  v-model="time_registration_deadline"
                  format="24hr"
                  full-width)

                  v-spacer
                  v-btn(
                    text
                    color="primary"
                    @click="modal2 = false"
                  ) Cancel

                  v-btn(
                    text
                    color="primary"
                    @click="$refs.dialog.save(time_registration_deadline)"
                  ) OK

            v-col(cols="12" class="text-start pt-0")
              v-switch(v-model="attendanceConfirmation" :label="$t('event.creation.step5.attributes.attendanceConfirmation')" outlined class="pb-0")
            v-col(cols="6" class="pt-0 mt-0 text-start")
              v-btn(@click="onPreviousStep" text color="primary") {{ this.$t('event.btnBack') }}
            v-col(cols="6" class="pt-0 mt-0 text-end")
              v-btn(@click="onNextStep" :loading="loading" color="primary") {{ this.$t('event.creation.step5.create') }}
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapGetters } from "vuex";
import { format, parseISO } from "date-fns";

export default {
  name: "CreateEventStepperFive",
  mixins: [validationMixin],
  validations: {},
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
      numLinks: 1,
      attendanceConfirmation: false,
      email: "",

      menuRegistrationDeadline: false,
      modal2: false,
      dialog: false,
      time_registration_deadline: null,
      registration_deadline: null,
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
    computedRegistrationDeadlineFormattedDatefns() {
      return this.registration_deadline
        ? format(parseISO(this.registration_deadline), "EEEE, MMMM do yyyy")
        : "";
    },
  },
  methods: {
    onNextStep() {
      this.loading = true;
      this.$emit("next", {
        ...this.editedItem,
        attendanceConfirmation: this.attendanceConfirmation,
        registration_deadline: this.registration_deadline,
        time_registration_deadline: this.time_registration_deadline,
      });

      this.loading = false;
    },
    onPreviousStep() {
      this.$emit("previous", {
        ...this.editedItem,
        attendanceConfirmation: this.attendanceConfirmation,
        registration_deadline: this.registration_deadline,
        time_registration_deadline: this.time_registration_deadline,
      });
    },
    reset() {
      this.subject = "";
      this.type = "Conference";
      this.menuDate = false;
      this.menuRegistration_deadline = false;
      this.registration_deadline = null;
      this.registration_deadline_time = null;
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
