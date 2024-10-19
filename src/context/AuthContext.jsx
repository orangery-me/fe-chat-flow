import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/config.js";

export const AuthContext = createContext({});

// children are the components that are wrapped by the provider
export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    provider.addScope("email");


    // This is called when the component is mounted and when the auth state changes
    useEffect(() => {
        // 2 params: 1. the auth object, 2. the callback function when the auth state changes (user logs in or logs out)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user);
                console.log("user", user);
            } else {
                setUserData(null);
            }
            setLoading(false);
        })
        // when the component is unmounted, the unsubscribe function is called
        return () => unsubscribe();
    }, [auth]);


    const login = (callback) => {

        if (userData == null) {

            signInWithPopup(auth, provider)

                .then(result => {
                    setUserData(result.user);
                    if (callback) {
                        callback(result, null);
                    }
                })

                .catch(error => {
                    console.log("error", error);
                    if (callback) {
                        callback(null, error);
                    }
                })
        }
    }

    const logout = () => {
        // automatically remove the user, token from firebase authentication
        auth.signOut();
        console.log("Logging out here");
    }

    return <AuthContext.Provider value={{ userData, loading, login, logout }}>
        {children}
    </AuthContext.Provider>
}