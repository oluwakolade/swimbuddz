import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/Auth/useAuth';

const RequireAuth = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
