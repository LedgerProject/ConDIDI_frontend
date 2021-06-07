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
};

const actions = {
  fetchEvents: async ({ commit }) => {
    commit("setLoading", true);
    const { data } = await axios.post("list_my_events");
    const events = data.eventlist ? data.eventlist : [];
    commit('setEvents', events);
    commit("setLoading", false);
  },
  addEvent: async ({ state }, payload) => {
    // TODO axios request
    const event = {
      ...payload,
      id: state.nextId,
      gradient: "gradient_01",
    };
    state.events.push(event);

    // TODO remove this workaround when using axios
    state.nextId = state.nextId + 1;

    await router.push(`/user/events/${event.id}`);
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
