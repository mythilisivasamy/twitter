import { useParams } from 'react-router-dom';
import {
  deleteTweet,
  likeTweet,
  reTweet,
  selectUserTweets,
} from '../features/tweetSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import TweetExcerpt from './TweetExcerpt';
import {
  selectUserById,
  updateProfile,
} from '../features/userSlice';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import Time from '../components/Time';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* const [user, setUser] = useState(user$);
  console.log('user', user$);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    if (status === 'succeeded') {
      setUser(user$);
    }
  }, [user$, dispatch, user, status]);
 */
  let userTweets = useSelector((state) => selectUserTweets(state, id));

  //handle profile
  const handleProfile = (user) => {
    console.log(user);
  };
  const handleClose = () => setShow(false);
  //handling like button
  const handleLike = (tweetId) => {
    dispatch(likeTweet(tweetId));
  };
  const handleRetweet = (tweetId) => {
    dispatch(reTweet(tweetId));
  };

  const handleFollow = (userId) => {
    //setIsFollow(false);
    //dispatch(followUser(userId));
  };
  /*   const handleUnFollow = (userId) => {
    //setIsFollow(true);
  }; */

  //handling delete button
  const handleDelete = (tweet) => {
    dispatch(deleteTweet(tweet._id));
  };
  const handleShow = () => {
    setShow(true);
  };
  let content;
  const orderedTweets = userTweets
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  content = orderedTweets.map((tweet) => (
    <TweetExcerpt
      key={tweet._id}
      tweet={tweet}
      handleDelete={handleDelete}
      handleProfile={handleProfile}
      handleRetweet={handleRetweet}
      handleLike={handleLike}
    />
  ));
  const onSubmit = (formValues) => {
    try {
      dispatch(
        updateProfile({
          ...formValues,
        })
      ).unwrap();
    } catch (err) {}
  };

  return (
    <div className="col col-sm-9 p-0 ">
      <div
        className="container mt-2 p-0 mb-0"
        style={{ backgroundColor: '#0cc0df', maxWidth: '500px' }}
      >
        <div className="position-relative">
          <div className="row">
            <div className="col " style={{ height: '130px' }}></div>
          </div>
          <div
            className="position-absolute  top-50 start-0 translate-start-x"
            style={{ width: '120px', height: '100px', zIndex: '999' }}
          >
            <img
              src="/images/mythili.jpg"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              alt="profilePic"
            />
          </div>
        </div>

        <div className="bg-white p-0 mt-0 position-relative">
          <div
            className="position-absolute  top-25 start-50"
            style={{ width: '100px' }}
          >
            {id !== authInfo._id && (
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={() => handleFollow(id)}
                style={{ cursor: 'pointer' }}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <div className="bg-white px-1 my-0 py-0 border border-1">
          <p className="text-end">
            {id === authInfo._id && (
              <button
                type="button"
                class="btn btn-outline-info"
                onClick={() => handleShow()}
              >
                Edit
              </button>
            )}
          </p>
          <br />
          <h6>{user.name}</h6>
          <h6>@{user.userName}</h6>
          <h6>
            <i className="fa-solid fa-location-dot"></i>
            <span className="px-2">{user.location}</span>
            <span className="px-2">
              <i className="fa-solid fa-calendar-days"></i>
              <span className="px-2">
                <Time timeStamp={user.createdAt} />
              </span>
            </span>
          </h6>
          <h6>
            <span className="small fw-bold">{user.following.length}</span>{' '}
            Following
            <span className="px-2">
              <span className="small fw-bold"> {user.followers.length} </span>
              Followers
            </span>{' '}
          </h6>
        </div>
      </div>
      <p className="text-center fw-bold fs-6">Tweets and Replies</p>
      <div
        className="container mt-1 p-0 mb-0"
        style={{ backgroundColor: '#0cc0df', maxWidth: '500px' }}
      >
        {content}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>Edit profile</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mx-2">
              <Col xs={12}>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    {...register('location', {
                      required: {
                        value: true,
                        message: 'Location is required',
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Alphabets only allowed',
                      },
                    })}
                    placeholder="Enter location"
                  />
                  <p className="error">{errors.location?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-2">
              <Col xs={12}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    className="p-2 mb-2 form-control input-bg"
                    {...register('dob')}
                    placeholder="DOB"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-2">
              <Col xs={12}>
                <Button
                  type="submit"
                  className="mb-2 btn-info align-items-center"
                  onClick={handleClose}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile;
