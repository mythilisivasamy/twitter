import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { signout } from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TweetExcerpt from './TweetExcerpt';
import './Home.css';
import {
  faAddressCard,
  faEnvelope,
  faHome,
  faImage,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import {
  createComment,
  createTweet,
  deleteTweet,
  fetchTweets,
  likeTweet,
  selectAllTweets,
  selectStatusCode,
  setStatusCode,
} from './features/tweetSlice';

const Home = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [tweetId, setTweetId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (title$, id) => {
    setShow(true);
    setTitle(title$);
    setTweetId(id);
  };

  const statusCode = useSelector(selectStatusCode);
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTweets$ = useSelector(selectAllTweets);
  const [allTweets, setAllTweets] = useState(allTweets$);
  const [image, setImage] = useState({
    preview: '',
    data: '',
  });
  const [isdropZone, setDropZone] = useState(false);
  const { register, handleSubmit } = useForm();

  //use Effect
  useEffect(() => {
    if (!allTweets) {
      setAllTweets(JSON.parse(localStorage.getItem('allTweets')));
    }
    if (statusCode === '201') {
      dispatch(setStatusCode());
    }
    if (statusCode === '202') {
      dispatch(fetchTweets());
      dispatch(setStatusCode());
    }
  }, [statusCode, dispatch, allTweets$, allTweets, setAllTweets]);

  //Handling file select
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
    setDropZone(true);
  };

  //handling like button
  const handleLike = (tweetId) => {
    dispatch(likeTweet(tweetId));
  };

  //handling delete button
  const handleDelete = (tweetId) => {
    dispatch(deleteTweet(tweetId));
  };

  //handling form submit
  const onSubmit = (formValues) => {
    const formData = new FormData();
    formData.append('file', image.data);

    try {
      if (title === 'Tweet') {
        dispatch(createTweet({ ...formValues })).unwrap();
      }
      if (title === 'Comment') {
        dispatch(createComment({ ...formValues, tweetId })).unwrap();
      }
      toast.success(`${title}ed Successfully`);
    } catch (err) {
      toast.error(err);
    }
    setDropZone(false);
  };

  const clickHandler = () => {
    dispatch(signout());
    navigate('/login');
  };
  
  return (
    <div className="container small-container bg-info h-75">
      <div className="row gx-0 justify-content-md-center">
        <div className="col col-sm-10 col-md-4 bg-white">
          <div
            className="d-flex align-items-start justify-content-between flex-column bd-highlight mb-3 bg-white"
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
        <div className="col col-sm-10 col-md-8 bg-white h-75">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <h4>Home</h4>
                <Button variant="info" onClick={() => handleShow('Tweet')}>
                  Tweet
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <ListGroup>
                {allTweets &&
                  allTweets.map((tweet) => (
                    <ListGroup.Item>
                      <TweetExcerpt
                        key={tweet._id}
                        tweet={tweet}
                        handleLike={handleLike}
                        handleShow={handleShow}
                        handleDelete={handleDelete}
                      />
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>{`New ${title}`}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              style={{ width: '350px', height: '100px' }}
              name="content"
              className="p-2 my-3 form-control input-bg"
              placeholder={`Enter Your ${title}`}
              {...register('content')}
            />
            {title === 'Tweet' ? (
              isdropZone ? (
                <div className="upload-box">
                  <div className="dropZoneContainer">
                    <div className="dropZoneOverlay">
                      {image.preview && (
                        <img
                          src={image.preview}
                          width="150"
                          height="150"
                          alt="product-pic"
                        />
                      )}
                      <br />
                    </div>
                  </div>
                </div>
              ) : (
                <span className="iconContainer">
                  <FontAwesomeIcon icon={faImage} className="ficon" />
                  <input
                    type="file"
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={handleFileSelect}
                  />
                </span>
              )
            ) : (
              ''
            )}
            <br />
            <ListGroup horizontal>
              <ListGroup.Item>
                <Button type="submit" variant="primary" onClick={handleClose}>
                  {`send ${title}`}
                </Button>
              </ListGroup.Item>
              {title === 'Tweet' && (
                <ListGroup.Item>
                  <Button variant="primary" onClick={() => setDropZone(false)}>
                    Cancel Image
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
