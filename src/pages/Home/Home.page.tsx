// Core
import React, { useContext } from "react";

// Styles
import styles from './Home.module.css';
import {AuthContext} from "@context/AuthContext.tsx";

const HomePage: React.FC = () => {

    const user = useContext(AuthContext);

    return(
        <main className={styles['HomePage']}>
            <h1>Home</h1>
            {user && <p>Welcome {user.email}</p>}
        </main>
    )
}

export default HomePage;
