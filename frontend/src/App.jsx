import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import NavBar from './components/navbar/NavBar';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';

const App = () => {
  return (
   <>
   <Router>
        <NavBar />
         <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/register" element={<RegisterForm />} />
         </Routes>
     </Router></>
  );
};

export default App;
