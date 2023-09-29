import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Time from './Time';
import {
  faComment,
  faHeart,
  faRetweet,
  faTrash,
  // faTrash,
} from '@fortawesome/free-solid-svg-icons';

const TweetExcerpt = ({ ...props }) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));

  return (
    <div className="card " style={{ maxWidth: '500px' }}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="d-flex justify-content-between ">
            <span className="px-4">
              {props.tweet.retweetBy.includes(authInfo._id) ? (
                <span className="px-1">
                  <FontAwesomeIcon
                    icon={faRetweet}
                    style={{ color: '#0097b2' }}
                  />
                  <span className="px-2 small">
                    Retweeted By {authInfo.userName}
                    
                  </span>
                </span>
              ) : (
                ''
              )}
            </span>
            <span className="text-end">
              {props.tweet.tweetedBy._id === authInfo._id ? (
                <button
                  className="bg-white border-0"
                  onClick={() => props.handleDelete(props.tweet)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: '#0097b2' }}
                  />
                </button>
              ) : (
                ''
              )}
            </span>
          </div>

          <div className="row gx-0">
            <div className="col-2 text-center mt-1">
              <img
                src="./images/mythili.jpg"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                alt="profile-pic"
              />
            </div>
            <div className="col-10">
              <span className="fw-bold">@{props.tweet.tweetedBy.userName}</span>
              <span className="px-2">
                <Time timeStamp={props.tweet.tweetedBy.createdAt} />
              </span>
              <br />
              <span>{props.tweet.content}</span>
            </div>
            <div>
              <span>
                {!props.tweet.likes.length ? (
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
                <span className="px-3">
                  {!props.tweet.comments.length ? (
                    <span className="px-3" style={{ cursor: 'pointer' }}>
                      <button
                        className="bg-white border-0"
                        onClick={() =>
                          props.handleShow('Comment', props.tweet._id)
                        }
                        disabled={props.tweet.tweetedBy._id === authInfo._id}
                      >
                        <FontAwesomeIcon icon={faComment} />
                      </button>
                    </span>
                  ) : (
                    <span className="px-3" style={{ cursor: 'pointer' }}>
                      <button
                        className="bg-white border-0"
                        onClick={() =>
                          props.handleShow('Comment', props.tweet._id)
                        }
                        disabled={props.tweet.tweetedBy._id === authInfo._id}
                      >
                        <FontAwesomeIcon
                          icon={faComment}
                          style={{ color: '#0097b2' }}
                        />
                        <span className="px-1">
                          {props.tweet.comments.length}
                        </span>
                      </button>
                    </span>
                  )}
                </span>
                <span className="px-3" style={{ cursor: 'pointer' }}>
                  <button
                    className="bg-white border-0"
                    onClick={() => props.handleRetweet(props.tweet._id)}
                    disabled={props.tweet.tweetedBy._id === authInfo._id}
                  >
                    <FontAwesomeIcon
                      icon={faRetweet}
                      style={{ color: '#0097b2' }}
                    />
                    <span className="px-1">
                      {props.tweet.retweetBy.length &&
                        props.tweet.retweetBy.length}
                    </span>
                  </button>
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TweetExcerpt;
