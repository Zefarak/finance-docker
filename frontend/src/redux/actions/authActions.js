import axiosInstance from "../../helpers/axiosInstance";
import {CURRENT_USER_ENDPOINT, LOGIN_ENDPOINT} from "../../helpers/endpoints";
import {CURRENT_USER, LOGIN_SUCCESS, LOGOUT} from "../actionTypes";


export const loginAction = data => dispatch => {
    const { access, refresh } = data;
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${access}`;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('isAuthenticated', true)
    return dispatch({
        type:LOGIN_SUCCESS,
        payload: data
    })

};


export const logoutAction = (data) => dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuthenticated');
    return dispatch({
        type: LOGOUT
    })
}


export const fetchUserData = () => dispatch =>{
    axiosInstance.get(CURRENT_USER_ENDPOINT)
        .then(
            respData=>{
                const data = respData.data;
                console.log('user_data', data)
                return dispatch({
                    type: CURRENT_USER,
                    payload: data
                })
            }
        )
};