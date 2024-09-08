import React from 'react';
import { AuthContext } from '../context/AuthContext';

function useAuth() {
    const value  = React.useContext(AuthContext);

    if (!value) {
        throw new Error("AuthContext's value is undefined.");
    }
    return {
        user: value.userData,
        login: value.login,
        logout: value.logout
    };
}

export { useAuth };