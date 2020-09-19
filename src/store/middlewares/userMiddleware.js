import { ActionTypes, ActionMethods } from "store/actions/";
import { userService } from "services";

const {
  setUserData,
  fetchUserDataFailed,
  logOutSuccess,
  contextUrlSuccess,
} = ActionMethods;

const fetchUserDetails = (store) => {
  return userService
    .getCurrentActiveUser()
    .then((response) => {
      if (response.data.userId) {
        store.dispatch(setUserData(response.data));
      } else {
        store.dispatch(fetchUserDataFailed());
      }
    })
    .catch((error) => {
      store.dispatch(fetchUserDataFailed());
    });
};

const onLogin = (store, payload) => {
  return userService
    .onLogin(payload)
    .then((response) => {
      if (response.data?.response?.user?.userId) {
        store.dispatch(setUserData(response.data.response.user));
      } else {
        store.dispatch(fetchUserDataFailed());
      }
    })
    .catch((error) => {
      store.dispatch(fetchUserDataFailed());
    });
};

const logOut = (store) => {
  return userService
    .logOutUser()
    .then(() => {
      store.dispatch(logOutSuccess());
    })
    .catch(() => {
      console.log("log out failed");
    });
};

const fetchContextUrls = (store) => {
  return userService
    .getContextUrls()
    .then((response) => {
      let urls = response.data.map((url) => url.contexturlname);
      store.dispatch(contextUrlSuccess(urls));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default (store) => (next) => (action) => {
  next(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.LOAD_USERINFO:
      fetchUserDetails(store);
      break;
    case ActionTypes.ON_LOGIN:
      onLogin(store, action.payload);
      break;
    case ActionTypes.LOGOUT_USER:
      logOut(store);
      break;
    case ActionTypes.FETCH_CONTEXT_URLS:
      fetchContextUrls(store);
      break;
  }
};
