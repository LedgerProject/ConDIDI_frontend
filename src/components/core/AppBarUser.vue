<template>
  <v-app-bar app color="transparent" flat hide-on-scroll>
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mobile"
      @click="$emit('open-drawer')"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-list v-if="!$vuetify.breakpoint.xs" color="transparent">
      <v-list-item color="transparent">
        <UserMenu></UserMenu>
      </v-list-item>
    </v-list>
  </v-app-bar>
</template>

<script>
import UserMenu from "./UserMenu";
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
};
</script>

<style scoped></style>
