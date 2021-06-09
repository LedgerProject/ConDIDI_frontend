<template>
  <v-menu offset-y z-index="9999">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-if="loading">
        <v-skeleton-loader type="list-item"> </v-skeleton-loader>
      </v-list-item>
      <v-list-item v-else two-line v-bind="attrs" v-on="on">
        <v-list-item-avatar color="grey lighten-3" tile>
          <span class="font-weight-bold">{{ initials }}</span>
        </v-list-item-avatar>
        <v-list-item-title>
          <span class="font-weight-bold">{{ fullName }}</span>
          <br />
          <span class="font-weight-light">{{
            getUser && getUser.email ? getUser.email : ""
          }}</span>
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
import { mapActions, mapGetters } from "vuex";

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
    ...mapActions("users", ["signOut"]),
  },
  computed: {
    ...mapGetters({
      getUser: "users/getUser",
      loading: "users/getLoading",
    }),
    initials() {
      let text = "";

      if (this.getUser) {
        if (this.getUser.first_name) {
          text = this.getUser.first_name.charAt(0);
        }
        if (this.getUser.last_name) {
          text += this.getUser.last_name.charAt(0);
        }
      }

      return text;
    },
    fullName() {
      let text = "";

      if (this.getUser) {
        if (this.getUser.first_name) {
          text = `${this.getUser.first_name} ${this.getUser.last_name}`;
        }
      }

      return text;
    },
  },
};
</script>
