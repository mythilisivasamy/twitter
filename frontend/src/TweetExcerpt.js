import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Time from './components/Time';
import {
  faComment,
  faHeart,
  faRetweet,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TweetExcerpt = ({ tweet, handleLike, handleShow, handleDelete }) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  return (
    <Card key={tweet._id}>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4>img</h4>
          <p>
            <Time timeStamp={tweet.tweetedBy.createdAt} />
          </p>
          <Link to={`/profile/${tweet.tweetedBy._id}`}>
            <p>@{tweet.tweetedBy.userName}</p>
          </Link>
          {tweet.tweetedBy._id === authInfo._id ? (
            <button
              className="bg-light border-0"
              onClick={() => handleDelete(tweet._id)}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: '#000' }} />
            </button>
          ) : (
            ''
          )}
        </div>
      </Card.Header>
      <Card.Body>{tweet.content}</Card.Body>
      <hr />
      <p>
        {tweet.likes.length === 0 ? (
          <button
            className="bg-white border-0"
            onClick={() => handleLike(tweet._id)}
            disabled={tweet.tweetedBy._id === authInfo._id}
          >
            <FontAwesomeIcon icon={faHeart} style={{ color: '#000' }} />
            <span className="px-1">{tweet.likes.length}</span>
          </button>
        ) : (
          <button
            className="bg-white border-0"
            onClick={() => handleLike(tweet._id)}
            disabled={tweet.tweetedBy._id === authInfo._id}
          >
            <FontAwesomeIcon icon={faHeart} style={{ color: '#f00' }} />
            <span className="px-1">{tweet.likes.length}</span>
          </button>
        )}
        {tweet.comments.length === 0 ? (
          <span className="px-3" style={{ cursor: 'pointer' }}>
            <button
              className="bg-white border-0"
              onClick={() => handleShow('Comment', tweet._id)}
              disabled={tweet.tweetedBy._id === authInfo._id}
            >
              <FontAwesomeIcon icon={faComment} style={{ color: '#000' }} />
              <span className="px-1">{tweet.comments.length}</span>
            </button>
          </span>
        ) : (
          <span className="px-3" style={{ cursor: 'pointer' }}>
            <button
              className="bg-white border-0"
              onClick={() => handleShow('Comment', tweet._id)}
              disabled={tweet.tweetedBy._id === authInfo._id}
            >
              <FontAwesomeIcon icon={faComment} style={{ color: '#f00' }} />
              <span className="px-1">{tweet.comments.length}</span>
            </button>
          </span>
        )}

        <span className="px-3" style={{ cursor: 'pointer' }}>
          <Link to="/">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="px-1">{tweet.retweetBy.length}</span>
          </Link>
        </span>
      </p>
    </Card>
  );
};

export default TweetExcerpt;
