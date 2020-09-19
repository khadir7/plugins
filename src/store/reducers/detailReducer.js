import { ActionTypes as actionTypes } from "store/actions/";

const intialState = {
  selectedDetailData: null,
};

const ovalEdgeDetailReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DETAIL_DATA:
      return {
        ...state,
        selectedDetailData: action.payload,
      };
    case actionTypes.SET_WIKI_DATA:
      return {
        ...state,
        selectedDetailData: Object.assign({}, state.selectedDetailData, {
          description: action.payload,
        }),
      };
    default:
      return state;
  }
};

export default ovalEdgeDetailReducer;
