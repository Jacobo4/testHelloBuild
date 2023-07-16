// Router
import {Routing} from "@root/router/routes.tsx";
// Toasts
import {ToastContainer} from 'react-toastify';

const App = () => {
    return (
        <div className="App">
            <Routing/>
            <ToastContainer/>
        </div>
    )
}

export default App;
