// Core
import React from "react";
// Router
import {Route, Routes, useLocation} from "react-router-dom";
// Animations
import {AnimatePresence} from "framer-motion";
// Layout
import AppLayout from "@root/layout/App.layout.tsx";
// Components
import RequireAuth from "@root/router/RequireAuth.tsx";
// Pages
import HomePage from "@pages/Home/Home.page.tsx";
import LoginPage from "@pages/Login/Login.page.tsx";
import SignUpPage from "@pages/SignUp/SignUp.page.tsx";

/**
 * Routing component
 * @constructor
 * @return JSX.Element
 * @category Router
 */
export const Routing: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location} key={location.pathname}>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<RequireAuth component={HomePage}/>}/>
                </Route>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="signup" element={<SignUpPage/>}/>
            </Routes>
        </AnimatePresence>
    );
}





