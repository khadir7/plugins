import axios from "axios";

export const getFavouritesData = () =>
  axios.get(
    `${JSON.parse(
      localStorage.getItem("domainUrl")
    )}search/myfavorite?limit=0&isPin=false`
  );

export default {
  getFavouritesData,
};
