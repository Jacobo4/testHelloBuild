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
// Images
import logo from "@assets/images/logo.png";
import {useFirebaseAuth} from "@context/AuthContext.tsx";


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
            toast.success('Signed in successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Error signing in');
        }
    }


    return (
        <main className={styles['Login']}>
            <div className={styles['decor']}>
                <figure className={styles["logo"]}>
                    <img src={logo} alt="Hello build's logo"/>
                </figure>
                <span>@hellobuild</span>
            </div>
            <div>
                <h1>Login</h1>
                <div className={styles['github-button']}>
                    <button onClick={signInWithGithub}>
                        <img src="https://img.icons8.com/color/48/000000/github--v1.png" alt=""/>
                        <span>Sign in with Github</span>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default LoginPage;
