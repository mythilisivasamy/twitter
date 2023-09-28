import ListGroup from 'react-bootstrap/ListGroup';
import { Outlet, useNavigate } from 'react-router-dom';
import './Home.css';
import {
  faAddressCard,
  faHome,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { signout } from './features/authSlice';
const Home = () => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(signout());
    navigate('/');
  };

  return (
    <div className="container mt-5 p-0 bg-white " style={{ maxWidth: '700px' }}>
      <div
        className="container fixed-top mt-0 p-0 bg-info border-bottom-1 shadow"
        style={{ maxWidth: '700px', height: '40px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="#fff"
          className="bi bi-twitter"
          viewBox="-10 0 16 16"
          overflow="visible"
        >
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
      </div>

      <div className="row mx-auto gx-0 p-0 " style={{ maxWidth: '700px' }}>
        <div className="col col-sm-3 p-0 border border-end-0 border-top-0">
          <div
            className="container mt-3 p-0 mb-0 bg-white"
            style={{
              maxWidth: '150px',
              position: 'fixed',
              zIndex: '999',
              overflow: 'hidden',
            }}
          >
            <div className="d-flex flex-column ">
              <div style={{ height: '500px' }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faHome} /> Home
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faAddressCard} /> Profile
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span onClick={clickHandler} style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      Logout
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div>
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faUser} />
                    {authInfo.name}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
