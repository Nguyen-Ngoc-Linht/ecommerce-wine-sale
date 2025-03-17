import Cookies from "js-cookie";

const cookiesConfig = require("./../config/cookies.env");
const AccessToken = cookiesConfig.AUTHEN.AccessToken;
const RefreshToken = cookiesConfig.AUTHEN.RefreshToken;
const UserInfo = cookiesConfig.AUTHEN.UserInfo;
const LocationDefault = cookiesConfig.AUTHEN.LocationDefault;
const LocationList = cookiesConfig.AUTHEN.LocationList;
const SsVideo5 = cookiesConfig.AUTHEN.SsVideo5;
const SearchKey = cookiesConfig.AUTHEN.SearchKey;
const FirebaseToken = cookiesConfig.AUTHEN.FirebaseToken;
const LoginType = cookiesConfig.AUTHEN.LoginType;
const LoginCsrfState = cookiesConfig.AUTHEN.LoginCsrfState;
const SessionCart = cookiesConfig.AUTHEN.SessionCart;
const OrderCart = cookiesConfig.AUTHEN.OrderCart;

export function getAccessToken() {
  return Cookies.get(AccessToken);
}

export function setAccessToken(token) {
  Cookies.set(AccessToken, token, { expires: 7 });
}

export function removeAccessToken() {
  Cookies.remove(AccessToken);
}

export function getRefreshToken() {
  return Cookies.get(RefreshToken);
}

export function setRefreshToken(token) {
  Cookies.set(RefreshToken, token, { expires: 7 });
}

export function removeRefreshToken() {
  Cookies.remove(RefreshToken);
}

export function getUserInfo() {
  if (process.browser) {
    return localStorage.getItem(UserInfo);
  }
}

export function setUserInfo(data) {
  if (process.browser) {
    localStorage.setItem(UserInfo, JSON.stringify(data));
  }
}

export function removeUserInfo() {
  if (process.browser) {
    localStorage.removeItem(UserInfo);
  }
}

export function getSessionCart() {
  if (process.browser) {
    return localStorage.getItem(SessionCart);
  }
}

export function setSessionCart(data) {
  if (process.browser) {
    localStorage.setItem(SessionCart, data);
  }
}

export function removeSessionCart() {
  if (process.browser) {
    localStorage.removeItem(SessionCart);
  }
}

export function getLocation() {
  if (process.browser) {
    return localStorage.getItem(LocationDefault);
  }
}

export function setLocation(data) {
  if (process.browser) {
    localStorage.setItem(LocationDefault, JSON.stringify(data));
  }
}

export function removeLocation() {
  if (process.browser) {
    localStorage.removeItem(LocationDefault);
  }
}

export function getLstLocation() {
  if (process.browser) {
    return localStorage.getItem(LocationList);
  }
}

export function setLstLocation(data) {
  if (process.browser) {
    localStorage.setItem(LocationList, JSON.stringify(data));
  }
}

export function removeLstLocation() {
  if (process.browser) {
    localStorage.removeItem(LocationList);
  }
}

export function getOrderCart() {
  if (process.browser) {
    return localStorage.getItem(OrderCart);
  }
}

export function setOrderCard(data) {
  if (process.browser) {
    localStorage.setItem(OrderCart, JSON.stringify(data));
  }
}

export function removeOrderCart() {
  if (process.browser) {
    localStorage.removeItem(OrderCart);
  }
}
