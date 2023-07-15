// Router
import {createBrowserRouter} from "react-router-dom";
// Pages
import HomePage from "@pages/Home/Home.page.tsx";
import LoginPage from "@pages/Login/Login.page.tsx";
import SignUpPage from "@pages/SignUp/SignUp.page.tsx";
// Layout
import AppLayout from "@root/layout/App.layout.tsx";
// Components
import RequireAuth from "@root/router/RequireAuth.tsx";

/**
 * We define here the routes and the components that will be rendered when the user navigates to that route
 */
export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [{
            path: "/",
            element: <RequireAuth component={HomePage}/>
        },]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/signup",
        element: <SignUpPage/>,
    },
]);
