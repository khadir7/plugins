import { ActionTypes, ActionMethods } from "store/actions/";
import { favouriteService } from "services";

const { setFavouritesInfo, fetchFavouritesInfoFailed } = ActionMethods;

const fetchFavouriteDetails = (store) => {
  return favouriteService
    .getFavouritesData()
    .then((response) => {
      if (response.data) {
        let data = response.data;
        data = data.map((favorite) => {
          return {
            id: favorite.userfavoriteid,
            name: favorite.favname,
            type: favorite.favobj,
            link: favorite.link,
          };
        });
        store.dispatch(setFavouritesInfo(data));
      }
    })
    .catch((error) => {
      store.dispatch(fetchFavouritesInfoFailed());
    });
};

export default (store) => (next) => (action) => {
  next(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.GET_FAVOUTIES_INFO:
      fetchFavouriteDetails(store);
      break;
  }
};
