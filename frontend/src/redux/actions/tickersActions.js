
import axiosInstance from "../../helpers/axiosInstance";
import {
    GROUP_LIST_ENDPOINT,
    PORTFOLIO_ENDPOINT,
    TICKER_LIST_ENDPOINT,
    TICKER_UPDATE_ENDPOINT
} from "../../helpers/endpoints";
import {FETCH_TICKERS, FETCH_PORTFOLIOS, FETCH_TICKER, FETCH_GROUP} from "../actionTypes";


export const fetchTickers = (endpoint=TICKER_LIST_ENDPOINT) => dispatch => {
    axiosInstance.get(endpoint)
        .then(
            respData=> {
                const tickers = {
                    count: respData.data.count,
                    next: respData.data.next,
                    previous: respData.data.previous,
                    results: respData.data.results
                };
                return dispatch({
                    type: FETCH_TICKERS,
                    payload: tickers
                })
            }
            )
}


export const fetchTicker = (endpoint) => dispatch =>{
    axiosInstance.get(endpoint)
        .then(
            respData=> {
                return dispatch({
                    type: FETCH_TICKER,
                    payload: respData.data
                }
                    
                )
            }
        )
};

export const fetchGroup = () => dispatch => {
    axiosInstance.get(GROUP_LIST_ENDPOINT)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_GROUP,
                    payload: respData.data
                })
            }
        )
}

export const UPDATE_TICKER = data => dispatch => {

    const endpoint =  TICKER_UPDATE_ENDPOINT + `{data.id}/`; 
    axiosInstance.put(endpoint, data)
        .then(
            respData=>{
                
            }
        )
};


export const fetchPortfolios = data => dispatch =>{
    const endpoint = PORTFOLIO_ENDPOINT;
    axiosInstance.get(endpoint)
        .then(respData=>{
            console.log('fetch action', respData.data)
            return dispatch({
                type: FETCH_PORTFOLIOS,
                payload: respData.data
            }
                
            )
        })
};


