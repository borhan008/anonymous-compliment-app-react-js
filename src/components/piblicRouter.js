import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from './userContext/userContext';

export function PublicRouter(){
    const {currentUser, loading} = UserAuth();
    return(
        loading ? (
            'Loading...'
        ) : (
            currentUser ? (
                <Navigate to="/" />
            ) : (
                <Outlet />
            )
        )
    )
}