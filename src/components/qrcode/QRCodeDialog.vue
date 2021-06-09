<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirm participation</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <QRCode data="Hello world"></QRCode>
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
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped></style>
