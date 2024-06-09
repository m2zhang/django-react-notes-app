// Wrapper for a protected route (means you'll need an authorization token before you can actually access this route)
// Otherwise you need to tell someone to login
import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN  } from "../constants"
import { useState } from "react"

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken = async () => {

    }
    
    const auth = async() => {

    }

    if (isAuthorized=== null){
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/login" />
    // if? else: 
}

export default ProtectedRoute 