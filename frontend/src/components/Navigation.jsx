import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Poshta Tracker</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          {user && (
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Log out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
