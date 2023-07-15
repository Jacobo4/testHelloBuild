// Core
import React from "react";
// Styles
import styles from './Login.module.css';
// Router
import {Link, useNavigate} from "react-router-dom";
// React Hook Form
import {useForm} from "react-hook-form";
// Toast
import {toast} from 'react-toastify';
// Firebase
import {auth, githubAuthProvider} from "@config/firebase.ts";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
// Types
import {SubmitHandler} from "react-hook-form";

type LoginInputs = {
    email: string
    password: string
}
const LoginPage: React.FC = () => {

    const {register, handleSubmit, formState: {errors},} = useForm<LoginInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success('Signed in successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Error signing in');
        }
    }

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
            <h1>Login</h1>
            <div className={styles['github-button']}>
                <button onClick={signInWithGithub}>
                    <img src="https://img.icons8.com/color/48/000000/github--v1.png" alt=""/>
                    <span>Sign in with Github</span>
                </button>
            </div>
            <div className={styles['divisor']}>
                <hr/>
                <span>or</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type={'email'}{...register("email", {required: true})} />
                    {errors.email && <span>You must provide a valid email</span>}
                </div>
                <div>
                    <label htmlFor="email">Password</label>
                    <input type={'password'}{...register("password", {required: true})} />
                    {errors.password && <span>Please, fill a secure password</span>}
                </div>
                <div>
                    <button type="submit">Login</button>
                    <span>Don't have an account? <Link to={'/signup'}> Sign up </Link></span>
                </div>
            </form>

        </main>
    )
}

export default LoginPage;
