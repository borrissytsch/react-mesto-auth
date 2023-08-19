import React, {useState, useEffect} from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectApp from './ProtectApp';
import InfoTooltip from './InfoTooltip';
import { mestAuth } from '../utils/Auth';
import {Login} from './auth/Login';
import {Register} from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import {LoggedInContext} from '../contexts/LoggedInContext.js';
import {authRoutes, signPageCaptions} from '../utils/constants';

export default function App() {
  const {signin, signup, app} = authRoutes;
  const {tooltipErrCaption, tooltipOkMsg} = signPageCaptions;
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedMail, setLoggedMail] = useState('');
  const [isToolTipOpen, setToolTipOpen] = useState(false);
  const [isToolTipOk, setToolTipOk] = useState(false);
  
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      mestAuth.checkToken(token).then(result => {
        setLoggedIn(true); setLoggedMail(result.data.email);
      }).catch(err => {console.log(`Route token check err: ${err}`); // alert(`Route token check err: ${err}`)
    }); }
  }, []);
  useEffect(() => {
    if (isToolTipOpen) document.addEventListener('keydown', closeToolTip);
  }, [isToolTipOpen]);

  return (
    <>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to={`/${app}`} replace /> : <Navigate to={`/${signin}`} replace />} />
        <Route path={`/${app}`} element={
          <LoggedInContext.Provider value={loggedMail}>
            <ProtectedRoute element={ProtectApp} startApp={startApp} />
          </LoggedInContext.Provider>
        } />
        <Route path={`/${signin}`} element={
          <LoggedInContext.Provider value={loggedMail}>
            <Login loggedIn={loggedIn} startApp={startApp} handleToolTipOpen={handleToolTipOpen} />
          </LoggedInContext.Provider>
        } />
        <Route path={`/${signup}`} element={<Register handleToolTipOpen={handleToolTipOpen} />} />
        <Route path="/*" element={loggedIn ? <Navigate to={`/${app}`} replace /> : <Navigate to={`/${signin}`} replace />} />
      </Routes>
      <InfoTooltip title={`${isToolTipOk ? tooltipOkMsg : tooltipErrCaption}`}
        isOpen={isToolTipOpen} isOk={isToolTipOk} onClose={closeToolTip} onEscPress={closeToolTip}
      />
    </>
  );

  function startApp(checkTokenRes) {
    if (checkTokenRes) {
    setLoggedIn(true);
    setLoggedMail(checkTokenRes.data.email);
   } else {
    setLoggedIn(false); setLoggedMail('');
   }
  }

  function handleToolTipOpen(isOk = false, isOpen = true) {
    setToolTipOk(isOk);
    setToolTipOpen(isOpen);
   }

  function closeToolTip(evt, forceClose_flag = false) {
    evt.preventDefault();
    if ((evt.target === evt.currentTarget) || evt.key === "Escape" || forceClose_flag) {
      document.removeEventListener('keydown', closeToolTip);
      setToolTipOpen(false);
    }
  }
}