<template>
  <v-card width="100%" height="15rem" color="orange">
    <v-container fill-height>
      <v-row align="center" justify="center" class="text-start fill-height">
        <v-col cols="12">
          <p class="text-uppercase white--text">
            {{ type.name }}
          </p>
          <h2 class="text-h2 white--text">
            {{ name }}
          </h2>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "EventDetailsHeader",
  props: {
    name: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: Object,
      default: () => {
        return { id: "", name: "", color: "" };
      },
      required: true,
    },
  },
};
</script>

<style scoped></style>
