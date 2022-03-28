import React, { useContext, useState, useEffect } from 'react';
import {auth} from "../firebase";
import { createUserWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { signInWithEmailAndPassword} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password, name){
        const user = createUserWithEmailAndPassword(auth, email, password).then(()=>{
            return updateProfile(auth.currentUser, {
                displayName: name
            })
        })
        console.log(user);
        
    
    }

    function login(email, password){
       return signInWithEmailAndPassword(auth, email, password)
       
    }

    function logout(){
        signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
            
        })
        return unsubscribe
    }, [])
    

    const value = {
        currentUser, 
        signup,
        login,
         logout
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
