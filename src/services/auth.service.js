import httpRequest from "./http-common";

export const authService = {
  login,
  logout,
  register,
  refreshToken,
};

function login(email, password, remember) {
  return httpRequest
    .post(`/auth/authenticate`, {
      email,
      password,
      remember,
    })
    .then((resp) => {
      if (resp.data) {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        localStorage.setItem(
          "access_token",
          JSON.stringify(resp.data.token.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(resp.data.token.refresh_token)
        );
      }

      return resp;
    });
}

function logout() {
  // delete token from local storage
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // TODO: call api logout
}

function register(user) {
  return httpRequest.post(`/auth/register`, user).then();
}

function refreshToken(refresh_token) {
  return httpRequest.post(`/auth/refresh-token`, refresh_token).then();
}
