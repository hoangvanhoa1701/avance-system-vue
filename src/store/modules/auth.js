import router from "@/router";
import { USER, ACCESS_TOKEN, REFRESH_TOKEN } from "/src/constants";
import { authService } from "/src/services/auth.service.js";
import { Notification } from "element-ui";

// if (localStorage.getItem(USER) === "undefined" || !localStorage.getItem(USER)) {
//   // authService.logout();
//   router.push("/login");
// }

const user = JSON.parse(localStorage.getItem(USER));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const getters = {
  user: (state) => state.user,
};

const actions = {
  login({ commit, dispatch }, { email, password, remember }) {
    commit("loginRequest", { email });

    authService
      .login(email, password, remember)
      .then((resp) => {
        if (resp?.data) {
          const { user, token } = resp.data;

          if (remember) {
            localStorage.setItem(USER, JSON.stringify(user));
            localStorage.setItem(ACCESS_TOKEN, token.access_token);
            localStorage.setItem(REFRESH_TOKEN, token.refresh_token);
          } else {
            sessionStorage.setItem(USER, JSON.stringify(user));
            sessionStorage.setItem(ACCESS_TOKEN, token.access_token);
            sessionStorage.setItem(REFRESH_TOKEN, token.refresh_token);
          }

          dispatch("me");
          router.push("/");

          commit("loginSuccess", resp);
          Notification({
            message: "Sign in successfully!",
            type: "success",
            position: 'bottom-right'
          });
        }
      })
      .catch((error) => {
        if (error) {
          commit("loginFailure", error);
          Notification({
            message: "Sign in failed!",
            type: "error",
            position: 'bottom-right'
          });
        }
      });
  },
  logout({ commit }) {
    authService.logout().finally(() => {
      localStorage.removeItem(USER);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);

      sessionStorage.removeItem(USER);
      sessionStorage.removeItem(ACCESS_TOKEN);
      sessionStorage.removeItem(REFRESH_TOKEN);

      router.push("/login");

      commit("logout");
    });
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    authService.register(user).then(
      (user) => {
        dispatch("me");
        router.push("/");

        commit("registerSuccess", user);
        Notification({
          message: "Registration successful!",
          type: "success",
          position: 'bottom-right'
        });
      },
      (error) => {
        commit("registerFailure", error);
        Notification({
          message: "Registration failed!",
          type: "error",
          position: 'bottom-right'
        });
      }
    );
  },
  me({ dispatch, commit }) {
    commit("meRequest");
    authService.me().then(
      (resp) => {
        commit("meSuccess", resp);
      },
      (error) => {
        // dispatch("logout");
        commit("meFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, { data, status }) {
    state.status = { loggedIn: true, status };
    state.user = data.user;
  },
  loginFailure(state, status) {
    state.status = { ...status };
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state, status) {
    state.status = { ...status };
  },
  registerFailure(state, status) {
    state.status = { ...status };
  },
  meRequest(state) {
    state.status = { requesting: true };
  },
  meSuccess(state, { data, status }) {
    state.status = { requesting: false, ...status };
    state.user = data.user;
  },
  meFailure(state, status) {
    state.status = { requesting: false, ...status };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
