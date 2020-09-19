import userMiddleware from "./userMiddleware";
import businessGlossaryMiddleware from "./businessGlossaryMiddleware";
import suggestTermMiddleware from "./suggestTermMiddleware";
import searchTermMiddleware from "./searchTermMiddleware";
import favouriteMiddleware from "./favouriteMiddleware";
import detailMiddleware from "./detailMiddleware";

export default [
  userMiddleware,
  businessGlossaryMiddleware,
  suggestTermMiddleware,
  searchTermMiddleware,
  favouriteMiddleware,
  detailMiddleware,
];
