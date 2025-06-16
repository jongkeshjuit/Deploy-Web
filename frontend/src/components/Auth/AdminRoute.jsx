import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!userInfo) {
        // Save the path user was trying to access
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // Check if user is admin
    if (userInfo.role !== 'admin') {
        // If not admin, redirect to home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute; 