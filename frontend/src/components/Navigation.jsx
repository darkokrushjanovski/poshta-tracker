import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Poshta Tracker</Navbar.Brand>
        <Nav className="mr-auto">
          <Button variant="secondary">Log out</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
