import { ActionTypes as actionTypes } from "store/actions/";

const intialState = {
  selectedBrowserValue: '',
  showSelectedValueInSearch: true,
  showSelectedValueInSuggest: true
};

const ovalEdgeCommonReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_BROWSER_VALUE:
      return {
        ...state,
        selectedBrowserValue: action.payload,
        showSelectedValueInSearch: true,
        showSelectedValueInSuggest: true
      };
    case actionTypes.SET_SHOW_SELECTED_VALUE_IN_SEARCH:
      return {
        ...state,
        showSelectedValueInSearch: action.payload
      };
    case actionTypes.SET_SHOW_SELECTED_VALUE_IN_SUGGEST:
      return {
        ...state,
        showSelectedValueInSuggest: action.payload
      };
    default:
      return state;
  }
};

export default ovalEdgeCommonReducer;
