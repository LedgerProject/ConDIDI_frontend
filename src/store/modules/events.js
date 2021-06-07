import router from "../../router";
import { axios } from "../../plugins/axios";
const state = {
  events: [
    {
      id: 1,
      name: "MongoDB",
      subject: "The newest features of MongoDB Atlas will be presented.",
      type: "Conference",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_01",
    },
    {
      id: 2,
      name: "Vue.js",
      subject:
        "Have you ever wondered how to create a modern web application? Now`s you chance.",
      type: "Conference",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_02",
    },
    {
      id: 3,
      name: "JavaScript vs TypeScript",
      subject: "Which one would you like to use for you projects?",
      type: "Conference",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_01",
    },
    {
      id: 4,
      name: "React Day",
      subject:
        "Creating a data model that can be applied to a wide range of use cases is a difficult task. Each is unique, and has nuance that is nearly impossible to capture in a traditional model. So why not let users define the data model themself? Let's explore how Cognite is building a tool utilizing concepts that can enable any application developer to build flexible tools quickly, and fail faster.",
      type: "Conference",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_02",
    },
    {
      id: 5,
      name: "JS Hannover",
      subject: "Learn more about the best practices.",
      type: "Workshop",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_01",
    },
    {
      id: 6,
      name: "TS Berlin",
      subject: "Learn about the benefits of strongly typed languages.",
      type: "Workshop",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_01",
    },
    {
      id: 7,
      name: "C++ vs. Rust",
      subject: "Which language will come out on top?",
      type: "Meetup",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_01",
    },
    {
      id: 8,
      name: "Ethical hacking",
      subject: "Definitely not an annoying ad.",
      type: "Tutorial",
      registration_deadline: "2021-06-17",
      date: "2021-06-17",
      time: "04:30",
      gradient: "gradient_01",
    },
  ],
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
};

const actions = {
  fetchEvents: async ({ commit }) => {
    commit("setLoading", true);
    const { data } = await axios.post("list_my_events");
    console.log('events', data)
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
