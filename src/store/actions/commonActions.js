import { actionGenerator } from "utils/ActionGenerator";
import KeyMirror from "utils/KeyMirror";

const _actions = [
  "SET_SELECTED_BROWSER_VALUE",
  "SET_SHOW_SELECTED_VALUE_IN_SEARCH",
  "SET_SHOW_SELECTED_VALUE_IN_SUGGEST",
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const setSelectedBrowserValue = namespacedActionGenerator(
  "SET_SELECTED_BROWSER_VALUE",
  true
);

const setShowSelectedValueInSearch = namespacedActionGenerator(
  "SET_SHOW_SELECTED_VALUE_IN_SEARCH",
  true
);

const setShowSelectedValueInSuggest = namespacedActionGenerator(
  "SET_SHOW_SELECTED_VALUE_IN_SUGGEST",
  true
);

export default {
  Actions,
  setSelectedBrowserValue,
  setShowSelectedValueInSearch,
  setShowSelectedValueInSuggest,
};
