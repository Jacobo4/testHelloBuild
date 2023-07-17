// Core
import React from "react";
// Styles
import styles from './Loader.module.css';


const Loader: React.FC = () => {
    return (
        <div className={styles['Loader']}>
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-third"></div>
        </div>
    )
}

export default Loader;
