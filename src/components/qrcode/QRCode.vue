<template>
  <canvas id="qrCanvas"></canvas>
</template>

<script>
const QRCode = require("qrcode");
export default {
  name: "QRCode",
  props: {
    data: {
      type: String,
      required: true,
      default: "",
    },
  },
  mounted() {
    const canvas = document.getElementById("qrCanvas");
    QRCode.toCanvas(canvas, this.data, function (error) {
      if (error) console.error(error);
    });
  },
};
</script>

<style scoped>
#qrCanvas {
  height: 500px;
  display: block;
}
</style>
