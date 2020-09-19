import { actionGenerator } from "utils/ActionGenerator";
import KeyMirror from "utils/KeyMirror";

const _actions = [
  "SET_SEARCH_DATA",
  "GET_SEARCH_DATA",
  "SET_SEARCH_DATA_TABLES",
  "GET_SEARCH_DATA_TABLES",
  "SET_SEARCH_DATA_FILES",
  "GET_SEARCH_DATA_FILES",
  "SET_SEARCH_DATA_CHARTS",
  "GET_SEARCH_DATA_CHARTS",
  "SET_SEARCH_DATA_STORIES",
  "GET_SEARCH_DATA_STORIES",
  "CLEAR_SEARCH_DATA",
  "SET_SERVICE_DESK_SEARCH_DATA",
  "GET_SEARCH_DATA_COLUMNS",
  "GET_SEARCH_DATA_BUSINESS_GLOSSARY",
  "SAVE_SERVICE_DESK_DATA",
  "SUCCESS_SERVICE_DESK_DATA",
  "CLEAR_REPORT_DATA",
  "ERROR_SERVICE_DESK_DATA",
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const getSearchData = namespacedActionGenerator("GET_SEARCH_DATA", true);

const setSearchData = namespacedActionGenerator("SET_SEARCH_DATA", true);

const getSearchDataForTables = namespacedActionGenerator(
  "GET_SEARCH_DATA_TABLES",
  true
);

const getSearchDataForFiles = namespacedActionGenerator(
  "GET_SEARCH_DATA_FILES",
  true
);

const getSearchDataForCharts = namespacedActionGenerator(
  "GET_SEARCH_DATA_CHARTS",
  true
);

const getSearchDataForStories = namespacedActionGenerator(
  "GET_SEARCH_DATA_STORIES",
  true
);

const getSearchDataForColumns = namespacedActionGenerator(
  "GET_SEARCH_DATA_COLUMNS",
  true
);

const getSearchDataForBusinessGlossary = namespacedActionGenerator(
  "GET_SEARCH_DATA_BUSINESS_GLOSSARY",
  true
);

const setServiceDeskSearchData = namespacedActionGenerator(
  "SET_SERVICE_DESK_SEARCH_DATA",
  true
);

const saveServiceDeskData = namespacedActionGenerator(
  "SAVE_SERVICE_DESK_DATA",
  true
);

const successServiceDeskData = namespacedActionGenerator(
  "SUCCESS_SERVICE_DESK_DATA"
);

const errorServiceDeskData = namespacedActionGenerator(
  "ERROR_SERVICE_DESK_DATA"
);

const clearReportingState = namespacedActionGenerator("CLEAR_REPORT_DATA");

const clearSearchData = namespacedActionGenerator("CLEAR_SEARCH_DATA");

export default {
  Actions,
  getSearchData,
  setSearchData,
  getSearchDataForTables,
  getSearchDataForFiles,
  getSearchDataForCharts,
  getSearchDataForStories,
  clearSearchData,
  setServiceDeskSearchData,
  getSearchDataForColumns,
  getSearchDataForBusinessGlossary,
  saveServiceDeskData,
  successServiceDeskData,
  clearReportingState,
  errorServiceDeskData,
};
