import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ servicios, servicio }) => {
  return (
    <>
      <header>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
          <a className="titulo" href="/">
            <h1>Safe<span>Pets</span></h1>
          </a>
          </Link>
        </div>

      </header>
    </>
  );
};

export default Header;
