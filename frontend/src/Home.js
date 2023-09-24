import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { signout } from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TweetExcerpt from './TweetExcerpt';
import {
  faAddressCard,
  faEnvelope,
  faHome,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import {
  createTweet,
  fetchTweets,
  likeTweet,
  selectAllTweets,
  selectStatusCode,
  setStatusCode,
} from './features/tweetSlice';

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const statusCode = useSelector(selectStatusCode);
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTweets = useSelector(selectAllTweets);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (statusCode === '201') {
      dispatch(setStatusCode());
    }
    if (statusCode === '202') {
      dispatch(fetchTweets());
    }
  }, [statusCode, dispatch]);
  const handleLike = (tweetId) => {
    dispatch(likeTweet(tweetId));
  };
  const onSubmit = (formValues) => {
    try {
      dispatch(createTweet({ ...formValues })).unwrap();
      toast.success('Tweeted Successfully');
    } catch (err) {
      toast.error(err);
    }
  };

  const clickHandler = () => {
    dispatch(signout());
    navigate('/login');
  };
  return (
    <div className="container small-container">
      <div className="row gx-0 justify-content-md-center">
        <div className="col col-sm-10 col-md-4 bg-white">
          <div
            className="d-flex align-items-start justify-content-between flex-column bd-highlight mb-3"
            style={{ height: '600px' }}
            id="stick"
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span onClick={clickHandler} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faHome} />
                  <span className="px-3">
                    <Link to="/tweetlist">Home</Link>
                  </span>
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span onClick={clickHandler} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faAddressCard} />
                  <span className="px-3">Profile</span>
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span onClick={clickHandler} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span className="px-3">Logout</span>
                </span>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup variant="flush" className="self-align-end">
              <ListGroup.Item>
                <span onClick={clickHandler} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faUser} />

                  <span className="px-3 mt-5">{authInfo.name}</span>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} /> {authInfo.email}
                  </p>
                </span>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="col col-sm-10 col-md-8">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <h4>Home</h4>
                <Button variant="info" onClick={handleShow}>
                  Tweet
                </Button>
              </div>
            </Card.Body>
          </Card>
          <ListGroup>
            {allTweets &&
              allTweets.map((tweet) => (
                <ListGroup.Item>
                  <TweetExcerpt
                    key={tweet._id}
                    tweet={tweet}
                    handleLike={handleLike}
                  />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>New Tweet</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              style={{ width: '350px', height: '100px' }}
              name="content"
              className="p-2 my-3 form-control input-bg"
              placeholder="Enter Your tweet"
              {...register('content')}
            />
            <Button type="submit" variant="primary" onClick={handleClose}>
              Send Tweet
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
