import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
// a hook to access the navigation code
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({route, method}){
    // the route we want to go to, and method is for choosing login/signup

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login": "Register" // huh, the === !!

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(); // prevent us from reloading page after submitting the form 
        
        try{ 
            const res = await api.post(route, {username, password})
            if (method == "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/") // does this need ; or technically not? explain !!
            } else{
                navigate("/login")
            }

        } catch(error){
            alert(error)
        } finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className = "form-input"
            type = "text"
            value = {username}
            onChange={(e)=> setUsername(e.target.value)} // take in var e, and what ever we typed, will 
            // adjust + set that in the state, so we can access it (username) when we submit the form
            // Q: why couldn't we just access it "normally"? Why do we need state? !!
            placeholder="Username"
        />
        <input
            className = "form-input"
            type = "password"
            value = {password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password"
        /> 
        <button className="form-button" type="submit">
            {name}
        </button> 
    </form>
    
}