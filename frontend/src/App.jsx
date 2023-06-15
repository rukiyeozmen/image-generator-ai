import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import NavBar from './components/navbar/NavBar';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';

const App = () => {
  const [userName, setUserName] = useState('');

  const handleLogout = () => {
    setUserName('');
  };

  return (
    <>
      <Router>
        <NavBar isAuthenticated={userName !== ''} handleLogout={handleLogout} userName={userName} />
        <Routes>
          <Route path="/" element={<Main userName={userName} />} />
          <Route path="/login" element={<LoginForm onLogin={setUserName} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
