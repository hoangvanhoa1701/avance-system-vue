import { LocalStorageHelper } from "./auth.helpers";

/**
 * Remove status messages
 * @param {*} state local state (autopopulated)
 */
function clearStatus(state) {
  state.status = "";
}

/**
 * Remove user from state and localStorage
 * Does not affect cookies
 * @param {*} state local state (autopopulated)
 */
function clearUser(state) {
  state.user = {};
  LocalStorageHelper.clearUser();
}

/**
 * Mark auth as loading
 * @param {*} state local state (autopopulated)
 * @param {Boolean} loading
 */
function setLoading(state, loading) {
  state.loading = loading;
}

/**
 * Set a status message
 * @param {*} state local state (autopopulated)
 * @param {String} status
 */
function setStatus(state, status) {
  state.status = status;
}

/**
 * Store user in state and localStorage, then
 * watch for expiration
 * @param {Set} state local state (autopopulated)
 * @param {*} user user object
 */
function setUser(state, user) {
  if (!user.iat || !user.exp) {
    throw new Error("Cannot set user without session expiration");
  }
  state.user = user;
  LocalStorageHelper.storeUser(user);
}

export default {
  clearUser,
  clearStatus,
  setLoading,
  setStatus,
  setUser,
};
