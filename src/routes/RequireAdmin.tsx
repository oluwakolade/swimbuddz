import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/Auth/useAuth';

const RequireAdmin = () => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireAdmin;
