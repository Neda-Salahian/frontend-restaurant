// Header.js
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoImage from "../../assets/images/logo-header-1.png";

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
              <Nav.Link className="nav-link" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="nav-link" href="/menu">
                Menu
              </Nav.Link>
              <Nav.Link className="nav-link" href="/Aboutus">
                About Us
              </Nav.Link>
              <Nav.Link className="nav-link" href="/Contactus">
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
