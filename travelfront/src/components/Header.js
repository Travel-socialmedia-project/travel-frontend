import { Link } from "react-router-dom";
import { Auth } from "../components/auth";
import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>
function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(Auth);

  return (
    <div>
      <hr />
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/albums">
                  Albums
                </Nav.Link>
                <NavDropdown title={user && user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={`/my-albums`}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logOutUser}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;