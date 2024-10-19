import React from 'react';
import { AuthContext } from '../Context/AuthContext';

function useAuth () {
    const value = React.useContext(AuthContext);

    if (!value) {
        throw new Error("AuthContext's value is undefined.");
    }
    return {
        user: value.userData,
        loading: value.loading,
        login: value.login,
        logout: value.logout
    };
}

export { useAuth };