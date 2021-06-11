<template lang="pug">
  v-row(justify="center")
    v-col(cols="12")
      h4(class="text-h5 text-center") {{ this.$t("event.creation.step3.title") }}
    v-col(cols="12" class="pt-0 pb-0 text-center")
      p {{ this.$t("event.creation.step3.subtitle") }}
    v-col(cols="12" md="6" class="text-center")
      v-row
        v-col(cols="12" class="text-start")
          h2(class="text-h5") Social media
        v-col(cols="12" md="3" class="text-start mb-0 pb-0")
          p(class="font-weight-bold subtitle-1") Website
        v-col(cols="12" md="9" class="text-start pt-0 mt-0")
          v-text-field(v-model="socialMedia.website" :label="$t('event.creation.step3.attributes.url')" outlined class="pb-0")
        v-col(cols="12" md="3" class="text-start mb-0 pb-0")
          p(class="font-weight-bold subtitle-1") Twitter
        v-col(cols="12" md="9" class="text-start pt-0 mt-0")
          v-text-field(v-model="socialMedia.twitter" :label="$t('event.creation.step3.attributes.url')" outlined class="pb-0")
        v-col(cols="12" md="3" class="text-start mb-0 pb-0")
          p(class="font-weight-bold subtitle-1") LinkedIn
        v-col(cols="12" md="9" class="text-start pt-0 mt-0")
          v-text-field(v-model="socialMedia.linkedIn" :label="$t('event.creation.step3.attributes.url')" outlined class="pb-0")
        v-col(cols="12" md="3" class="text-start mb-0 pb-0")
          p(class="font-weight-bold subtitle-1") Xing
        v-col(cols="12" md="9" class="text-start pt-0 mt-0")
          v-text-field(v-model="socialMedia.xing" :label="$t('event.creation.step3.attributes.url')" outlined class="pb-0")
    v-col(cols="12" md="6")
      v-row
        v-col(cols="12" class="text-start")
          h2(class="text-h5") Contact Person
        v-col(cols="12" class="text-start mt-0 pt-0")
          v-text-field(v-model="contactPerson.first_name" outlined label="First name")
        v-col(cols="12" class="text-start mt-0 pt-0 mb-0 pb-0")
          v-text-field(v-model="contactPerson.last_name" outlined label="Last name")
        v-col(cols="12" class="text-start mb-0 pb-0")
          v-text-field(v-model="contactPerson.email" outlined label="Contact email")
    v-col(cols="6" class="pt-0 mt-0 text-start pl-0")
      v-btn(@click="onPreviousStep" text color="primary") {{ this.$t('event.btnBack') }}
    v-col(cols="6" class="pt-0 mt-0 text-end")
      v-btn(@click="onNextStep" :loading="loading" color="primary") {{ this.$t('event.creation.step3.create') }}
</template>

<script>
import { validationMixin } from "vuelidate";
import { mapGetters } from "vuex";
import { format, parseISO } from "date-fns";

export default {
  name: "CreateEventStepperThree",
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
      socialMedia: {
        website: "",
        twitter: "",
        linkedIn: "",
        xing: "",
      },
      defaultSocialMedia: {
        website: "",
        twitter: "",
        linkedIn: "",
        xing: "",
      },
      contactPerson: {
        first_name: "",
        last_name: "",
        email: "",
      },
      defaultContactPerson: {
        first_name: "",
        last_name: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapGetters({ user: "users/getUser" }),
    subjectErrors() {
      const errors = [];
      if (!this.$v.subject.$dirty) return errors;
      !this.$v.subject.minLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.rules.mincharacters", 1));
      !this.$v.subject.maxLength &&
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
  mounted() {
    if (this.user) {
      this.contactPerson.first_name = this.user.first_name;
      this.contactPerson.last_name = this.user.last_name;
      this.contactPerson.email = this.user.email;
    }
  },
  methods: {
    onNextStep() {
      this.loading = true;
      this.$emit("next", {
        ...this.editedItem,
        socialMedia: this.socialMedia,
        contact: this.contactPerson,
      });

      this.loading = false;
    },
    onPreviousStep() {
      this.$emit("previous", {
        ...this.editedItem,
        socialMedia: this.socialMedia,
        contact: this.contactPerson,
      });
    },
    reset() {
      this.socialMedia = { ...this.defaultSocialMedia }
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
