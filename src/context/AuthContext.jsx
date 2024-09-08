import {createContext, useEffect, useState, useContext} from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { app } from "../firebase/config.js";

export const AuthContext = createContext({});

// children are the components that are wrapped by the provider
export const AuthProvider = ({ children }) => { 
    const [userData, setUserData] = useState(null);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    provider.addScope("email");

    useEffect(() => {
        const storedIdToken = localStorage.getItem('idToken');
        const storedAccessToken = localStorage.getItem('accessToken');  

        if (storedIdToken && storedAccessToken) {
            const credential = GoogleAuthProvider.credential(storedIdToken, storedAccessToken);
            signInWithCredential(auth, credential).then(result => {
                setUserData(result.user);
            }).catch(error => {
                setUserData(null);
                console.log("Token is expired:", error);
            });
        }
    }, []);

    const login = () => {
        if (userData == null) {
            signInWithPopup(auth, provider).then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                localStorage.setItem('idToken', credential.idToken);
                localStorage.setItem("accessToken", credential.accessToken)
                setUserData(result.user);
            })
            .catch(error => {
                console.log("Error signing in with popup:", error);
            })
        }
    }

    const logout = () => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('accessToken');
        setUserData(null);
        console.log("Logging out here");
      }

    return <AuthContext.Provider value={ {userData, login, logout} }>
        {children}
    </AuthContext.Provider>
} 