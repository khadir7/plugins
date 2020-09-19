import ovalEdgeUserReducer from './userReducer';
import ovalEdgeBusinessGlossaryReducer from './businessGlossaryReducer';
import ovalEdgeSuggestTermReducer from './suggestTermReducer';
import ovalEdgeDetailReducer from './detailReducer';
import ovalEdgeSearchTermReducer from './searchTermReducer';
import ovalEdgeFavouriteReducer from './favouriteReducer';
import ovalEdgeCommonReducer from './commonReducer';

export default {
    ovalEdgeUser: ovalEdgeUserReducer,
    ovalEdgeBusinessGlossary: ovalEdgeBusinessGlossaryReducer,
    ovalEdgeSuggestTerm: ovalEdgeSuggestTermReducer,
    ovalEdgeDetail: ovalEdgeDetailReducer,
    ovalEdgeSearchTerm: ovalEdgeSearchTermReducer,
    ovalEdgeFavourite: ovalEdgeFavouriteReducer,
    ovalEdgeCommonReducer: ovalEdgeCommonReducer
};