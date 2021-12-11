import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./modules/auth";
import alert from "./modules/alert";

const modules = {
  auth,
  alert,
};

const store = new Vuex.Store({
  state: {
    user: {
      name: "user store",
    },
  }, // state
  getters: {
    user: (state) => state.user,
  }, // get state
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  }, // change state
  actions: {
    // context: {
    //   commit(type, payload, options),
    //   dispatch(type, payload),
    //   getters,
    //   rootGetters,
    //   rootState,
    //   state
    // },
    // updateProfile(context) {
    updateProfile({ commit }) {
      commit("setUser", { name: "value change" }); // call mutations
    },
  },
  modules,
});

export default store;
