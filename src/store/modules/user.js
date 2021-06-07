import { axios } from "../../plugins/axios";
import router from "../../router";

const state = {
  user: null,
  token: "",
  status: "",
};

const getters = {
  getUser: () => state.user,
  isSignedIn: (state) => !!state.token,
  getStatus: () => state.status,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setStatus(state, status) {
    state.token = status;
  },
  signOut(state) {
    state.user = "";
    state.token = "";
  },
};

const actions = {
  fetchUser: ({ commit }) => {
    const token = localStorage.getItem("token");
    commit("setToken", token);
    axios.defaults.headers.common["Authorization"] = token;
  },
  // eslint-disable-next-line no-empty-pattern
  signIn: async ({ commit }, payload) => {
    const { data } = await axios.post("login_password", payload);

    // Sign in was successful
    if (data.token) {
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = data.token;
      commit("setToken", data.token);
      commit("setStatus", "");
      await router.push("/user");
    } else {
      commit("setStatus", "Error");
    }
  },
  // eslint-disable-next-line no-empty-pattern
  signUp: async ({ commit, dispatch }, payload) => {
    const { data } = await axios.post("create_user", payload);

    if (data.error) {
      commit("setStatus", "Error");
    } else {
      dispatch("signIn", { email: payload.email, password: payload.password });
    }
  },
  // eslint-disable-next-line no-empty-pattern
  signOut: async ({ commit }) => {
    axios.post("logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    commit("signOut");
    await router.push("/");
  },
};

export default {
  name: "user",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
