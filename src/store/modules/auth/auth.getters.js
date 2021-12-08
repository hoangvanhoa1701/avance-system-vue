const getters = {
  authenticated: (state) =>
    !!state.user.id &&
    (state.user.type === "LOGIN" || state.user.type === "LOGIN_SWITCH"),
  name: (state) => state.user.name,
  loading: (state) => state.loading,
  status: (state) => state.status,
  switched: (state) => !!state.user.requestingUser,
  user: (state) => state.user,
  // Check if a user has permissions against access list
  // Kept in Auth module for easy access to user object
};

export default getters;
