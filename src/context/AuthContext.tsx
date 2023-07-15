// Core
import React from "react";

// Types
import {User} from "@firebase/auth"

// We create a context object that will be used to pass the user object to any component that needs it. In this case the whole application
export const AuthContext = React.createContext<User | null>(null);
