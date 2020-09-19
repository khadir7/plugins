import { ActionTypes, ActionMethods } from "store/actions/";
import { commonServices, businessGlossaryService } from "services";

const {
  setOvalEdgeCategories,
  fetchCategoryOneFailed,
  setOvalEdgeDomains,
  fetchDomainsFailed,
  getBusinessGlossaryData,
} = ActionMethods;

const fetchOvalEdgeDomains = (store) => {
  return commonServices
    .getOvalEdgeDomains()
    .then((response) => {
      store.dispatch(setOvalEdgeDomains(response.data));
    })
    .catch((error) => {
      store.dispatch(fetchDomainsFailed());
    });
};

const fetchOvalEdgeCategories = (store, payload) => {
  return commonServices
    .getOvalEdgeCategories(payload)
    .then((response) => {
      if (response.data.response.categories.length > 0) {
        store.dispatch(
          setOvalEdgeCategories(response.data.response.categories)
        );
      } else {
        store.dispatch(setOvalEdgeCategories([]));
      }
    })
    .catch((error) => {
      store.dispatch(fetchCategoryOneFailed());
    });
};

const insertBusinessGlossaryTerm = (store, payload) => {
  return businessGlossaryService
    .insertBusinessGlossary(payload)
    .then((response) => {
      if (response.businessGlossaryId) {
        store.dispatch(getBusinessGlossaryData(payload.name));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default (store) => (next) => (action) => {
  next(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.INSERT_BUSINESS_GLOSSARY_DATA:
      insertBusinessGlossaryTerm(store, action.payload);
      break;
    case ActionTypes.LOAD_OVALEDGE_DOMAINS:
      fetchOvalEdgeDomains(store);
      break;
    case ActionTypes.LOAD_OVALEDGE_CATEGORY_ONE:
      fetchOvalEdgeCategories(store, action.payload);
      break;
  }
};
