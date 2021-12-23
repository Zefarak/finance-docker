import axios from 'axios';
import {BASE_URL, REFRESH_TOKEN_ENDPOINT} from '../helpers/endpoints';



const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 55000,
    headers: {
        'Authorization': localStorage.getItem('accessToken') ? "Bearer " + localStorage.getItem('accessToken'): null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    error=>{
        const originalRequest = error.config;

        if (!error.response){
            return Promise.reject({message: 'The app has failed you'})
        }

         // Prevent infinite loops early
         if (error.response.status === 401 && originalRequest.url === REFRESH_TOKEN_ENDPOINT) {
            window.location.href = '/login/';
            return Promise.reject({message: '401 Exception'});
        }
        if (error.response.data.code === "token_not_valid" &&
        error.response.status === 401 && 
        error.response.statusText === "Unauthorized") 
        {
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('here!!', refreshToken);
            if (typeof refreshToken == 'undefined'){
                console.log('unde');
                
                return Promise.reject({message: 'logout'})
            }

            if (refreshToken){
                console.log('continue');
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosInstance
                    .post('/token/refresh/', {refresh: refreshToken})
                    .then((response) => {
        
                        localStorage.setItem('accessToken', response.data.access);
                        axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                        
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }else{
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    localStorage.removeItem('isAuthenticated')
                    window.location.href = '/login/';
                }
            }else{
                console.log("Refresh token not available.")
                localStorage.removeItem('isAuthenticated')
                window.location.href = '/login/';
            }
    }
  
 
  // specific error handling done elsewhere
  return Promise.reject(error);
}
);

export default axiosInstance;