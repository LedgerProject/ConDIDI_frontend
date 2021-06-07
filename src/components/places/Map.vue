<template>
  <v-card>
    <v-card-actions>
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        style="height: 500px; width: 100%"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="marker" />
      </l-map>
    </v-card-actions>
  </v-card>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    place: {
      type: Object,
      required: false,
      default: null,
    },
    foreRerender: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    place(newVal, oldVal) {
      if (newVal && newVal.latlng) {
        this.marker = newVal.latlng;
        this.center = newVal.latlng;
        this.calculateBounds();
      }
    },
    foreRerender() {
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 250);
    },
  },
  data() {
    return {
      zoom: 15,
      center: [52.3744, 9.7385],
      bounds: [],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(52.3744, 9.7385),
    };
  },
  mounted() {
    this.calculateBounds();
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 250);
  },
  methods: {
    calculateBounds() {
      const lat = this.long2tile(this.center[0], this.zoom);
      const long = this.lat2tile(this.center[1], this.zoom);
      this.bounds = [lat, long];
    },
    long2tile(lon, zoom) {
      return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
    },
    lat2tile(lat, zoom) {
      return Math.floor(
        ((1 -
          Math.log(
            Math.tan((lat * Math.PI) / 180) +
              1 / Math.cos((lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
          Math.pow(2, zoom)
      );
    },
  },
};
</script>

<style></style>
