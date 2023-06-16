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
        <ul className="no-bullets">
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li>
                <p>{userName}</p>
              </li>
              <li>
                <button onClick={handleLogoutClick}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
