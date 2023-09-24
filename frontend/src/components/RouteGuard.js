import { Navigate, useLocation } from 'react-router-dom';
const RouteGuard = ({ children }) => {
  const location = useLocation();
  if (!localStorage.getItem('authInfo')) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RouteGuard;
