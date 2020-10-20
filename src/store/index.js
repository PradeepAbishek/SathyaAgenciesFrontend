import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companyName: "Sathya Agencies",
    color: "#7400b8",
    userDetails: {},
    userLogged: false,
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userLogged = true;
      state.userDetails = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});
