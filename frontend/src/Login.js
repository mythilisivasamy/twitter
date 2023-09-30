import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  login,
  selectAuthInfo,
  selectAuthMessage,
  selectAuthStatusCode,
  setStatusCode,
} from './features/authSlice';
import LoadingBox from './components/LoadingBox';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedPath = location.state?.path || '/home';
  const authInfo = useSelector(selectAuthInfo);
  const statusCode = useSelector(selectAuthStatusCode);
  const msg = useSelector(selectAuthMessage);
  useEffect(() => {
    if (statusCode === '201') {
      dispatch(setStatusCode());
      localStorage.setItem('authInfo', JSON.stringify(authInfo));
      navigate(redirectedPath, { replace: true });
    }
  }, [statusCode, dispatch, redirectedPath, navigate, authInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit handler
  const onSubmit = (formValues) => {
    try {
      dispatch(login({ ...formValues })).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container login-container mx-5">
      <div className="row gx-0 justify-content-md-center mt-5">
        <div className="card  col-md-3 col-sm-12 bg-info shadow">
          <div className="card-body text-center mt-3 pt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="250"
              fill="#fff"
              className="bi bi-twitter"
              viewBox="0 0 16 16"
              overflow="visible"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            <div className="card-title text-center mt-3 pt-3 text-white fs-4 fw-bold">
              Twitter Clone
            </div>
          </div>
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="card shadow">
            <div className="card-body px-5">
              <p className="text-center">
                {msg === 'loading' ? (
                  <LoadingBox />
                ) : statusCode === '202' ? (
                  <span className="text-center  fs-5 text-danger">{msg}</span>
                ) : statusCode === '201' ? (
                  <span className="text-center  fs-5 text-success">{msg}</span>
                ) : (
                  <span></span>
                )}
              </p>
              <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="email"
                  name="email"
                  className="p-2 mb-2 form-control input-bg"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: 'Invalid Email Format',
                    },
                  })}
                  placeholder="name@example.com"
                />
                <p className="error">{errors.email?.message}</p>
                <input
                  type="password"
                  name="password"
                  className="p-2 mb-2 form-control input-bg"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    pattern: {
                      value: /^[ A-Za-z0-9_@./#&+-]*$/,
                      message: 'Weak Password',
                    },
                  })}
                  placeholder="Enter password"
                  autoComplete="false"
                />
                <p className="error">{errors.password?.message}</p>
                <div className="mt-2 d-grid">
                  <button type="submit" className="custom-btn custom-btn-blue">
                    Login
                  </button>
                </div>
                <div className="my-3">
                  <hr className="text-muted" />
                  <h5 className="text-muted text-center">OR</h5>
                  <hr className="text-muted" />
                </div>
                <div className="my-3 d-grid">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted">Don't have an account? </span>
                    <span className="ms-1 text-info fw-bold">
                      <Link to="/register">Sign Up</Link>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
