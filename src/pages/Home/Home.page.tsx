// Core
import React from "react";

// Styles
import styles from './Home.module.css';

// Context
import {useFirebaseAuth} from "@context/AuthContext.tsx";

const HomePage: React.FC = () => {

    const user = useFirebaseAuth();

    return(
        <main className={styles['HomePage']}>
            <h1>Home</h1>
            {user && <p>Welcome {user.email}</p>}
        </main>
    )
}

export default HomePage;
