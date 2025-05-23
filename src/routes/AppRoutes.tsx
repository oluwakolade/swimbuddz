import { Routes, Route } from 'react-router-dom';
import Login from '../features/Auth/Login';
import Register from '../features/Auth/Register';
import RequireAuth from './RequireAuth';
import DashboardHome from '../features/Dashboard/DashboardHome';
import CheckInPage from '../features/Checkin/CheckInPage';


const AppRoutes = () => {
    return (
        <Routes>
                                    <Route path='/' element={<CheckInPage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            {/* Authenticated user routes */}
            <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                {/* <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} /> */}
            </Route>
            {/* Admin-only routes */}

        </Routes>

    )
}

export default AppRoutes