<template>
  <v-app
    id="app"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <AppBarPublic v-if="!$router.currentRoute.meta.requiresAuth"></AppBarPublic>
    <AppBarUser
      v-if="$router.currentRoute.meta.requiresAuth"
      @open-drawer="openDrawer"
    ></AppBarUser>
    <DrawerUser
      v-if="$router.currentRoute.meta.requiresAuth"
      :force-open="drawer"
    ></DrawerUser>
    <v-main transition="scroll-y-transition">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBarPublic from "./components/core/AppBarPublic";
import AppBarUser from "./components/core/AppBarUser";
import DrawerUser from "./components/core/DrawerUser";
import { mapActions } from "vuex";
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
    ...mapActions("users", ["signInWithToken"]),
    openDrawer() {
      this.drawer = !this.drawer;
    },
  },
  async mounted() {
    await this.signInWithToken();
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
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
