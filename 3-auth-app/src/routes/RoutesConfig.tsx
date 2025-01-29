import { Navigate, Route, Routes } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';
import DashboardPage from '../pages/dashboard';

const RoutesConfig = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesConfig;
