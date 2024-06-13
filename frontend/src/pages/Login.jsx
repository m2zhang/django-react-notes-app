import Form from "../components/Form";

function Login(){
    return <Form route="/api/token/" method="login" /> 
    // Note how the route changes!!    
}
    
    export default Login