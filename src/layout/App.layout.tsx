// Core
import React from "react";

// Router
import {Outlet} from "react-router-dom";

// Components
import Header from "./Header/Header.layout";
import Footer from "./Footer/Footer.layout";

import {motion} from "framer-motion";

const AppLayout: React.FC = () => {
    // const isAdmin = useAppSelector((state) => state.auth.token?.admin);

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 1}}}
            exit={{opacity: 0, transition: {duration: 0.5}}}
        >
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </motion.div>
    );
};

export default AppLayout;
