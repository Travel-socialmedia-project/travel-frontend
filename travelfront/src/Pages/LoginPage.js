import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../components/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const { storeToken, authenticateUser } = useContext(Auth);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
    .then((response) => {
      console.log("JWT token", response.data.authToken);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    })
    .catch((error) => {
      const errorDescription = error.response.data;
      console.log(error);
      setErrorMessage(errorDescription);
    });
};

  return (
    <div className="LoginPage">
  <h1>Login</h1>

  <Form onSubmit={handleLoginSubmit}>

    <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" name="email" value={email} onChange={handleEmail} />
    </Form.Group>

    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" name="password" value={password} onChange={handlePassword} />
    </Form.Group>

    <Button variant="primary" type="submit">
      Login
    </Button>
  </Form>

  {errorMessage && <p className="error-message">{errorMessage.message}</p>}

  <p>Don't have an account yet?</p>
  <Link to={"/signup"}>Sign Up</Link>
</div>
  );
}

export default LoginPage;