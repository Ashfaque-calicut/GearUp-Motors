import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const role = sessionStorage.getItem('role');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className='header'>
      <div className='logo'>
        <span style={{ color: 'blue' }}> GearUp</span> <span style={{ color: 'red' }}>Motors</span>
      </div>
      <div className={`nav-toggle ${menuVisible ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`nav ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to='/' className='nav-link' onClick={toggleMenu}>
              Home
            </Link>
          </li>
          {token && (
            <li>
              <Link to='/Bike' className='nav-link' onClick={toggleMenu}>
                Bikes
              </Link>
            </li>
          )}
          {role == 2 && (
            <li>
              <Link to='/Booking' className='nav-link' onClick={toggleMenu}>
                Booking
              </Link>
            </li>
          )}
          {role == 2 && (
            <li>
              <Link to='/user-booking' className='nav-link' onClick={toggleMenu}>
                BookingDetails
              </Link>
            </li>
          )}
          {role == 1 && (
            <li>
              <Link to='/bookingDetails' className='nav-link' onClick={toggleMenu}>
                BookingDetails
              </Link>
            </li>
          )}
          <li>
            <Link to='/About' className='nav-link' onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to='/contact' className='nav-link' onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          {token && (
            <li>
              <Link to='/profile' className='nav-link' onClick={toggleMenu}>
                Profile
              </Link>
            </li>
          )}
          {token ? (
            <li>
              <Link to='/Login' className='nav-link' onClick={() => { handleLogout(); toggleMenu(); }}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to='/Login' className='nav-link' onClick={toggleMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/Register' className='nav-link' onClick={toggleMenu}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
