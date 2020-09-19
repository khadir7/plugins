import { actionGenerator } from "utils/ActionGenerator";
import KeyMirror from "utils/KeyMirror";

const _actions = [
  "LOAD_BUSINESS_GLOSSARY_INFO",
  "SET_BUSINESS_GLOSSARY_DATA",
  "FETCH_BUSINESS_GLOSSARY_DATA_FAILED",
  "LOAD_BUSINESS_GLOSSARY_INFO_BY_SEARCH_KEYWORD",
  "GET_BUSINESS_GLOSSARY_INFO_BY_ID",
  "SET_BUSINESS_GLOSSARY_INFO_BY_ID",
  "FETCH_BUSINESS_GLOSSARY_INFO_BY_ID_FAILED",
  "CLEAR_TERM_DATA",
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const getBusinessGlossaryData = namespacedActionGenerator(
  "LOAD_BUSINESS_GLOSSARY_INFO",
  true
);

const getBusinessGlossaryDatabySearchKeyword = namespacedActionGenerator(
  "LOAD_BUSINESS_GLOSSARY_INFO_BY_SEARCH_KEYWORD",
  true
);

const setBusinessGlossaryData = namespacedActionGenerator(
  "SET_BUSINESS_GLOSSARY_DATA",
  true
);

const fetchBusinessGlossaryFailed = namespacedActionGenerator(
  "FETCH_BUSINESS_GLOSSARY_DATA_FAILED"
);

const getTheBusinessGlossaryInfoById = namespacedActionGenerator(
  "GET_BUSINESS_GLOSSARY_INFO_BY_ID",
  true
);

const setTheBusinessGlossaryInfoById = namespacedActionGenerator(
  "SET_BUSINESS_GLOSSARY_INFO_BY_ID",
  true
);

const fetchBusinessGlossaryInfoByIdFailed = namespacedActionGenerator(
  "FETCH_BUSINESS_GLOSSARY_INFO_BY_ID_FAILED"
);

const clearTermData = namespacedActionGenerator("CLEAR_TERM_DATA");

export default {
  Actions,
  getBusinessGlossaryData,
  setBusinessGlossaryData,
  fetchBusinessGlossaryFailed,
  getBusinessGlossaryDatabySearchKeyword,
  getTheBusinessGlossaryInfoById,
  setTheBusinessGlossaryInfoById,
  fetchBusinessGlossaryInfoByIdFailed,
  clearTermData,
};
