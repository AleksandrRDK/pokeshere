import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-link">Encyclopedia</Link>
      <Link to="/evolution" className="nav-link">Evolution</Link>
      <Link to="/comparison" className="nav-link">Comparison</Link>
    </nav>
  );
};

export default Navigation;
