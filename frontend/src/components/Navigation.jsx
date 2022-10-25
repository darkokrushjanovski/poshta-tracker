import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navigation() {
  const navigate = useNavigate();

  const [user, setUser] = useState();

 
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [user]);

  const onClick = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Poshta Tracker</Navbar.Brand>
        <Nav className="mr-auto">
          {user && (
            <Button variant="secondary" onClick={onClick}>
              Log out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
