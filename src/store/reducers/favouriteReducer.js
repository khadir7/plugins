import { ActionTypes as actionTypes } from "store/actions/";

const intialState = {
  favourites: [],
  favouritesFetchFailed: false,
};

const ovalEdgeFavouriteReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FAVOUTIES_INFO:
      return state;
    case actionTypes.SET_FAVOURITES_INFO:
      return {
        ...state,
        favourites: action.payload,
        favouritesFetchFailed: true
      };
    case actionTypes.FETCH_FAVOURITES_INFO_FAILED:
      return {
        ...state,
        favourites: [],
        favouritesFetchFailed: false
      };
    default:
      return state;
  }
};

export default ovalEdgeFavouriteReducer;
