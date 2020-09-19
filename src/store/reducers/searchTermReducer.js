import { ActionTypes as actionTypes } from "store/actions/";

const intialState = {
  searchData: [],
  serviceDeskSearchData: [],
  isReporting: false,
  reportingSuccess: false,
  reportingError: false,
  tableEndOfSearch: false,
  columnEndOfSearch: false,
  storyEndOfSearch: false,
  fileEndOfSearch: false,
  chartEndOfSearch: false,
  termEndOfSearch: false,
};

const ovalEdgeSearchTermReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_DATA:
      return state;
    case actionTypes.GET_SEARCH_DATA_TABLES:
      return state;
    case actionTypes.GET_SEARCH_DATA_FILES:
      return state;
    case actionTypes.GET_SEARCH_DATA_CHARTS:
      return state;
    case actionTypes.GET_SEARCH_DATA_STORIES:
      return state;
    case actionTypes.GET_SEARCH_DATA_COLUMNS:
      return state;
    case actionTypes.SAVE_SERVICE_DESK_DATA:
      return {
        ...state,
        isReporting: true,
      };
    case actionTypes.SUCCESS_SERVICE_DESK_DATA:
      return {
        ...state,
        isReporting: false,
        reportingSuccess: true,
        reportingError: false,
      };
    case actionTypes.ERROR_SERVICE_DESK_DATA:
      return {
        ...state,
        isReporting: false,
        reportingSuccess: false,
        reportingError: true,
      };
    case actionTypes.CLEAR_REPORT_DATA:
      return {
        ...state,
        isReporting: false,
        reportingSuccess: false,
        reportingError: false,
      };
    case actionTypes.GET_SEARCH_DATA_BUSINESS_GLOSSARY:
      return state;
    case actionTypes.SET_SEARCH_DATA:
      return {
        ...state,
        searchData: [...state.searchData, ...action.payload.data],
        [action.payload.key]: action.payload.data.length ? false : true,
      };
    case actionTypes.CLEAR_SEARCH_DATA:
      return {
        ...state,
        searchData: [],
        tableEndOfSearch: false,
        columnEndOfSearch: false,
        storyEndOfSearch: false,
        fileEndOfSearch: false,
        chartEndOfSearch: false,
        termEndOfSearch: false,
      };
    case actionTypes.SET_SERVICE_DESK_SEARCH_DATA:
      return {
        ...state,
        serviceDeskSearchData: action.payload,
      };
    default:
      return state;
  }
};

export default ovalEdgeSearchTermReducer;
