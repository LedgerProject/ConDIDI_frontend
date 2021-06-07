<template>
  <v-navigation-drawer
    app
    :mini-variant="mini && !$vuetify.breakpoint.xs"
    mini-variant-width="124"
    class="text-end"
    floating
    v-model="drawer"
  >
    <v-list v-if="!$vuetify.breakpoint.xs">
      <v-list-item class="text-end justify-end">
        <v-list-item-icon @click="mini = !mini">
          <v-icon v-if="mini">mdi-arrow-right</v-icon>
          <v-icon v-else>mdi-arrow-left</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item></v-list-item>
    </v-list>

    <v-list nav class="text-start pt-12">
      <v-list-item
        v-for="item in $vuetify.breakpoint.xs ? itemsMobile : items"
        :key="item.title"
        link
        :to="item.to"
        exact
        color="secondary"
        active-class="font-weight-bold"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-if="$vuetify.breakpoint.xs" v-slot:append>
      <div class="pa-2 pb-6">
        <v-btn block color="primary" @click="signOut">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DrawerUser",
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", to: "/user" },
        { title: "Events", icon: "mdi-calendar", to: "/user/events" },
      ],
      itemsMobile: [
        { title: "Home", icon: "mdi-view-dashboard", to: "/user" },
        { title: "Events", icon: "mdi-calendar", to: "/user/events" },
        { title: "Profile", icon: "mdi-account", to: "/user/profile" },
        { title: "Settings", icon: "mdi-settings", to: "/user/settings" },
      ],
      right: null,
    };
  },
  props: {
    forceOpen: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  watch: {
    forceOpen() {
      this.drawer = true;
    },
  },
  methods: {
    signOut() {
      // TODO axios call to sign out
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
