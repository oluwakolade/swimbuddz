import { Routes, Route } from 'react-router-dom';
import Login from '../features/Auth/Login';
// import RequireAuth from './RequireAuth';
// import DashboardHome from '../features/Dashboard/DashboardHome';
import CheckInPage from '../features/Checkin/CheckInPage';
import AuthPage from '../features/Auth/AuthPage';
import SignUp from '../features/Auth/SignUp';
import RegisterPage from '../features/Checkin/RegisterPage';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='checkin' element={<CheckInPage />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />

            {/* Authenticated user routes */}
            {/* <Route element={<RequireAuth />}> */}
            {/* <Route path="/dashboard" element={<DashboardHome />} /> */}
            {/* <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} /> */}
            {/* </Route> */}
            {/* Admin-only routes */}

        </Routes>

    )
}

export default AppRoutes