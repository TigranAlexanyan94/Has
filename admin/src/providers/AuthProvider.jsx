import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import axios from "axios";

const AuthProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { name, password } = params;
    return axios
      .post(
        `${process.env.API_URL}/${process.env.LOGIN_PATH}`,
        { name, password },
        { headers: { "Content-Type": "application/json" } },
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
};

export default AuthProvider;
