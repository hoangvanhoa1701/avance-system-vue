import httpRequest from "./http-common";

function login(email, password, remember) {
  return httpRequest.post(`/auth/authenticate`, {
    email,
    password,
    remember,
  });
}

function logout() {
  return httpRequest.delete(`/auth/logout`);
}

function register(user) {
  return httpRequest.post(`/auth/register`, user);
}

function refreshToken(refresh_token) {
  return httpRequest.post(`/auth/refresh-token`, refresh_token);
}

function me() {
  return httpRequest.get(`/auth/me`);
}

export const authService = {
  login,
  logout,
  register,
  refreshToken,
  me,
};
