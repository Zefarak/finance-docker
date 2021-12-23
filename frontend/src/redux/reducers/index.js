import { combineReducers } from "redux";
import authReducer from './authReducers';
import tickerReducer from './tickerReducer';
import portfolioReducer from "./portfolioReducer";

export default combineReducers({
    authReducer,
    portfolioReducer,
    tickerReducer
})