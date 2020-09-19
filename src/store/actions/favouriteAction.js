import { actionGenerator } from "utils/ActionGenerator";
import KeyMirror from "utils/KeyMirror";

const _actions = [
  "GET_FAVOUTIES_INFO",
  "SET_FAVOURITES_INFO",
  "FETCH_FAVOURITES_INFO_FAILED"
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const getFavouritesInfo = namespacedActionGenerator("GET_FAVOUTIES_INFO");

const setFavouritesInfo = namespacedActionGenerator("SET_FAVOURITES_INFO", true);

const fetchFavouritesInfoFailed = namespacedActionGenerator("FETCH_FAVOURITES_INFO_FAILED");

export default {
  Actions,
  getFavouritesInfo,
  setFavouritesInfo,
  fetchFavouritesInfoFailed
};
