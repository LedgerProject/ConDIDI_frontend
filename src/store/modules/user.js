import { axios } from "../../plugins/axios";
import router from "../../router";

const state = {
  user: null,
  token: "",
  status: "",
  loading: true,
};

const getters = {
  getUser: () => state.user,
  isSignedIn: (state) => !!state.token,
  getStatus: () => state.status,
  getLoading: () => state.loading,
  getInitials: (state) => {
    return state.user && state.user.name ? state.user.name.charAt(0) : "";
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setStatus(state, status) {
    state.token = status;
  },
  setUser(state, user) {
    state.user = user;
  },
  signOut(state) {
    state.user = "";
    state.token = "";
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  fetchUser: async ({ commit }) => {
    commit("setLoading", true);

    const { data } = await axios.post("get_user_profile");
    const user = data.userdata ? data.userdata : null;
    commit("setUser", user);

    commit("setLoading", false);
  },
  signInWithToken: async ({ commit, dispatch }) => {
    commit("setLoading", true);

    const token = localStorage.getItem("token");

    if (token) {
      commit("setToken", token);
      axios.defaults.headers.common["Authorization"] = token;
      await dispatch("fetchUser");
    }

    commit("setLoading", false);
  },
  // eslint-disable-next-line no-empty-pattern
  signIn: async ({ commit, dispatch }, payload) => {
    commit("setLoading", true);
    const { data } = await axios.post("login_password", payload);
    const token = data.token;

    // Sign in was successful
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("setToken", token);
      commit("setStatus", "");
      await dispatch("fetchUser");
      await router.push("/user");
    } else {
      commit("setStatus", "Error");
    }
    commit("setLoading", false);
  },
  // eslint-disable-next-line no-empty-pattern
  signUp: async ({ commit, dispatch }, payload) => {
    commit("setLoading", true);
    const { data } = await axios.post("create_user", payload);

    if (data.error) {
      commit("setStatus", "Error");
    } else {
      dispatch("signIn", { email: payload.email, password: payload.password });
    }
    commit("setLoading", false);
  },
  // eslint-disable-next-line no-empty-pattern
  signOut: async ({ commit }) => {
    await axios.post("logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    commit("signOut");
    await router.push("/");
  },
};

export default {
  name: "users",
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
