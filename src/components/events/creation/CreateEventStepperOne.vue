<template lang="pug">
  v-row(justify="center")
    v-col(cols="12" lg="6" class="text-center")
      v-card(flat color="transparent")
        v-card-actions
          v-row
            v-col(cols="12")
              h4(class="text-h5 text-center") {{ this.$t('event.creation.step1.title') }}
            v-col(cols="12" class="pb-0")
              v-text-field(
                :label="$t('event.creation.step1.attributes.name')"
                v-model="name"
                :error-messages="nameErrors"
                outlined
                autofocus
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
                @keyup.enter.native="createEvent")
            v-col(cols="12" class="pt-0 pb-0")
              p {{ this.$t('event.creation.step1.subtitle') }}
            v-col(cols="12" class="pt-0 mt-0")
              v-btn(@click="createEvent" :loading="loading" color="primary" :disabled="$v.name.$invalid") {{ this.$t('event.creation.step1.create') }}
</template>

<script>
import { validationMixin } from "vuelidate";
import { maxLength, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "CreateEventStepperOne",
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(256),
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
      name: "",
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.rules.mincharacters", 1));
      !this.$v.name.maxLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.rules.maxcharacters", 256));
      return errors;
    },
  },
  methods: {
    createEvent() {
      this.$v.name.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      this.$emit("next", { ...this.editedItem, name: this.name });
      this.loading = false;
    },
    reset() {
      this.name = "";
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
