import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormInput } from "../../customHooks/useFormInput";
import { AuthContext } from "../../providers/AuthProvider";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const { handleLogin } = useContext(AuthContext);
  const email = useFormInput("test2@example.com", "Email"); //TODO Remove this
  const password = useFormInput("123456", "Password"); //TODO Remove this

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ email: email.value, password: password.value }, history);
  };
  return (
    <div>
      <h1 className="landing">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus {...email} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...password} />
        </Form.Group>
        <button type="submit">Login</button>
      </Form>
      <br />
      <Link to="/">Back</Link>
    </div>
  );
};

export default Login;
