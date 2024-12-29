import React from 'react';
import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <div className="navigation">
      <a href="#page1" className="nav-link">Page 1</a>
      <a href="#page2" className="nav-link">Page 2</a>
      <a href="#page3" className="nav-link">Page 3</a>
    </div>
  );
};

export default Navigation;
