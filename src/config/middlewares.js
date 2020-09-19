import { applyMiddleware } from 'redux';

import middlewares from 'store/middlewares/';

let combineMiddlewares =  () => {
  return [
    ...middlewares
  ];
};

export default  () => {
  return applyMiddleware.apply(null, combineMiddlewares());
};
