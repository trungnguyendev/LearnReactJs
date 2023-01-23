import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import User from './componets/User/User';
import Admin from './componets/Admin/Admin';
import HomePage from './componets/Home/HomePage';
import DashBoard from './componets/Admin/Content/DashBoard';
import ManageUser from './componets/Admin/Content/ManageUser';
import Login from './componets/Auth/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./componets/Auth/Register";
import ListQuiz from "./componets/User/ListQuiz";
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="user" element={<ListQuiz />} />
                </Route>
                <Route path="/admin" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="ManageUser" element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/Register' element={<Register />}></Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Layout