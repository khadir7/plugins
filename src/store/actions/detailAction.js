import { actionGenerator } from "utils/ActionGenerator";
import KeyMirror from "utils/KeyMirror";

const _actions = [
  "SET_DETAIL_DATA",
  "GET_TABLE_WIKI",
  "GET_TABLE_COLUMN_WIKI",
  "SET_WIKI_DATA",
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const setDetailData = namespacedActionGenerator("SET_DETAIL_DATA", true);

const getWikiForTable = namespacedActionGenerator("GET_TABLE_WIKI", true);

const getWikiForTableColumn = namespacedActionGenerator(
  "GET_TABLE_COLUMN_WIKI",
  true
);

const setWikiData = namespacedActionGenerator("SET_WIKI_DATA", true);

export default {
  Actions,
  setDetailData,
  getWikiForTable,
  getWikiForTableColumn,
  setWikiData,
};
