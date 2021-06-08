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
  addEvent: async ({ commit }, payload) => {
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
  deleteEvent: ({ state }, payload) => {
    const index = state.events.indexOf(payload);
    state.events.splice(index, 1);
    // TODO API call
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
