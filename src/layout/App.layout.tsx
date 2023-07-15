// Core
import React from "react";

// Router
import { Outlet } from "react-router-dom";

// Components
import Header from "./Header/Header.layout";
import Footer from "./Footer/Footer.layout";

const AppLayout: React.FC = () => {
  // const isAdmin = useAppSelector((state) => state.auth.token?.admin);

  return (
    <>
      <div className="App">
          {/*{!isAdmin && <Header />}*/}
          <Header/>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
