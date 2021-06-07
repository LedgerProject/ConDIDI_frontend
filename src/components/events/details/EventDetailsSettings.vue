<template lang="pug">
  v-container(color="transparent")
    v-row
      v-col(cols="12")
        h3(class="text-h5") Participant configuration
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
      v-col(cols="12" md="6"  class="pb-0")
        v-dialog(
          ref="dialog"
          v-model="menuRegistrationDeadlineTime"
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
            v-if="menuRegistrationDeadlineTime"
            v-model="time_registration_deadline"
            format="24hr"
            full-width)

            v-spacer
            v-btn(
              text
              color="primary"
              @click="menuRegistrationDeadlineTime = false"
            ) Cancel

            v-btn(
              text
              color="primary"
              @click="$refs.dialog.save(time_registration_deadline)"
            ) OK

      v-col(cols="12" class="text-start pt-0")
        v-switch(v-model="attendanceConfirmation" :label="$t('event.creation.step5.attributes.attendanceConfirmation')" outlined class="pb-0")
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  name: "EventDetailsSettings",
  data() {
    return {
      menuRegistrationDeadline: false,
      menuRegistrationDeadlineTime: false,
      attendanceConfirmation: false,
      registration_deadline: "",
      time_registration_deadline: "",
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    computedRegistrationDeadlineFormattedDatefns() {
      return this.registration_deadline
        ? format(parseISO(this.registration_deadline), "EEEE, MMMM do yyyy")
        : "";
    },
  },
  mounted() {
    this.registration_deadline = this.item.registration_deadline;
    this.time_registration_deadline = this.item.time_registration_deadline;
    this.attendanceConfirmation = this.item.attendanceConfirmation
  },
};
</script>

<style scoped>

</style>