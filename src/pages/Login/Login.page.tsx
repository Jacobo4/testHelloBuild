// Core
import React, {useEffect} from "react";
// Styles
import styles from './Login.module.css';
// Router
import {useNavigate} from "react-router-dom";
// import {Link, useNavigate} from "react-router-dom";
// Toast
import {toast} from 'react-toastify';
// Firebase
import {auth, githubAuthProvider} from "@config/firebase.ts";
import {signInWithPopup} from "firebase/auth";
// import {signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
// Icons
import {FaGithub} from "react-icons/fa";
// Images
import logo from "@assets/images/logo.png";
import decor from "@assets/images/decor.png";
import {useFirebaseAuth} from "@context/AuthContext.tsx";

import {motion} from "framer-motion";
import {SubmitHandler, useForm} from "react-hook-form";

type LoginInputs = {
    email: string
    password: string
}
const LoginPage: React.FC = () => {

    const {register, handleSubmit, formState: {errors},} = useForm<LoginInputs>();
    const navigate = useNavigate();
    const user = useFirebaseAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    /**
     * Handles login
     * @param data - Login data
     */
    const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
        alert(`This feature is not necessary at the moment, maybe in a future. Go login with Github!`);
        // try {
        //     await signInWithEmailAndPassword(auth, data.email, data.password);
        //     toast.success('Signed in successfully');
        //     navigate('/');
        // } catch (error) {
        //     console.error(error);
        //     toast.error('Error signing in');
        // }
    }


    const signInWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubAuthProvider);
            // TODO: Resolve the types here
            //@ts-ignore
            localStorage.setItem("githubAccessToken", result._tokenResponse.oauthAccessToken);
            if (!result) throw new Error("Could not complete signup");
            // toast.success('Signed in successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Error signing in');
        }
    }


    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 1}}}
            exit={{opacity: 0, transition: {duration: 0.5}}}
        >
            <div className={styles['Login']}>
                <div className={`${styles['decor']} relative md:bg-secondary`}>
                    <img className={'md:bg-secondary z-10'} src={logo} alt="Hello build's logo"/>
                    <img className={'hidden md:flex opacity-25 absolute top-[41px] right-[-60px]'} src={decor} alt=""/>
                    <span className={'text-third'}>@hellobuild</span>
                </div>
                <div className={`${styles['form']}`}>
                    <h5>✨ Login to TestHelloBuild ✨</h5>
                    <div>
                        <button className={'btn btn-primary bg-[#22272E]'} onClick={signInWithGithub}>
                            <FaGithub/>
                            <span>Sign in with Github</span>
                        </button>
                    </div>

                    <div className={'opacity-50 grid place-items-center w-full relative'}>
                        <span className={'z-10 text-xl bg-white px-2'}>or</span>
                        <hr className={'w-full absolute'}/>
                    </div>

                    <form className={'opacity-50'} onSubmit={handleSubmit(onSubmit)}>
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
                            <span className={'text-gray-700'}>Don't have an account? Sign up
                                {/*<Link to={'/signup'}> Sign up </Link>*/}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>

    )
}

export default LoginPage;
