const state = {
  participants: [
    {
      id: "p01",
      email: "test@test.de",
      firstName: "Emanuel",
      lastName: "Günther",
      accepted: false,
    },
    {
      id: "p02",
      email: "coffee@coffee.de",
      firstName: "Espresso",
      lastName: "Mountain",
      accepted: false,
    },
    {
      id: "p03",
      email: "condidi@condidi.de",
      firstName: "Con",
      lastName: "DIDi",
      accepted: true,
    },
    {
      id: "p04",
      email: "tea@tea.de",
      firstName: "Green",
      lastName: "Grey",
      accepted: false,
    },
    {
      id: "p05",
      email: "water@water.de",
      firstName: "Water",
      lastName: "Flow",
      accepted: true,
    },
    {
      id: "p06",
      email: "sun@sun.de",
      firstName: "Sun",
      lastName: "Bright",
      accepted: false,
    },
  ],
  nextId: 1000,
};

const getters = {
  getParticipants: () => {
    return state.participants;
  },
};

const actions = {
  addEvent: async ({ state }, payload) => {
    // TODO axios request
    const participant = {
      ...payload,
      id: state.nextId,
    };
    state.participants.push(participant);

    // TODO remove this workaround when using axios
    state.nextId = state.nextId + 1;
  },
  deleteEvent: ({ state }, payload) => {
    const index = state.events.indexOf(payload);
    state.participants.splice(index, 1);
    // TODO API call
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
