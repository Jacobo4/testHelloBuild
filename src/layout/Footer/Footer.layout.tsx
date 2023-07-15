//Styles
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import React from "react";
// import logo from "@assets/images/logo.png";

//icons
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer: React.FC = () => {
  return (
    <div className={styles["Footer"]}>

        <div className={styles["Info"]}>
          <figure className={styles["logo"]}>
            <div>
              {/*<img src={logo} alt="" />*/}
            </div>
          </figure>
          <h1>Your brand here</h1>
          <h2>
            Your brilliant slogan here
          </h2>
        </div>
      <div className={styles["icons"]}>
        <BsFacebook />
        <BsTwitter />
        <BsInstagram />
      </div>
      <div className={styles["links"]}>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
};

export default Footer;
