import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Auth from "./modules/auth";
// import Banner from "./modules/banner";
// import UserDetails from "./modules/user/UserDetails";
// import UserList from "./modules/user/UserList";

const modules = {
  Auth,
  // Banner,
  // UserDetails,
  // UserList,
};

// const actions = {};

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

// Object.keys(modules).forEach((moduleName) => {
//   // Dispatch the init action for each module, if one exists
//   // Module **must** be namespaced for this to work
//   if (modules[moduleName].actions && modules[moduleName].actions.init) {
//     if (modules[moduleName].namespaced) {
//       store.dispatch(`${moduleName}/init`);
//     }
//   }
// });

export default store;
