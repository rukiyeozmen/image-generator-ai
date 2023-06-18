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
          <li> 
            <Link to="/explore">Explore</Link> 
            </li>
           
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li>
                <Link to="/">{userName}</Link>
              </li>
              <li>
                <button onClick={handleLogoutClick}>Logout</button>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
