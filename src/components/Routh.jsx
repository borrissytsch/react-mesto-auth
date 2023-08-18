import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import App from './App';
import { mestAuth } from '../utils/Auth';
import {Login} from './auth/Login';
import {Register} from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import {LoggedInContext} from '../contexts/LoggedInContext.js';
import {authRoutes} from '../utils/constants';


export default function Routh() {
  const {signin, signup, app} = authRoutes;
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedMail, setLoggedMail] = useState('');
  
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      mestAuth.checkToken(token).then(result => {
        setLoggedIn(true); setLoggedMail(result.data.email);
      }).catch(err => {console.log(`Route token check err: ${err}`); // alert(`Route token check err: ${err}`)
    }); }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to={`/${app}`} replace /> : <Navigate to={`/${signin}`} replace />} />
        <Route path={`/${app}`} element={
          <LoggedInContext.Provider value={loggedMail}>
            <ProtectedRoute element={App} startApp={startApp} />
          </LoggedInContext.Provider>
        } />
        <Route path={`/${signin}`} element={
          <LoggedInContext.Provider value={loggedMail}>
            <Login loggedIn={loggedIn} startApp={startApp} />
          </LoggedInContext.Provider>
        } />
        <Route path={`/${signup}`} element={<Register />} />
        <Route path="/*" element={loggedIn ? <Navigate to={`/${app}`} replace /> : <Navigate to={`/${signin}`} replace />} />
      </Routes>
    </BrowserRouter>
  );

  function startApp(checkTokenRes) {
    if (checkTokenRes) {
    setLoggedIn(true);
    setLoggedMail(checkTokenRes.data.email);
   } else {
    setLoggedIn(false); setLoggedMail('');
   }
  }
}