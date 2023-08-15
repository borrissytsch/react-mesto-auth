import React from 'react';
import { Navigate } from "react-router-dom";
import {authRoutes} from '../../utils/constants';
const signin = {authRoutes};

export default function ProtectedRoute ({element: ProtectedComponent, protectFlag, unprotectRoute=signin, ...props}) {
  return (
    protectFlag ? <ProtectedComponent {...props} /> : <Navigate to={unprotectRoute} replace/>
  );
}