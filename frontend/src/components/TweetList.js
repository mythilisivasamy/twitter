import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import { signout } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TweetExcerpt from './TweetExcerpt';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useEffect, useState, createRef } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import {
  createComment,
  createTweet,
  deleteTweet,
  fetchTweets,
  likeTweet,
  reTweet,
  selectAllTweets,
  selectStatusCode,
  setStatusCode,
} from '../features/tweetSlice';

const TweetList = () => {
  const fileInput = createRef();
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
  const dispatch = useDispatch();
  const allTweets = useSelector(selectAllTweets);
  const [image, setImage] = useState({
    preview: '',
    data: '',
  });
  const [isdropZone, setDropZone] = useState(false);
  const { register, handleSubmit } = useForm();
  //use Effect
  useEffect(() => {
    if (statusCode === '201') {
      dispatch(setStatusCode());
    }
    if (statusCode === '202') {
      dispatch(fetchTweets());
      dispatch(setStatusCode());
    }
  }, [statusCode, dispatch]);

  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
    setDropZone(true);
  };

  //handle profile
  const handleProfile = (user) => {
    console.log(user);
  };

  //handling like button
  const handleLike = (tweetId) => {
    dispatch(likeTweet(tweetId));
  };
  const handleRetweet=(tweetId) => {
    dispatch(reTweet(tweetId));
  };

  //handling delete button
  const handleDelete = (tweet) => {
    dispatch(deleteTweet(tweet._id));
  };

  //handling form submit
  const onSubmit = (formValues) => {
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

  /* const clickHandler = () => {
    dispatch(signout());
    navigate('/login');
  }; */
  return (
   
      <div className="col col-sm-9 p-0 ">
        <div
          className="container mt-0 p-0 border border-1 bg-light"
          style={{maxWidth:'500px'}}
        >
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
          {allTweets &&
            allTweets.map((tweet) => (
              <TweetExcerpt
                key={tweet._id}
                tweet={tweet}
                handleLike={handleLike}
                handleShow={handleShow}
                handleDelete={handleDelete}
                handleProfile={handleProfile}
                handleRetweet={handleRetweet}
              />
            ))}
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
                    name="profilePic"
                    {...register('profilePic')}
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={() => handleFileSelect()}
                    ref={fileInput}
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

export default TweetList;
