import { CONSTANTS } from "../utils/constant";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  removeUserInfo,
} from "../utils/cookieAuthen";

export default function ({ store, $axios, redirect }) {
  $axios.defaults.timeout = 300000;
  // $axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  $axios.onRequest((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  });
  $axios.onResponse((response) => {
    // console.log('onResponse', response);
    const { data } = response;
    // if data.code == 6767 || 6868 || 6969 => logout
    if (
      data.code === CONSTANTS.TOKEN_EXPIRED ||
      data.code === CONSTANTS.TOKEN_INCORRECT ||
      data.code === CONSTANTS.TOKEN_NOT_EXIST
    ) {
      removeAccessToken();
      removeRefreshToken();
      removeUserInfo();
      redirect("/account/login");
    }
  });

  $axios.onRequestError((error) => {
    console.log("[onRequestError]", error);
  });
  $axios.onResponseError((error) => {
    try {
      const status = parseInt(error.response && error.response.status);
      console.log(status, "Axios onError"); // displays in console

      // if status == 401 => logout
      if (status === CONSTANTS.TOKEN_UNAUTHORIZED) {
        removeAccessToken();
        removeRefreshToken();
        removeUserInfo();
        redirect("/account/login");
      }
    } catch (err) {
      redirect("/account/login");
      console.log("[onResponseError]", error);
    }
  });
}
