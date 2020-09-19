import { combineReducers } from 'redux';
import reducers from 'store/reducers/';

export default  () => {
  return combineReducers( reducers );
};
