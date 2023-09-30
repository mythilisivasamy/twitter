import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TweetExcerpt from './TweetExcerpt';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useState, createRef } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import LoadingBox from '../components/LoadingBox';
import {
  createComment,
  createTweet,
  deleteTweet,
  likeTweet,
  reTweet,
  selectAllTweets,
  selectStatus,
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

  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  const allTweets = useSelector(selectAllTweets);

  const [image, setImage] = useState({
    preview: '',
    data: '',
  });
  const [isdropZone, setDropZone] = useState(false);
  const { register, handleSubmit } = useForm();
  let content;
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
  const handleRetweet = (tweetId) => {
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
  if (status === 'loading') {
    content = (
      <>
        <LoadingBox />
      </>
    );
  } else if (status === 'succeeded') {
    const orderedTweets = allTweets
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    content = orderedTweets.map((tweet) => (
      <TweetExcerpt
        key={tweet._id}
        tweet={tweet}
        handleShow={handleShow}
        handleDelete={handleDelete}
        handleProfile={handleProfile}
        handleRetweet={handleRetweet}
        handleLike={handleLike}
      />
    ));
  }

  return (
    <div className="col col-sm-9 p-0 ">
      <div
        className="container mt-0 p-0 border border-1 bg-light"
        style={{ maxWidth: '500px' }}
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
        {content}
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
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={(e) => handleFileSelect(e)}
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
