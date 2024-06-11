// Wrapper for a protected route (means you'll need an authorization token before you can actually access this route)
// Otherwise you need to tell someone to login
import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN  } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    // the callback function is an arrow function that calls the auth function
    // which is executed after the component has rendered.
    useEffect(()=> {
        auth().catch(()=> setIsAuthorized(false)) // the "catch" blockif auth() fails, as indicated by catch()
    }, [])
    // The second argument is an array of dependencies. If this array is empty, the effect runs only once, after the initial render.

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {     
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken, // to get new access token
            });
            if (res.status == 200){ // i.e successful in getting new access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else{
                setIsAuthorized(false)
            }
        }
        catch(error){
            console.log(error);
            setIsAuthorized(false);
        }
    };
    
    const auth = async() => { // for automatically refreshing tokens
        // first see if we have access token, and if it's expired or not (if it is, we'll refresh the token)
        // else, user needs to login again
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token) // gives us access to the value
        const tokenExpiration = decoded.exp
        const now = Date.now()/1000 // in seconds

        if (tokenExpiration < now){
            await refreshToken()
        } else{
            setIsAuthorized(true)
        }
    }

    if (isAuthorized=== null){
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/login" />
    // if? else: 
}

export default ProtectedRoute 