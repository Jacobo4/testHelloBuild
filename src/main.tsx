// Core
import ReactDOM from 'react-dom/client';
// Router
import { RouterProvider } from "react-router-dom";
import {router} from "@root/router/routes.tsx";
// Styles
import "@styles/styles.css";
// Toaster
import {ToastContainer} from 'react-toastify';
// Provider
import {AuthProvider} from "@provider/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <AuthProvider>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </AuthProvider>
    </>
)
