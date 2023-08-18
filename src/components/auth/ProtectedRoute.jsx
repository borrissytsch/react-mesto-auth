import React, {useContext} from 'react';
import { Navigate } from "react-router-dom";
import {LoggedInContext} from '../../contexts/LoggedInContext.js';
import {authRoutes} from '../../utils/constants';
const signin = {authRoutes};

export default function ProtectedRoute ({element: ProtectedComponent, unprotectRoute=signin, ...props}) {
  const loggedIn = useContext(LoggedInContext);
  return (
    loggedIn ? <ProtectedComponent {...props} /> : <Navigate to={unprotectRoute} replace/>
  );
}