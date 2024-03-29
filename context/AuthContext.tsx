import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect  } from "firebase/auth";
import { auth } from "@/firebase";

//create context
const AuthContext = createContext();
//provider context
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    //google signin
    const signinGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    const value = {
        currentUser,
        setCurrentUser,
        signinGoogle
    }

    //set current user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
        })
        return unsubscribe;
    }, []);

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}

export const UserAuthentication = () => {
    return useContext(AuthContext);
}