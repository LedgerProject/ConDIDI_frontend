import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import axios from "axios";
import { getDateFormatted } from "./plugins/dateHelper";

Vue.config.productionTip = false;

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

// Shortcuts
Vue.prototype.$scrollToTop = () =>
  window.scrollTo({ top: 0, right: 0, behavior: "smooth" });

Vue.prototype.$axios = axios;

Vue.mixin({
  methods: {
    getDateFormatted,
  },
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
