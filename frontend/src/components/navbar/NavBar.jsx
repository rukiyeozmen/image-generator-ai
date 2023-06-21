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
    <div className='navparent'>
      <div className="navbar">
        <h1 className='font-bar'>imagenius</h1>
        <nav className="nav-links">
          <div className="nav-links-left">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            {isAuthenticated && (
              <>
                <Link to="/favorites">Favorites</Link>
              </>
            )}
          </div>
          {!isAuthenticated && (
            <div className="nav-links-right">

              <Link className="btn btn-outline-secondary" to="/login">Login</Link>
              <Link className="btn btn-outline-secondary" to="/register">Register</Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="nav-links-right">
              <Link to="/"> {userName}</Link>

              <button className="btn btn-outline-secondary" onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
