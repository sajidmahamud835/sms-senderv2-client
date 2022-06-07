import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseFirebase from '../../Hooks/UseFirebase';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = UseFirebase();
    let location = useLocation();
    if (loading) { return <CircularProgress /> }
    if (user.email) {
        return children;
    }
    else{
        
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;