import React, {useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import App from './App';
import {Login} from './auth/Login';
import {Register} from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import {authRoutes} from '../utils/constants';

export default function Routh() {
  const {signin, signup, app} = authRoutes;
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to={app} replace /> : <Navigate to={signin} replace />} />
        <Route path="/*" element={!loggedIn && <Navigate to={signin} replace />} />
        <Route path={`/${app}`} element={<ProtectedRoute element={App} protectFlag={loggedIn} />} />
        <Route path={`/${signin}`} element={<Login />} />
        <Route path={`/${signup}`} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// mesto-react-auth
// "name": "mesto-react-auth", ProtectedRoute