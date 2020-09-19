import axios from "axios";

export const getWikiForTable = (params) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}wikicontroller/getWikiByTableObject`,
    { params }
  );

export const getWikiForTableColumn = (params) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}wikicontroller/getWikiByTableColumnObject`,
    { params }
  );

export default {
  getWikiForTable,
  getWikiForTableColumn,
};
