const getters = {
  authenticated: (state) =>
    !!state.user.id &&
    (state.user.type === "LOGIN" || state.user.type === "LOGIN_SWITCH"),
  user: (state) => state.user,
  name: (state) => state.user.name,
  loading: (state) => state.loading,
  status: (state) => state.status,
};

export default getters;
