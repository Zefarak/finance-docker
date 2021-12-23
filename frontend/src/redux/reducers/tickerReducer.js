import {FETCH_TICKERS, FETCH_PORTFOLIOS, FETCH_TICKER, FETCH_GROUP} from '../actionTypes';

const initialState = {
    tickers: {
        count:0,
        result: [],
        next: null,
        previous: null
    },
    portfolios: {
        count: 0,
        result: [],
        next: null,
        previous: null
    },
    ticker: {

    },
    groups: []
}

export default function tickerReducer(state=initialState, action){
    switch(action.type){
        case FETCH_GROUP:
            const new_groups = action.payload;
            return {
                ...state,
                groups: new_groups
            };
        case FETCH_TICKERS:
            const tickers = action.payload;
            return {
                ...state,
                tickers: tickers
            };

        case FETCH_PORTFOLIOS:
            const portfolios = action.payload;
            return {
                ...state,
                portfolios: portfolios
            }
        case FETCH_TICKER:
            return{
                ...state,
                ticker: action.payload
            }
        default:
            return state
    }
}