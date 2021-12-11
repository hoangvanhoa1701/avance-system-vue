import router from "@/router";
import { authService } from "/src/services/auth.service.js";
import { Message } from "element-ui";

if (
  localStorage.getItem("user") === "undefined" ||
  !localStorage.getItem("user")
) {
  authService.logout();
}

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }, { email, password, remember }) {
    commit("loginRequest", { email });

    authService
      .login(email, password, remember)
      .then((resp) => {
        commit("loginSuccess", resp);
        // dispatch("me");

        console.log(resp);
        Message({
          message: "Sign in successfully!",
          type: "success",
        });
      })
      .catch((error) => {
        commit("loginFailure", error);
        dispatch("alert/error", error, { root: true });

        // TODO: Handle error
        console.log("error", error);
        Message({
          message: "Sign in failed!",
          type: "error",
        });
      });
  },
  logout({ commit }) {
    authService.logout();
    commit("logout");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    authService.register(user).then(
      (user) => {
        commit("registerSuccess", user);
        // router.push("/login");
        setTimeout(() => {
          // show message successful and redirect page
          dispatch("alert/success", "Registration successful!", { root: true });
        });
      },
      (error) => {
        commit("registerFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
  me({ dispatch, commit }) {
    commit("meRequest");
    authService.me().then(
      (resp) => {
        commit("meSuccess", resp);
        router.push("/");
        setTimeout(() => {
          // show message successful and redirect page
          dispatch("alert/success", "Registration successful!", { root: true });
        }, 500);
      },
      (error) => {
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
    state.user = data?.user;
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
  meSuccess(state, status) {
    state.status = { requesting: false, ...status };
  },
  meFailure(state, status) {
    state.status = { requesting: false, ...status };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
