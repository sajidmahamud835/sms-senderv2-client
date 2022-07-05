import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseFirebase from '../../Hooks/UseFirebase';

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isAdminLoading } = UseFirebase();
    const location = useLocation();
    if (isAdminLoading) {
        return <div style={{ display: "flex", justifyContent: 'center' }}><div>
            <CircularProgress /></div></div>;
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;

};

export default AdminRoute;