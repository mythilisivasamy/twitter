import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
