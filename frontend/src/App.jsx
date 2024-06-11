import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// BREHHH it was Navigate, not Navigation, which didn't allow the stuff to properly load OBVII
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"


function Logout(){
  localStorage.clear() // clears access and refresh tokens
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear() // get rid of any old access tokens
  return <Register/>
}

function App() {
// navigation between pages using react router dom
// cannot access Home component unless you have your access token
// we're wrapping the component we want to protect with 
// * is for any other path
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
          <ProtectedRoute> 
            <Home /> 
          </ProtectedRoute>
          }
        />
        <Route
          path="/login" element={<Login/>}
        />
        <Route
          path="/register" element={<RegisterAndLogout/>}
        />
        <Route
          path="*" element={<NotFound/>}
        />

      </Routes>
    </BrowserRouter>
    
  )
}

export default App
