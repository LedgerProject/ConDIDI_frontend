import router from "../../router";
import { axios } from "../../plugins/axios";
const state = {
  events: [],
  types: [
    {
      id: "a",
      name: "Conference",
      color: "#373F51",
    },
    {
      id: "b",
      name: "Workshop",
      color: "#523A34",
    },
    {
      id: "c",
      name: "Meetup",
      color: "#F2DD6E",
    },
    {
      id: "d",
      name: "Tutorial",
      color: "#ACCBE1",
    },
    {
      id: "e",
      name: "Training",
      color: "#632A50",
    },
  ],
  colors: [
    "blue",
    "indigo",
    "deep-purple",
    "cyan",
    "green",
    "orange",
    "grey darken-1",
  ],
  loading: true,
  status: "",
  nextId: 1000,
};

const getters = {
  getEvents: () => {
    return state.events;
  },
  getEventTypes: () => {
    return state.types;
  },
  getLoading: () => {
    return state.loading;
  },
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setEvents(state, payload) {
    state.events = payload;
  },
  pushEvent(state, event) {
    state.events.push(event);
  },
  removeEvent(state, event) {
    const index = state.participants.indexOf(event);
    state.events = state.events.splice(index, 1);
  },
  setStatus(state, payload) {
    state.status = payload;
  },
};

const actions = {
  fetchEvents: async ({ commit }) => {
    commit("setLoading", true);
    const { data } = await axios.post("list_my_events");
    const events = data.eventlist ? data.eventlist : [];
    commit("setEvents", events);
    commit("setLoading", false);
  },
  // eslint-disable-next-line no-empty-pattern
  addEvent: async ({ commit, state }, payload) => {
    // TODO extract this to helper and create color attribute instead of using img field
    const randomNumber = Math.floor(Math.random() * state.colors.length);
    payload.url = state.colors[randomNumber];

    const { data } = await axios.post("add_event", { eventdict: payload });

    // Error, failed request
    if (data.error) {
      commit("setStatus", data.error);
      return;
    }

    // Success
    const event = data.eventdict;
    await commit("pushEvent", event);
    await router.push(`/user/events/${event.eventid}`);
  },
  deleteEvent: async ({ commit }, payload) => {
    const { data } = await axios.post("delete_event", {
      eventid: payload.eventid,
    });

    // Error, failed request
    if (!data.success || data.success.toLowerCase() !== "yes") {
      commit("setStatus", data.error);
      return;
    }

    await router.push("/user/events/");
    commit("removeEvent", payload);
  },
};

export default {
  name: "events",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
