import userActions from './userActions';
import businessGlossaryActions from './businessGlossaryActions'
import suggestTermActions from './suggestTermAction'
import detailActions from './detailAction'
import searchTermAction from './searchTermAction'
import favouriteAction from './favouriteAction'
import commonActions from './commonActions'

let ActionsArray =  [
  userActions,
  businessGlossaryActions,
  suggestTermActions,
  detailActions,
  searchTermAction,
  favouriteAction,
  commonActions
];

let ActionTypes  = {} ;
let ActionMethods = {};

ActionsArray.forEach( actionsClass => {
  const  { Actions, ...actionMethodList } =  actionsClass;
  ActionTypes =  { ...Actions, ...ActionTypes };
  ActionMethods =  { ...actionMethodList, ...ActionMethods };
});

export {
  ActionTypes,
  ActionMethods
};
