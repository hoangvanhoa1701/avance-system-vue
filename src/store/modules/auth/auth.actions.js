import axios from "axios";

import { LocalStorageHelper } from "./auth.helpers";
import { AUTH_EXP_CHECK_INTERVAL } from "./auth.constants";

/**
 * Restore previous sessions, perform
 * redirection if necessary.
 *
 * Automatically called on first load.
 */

function init({ dispatch }) {
  dispatch("restoreUser");
  dispatch("checkExpiration");
}

/**
 *         .
 *        ":"
 *      __:____     |"\/"|
 *   ,'        `.    \  /
 *  |  O         \___/  |
 * ~^~^~^~^~^~^~^~^~^~^~^~^~
 */
function login({ commit }, { email, password, $route }) {
  commit("setLoading", true);
  commit("setStatus", "LOGGING_IN");

  axios
    .post("api", email, password)
    .then(
      ({
        data: {
          login: { code, user, iat, exp },
        },
      }) => {
        commit("setStatus", code);
        if (code === "WRONG_CREDENTIALS") {
          commit("setLoading", false);
        } else if (code === "LOGIN_SUCCESS") {
          // Simple login completed successfully
          commit("clearUser");
          // type: 'LOGIN' for regular sessions
          commit("setUser", Object.assign(user, { iat, exp, type: "LOGIN" }));
          commit("setLoading", false);
          console.log($route);
          // router.push($route.query.redirect || "/");
        }
      }
    )
    .catch((err) => {
      console.log(err);
      commit("clearUser");
      commit("setLoading", false);
      commit("setStatus", "ERR_UNKNOWN");
    });
}

function clearStatus({ commit }) {
  commit("clearStatus");
}

/**
 * Check whether the stored user is still valid.
 * If not, set an inactivity status message and remove
 * the user from state and storage.
 *
 * Always resolves from returned promise, since there
 * is no "failed" state--only a successful check for
 * expiry.
 *
 * Used primarily in:
 *   * Router navigation guards
 *   * Login session management
 *   * Error processing
 *      * Last-effort check when a fatal GQL error happens
 */
function checkExpiration({ dispatch, state }) {
  return new Promise((resolve) => {
    let user;
    if (state.user.id) {
      user = state.user;
    } else if (LocalStorageHelper.userExists()) {
      user = LocalStorageHelper.getUser();
    } else {
      // No user in state
      // continue to next route handler
      return resolve();
    }
    const remaining = user.exp - Date.now();
    if (remaining < AUTH_EXP_CHECK_INTERVAL) {
      dispatch("logOutInactivity");
      return resolve();
    }
    return resolve();
  });
}

/**
 * Log out and clear current user from
 * state and localStorage. Also resets the
 * Apollo catch and redirects to the login page.
 */
function logout({ commit }) {
  /**
   * Frontend logout happens immediately
   * in order to improve page responsiveness
   * TODO: Review this practice
   */
  // router.push("/login");
  commit("clearUser");
  commit("setStatus", "LOGGED_OUT");
  commit("setLoading", false);
  axios
    .get("api")
    .then(() => {
      localStorage.clear();
    })
    .catch((err) => {
      localStorage.clear();
      console.log(err);
    });
}

/**
 * Reset a user's password given a new password
 * and a token received by email.
 */
function resetPassword({ commit }, { password, resetToken }) {
  axios
    .post("api", { password, resetToken })
    .then(
      ({
        data: {
          resetPassword: { success, user, iat, exp },
        },
      }) => {
        if (success === true) {
          commit("setUser", Object.assign(user, { iat, exp, type: "LOGIN" }));
          // router.push("/");
          return;
        }
        commit("clearUser");
        commit("setStatus", "PASSWORD_RESET_FAIL");
      }
    )
    .catch((err) => {
      console.log(err);
      commit("clearUser");
      commit("setStatus", "PASSWORD_RESET_FAIL");
    });
}

function requestPasswordReset({ commit }, { email }) {
  axios
    .post("api", email)
    .then(({ data: { requestPasswordReset } }) => {
      if (requestPasswordReset) {
        console.log("Password reset request successful");
        commit("setStatus", "PASSWORD_RESET_SUCCESS");
        return;
      }
      commit("setStatus", "PASSWORD_RESET_FAIL");
    })
    .catch((err) => {
      commit("setStatus", "PASSWORD_RESET_FAIL");
      console.log(err);
    });
}

export default {
  init,
  clearStatus,
  checkExpiration,
  login,
  logout,
  resetPassword,
  requestPasswordReset,
};
