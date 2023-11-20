import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='footer '>
      <div className='footer-content'>
        <div className='top-section'>
          <div className='location'>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>calicut, kerala, india</p>
            <p>Phone: 1234565434</p>
            <p>Email: tvsmotors@gmail.com</p>
          </div>
          <div className='social-icons'>
            <a href='#'>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <p className='bike'>&copy; 2023 Bike Showroom. All rights are reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
