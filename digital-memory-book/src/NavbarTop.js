import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import "./Interactable.css";

function NavbarTop() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleClick2 = () => {
    navigate("/Login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Digital Memory Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" onClick={handleClick}>
              Home
            </Nav.Link>
            <NavDropdown title="Resources">
              <NavDropdown.Item href="/ourmission">
                Our Mission
              </NavDropdown.Item>
              <NavDropdown.Item href="/meetus">
                Meet the Creators
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contactus">Contact</Nav.Link>
            <Button onClick={handleClick2}>Get Started</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
