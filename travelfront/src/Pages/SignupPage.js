import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function SignUpPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit=(e)=>{
    e.preventDefault()
    const requestBody={email, password, name }


    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
     .then((response)=>{
      navigate("/login")
     }).catch((error) => console.log("error getting this Album signup", error))
      // const errorDescription = error.response.data.message;
      // setErrorMessage(errorDescription);
     
  }
    
    return (
      <div>
        <h1>Signup page</h1>
      
      
<form onSubmit={handleSignupSubmit}> 
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
          <button type="submit">SignUp</button>
        </form>
        </div>
    );
  }
  
  export default SignUpPage;
  