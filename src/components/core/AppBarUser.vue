<template>
  <v-app-bar
    app
    :color="$vuetify.breakpoint.mobile ? 'white' : 'transparent'"
    flat
    :hide-on-scroll="!$vuetify.breakpoint.mobile"
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mobile"
      @click="$emit('open-drawer')"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-list color="transparent">
      <v-list-item v-if="!$vuetify.breakpoint.xs" color="transparent">
        <UserMenu></UserMenu>
      </v-list-item>
      <v-list-item v-else two-line to="/user/settings">
        <v-list-item-avatar color="grey lighten-3" tile>
          <span class="font-weight-bold">{{ initials }}</span>
        </v-list-item-avatar>
        <v-list-item-title>
          <span class="font-weight-bold">{{ user && user.name ? user.name : "" }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-app-bar>
</template>

<script>
import UserMenu from "./UserMenu";
import { mapGetters } from "vuex";
export default {
  name: "AppBarUser",
  components: { UserMenu },
  data() {
    return {
      items: [
        { title: "Profile", to: "/user/profile" },
        { title: "Account settings", to: "/user/settings" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      initials: "users/getInitials",
      user: "users/getUser",
    }),
  },
};
</script>

<style scoped></style>
