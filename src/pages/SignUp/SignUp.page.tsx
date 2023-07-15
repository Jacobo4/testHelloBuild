// Core
import React from "react";

// Styles
import styles from './SignUp.module.css';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {toast} from "react-toastify";
import {auth, githubAuthProvider} from "@config/firebase.ts";
import {Dialog} from '@headlessui/react'

type SignUpInputs = {
    username: string
    email: string
    password: string
}
const SignUpPage: React.FC = () => {

    const {register, handleSubmit, getValues, formState: {errors},} = useForm<SignUpInputs>();
    const [dialogIsOpen, setDialogIsOpen] = React.useState<boolean>(false);
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
        console.log(isUserValid)
        if (isUserValid) await signUp(data);
        setDialogIsOpen(true);
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
            <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
                <Dialog.Panel>
                    <Dialog.Title>Deactivate account</Dialog.Title>
                    <Dialog.Description>
                        This will permanently deactivate your account
                    </Dialog.Description>

                    <p>
                        Are you sure you want to deactivate your account? All of your data
                        will be permanently removed. This action cannot be undone.
                    </p>

                    <button onClick={() => signUp(getValues())}>Continue</button>
                    <button onClick={() => setDialogIsOpen(false)}>Cancel</button>
                </Dialog.Panel>
            </Dialog>
        </main>
    )
}

export default SignUpPage;
