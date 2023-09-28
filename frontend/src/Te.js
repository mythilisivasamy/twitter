import React from 'react';

const Te = () => {
  return (
    <div class="col col-sm-9 p-0 ">
      <h1>TweetList</h1>
    </div>
  );
};

export default Te;


//////////
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

const TweetExcerpt = ({ ...props }) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  return (
    <Card key={props.tweet._id}>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4>img</h4>
          <p>
            <Time timeStamp={props.tweet.tweetedBy.createdAt} />
          </p>
          <button
            className="bg-light border-0"
            onClick={() => props.handleProfile(props.tweet)}
          >
            <p>@{props.tweet.tweetedBy.userName}</p>
          </button>
          {props.tweet.tweetedBy._id === authInfo._id ? (
            <button
              className="bg-light border-0"
              onClick={() => props.handleDelete(props.tweet)}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: '#000' }} />
            </button>
          ) : (
            ''
          )}
        </div>
      </Card.Header>
      <Card.Body>{props.tweet.content}</Card.Body>
      <hr />
      <p>
        {props.tweet.likes.length === 0 ? (
          <button
            className="bg-white border-0"
            onClick={() => props.handleLike(props.tweet._id)}
            disabled={props.tweet.tweetedBy._id === authInfo._id}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: '#000' }}
              title="like"
            />
            <span className="px-1">{props.tweet.likes.length}</span>
          </button>
        ) : (
          <button
            className="bg-white border-0"
            onClick={() => props.handleLike(props.tweet._id)}
            disabled={props.tweet.tweetedBy._id === authInfo._id}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: '#f00' }}
              title="like"
            />
            <span className="px-1">{props.tweet.likes.length}</span>
          </button>
        )}
        {props.tweet.comments.length === 0 ? (
          <span className="px-3" style={{ cursor: 'pointer' }}>
            <button
              className="bg-white border-0"
              onClick={() => props.handleShow('Comment', props.tweet._id)}
              disabled={props.tweet.tweetedBy._id === authInfo._id}
            >
              <FontAwesomeIcon icon={faComment} style={{ color: '#000' }} />
              <span className="px-1">{props.tweet.comments.length}</span>
            </button>
          </span>
        ) : (
          <span className="px-3" style={{ cursor: 'pointer' }}>
            <button
              className="bg-white border-0"
              onClick={() => props.handleShow('Comment', props.tweet._id)}
              disabled={props.tweet.tweetedBy._id === authInfo._id}
            >
              <FontAwesomeIcon icon={faComment} style={{ color: '#f00' }} />
              <span className="px-1">{props.tweet.comments.length}</span>
            </button>
          </span>
        )}

        <span className="px-3" style={{ cursor: 'pointer' }}>
          <Link to="/">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="px-1">{props.tweet.retweetBy.length}</span>
          </Link>
        </span>
      </p>
    </Card>
  );
};

export default TweetExcerpt;
