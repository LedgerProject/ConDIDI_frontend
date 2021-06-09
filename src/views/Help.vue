<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" class="text-center">
        <h1 class="text-h1">Help Page</h1>
      </v-col>
      <v-col cols="12">
        <QRCodeDialog></QRCodeDialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QRCodeDialog from "../components/qrcode/QRCodeDialog";
export default {
  name: "Help",
  components: { QRCodeDialog },
};
</script>

<style scoped></style>
