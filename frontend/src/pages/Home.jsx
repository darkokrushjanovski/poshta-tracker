import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/users";

    axios
      .post(url, formData)
      .then(function (response) {
        toast.success("Registered");
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
        <Card.Text>Login</Card.Text>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label className="d-flex">Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={onChange}
              name="username"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="d-flex">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              name="password"
              required
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Home;
