// Core
import React, { useEffect, useState, useContext } from "react";
// Firebase
import { auth } from "@config/firebase";
import {onAuthStateChanged } from "@firebase/auth";
// Types
import {User} from "@firebase/auth"


const AuthContext =
  React.createContext<User | null>(null);

interface Props {
  children: React.ReactNode;
}

/**
 * Provides the user auth object
 * @param children
 * @constructor React.FC
 */
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {

    return onAuthStateChanged(auth, (firebaseUser ) => {
      setUser(firebaseUser);
    });

  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to get the auth object
 * @return User | null
 */
const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}

export { AuthProvider, useFirebaseAuth };
