import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import NavBar from './components/navbar/NavBar';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';
import Favorites from './pages/Favorites';

const App = () => {
  return (
   <>
   <Router>
        <NavBar />
         <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/register" element={<RegisterForm />} />
            <Route exact path="/favorites" element={<Favorites userName={userName}/>} />
         </Routes>
     </Router></>
  );
};

export default App;
