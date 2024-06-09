 import axios from "axios"
 import { ACCESS_TOKEN } from "./constants"

 const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
 })

 /*
  * Creating an Axios interceptor such that we intercept any routes, and if the user is authenticated, we'll pass along the token
 (so that they can actually access, say the notes page!) in the header
 */

 api.interceptors.request.use(
    (config) => {
        // Look in local storage for any access token. If do, we'll add it as an authorization header to the request
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}` // This is how you pass a JWT Axios token, using Authorization = ... etc. 
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
 )

 export default api // now we can api object instead of axios by default to send all the diff requests (so that the access token is automatically added)