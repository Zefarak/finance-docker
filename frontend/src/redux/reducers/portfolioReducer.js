import { 
    FETCH_PORTFOLIOS,
    FETCH_USER_PORTFOLIOS, 
    FETCH_TOTAL_USER_DATA, 
    FETCH_USER_SELECTED_PORTFOLIO, 
    FETCH_PORTFOLIO_SELECTED_ITEMS,
    CLEAR_USER_SELECTED_PORTFOLIO
} from '../actionTypes';

const initialState = {
    userPortfolios: {},
    portfolios: {
        count: 0,
        result: [],
        next: null,
        previous: null
    },
    portfolio: null,
    user_items: {},
    total_portofolio_user_data: {
    selectedPortfolio:{
        portfolio:null,
        items: []
    }
    }
}

export default function portfolioReducer(state=initialState, action){
    switch(action.type){
        case FETCH_PORTFOLIOS:
            return {
                ...state,
                portfolios: {
                    result: action.payload
                }
            }
        case FETCH_USER_PORTFOLIOS:
            return {
                ...state,
                userPortfolios: action.payload
            }
        case FETCH_TOTAL_USER_DATA:
            return {
                ...state,
                total_portofolio_user_data: action.payload
            }
        case FETCH_USER_SELECTED_PORTFOLIO:
            return {
                ...state,
                portfolio: action.payload
            }
        case CLEAR_USER_SELECTED_PORTFOLIO:
            return {
                ...state,
                portfolio: null
            }
        case FETCH_PORTFOLIO_SELECTED_ITEMS:
            return {
                ...state,
                user_items: action.payload
            }
        default:
            return state
    }
}