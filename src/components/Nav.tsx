import React from 'react';
import { FiHome } from 'react-icons/fi';

const Nav: React.FC = () => (
  <nav className="nav">
    <div className="wrapper">
      <a className="nav__item" href="/">
        <FiHome />
        Books-R-Us
      </a>
    </div>
  </nav>
);

export default Nav;
