<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="btnLabel"
        color="accent"
        v-bind="attrs"
        v-on="on"
        @click="$emit('open')"
      >
        {{ btnLabel }}
      </v-btn>
      <v-btn
        v-else
        color="black"
        v-bind="attrs"
        v-on="on"
        @click="$emit('open')"
      >
        <v-img
          contain
          max-height="2rem"
          src="img/jolocom-home-white.svg"
        ></v-img>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ dialogTitle }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col v-if="data" cols="12">
              <QRCode :data="data"></QRCode>
            </v-col>
            <v-col v-else cols="12">
              <v-skeleton-loader type="card" loading></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import QRCode from "./QRCode";
export default {
  name: "QRCodeDialog",
  components: { QRCode },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    btnLabel: {
      type: String,
      required: false,
      default: "",
    },
    dialogTitle: {
      type: String,
      required: false,
      default: "Title",
    },
    data: {
      type: String,
      required: false,
      default: "",
    },
  },
  watch: {
    show(oldValue, newValue) {
      this.dialog = !newValue;
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
