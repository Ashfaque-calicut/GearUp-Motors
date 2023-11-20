import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const role = sessionStorage.getItem('role');


  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  return (
    <header className='header'>
      <div className='logo'>
      <span style={{color:'blue'}}> GearUp</span>  <span style={{ color: 'red' }}>Motors</span>
       
      </div>
      <nav className='nav'>
        <ul>
          <li>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
          {token && (
            <li>
              <Link to='/Bike' className='nav-link'>
                Bikes
              </Link>
            </li>
          )}
          {role==2 && (
            <li>
              <Link to='/Booking' className='nav-link'>
                Booking
              </Link>
            </li>
          )}
          {
            role==2 &&(
              <li>
                <Link to='/user-booking' className='nav-link'>
                  BookingDetails
                </Link>
              </li>
            )
          }
          {role == 1 && (
            <li>
              <Link to='/bookingDetails' className='nav-link'>
                BookingDetails
              </Link>
            </li>
          )}
          <li>
            <Link to='/About' className='nav-link'>
              About Us
            </Link>
          </li>
          <li>
            <Link to='/contact' className='nav-link'>
              Contact
            </Link>
          </li>
          {token &&(
            <li>
              <Link to='/profile' className='nav-link'>
              Profile
              </Link> 
            </li>
          )}
          {token ? (
            <li>
              <Link to='/Login' className='nav-link' onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to='/Login' className='nav-link'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/Register' className='nav-link'>
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
