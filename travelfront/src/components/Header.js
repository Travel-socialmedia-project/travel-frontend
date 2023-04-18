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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/albums">
                  Albums
                </Nav.Link>
                <NavDropdown title={user && user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={`/user/${user._id}`}
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
  );
}

export default Header;





/*

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

*/









