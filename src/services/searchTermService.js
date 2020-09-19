import axios from "axios";

export const getListFromTables = (payload) => {
  let urlString = "";
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "isSeparate") {
      if (urlString) {
        urlString = urlString + "&" + key + "=" + value;
      } else {
        urlString = key + "=" + value;
      }
    }
  });
  return axios.get(
    `${JSON.parse(localStorage.getItem("domainUrl"))}search/tables?${urlString}`
  );
};

export const getListFromFiles = (payload) => {
  let urlString = "";
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "isSeparate") {
      if (urlString) {
        urlString = urlString + "&" + key + "=" + value;
      } else {
        urlString = key + "=" + value;
      }
    }
  });
  return axios.get(
    `${JSON.parse(localStorage.getItem("domainUrl"))}search/files?${urlString}`
  );
};

export const getListFromCharts = (payload) => {
  let urlString = "";
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "isSeparate") {
      if (urlString) {
        urlString = urlString + "&" + key + "=" + value;
      } else {
        urlString = key + "=" + value;
      }
    }
  });
  return axios.get(
    `${JSON.parse(localStorage.getItem("domainUrl"))}search/charts?${urlString}`
  );
};

export const getListFromStory = (payload) => {
  let urlString = "";
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "isSeparate") {
      if (urlString) {
        urlString = urlString + "&" + key + "=" + value;
      } else {
        urlString = key + "=" + value;
      }
    }
  });
  return axios.get(
    `${JSON.parse(localStorage.getItem("domainUrl"))}search/story?${urlString}`
  );
};

export const getListFromColumns = (payload) => {
  let urlString = "";
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "isSeparate") {
      if (urlString) {
        urlString = urlString + "&" + key + "=" + value;
      } else {
        urlString = key + "=" + value;
      }
    }
  });
  return axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}search/columns?${urlString}`
  );
};

export const getListFromBusinessGlossary = (payload) => {
  let urlString = "";
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== "isSeparate") {
      if (urlString) {
        urlString = urlString + "&" + key + "=" + value;
      } else {
        urlString = key + "=" + value;
      }
    }
  });
  return axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}businessglossary/term/search/?${urlString}`
  );
};

export const saveServiceDeskData = (payload) => {
  return axios.post(
    `${JSON.parse(localStorage.getItem("domainUrl"))}ticket/add`,
    payload
  );
};

export default {
  getListFromTables,
  getListFromFiles,
  getListFromCharts,
  getListFromStory,
  getListFromColumns,
  saveServiceDeskData,
  getListFromBusinessGlossary,
};
