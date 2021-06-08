import { axios } from "../../plugins/axios";

const state = {
  participants: [],
  nextId: 1000,
  loading: true,
};

const getters = {
  getParticipants: () => {
    return state.participants;
  },
  getLoading: () => state.loading,
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setParticipants(state, payload) {
    state.participants = payload;
  },
  pushParticipant(state, participant) {
    state.participants.push(participant);
  },
};

const actions = {
  fetch: async ({ commit }, id) => {
    commit("setLoading", true);
    const { data } = await axios.post("list_participants", { eventid: id });
    const participants = data.participants ? data.participants : [];
    commit("setParticipants", participants);
    commit("setLoading", false);
  },
  // eslint-disable-next-line no-empty-pattern
  addParticipant: async ({ commit }, payload) => {
    const { data } = await axios.post("add_participant", { participantdict: payload.participant, eventid: payload.eventid });

    // Error, failed request
    if (data.error) {
      commit("setStatus", data.error);
      return;
    }

    // Success
    const participant = data.participantdict;
    await commit("pushParticipant", participant);
  },
  deleteParticipant: ({ state }, payload) => {
    const index = state.events.indexOf(payload);
    state.participants.splice(index, 1);
    // TODO API call
  },
};

export default {
  name: "participants",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
