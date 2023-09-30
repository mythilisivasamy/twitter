import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  selectAuthMessage,
  selectAuthStatusCode,
  setStatusCode,
  signup,
} from './features/authSlice';
import { useEffect } from 'react';
import LoadingBox from './components/LoadingBox';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const msg = useSelector(selectAuthMessage);
  const statusCode = useSelector(selectAuthStatusCode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (statusCode === '201') {
      dispatch(setStatusCode());
      toast.success('Signed Up Successfully');
      navigate('/');
    }
    if (statusCode === '202') {
      dispatch(setStatusCode());
    }
  }, [navigate, statusCode, dispatch]);
  const onSubmit = (formValues) => {
    try {
      dispatch(signup({ ...formValues })).unwrap();
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="container login-container">
      <div className="text-center">{msg === 'loading' && <LoadingBox />}</div>
      <div className="row">
        <div className=" col-sm-12 col-md-6 d-block mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center fw-bold">
                <span>Sign Up </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="#0097b2"
                  className="bi bi-twitter"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="name"
                  className="p-2 my-3 form-control input-bg"
                  placeholder="Enter Full Name"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Name is required',
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Alphabets only allowed',
                    },
                  })}
                />
                <p className="error">{errors.name?.message}</p>
                <input
                  type="text"
                  name="userName"
                  className="p-2 mb-2 form-control input-bg"
                  {...register('userName', {
                    required: {
                      value: true,
                      message: 'userName is required',
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Alphabets only allowed',
                    },
                  })}
                  placeholder="Enter user name"
                />
                <p className="error">{errors.userName?.message}</p>
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

                <input
                  type="text"
                  name="location"
                  className="p-2 mb-2 form-control input-bg"
                  placeholder="Enter Location"
                  {...register('location', {
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Alphabets only allowed',
                    },
                  })}
                />
                <p className="error">{errors.location?.message}</p>
                <input
                  type="date"
                  name="dob"
                  className="p-2 mb-2 form-control input-bg"
                  {...register('dob')}
                />

                <div className="mt-2 d-grid">
                  <button type="submit" className="custom-btn custom-btn-blue">
                    Sign Up
                  </button>
                </div>
                <div className="my-3">
                  <hr className="text-muted" />
                  <h5 className="text-muted text-center">OR</h5>
                  <hr className="text-muted" />
                </div>
                <div className="my-3 d-grid">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted">
                      Already have an account?{' '}
                    </span>
                    <span className="ms-1 text-info fw-bold">
                      <Link to="/login">Log In</Link>
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

export default Register;
