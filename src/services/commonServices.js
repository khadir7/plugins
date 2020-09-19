import axios from "axios";

export const getOvalEdgeDomains = () =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}globaldomain/governance/list`
  );
export const getStewardUsers = () =>
  axios.get(`${JSON.parse(localStorage.getItem("domainUrl"))}user/getUserList`);
export const getRuleTypes = (ruleType) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}dataquality/getruletypes?ruleType=${ruleType}`
  );
export const getOvalEdgeCategories = (ovalEdgeDomainId) =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}category/heirarchy/${ovalEdgeDomainId}`
  );

export default {
  getOvalEdgeDomains,
  getStewardUsers,
  getRuleTypes,
  getOvalEdgeCategories,
};
