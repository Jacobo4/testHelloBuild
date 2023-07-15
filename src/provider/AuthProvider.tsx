// Core
import React, { useEffect, useState } from "react";
// Context
import { AuthContext } from "@context/AuthContext";
// Firebase
import { auth } from "@config/firebase";
// Types
import {User} from "@firebase/auth"

interface Props {
  children: React.ReactNode;
}

/**
 * AuthProvider Is a component that wraps the entire application and provides the user auth object to all components
 * @param children
 * @constructor React.FC
 */
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    // We use an unsubscribe function to stop listening for changes when the component unmounts
    const unsubscribe = auth.onAuthStateChanged((firebaseUser ) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
