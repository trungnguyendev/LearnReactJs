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
import DetailQuiz from "./componets/User/DetailQuiz";
import ManageQuiz from "./componets/Admin/Content/Quiz/ManageQuiz";
import Questions from "./componets/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from 'react';
const NotFound = () => {
    return (
        <div className="mt-3 alert alert-danger">
            404.Not Found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="user" element=
                        {
                            <PrivateRoute> <ListQuiz /></PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={
                    <PrivateRoute> <Admin /></PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="ManageUser" element={<ManageUser />} />
                    <Route path="Manage-quizzes" element={<ManageQuiz />} />
                    <Route path="Manage-questions" element={<Questions />} />
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/Register' element={<Register />}></Route>
                <Route path='/test' element={<PrivateRoute />}></Route>
                <Route path='*' element={<NotFound />} />
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
        </Suspense>
    )
}
export default Layout