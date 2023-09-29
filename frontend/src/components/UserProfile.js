import { useParams } from 'react-router-dom';
import {
  deleteTweet,
  likeTweet,
  reTweet,
  selectTweetById,
  selectUserTweets,
} from '../features/tweetSlice';
import { useDispatch, useSelector } from 'react-redux';
import TweetExcerpt from './TweetExcerpt';

const UserProfile = () => {
  const dispatch = useDispatch();
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  const { id } = useParams();
  let tweet = useSelector((state) => selectTweetById(state, id));
  const userTweets = useSelector((state) => selectUserTweets(state, tweet));
  console.log('user', userTweets);
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

  const handleFollow=(userId)=>{

  }

  //handling delete button
  const handleDelete = (tweet) => {
    dispatch(deleteTweet(tweet._id));
  };
  console.log(tweet);
  if (!tweet) {
    tweet = JSON.parse(localStorage.getItem('tweet'));
  } else {
    localStorage.setItem('tweet', JSON.stringify(tweet));
  }

  const orderedTweets = userTweets
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  let content = orderedTweets.map((tweet) => (
    <TweetExcerpt
      key={tweet._id}
      tweet={tweet}
      handleDelete={handleDelete}
      handleProfile={handleProfile}
      handleRetweet={handleRetweet}
      handleLike={handleLike}
    />
  ));
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
            className="position-absolute  top-25 start-0 "
            style={{ width: '200px' }}
          >
            <span className="px-5 ms-5" onClick={()=>handleFollow(tweet.tweetedBy._id)} style={{cursor:'pointer'}}>Follow</span>
          </div>
        </div>
        <div className="bg-white px-1 my-0 py-0 border border-1">
          <p className="text-end">
            {tweet.tweetedBy._id === authInfo._id && (
              <button type="button" class="btn btn-outline-info">
                Edit
              </button>
            )}
          </p>
          <br />
          <h6>{tweet.tweetedBy.name}</h6>
          <h6>@{tweet.tweetedBy.userName}</h6>
          <h6>
            <i className="fa-solid fa-location-dot"></i>
            <span className="px-2">{'tweet.tweetedBy.location'}</span>
            <span className="px-2">
              <i className="fa-solid fa-calendar-days"></i>
              <span className="px-2">Joined Date</span>
            </span>
          </h6>
          <h6>
            <span className="small fw-bold">
              {tweet.tweetedBy.following.length}
            </span>{' '}
            Following
            <span className="px-2">
              <span className="small fw-bold">
                {' '}
                {tweet.tweetedBy.followers.length}{' '}
              </span>
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
    </div>
  );
};

export default UserProfile;
