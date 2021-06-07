<template>
  <v-menu offset-y z-index="9999">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-avatar color="grey lighten-3" tile>
          <span class="font-weight-bold">TM</span>
        </v-list-item-avatar>
        <v-list-item-title>
          <span class="font-weight-bold">Tim Moehring</span>
          <br />
          <span class="font-weight-light">tim.moehring@prime-force.com</span>
        </v-list-item-title>
        <v-list-item-action>
          <v-icon> mdi-chevron-down </v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
    <v-list nav>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        exact
        link
        class="font-weight-medium"
        :to="item.to"
        color="secondary"
      >
        <v-list-item-title class="ml-6 mr-6">{{
          item.title
        }}</v-list-item-title>
      </v-list-item>
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-list-item class="pb-2" color="transparent">
        <v-btn color="accent" block @click="signOut">Log out</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserMenu",
  data() {
    return {
      items: [
        { title: "Profile", icon: "mdi-view-dashboard", to: "/user/profile" },
        { title: "Settings", icon: "mdi-calendar", to: "/user/settings" },
      ],
    };
  },
  methods: {
    ...mapActions("user", ["signOut"]),
  },
};
</script>
