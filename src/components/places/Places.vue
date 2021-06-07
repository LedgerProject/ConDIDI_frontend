<template>
  <v-text-field
    id="container"
    outlined
    type="search"
    :value="value"
    :label="label"
    clearable
    @input="updateValue"
  />
</template>

<script>
import { validationMixin } from "vuelidate";
import { maxLength, minLength, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  props: {
    value: {
      type: String,
      default: "",
      required: false,
    },
    type: {
      type: String,
      default: "address",
      required: false,
    },
    label: {
      type: String,
      default: "",
      required: false,
    },
    language: {
      type: String,
      default: "de",
      required: false,
    },
  },
  validations: {
    selection: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(300),
    },
  },
  data() {
    return {
      selection: null,
      options: {
        appId: "",
        apiKey: "",
        container: this.input,
        type: this.type,
        style: true,
        language: "de",
        templates: {
          value: (suggestion) => {
            return suggestion.name;
          },
        },
      },
    };
  },
  computed: {
    selectionErrors() {
      const errors = [];
      if (!this.$v.selection.$dirty) return errors;
      !this.$v.selection.minLength && errors.push("Minimal 4 Zeichen");
      !this.$v.selection.maxLength && errors.push("Maximal 20 Zeichen");
      !this.$v.selection.required && errors.push("Land wird benötigt");
      return errors;
    },
  },
  watch: {
    options: {
      deep: true,
      handler(newOptions) {
        this.placesAutocomplete.configure(newOptions);
      },
    },
  },
  mounted() {
    this.options.appId = process.env.ALGOLIA_APP_ID;
    this.options.apiKey = process.env.ALGOLIA_API;
    this.options.language = this.language;
    this.options.type = this.type;

    this.init();
  },
  beforeDestroy() {
    if (this.placesAutocomplete) {
      this.placesAutocomplete.destroy();
    }
  },
  methods: {
    init() {
      const places = require("places.js");
      this.options.container = document.getElementById("container");
      this.placesAutocomplete = places(this.options);

      this.placesAutocomplete.on("change", (e) => {
        this.$emit("change", e.suggestion);
        this.updateValue(e.suggestion.name);
      });
      this.placesAutocomplete.on("clear", () => {
        this.$emit("change", {});
        this.$emit("clear");
        this.updateValue(null);
      });
    },
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style>
/* Main input wrapper */
.algolia-places {
}

/* The algolia-places input */
.ap-input,
.ap-hint {
  border: none !important;
}

/* The style of the svg icons when the input is on hover */
.ap-input:hover ~ .ap-input-icon svg,
.ap-input:focus ~ .ap-input-icon svg,
.ap-input-icon:hover svg {
}

/* The dropdown style */
.ap-dropdown-menu {
}

/* The suggestions style */
.ap-suggestion {
}

/* The highlighted names style */
.ap-suggestion em {
}

/* The addresses style */
.ap-address {
}

/* The icons of each suggestions ( can be a building or a pin ) */
.ap-suggestion-icon {
}

/* The style of the svg inside the .ap-suggestion-icon */
.ap-suggestion-icon svg {
}

/* The icons inside the input ( can be a pin or a cross ) */
.ap-input-icon {
}

/* The style of the svg inside the .ap-input-icon */
.ap-input-icon svg {
  display: none;
}

/* .a-cursor is the class a suggestion go on hover */
.ap-cursor {
}

/* The style of the svg icon, when the .ap-suggestion is on hover */
.ap-cursor .ap-suggestion-icon svg {
}

/* The styles of the Algolia Places input footer */
.ap-footer {
}

/* The styles of the Algolia Places input footer links */
.ap-footer a {
}

/* The styles of the Algolia Places input footer svg icons */
.ap-footer a svg {
}

/* The styles of the Algolia Places input footer on hover */
.ap-footer:hover {
}
</style>
