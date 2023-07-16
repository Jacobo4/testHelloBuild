// Core
import ReactDOM from 'react-dom/client';
// Router
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Styles
import "@styles/styles.css";
// Provider
import {AuthProvider} from "@context/AuthContext.tsx";
// Components
import App from "@root/App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>


    </>
)
