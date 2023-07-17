// Core
import React from "react";
// Styles
import styles from './SignUp.module.css';
// Form
import {SubmitHandler, useForm} from "react-hook-form";
// Router
import {Link, useNavigate} from "react-router-dom";
// Firebase
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth, githubAuthProvider} from "@config/firebase.ts";
// Toast
import {toast} from "react-toastify";

type SignUpInputs = {
    username: string
    email: string
    password: string
}
/**
 * SignUpPage component. (Is not used in the app) I made it by mistake
 * @constructor
 * @return JSX.Element
 * @category Pages
 */
const SignUpPage: React.FC = () => {

    const {register, handleSubmit, formState: {errors},} = useForm<SignUpInputs>();
    const navigate = useNavigate();
    const validateGitUser = async (username: string): Promise<boolean> => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error('User not found');
            return true;
        } catch (error) {
            console.error(error);
            return false;
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

    const signUp = async (data: SignUpInputs): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            toast.success('Signed in successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Error signing in');
        }
    }
    const onSubmit: SubmitHandler<SignUpInputs> = async (data: SignUpInputs): Promise<void> => {
        const isUserValid = await validateGitUser(data.username);
        if (isUserValid) await signUp(data);
    }


    return (
        <main className={styles['SignUpPage']}>
            <div className={styles['decor']}></div>
            <div className={styles['form']}>
                <h3>Sign up to test hello build</h3>
                <h1>Sign Up</h1>
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
                        <label htmlFor="username">Username</label>
                        <input type={'text'} {...register("username", {required: true})} />
                        {errors.email && <span>You must provide a valid username</span>}
                    </div>

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
                        <button type="submit">Sign up</button>
                        <span>Already a member?<Link to={'/login'}> Sign In </Link></span>
                    </div>

                </form>
            </div>
        </main>
    )
}

export default SignUpPage;
