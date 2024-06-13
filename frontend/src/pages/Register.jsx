import Form from "../components/Form";

function Register(){
    return <Form route="/api/user/register/" method="register" /> 
    // the slash after register is absolutely crucial
}
    
    export default Register