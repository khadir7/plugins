import { ActionTypes, ActionMethods } from "store/actions/";
import { detailService } from "services";

const { setWikiData } = ActionMethods;

const fetchWikiForTable = (store, payload) => {
  return detailService
    .getWikiForTable(payload)
    .then((response) => {
      if (response?.data?.[0]) {
        let data = response.data[0];
        store.dispatch(setWikiData(data.wikitext));
      } else {
        store.dispatch(setWikiData(""));
      }
    })
    .catch((error) => {
      store.dispatch(setWikiData(""));
    });
};

const fetchWikiForTableColumn = (store, payload) => {
  return detailService
    .getWikiForTableColumn(payload)
    .then((response) => {
      if (response?.data?.[0]) {
        let data = response.data[0];
        store.dispatch(setWikiData(data.wikitext));
      } else {
        store.dispatch(setWikiData(""));
      }
    })
    .catch((error) => {
      store.dispatch(setWikiData(""));
    });
};

export default (store) => (next) => (action) => {
  next(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.GET_TABLE_WIKI:
      fetchWikiForTable(store, action.payload);
      break;
    case ActionTypes.GET_TABLE_COLUMN_WIKI:
      fetchWikiForTableColumn(store, action.payload);
      break;
  }
};
