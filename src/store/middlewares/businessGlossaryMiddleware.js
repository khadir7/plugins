import { ActionTypes, ActionMethods } from "store/actions/";
import { businessGlossaryService } from "services";

const {
  setBusinessGlossaryData,
  fetchBusinessGlossaryFailed,
  setTheBusinessGlossaryInfoById,
  fetchBusinessGlossaryInfoByIdFailed,
} = ActionMethods;

const fetchBusinessGlossaryDetails = (store, payload) => {
  return businessGlossaryService
    .getBusinessGlossaryData(payload)
    .then((response) => {
      store.dispatch(setBusinessGlossaryData(response.data));
    })
    .catch((error) => {
      store.dispatch(fetchBusinessGlossaryFailed());
    });
};

const fetchBusinessGlossaryDetailsBySearchKeyWord = (store, payload) => {
  return businessGlossaryService
    .getAllTheBusinessTermsBySearchWord(payload)
    .then((response) => {
      console.log(response);
      if (response?.data?.list) {
        let data = response.data.list;
        data = data.map((eachOption) => {
          return {
            id: eachOption.defid,
            name: eachOption.definition,
            text: eachOption.domain + "." + eachOption.name,
            description: eachOption.example,
            type: "BSG",
            objectType: "glossary",
            objectName: `${eachOption.name}`,
            link: eachOption.permalink,
            redirectLink: "business-glossary",
            word: eachOption.word
          };
        });
        store.dispatch(setBusinessGlossaryData(data));
      } else {
        store.dispatch(setBusinessGlossaryData([]));
      }
    })
    .catch((error) => {
      store.dispatch(fetchBusinessGlossaryFailed());
    });
};

const getTheBusinessGlossaryInfoById = (store, payload) => {
  return businessGlossaryService
    .getTheBusinessGlossaryInfoById(payload)
    .then((response) => {
      if (response.data && response.data.glossary) {
        store.dispatch(setTheBusinessGlossaryInfoById(response.data.glossary));
      } else {
        store.dispatch(setTheBusinessGlossaryInfoById({}));
      }
    })
    .catch((error) => {
      store.dispatch(fetchBusinessGlossaryInfoByIdFailed());
    });
};

export default (store) => (next) => (action) => {
  next(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.LOAD_BUSINESS_GLOSSARY_INFO:
      fetchBusinessGlossaryDetails(store, action.payload);
      break;
    case ActionTypes.LOAD_BUSINESS_GLOSSARY_INFO_BY_SEARCH_KEYWORD:
      fetchBusinessGlossaryDetailsBySearchKeyWord(store, action.payload);
      break;
    case ActionTypes.GET_BUSINESS_GLOSSARY_INFO_BY_ID:
      getTheBusinessGlossaryInfoById(store, action.payload);
      break;
  }
};
