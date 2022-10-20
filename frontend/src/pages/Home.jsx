import { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [user]);

  const { username, password } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/users/login";

    axios
      .post(url, formData)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Logged in");
        navigate("/packages");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (!user) {
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
          <Card.Text className="">Login</Card.Text>
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
  } else {
    navigate("/packages");
  }
}

export default Home;
