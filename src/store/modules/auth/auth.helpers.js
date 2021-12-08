import { AUTH_USER_KEY } from "./auth.constants";

/**
 * An abstract utility class for managing localStorage.
 * Methods are stateful due to localStorage state,
 * hence use of class instead of individual functions.
 */
export class LocalStorageHelper {
  constructor() {}
  /**
   * Remove user from localStorage
   */
  static clearUser() {
    localStorage.removeItem(AUTH_USER_KEY);
  }
  /**
   * Retrieve and deserialize user from localStorage
   * @returns {Object} user object
   */
  static getUser() {
    const user = localStorage.getItem(AUTH_USER_KEY);

    // No user stored
    if (!user) {
      return null;
    }
    // Deserialize and return
    return JSON.parse(user);
  }
  /**
   * Persist user to localStorage
   * @param {Object} user user payload
   */
  static storeUser(user) {
    const serialized = JSON.stringify(user);
    localStorage.setItem(AUTH_USER_KEY, serialized);
  }
  /**
   * Check if a user saved to localStorage
   * @returns {Boolean}
   */
  static userExists() {
    return (
      localStorage.getItem(AUTH_USER_KEY) !== null &&
      +JSON.parse(localStorage.getItem(AUTH_USER_KEY)).exp > Date.now()
    );
  }
}
