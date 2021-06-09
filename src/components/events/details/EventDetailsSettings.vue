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

      v-col(cols="12")
        h2(class="text-h5") Danger Zone
      v-col(cols="12")
        p The button will open you mail client, to write to our support. We will quickly get back to you and delete your user data.
      v-col(cols="12")
        v-dialog(
          v-model="dialogDelete"
          max-width="800px"
          :fullscreen="$vuetify.breakpoint.mobile")
          v-card
            v-card-title(class="text-h5") Delete event {{ item.name }}
              v-spacer
              v-tooltip(bottom)
                template(v-slot:activator="{ on, attrs }")
                  v-btn(
                    v-bind="attrs"
                    v-on="on"
                    icon
                    @click="dialogDelete = false")
                      v-icon mdi-close
                span Close
            v-card-text
              | Enter the name of the event to confirm the action.
              br
              | The deletion can not be undone.
            v-card-actions
              v-text-field(v-model="deleteConfirmation" outlined label="Event name" )
            v-card-actions(class="pb-6")
              v-btn(@click="deleteItem" color="primary" :disabled="item.name !== deleteConfirmation") Delete event
      v-col(cols="12")
        v-btn(@click="dialogDelete = true" color="primary") Delete event
</template>

<script>
import { format, parseISO } from "date-fns";
import { mapActions } from "vuex";

export default {
  name: "EventDetailsSettings",
  data() {
    return {
      dialogDelete: false,
      deleteConfirmation: "",
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
  methods: {
    ...mapActions({
      deleteEvent: "events/deleteEvent",
    }),
    deleteItem() {
      this.deleteEvent(this.item);
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