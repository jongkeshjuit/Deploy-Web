import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!userInfo) {
        // Save the path user was trying to access
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute; 