import axiosInstance from '../../helpers/axiosInstance';
import { PORTFOLIO_ENDPOINT, PORTFOLIO_TOTAL_DATA_BY_USER_ENDPOINT } from "../../helpers/endpoints";
import { FETCH_PORTFOLIOS, FETCH_USER_PORTFOLIOS, FETCH_TOTAL_USER_DATA, FETCH_USER_SELECTED_PORTFOLIO, FETCH_PORTFOLIO_SELECTED_ITEMS, CLEAR_USER_SELECTED_PORTFOLIO } from "../actionTypes";



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


export const fetchPortofoliosWithEndpoint = endpoint => dispatch=>{
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_PORTFOLIOS,
                    payload: respData.data
                })
            }
        )
}

export const fetchUserPortfolios = endpoint => dispatch => {
    axiosInstance.get(endpoint).then(
        respData=>{
            return dispatch({
                type: FETCH_USER_PORTFOLIOS,
                payload: respData.data
            })
        }
    )
}


export const fetchPortfolioUserData = () => dispatch => {
    axiosInstance.get(PORTFOLIO_TOTAL_DATA_BY_USER_ENDPOINT)
        .then(
            respData=>{
                const data = respData.data;
                return dispatch({
                    type: FETCH_TOTAL_USER_DATA,
                    payload: data
                })
            }
        )
}


export const fetchSelectedPortfolio = endpoint => dispatch => {
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                const data = respData.data;
                return dispatch({
                    type: FETCH_USER_SELECTED_PORTFOLIO,
                    payload: data
                })
            }
        )
}

export const clearSelectedPortfolio = () => dispatch => {
    return dispatch({
        type: CLEAR_USER_SELECTED_PORTFOLIO,
        
    })
}


export const fetchSelectedPortfolioItems = endpoint => dispatch=>{
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                const data = respData.data;
                return dispatch({
                    type: FETCH_PORTFOLIO_SELECTED_ITEMS,
                    payload: data
                })
            }
        )
}