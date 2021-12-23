import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST, UPDATE_TOKEN, LOGOUT, CURRENT_USER } from "../actionTypes";


const initialState = {
    accessToken: localStorage.getItem('accessToken', null),
    refreshToken: localStorage.getItem('refreshToken', null),
    isAuthenticated: localStorage.getItem('isAuthenticated', false),
    userID: null,
    username: ''

};


export default function authReducer(state=initialState, action){

    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                username:'',
                userID: ''
            };
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                
            }
        
        case UPDATE_TOKEN:
            localStorage.setITem('accessToken', action.payload);
            return {
                ...state,
                accessToken: action.payload
            };
        case CURRENT_USER:
            console.log('hitted!')
            localStorage.setItem('userID', action.payload.id)
            return{
                ...state,
                username: action.payload.username,
                userID: action.payload.id,
                isAuthenticated: 'true'
            }

        case LOGIN_FAIL:
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');;
                localStorage.setItem('isAuthenticated', false)
                return{
                    ...state,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false
                };
            case LOGOUT:
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('isAuthenticated')
                localStorage.removeItem('userID')
                return{
                    ...state,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    userID: null
                };
    
            default:
                return state
    }
}