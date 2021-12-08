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
    .get("api")
    .then(
      ({
        data: {
          login: { code, user, iat, exp },
        },
      }) => {
        commit("setStatus", code);
        if (code === "WRONG_CREDENTIALS") {
          log.debug("Wrong credentials");
          commit("setLoading", false);
        } else if (code === "LOGIN_SUCCESS") {
          // Simple login completed successfully
          commit("clearUser");
          // type: 'LOGIN' for regular sessions
          commit("setUser", Object.assign(user, { iat, exp, type: "LOGIN" }));
          commit("setLoading", false);
          router.push($route.query.redirect || "/");
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
      log.debug("Got user from state");
      user = state.user;
    } else if (LocalStorageHelper.userExists()) {
      log.warn("Inconsistent auth state: user in local storage, not in state");
      log.debug("Restoring user from localStorage");
      user = LocalStorageHelper.getUser();
    } else {
      log.debug("No user in state or localStorage");
      // No user in state
      // continue to next route handler
      return resolve();
    }
    const remaining = user.exp - Date.now();
    log.debug(`Auth session expires in ${Math.round(remaining / 1000)}s`);
    if (remaining < AUTH_EXP_CHECK_INTERVAL) {
      log.debug("Auth session has expired. Triggering inactivity logout");
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
  router.push("/login");
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
      log.error(err);
    });
}

/**
 * Reset a user's password given a new password
 * and a token received by email.
 */
function resetPassword({ commit }, { password, resetToken }) {
  log.debug("Attempting to set a new password");
  axios
    .post("api", { password, resetToken })
    .then(
      ({
        data: {
          resetPassword: { success, user, iat, exp },
        },
      }) => {
        log.debug("Password changed successfully. A login cookie has been set");
        if (success === true) {
          commit("setUser", Object.assign(user, { iat, exp, type: "LOGIN" }));
          router.push("/");
          return;
        }
        log.debug("Could not reset password");
        commit("clearUser");
        commit("setStatus", "PASSWORD_RESET_FAIL");
      }
    )
    .catch((err) => {
      log.error("Could not set new password:", err);
      commit("clearUser");
      commit("setStatus", "PASSWORD_RESET_FAIL");
    });
}

function requestPasswordReset({ commit }, { email }) {
  log.debug("Attempting to request a password reset");
  axios
    .post("api", email)
    .then(({ data: { requestPasswordReset } }) => {
      if (requestPasswordReset) {
        log.debug("Password reset request successful");
        commit("setStatus", "PASSWORD_RESET_SUCCESS");
        return;
      }
      log.debug("Password reset request failed");
      commit("setStatus", "PASSWORD_RESET_FAIL");
    })
    .catch((err) => {
      commit("setStatus", "PASSWORD_RESET_FAIL");
      log.error(err);
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
