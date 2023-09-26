import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  fetchUser,
  selectUserInfo,
  selectUserTweets,
} from './features/userSlice';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
const Profile = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const tweets = useSelector(selectUserTweets);
  //const [user, setUser] = useState(user$);
  useEffect(() => {
    try {
      dispatch(fetchUser(id)).unwrap();
    } catch (err) {}
  }, [id, dispatch]);
  return (
    <div>
      {user && (
        <Row className="gx-0">
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row className="gx-0 gy-0 border border-0">
                  <Col>
                    <img
                      src="/images/mythili.jpg"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                      }}
                      alt="profile-pic"
                    />
                  </Col>
                  <Col>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button>Follow</Button>
                  </Col>
                  <Col>
                    <p>Followers</p>
                    {user.followers.length}
                  </Col>
                  <Col>
                    <p>Following</p>
                    <p>{user.following.length}</p>
                  </Col>
                </Row>
              </ListGroup.Item>

              {tweets && tweets.map(tweet=>(
              <ListGroup.Item>
                {tweet.content}
              </ListGroup.Item>))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Profile;
