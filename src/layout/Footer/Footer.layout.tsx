// Core
import React from "react";
//Styles
import styles from "./Footer.module.css";
// Router
import {Link} from "react-router-dom";
//icons
import {BsFacebook, BsTwitter, BsInstagram} from "react-icons/bs";

const Footer: React.FC = () => {
    return (
        <div className={`${styles["Footer"]} text-white bg-secondary`}>
            <div className={styles["info"]}>
                <figure className={styles["logo"]}>
                    <div>
                        {/*<img src={logo} alt="" />*/}
                    </div>
                </figure>
                <h1 className={'text-white text-5xl'}>Your brand here</h1>
                <h2 className={'text-white text-2xl text-center'}>Your brilliant slogan here</h2>
            </div>
            <div className={`${styles["icons"]} text-white`}>
                <BsFacebook className={'text-2xl'}/>
                <BsTwitter className={'text-2xl'}/>
                <BsInstagram className={'text-2xl'}/>
            </div>
            <div className={`${styles["links"]}`}>
                <Link className={'text-2xl hover:text-third'} to={"/"}>Home</Link>
            </div>
        </div>
    );
};

export default Footer;
