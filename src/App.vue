<template>
  <v-app
    id="app"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <AppBarPublic v-if="$router.currentRoute.meta.guest"></AppBarPublic>
    <AppBarUser v-if="!$router.currentRoute.meta.guest" @open-drawer="openDrawer"></AppBarUser>
    <DrawerUser v-if="!$router.currentRoute.meta.guest" :force-open="drawer"></DrawerUser>
    <v-main transition="scroll-y-transition">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBarPublic from "./components/core/AppBarPublic";
import AppBarUser from "./components/core/AppBarUser";
import DrawerUser from "./components/core/DrawerUser";
export default {
  name: "App",
  components: { DrawerUser, AppBarUser, AppBarPublic },
  data: () => ({
    drawer: false,
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
}
</style>
