import { ActionTypes, ActionMethods } from "store/actions/";
import { searchTermService } from "services";

const {
  setSearchData,
  setServiceDeskSearchData,
  successServiceDeskData,
  errorServiceDeskData,
} = ActionMethods;

const fetchSearchResultsFromTables = (store, payload) => {
  return searchTermService
    .getListFromTables(payload)
    .then((response) => {
      if (response.data) {
        let oldData = response.data;
        oldData =
          oldData.length > 0
            ? oldData.map((eachOption) => {
                return {
                  id: eachOption.oetableid,
                  text: `${eachOption.servertype} ${eachOption.schemaNameNP} ${eachOption.tableNameUpper}`,
                  description: eachOption.description,
                  type: "table",
                  link: `#nav/table?id=${eachOption.oetableid}`,
                  objectType: "oetable",
                  name: `${eachOption.connectionNameNP}.${eachOption.schemaNameNP}.${eachOption.tableNameUpper}`,
                  redirectLink: "search",
                };
              })
            : [];
        store.dispatch(
          payload.isSeparate
            ? setServiceDeskSearchData(oldData)
            : setSearchData({ data: oldData, key: "tableEndOfSearch" })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearchResultsFromFiles = (store, payload) => {
  return searchTermService
    .getListFromFiles(payload)
    .then((response) => {
      if (response.data) {
        let oldData = response.data;
        oldData =
          oldData.length > 0
            ? oldData.map((eachOption) => {
                return {
                  id: eachOption.fileId,
                  text: eachOption.fileNameWithPath,
                  description: eachOption.description,
                  type: "file",
                  link: `#nav/file?id=${eachOption.fileId}`,
                  objectType: "oefile",
                  name: `${eachOption.location}/${eachOption.filename}`,
                  redirectLink: "search",
                  shortName: eachOption.filename,
                };
              })
            : [];
        store.dispatch(
          payload.isSeparate
            ? setServiceDeskSearchData(oldData)
            : setSearchData({ data: oldData, key: "fileEndOfSearch" })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearchResultsFromCharts = (store, payload) => {
  return searchTermService
    .getListFromCharts(payload)
    .then((response) => {
      if (response.data) {
        let oldData = response.data;
        oldData =
          oldData.length > 0
            ? oldData.map((eachOption) => {
                return {
                  id: eachOption.chartID,
                  text: eachOption.chartName,
                  description: eachOption.description,
                  type: "report",
                  link: `#nav/report?id=${eachOption.chartID}`,
                  objectType: "oechart",
                  name: `${eachOption.connectionName}.${eachOption.chartName}`,
                  redirectLink: "search",
                };
              })
            : [];
        store.dispatch(
          payload.isSeparate
            ? setServiceDeskSearchData(oldData)
            : setSearchData({ data: oldData, key: "chartEndOfSearch" })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearchResultsFromStories = (store, payload) => {
  return searchTermService
    .getListFromStory(payload)
    .then((response) => {
      if (response.data) {
        let oldData = response.data;
        oldData =
          oldData.length > 0
            ? oldData.map((eachOption) => {
                return {
                  name: eachOption.domain,
                  description: eachOption.name,
                  objectType: "story",
                  type: "story",
                  link: `#nav/story?id=${eachOption.id}`,
                  redirectLink: "search",
                };
              })
            : [];
        store.dispatch(
          payload.isSeparate
            ? setServiceDeskSearchData(oldData)
            : setSearchData({ data: oldData, key: "storyEndOfSearch" })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearchResultsFromColumns = (store, payload) => {
  return searchTermService
    .getListFromColumns(payload)
    .then((response) => {
      if (response.data) {
        let oldData = response.data;
        oldData =
          oldData.length > 0
            ? oldData.map((eachOption) => {
                return {
                  id: eachOption.oecolumnid,
                  text: eachOption.tablename + " " + eachOption.columnname,
                  description: eachOption.columndescription,
                  type: "tableColumn",
                  objectType: "oecolumn",
                  name: `${eachOption.tablename}.${eachOption.columnname}`,
                  link: `#nav/table?id=${eachOption.oetableid}&columnid=${eachOption.oecolumnid}`,
                  redirectLink: "search",
                };
              })
            : [];
        store.dispatch(
          payload.isSeparate
            ? setServiceDeskSearchData(oldData)
            : setSearchData({ data: oldData, key: "columnEndOfSearch" })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearchResultsFromBusinessGlossary = (store, payload) => {
  return searchTermService
    .getListFromBusinessGlossary(payload)
    .then((response) => {
      if (response.data?.response?.terms) {
        let oldData = response.data.response.terms;
        oldData = oldData.map((eachOption) => {
          return {
            id: eachOption.businessGlossaryId,
            name: eachOption.domain + " " + eachOption.name,
            text: eachOption.domain + " " + eachOption.name,
            description: eachOption.domain + " " + eachOption.name,
            type: "BSG",
            objectType: "glossary",
            objectName: `${eachOption.name}`,
            link: `#nav/glossary?id=${eachOption.businessGlossaryId}&searchTab=summary`,
            redirectLink: "business-glossary",
          };
        });
        store.dispatch(
          payload.isSeparate
            ? setServiceDeskSearchData(oldData)
            : setSearchData({ data: oldData, key: "termEndOfSearch" })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const saveServiceDeskData = (store, payload) => {
  return searchTermService
    .saveServiceDeskData(payload)
    .then((response) => {
      if (response.data) {
        store.dispatch(successServiceDeskData());
      }
    })
    .catch(() => {
      store.dispatch(errorServiceDeskData());
    });
};

export default (store) => (next) => (action) => {
  next(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.GET_SEARCH_DATA:
      fetchSearchResultsFromTables(store, action.payload);
      fetchSearchResultsFromFiles(store, action.payload);
      fetchSearchResultsFromCharts(store, action.payload);
      fetchSearchResultsFromStories(store, action.payload);
      fetchSearchResultsFromColumns(store, action.payload);
      break;
    case ActionTypes.GET_SEARCH_DATA_TABLES:
      fetchSearchResultsFromTables(
        store,
        Object.assign(action.payload, { isSeparate: true })
      );
      break;
    case ActionTypes.GET_SEARCH_DATA_FILES:
      fetchSearchResultsFromFiles(
        store,
        Object.assign(action.payload, { isSeparate: true })
      );
      break;
    case ActionTypes.GET_SEARCH_DATA_CHARTS:
      fetchSearchResultsFromCharts(
        store,
        Object.assign(action.payload, { isSeparate: true })
      );
      break;
    case ActionTypes.GET_SEARCH_DATA_STORIES:
      fetchSearchResultsFromStories(
        store,
        Object.assign(action.payload, { isSeparate: true })
      );
      break;
    case ActionTypes.GET_SEARCH_DATA_COLUMNS:
      fetchSearchResultsFromColumns(
        store,
        Object.assign(action.payload, { isSeparate: true })
      );
      break;
    case ActionTypes.GET_SEARCH_DATA_BUSINESS_GLOSSARY:
      fetchSearchResultsFromBusinessGlossary(
        store,
        Object.assign(action.payload, { isSeparate: true })
      );
      break;
    case ActionTypes.SAVE_SERVICE_DESK_DATA:
      saveServiceDeskData(store, action.payload);
      break;
  }
};
