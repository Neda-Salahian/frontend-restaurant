// Header.js
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoImage from "../../../public/assets/images/logo-header-1.png";

// Import CSS
import "../Header/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Navbar expand="lg" className=" back-header"  expanded={expanded}>
        <Container fluid>
          <div className="logo-container">
            <Link to="/">
              <img src={logoImage} alt="Logo" className="logo-img" />
            </Link>
          </div>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link  as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link  as={Link} to="/Menu">
                Menu
              </Nav.Link>
              <Nav.Link  as={Link} to="/Aboutus">
                About Us
              </Nav.Link>
              <Nav.Link  as={Link} to="/Contactus">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
