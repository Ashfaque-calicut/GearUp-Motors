import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-link">
          <span style={{ color: 'blue' }}> GearUp</span> <span style={{ color: 'red' }}>Motors</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            {token && (
              <Nav.Link as={Link} to="/Bike" className="nav-link">
                Bikes
              </Nav.Link>
            )}
            {role === 2 && (
              <Nav.Link as={Link} to="/Booking" className="nav-link">
                Booking
              </Nav.Link>
            )}
            {role === 2 && (
              <Nav.Link as={Link} to="/user-booking" className="nav-link">
                BookingDetails
              </Nav.Link>
            )}
            {role === 1 && (
              <Nav.Link as={Link} to="/bookingDetails" className="nav-link">
                BookingDetails
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/About" className="nav-link">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">
              Contact
            </Nav.Link>
            {token && (
              <Nav.Link as={Link} to="/profile" className="nav-link">
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {token ? (
              <Nav.Link as={Link} to="/Login" className="nav-link" onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/Login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Register" className="nav-link">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
