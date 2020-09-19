import { ActionTypes as actionTypes } from "store/actions/";

const intialState = {
  businessGlossary: [],
  error: false,
  selectedBusinessGlossaryInfo: {},
  selectedBusinessGlossaryInfoFailed: false,
  termEndOfSearch: false,
};

const ovalEdgeBusinessGlossaryReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BUSINESS_GLOSSARY_INFO:
      return state;
    case actionTypes.LOAD_BUSINESS_GLOSSARY_INFO_BY_SEARCH_KEYWORD:
      return state;
    case actionTypes.SET_BUSINESS_GLOSSARY_DATA:
      return {
        ...state,
        businessGlossary: [...state.businessGlossary, ...action.payload],
        termEndOfSearch: action.payload.length ? false : true,
        error: false,
      };
    case actionTypes.CLEAR_TERM_DATA:
      return {
        ...state,
        businessGlossary: [],
        termEndOfSearch: false,
      };
    case actionTypes.FETCH_BUSINESS_GLOSSARY_FAILED:
      return {
        ...state,
        businessGlossary: [],
        error: true,
      };
    case actionTypes.GET_BUSINESS_GLOSSARY_INFO_BY_ID:
      return state;
    case actionTypes.SET_BUSINESS_GLOSSARY_INFO_BY_ID:
      return {
        ...state,
        selectedBusinessGlossaryInfo: action.payload,
        selectedBusinessGlossaryInfoFailed: false,
      };
    case actionTypes.FETCH_BUSINESS_GLOSSARY_INFO_BY_ID_FAILED:
      return {
        ...state,
        selectedBusinessGlossaryInfo: {},
        selectedBusinessGlossaryInfoFailed: true,
      };
    default:
      return state;
  }
};

export default ovalEdgeBusinessGlossaryReducer;
