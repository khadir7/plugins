import { actionGenerator } from "utils/ActionGenerator";
import KeyMirror from "utils/KeyMirror";

const _actions = [
  "LOAD_USERINFO",
  "SET_USER_DATA",
  "FETCH_USER_DATA_FAILED",
  "ON_LOGIN",
  "LOGOUT_USER",
  "LOGOUT_SUCCESS",
  "FETCH_CONTEXT_URLS",
  "CONTEXT_URL_SUCCESS",
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const getUserData = namespacedActionGenerator("LOAD_USERINFO");

const onLogin = namespacedActionGenerator("ON_LOGIN", true);

const setUserData = namespacedActionGenerator("SET_USER_DATA", true);

const fetchUserDataFailed = namespacedActionGenerator("FETCH_USER_DATA_FAILED");

const logOutUser = namespacedActionGenerator("LOGOUT_USER");

const logOutSuccess = namespacedActionGenerator("LOGOUT_SUCCESS");

const getContextUrls = namespacedActionGenerator("FETCH_CONTEXT_URLS");

const contextUrlSuccess = namespacedActionGenerator(
  "CONTEXT_URL_SUCCESS",
  true
);

export default {
  Actions,
  getUserData,
  setUserData,
  fetchUserDataFailed,
  onLogin,
  logOutUser,
  logOutSuccess,
  getContextUrls,
  contextUrlSuccess,
};
