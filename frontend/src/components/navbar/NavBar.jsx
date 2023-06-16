import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.scss';

const NavBar = ({ isAuthenticated, handleLogout, userName }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <h1>ImageNius</h1>
      <nav>

        <Link to="/">Home</Link>

        {!isAuthenticated && (
          <>

            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/favorites">Favorites</Link>

          </>
        )}
        {isAuthenticated && (
          <>
            <p>{userName}</p>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
