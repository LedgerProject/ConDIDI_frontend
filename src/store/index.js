import Vue from "vue";
import Vuex from "vuex";

import events from "./modules/events";
import participants from "./modules/participants";
import gradients from "./modules/gradients";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { events, gradients, participants },
});
