import { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";

function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { user, isError, isSuccess, message } = useSelector(
    (store) => store.auth
  );

  const { username, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Reditect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset);
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(register(userData));
    dispatch(reset());
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container
      fluid
      className="bg-secondary min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Card
        bg="primary"
        className="text-center d-flex p-2"
        style={{ width: "30rem" }}
      >
        <Card.Text className="">Register</Card.Text>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label className="d-flex text-white">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={onChange}
              name="username"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label className="d-flex text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              name="password"
              required
            />
          </Form.Group>
          <Link to="/register">
            <Form.Label className="d-flex text-info">
              Don't have an account? Register here!
            </Form.Label>
          </Link>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Home;
