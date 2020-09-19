import { ActionTypes as actionTypes } from 'store/actions/';

const intialState = {
    ovalEdgeDomains: [],
    // ovalEdgeStewards: [],
    ovalEdgeCategoryOne: [],
    ovalEdgeCategoryOneError: false,
    ovalEdgeDomainsError: false,
    // ovalEdgeStewardError: false
}

const ovalEdgeSuggestTermReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_OVALEDGE_DOMAINS:
            return state;
        case actionTypes.INSERT_BUSINESS_GLOSSARY_DATA:
            return state;
        case actionTypes.SET_OVALEDGE_DOMAINS:
            return {
                ...state,
                ovalEdgeDomains: action.payload,
                ovalEdgeDomainsError: false
            }
        case actionTypes.FETCH_OVALEDGE_DOMAINS_FAILED:
            return {
                ...state,
                ovalEdgeDomains: [],
                ovalEdgeDomainsError: true
            }    
        // case actionTypes.SET_OVALEDGE_STEWARDS:
        //     return {
        //         ...state,
        //         ovalEdgeStewards: action.stewardData,
        //         ovalEdgeStewardError: false
        //     }
        // case actionTypes.FETCH_OVALEDGE_STEWARDS_FAILED:
        //     return {
        //         ...state,
        //         ovalEdgeStewards: [],
        //         ovalEdgeStewardError: true
        //     }    
        case actionTypes.LOAD_OVALEDGE_CATEGORY_ONE:
            return state;
        case actionTypes.SET_OVALEDGE_CATEGORY_ONE:
            return {
                ...state,
                ovalEdgeCategoryOne: action.payload,
                ovalEdgeCategoryOneError: false
            }
        case actionTypes.FETCH_OVALEDGE_CATEGORY_ONE_FAILED:
            return {
                ...state,
                ovalEdgeCategoryOne: [],
                ovalEdgeCategoryOneError: true
            }    
        default:
            return state;    

    }
}

export default ovalEdgeSuggestTermReducer;