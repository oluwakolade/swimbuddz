import { Routes, Route } from 'react-router-dom';
import CheckInPage from '../features/Checkin/CheckInPage';
import AuthPage from '../features/Auth/AuthPage';
import RegisterPage from '../features/Checkin/RegisterPage';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='checkin' element={<CheckInPage />} />
        </Routes>

    )
}

export default AppRoutes