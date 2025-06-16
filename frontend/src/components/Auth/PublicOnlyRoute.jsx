import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicOnlyRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // If user is logged in, redirect to home page
    if (userInfo) {
        return <Navigate to="/" replace />;
    }

    // If user is not logged in, render the child routes
    return <Outlet />;
};

export default PublicOnlyRoute; 