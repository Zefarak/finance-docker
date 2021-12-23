export const BACK_END_URL = '127.0.0.1:8000';
export const BASE_URL = 'http://127.0.0.1:8000/api/';
export const LOGIN_ENDPOINT = BASE_URL + 'token/';
export const REFRESH_TOKEN_ENDPOINT = BASE_URL + 'token/refresh/';
export const CURRENT_USER_ENDPOINT = BASE_URL + 'accounts/current-user/';


export const TICKER_LIST_ENDPOINT  = BASE_URL  + 'tickers/ticker/list/';
export const TICKER_UPDATE_ENDPOINT = BASE_URL + 'tickers/ticker/update/';
export const TICKER_ANALYSIS_ENDPOINT = BASE_URL + 'tickers/portfolio/ticker/analysis/';


export const PORTFOLIO_ENDPOINT = BASE_URL + 'tickers/portfolio/list/';
export const PORTFOLIO_DETAIL_ENDPOINT = BASE_URL + 'tickers/portfolio/update-delete/';
export const USER_ITEMS_ENDPOINT = BASE_URL + 'tickers/portfolio/user-ticker/';
export const USER_ITEM_DETAIL_ENDPOINT = BASE_URL + 'tickers/portfolio/user-ticker/detail/';

export const GROUP_LIST_ENDPOINT = BASE_URL + 'tickers/group/list-create/';

export const PORTFOLIO_TOTAL_DATA_BY_USER_ENDPOINT = BASE_URL + 'tickers/portfolio-total-data-by-user/';
export const PORTFOLIO_REFRESH_DATA_ENDPOINT = BASE_URL + 'tickers/portfolio-refresh-data/';