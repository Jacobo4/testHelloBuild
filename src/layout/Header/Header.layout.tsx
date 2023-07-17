// Core
import React from "react";
// Firebase
import {auth} from "@config/firebase.ts";
// Router
import {Link} from "react-router-dom";
//Framer motion
import {motion} from "framer-motion";
// Styles
import styles from "./Header.module.css";
// Context
import {useFirebaseAuth} from "@context/AuthContext.tsx";
// Images
import logo from "@assets/images/logo.png";

const navVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        transition: {
            type: 'linear',
        },
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'linear',
            delay: 0.3,
        },
    },
};

const Header: React.FC = () => {

    const user = useFirebaseAuth();

    /**
     * Handles logout
     */
    const logout = async () => {
        try {
            localStorage.removeItem("githubAccessToken");
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className={styles["Header"]}
        >

            <Link to={"/"}>
                <figure className={styles["logo"]}>
                    <img src={logo} width={'100'} height={'41'} alt="Hello build's logo"/>
                </figure>
            </Link>

            {/* This logic should be useless cuz we already control the auth access in the router file */}
            {user
                ? <button className={"btn btn-primary"} onClick={logout}>Log out</button>
                : <Link to={"/login"}>Sign In</Link>
            }

        </motion.nav>
    );
};

export default Header;
