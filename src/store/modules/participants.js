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
  removeParticipant(state, participant) {
    const index = state.participants.indexOf(participant);
    state.participants.splice(index, 1);
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
  deleteParticipant: async ({ commit }, payload) => {
    const { data } = await axios.post("remove_participant", { participantid: payload.participant.participantid, eventid: payload.eventid });

    // Error, failed request
    if (data.error) {
      commit("setStatus", data.error);
      return;
    }

    commit("removeParticipant", payload.participant);
  },
  createQRCodeForParticipant: async ({ commit }, payload) => {
    const { data } = await axios.post("get_checkin_token", { participantid: payload.participant.participantid, eventid: payload.eventid });

    // Error, failed request
    if (data.error) {
      commit("setStatus", data.error);
      return "";
    }

    return data.interactionToken;
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
