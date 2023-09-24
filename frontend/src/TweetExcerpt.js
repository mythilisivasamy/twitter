import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart,
  faRetweet,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TweetExcerpt = ({ tweet, handleLike }) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4>img</h4>
          <p>{tweet.tweetedBy.email}</p>
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

        <span className="px-3" style={{ cursor: 'pointer' }}>
          <Link to="/">
            <FontAwesomeIcon icon={faComment} />
          </Link>
        </span>
        <span className="px-3" style={{ cursor: 'pointer' }}>
          <Link to="/">
            <FontAwesomeIcon icon={faRetweet} />
          </Link>
        </span>
      </p>
    </Card>
  );
};

export default TweetExcerpt;
