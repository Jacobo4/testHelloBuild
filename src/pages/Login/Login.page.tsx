// Core
import React, {useEffect} from "react";
// Styles
import styles from './Login.module.css';
// Router
import {useNavigate} from "react-router-dom";
// Toast
import {toast} from 'react-toastify';
// Firebase
import {auth, githubAuthProvider} from "@config/firebase.ts";
import {signInWithPopup} from "firebase/auth";
// Icons
import {FaGithub} from "react-icons/fa";
// Images
import logo from "@assets/images/logo.png";
import {useFirebaseAuth} from "@context/AuthContext.tsx";

import {motion} from "framer-motion";


const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const user = useFirebaseAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);


    const signInWithGithub = async () => {
        try {
            const userCredential = await signInWithPopup(auth, githubAuthProvider);
            if (!userCredential) throw new Error("Could not complete signup");
            // toast.success('Signed in successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Error signing in');
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0  }}
            animate={{ opacity: 1, transition: { duration: 1 }}}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div className={styles['Login']}>
                <div className={styles['decor']}>
                    <figure className={styles["logo"]}>
                        <img src={logo} alt="Hello build's logo"/>
                    </figure>
                    <span>@hellobuild</span>
                </div>
                <div className={styles['form']}>
                    <h1>Login</h1>
                    <div>
                        <button className={'btn btn-primary bg-[#22272E]'} onClick={signInWithGithub}>
                            <FaGithub/>
                            <span>Sign in with Github</span>
                        </button>
                    </div>

                    <div className={'grid place-items-center w-full relative'}>
                        <span className={'z-10 text-xl bg-white px-2'}>or</span>
                        <hr className={'w-full absolute'}/>
                    </div>

                    <form>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input id={'username'} type="text"/>
                        </div>
                        <div>
                            <label htmlFor="password">Username</label>
                            <input id={'password'} type="password"/>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>

    )
}

export default LoginPage;
