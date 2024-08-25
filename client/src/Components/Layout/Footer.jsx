import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer container">
        <h4 className="text-center ">&copy; 2024 E-commerce. All Rights Reserved</h4>
        <p className='text-center '>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Privacy Policy</Link>
        </p>
    </footer>
  );
};

export default Footer;
