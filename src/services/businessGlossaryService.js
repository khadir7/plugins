import axios from "axios";

export const getBusinessGlossaryData = (searchTerm) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}businessglossary/businessGlossaryData?term=${searchTerm}&startindex=0&limit=5`
  );
export const getBusinessTerms = (globalDomainId) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}businessglossary/term/search?term=&glossaryId=0&published=true&all=true&globalDomainId=${globalDomainId}`
  );
export const getAllTheBusinessTermsBySearchWord = (params) => {
  params.searchType = "glossary";
  params.searchCriteria = "like";
  // return axios.get(
  //   `${JSON.parse(
  //     localStorage.getItem("domainUrl")
  //   )}search/searchExploreAll`,
  //   { params }
  // );
  return axios.get(
    `https://api.urbandictionary.com/v0/define?term=${params.searchTerm}`
  );
};
export const insertBusinessGlossary = (parms) =>
  axios.post(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}businessglossary/insertBusinessGlossaryData`,
    parms
  );
export const getTheBusinessGlossaryInfoById = (glossaryId) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}businessglossary/glossary/summary?id=${glossaryId}`
  );

export default {
  getBusinessGlossaryData,
  insertBusinessGlossary,
  getAllTheBusinessTermsBySearchWord,
  getBusinessTerms,
  getTheBusinessGlossaryInfoById,
};
