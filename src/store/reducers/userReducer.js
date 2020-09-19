import { ActionTypes as actionTypes } from "store/actions/";

const intialState = {
  userData: null,
  loggedIn: false,
  contextUrls: ["www.google.com", "ovaledge.com"],
};

const ovalEdgeUserReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USERINFO:
      return state;
    case actionTypes.ON_LOGIN:
      return state;
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        loggedIn: true,
      };
    case actionTypes.FETCH_USER_DATA_FAILED:
      return {
        ...state,
        userData: null,
        loggedIn: false,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        userData: null,
        loggedIn: false,
      };
    case actionTypes.CONTEXT_URL_SUCCESS:
      return {
        ...state,
        contextUrls: action.payload,
      };
    default:
      return state;
  }
};

export default ovalEdgeUserReducer;
