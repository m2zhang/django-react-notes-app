 import axios from "axios"
 import { ACCESS_TOKEN } from "./constants"

 const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    
 })

 /*
  * Creating an Axios interceptor such that we intercept any routes, and if the user is authenticated, we'll pass along the token
 (so that they can actually access, say the notes page!)
 */