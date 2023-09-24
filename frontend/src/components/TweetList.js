import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const TweetList = () => {
  return (
    <div>
      <ListGroup horizontal variant="flush">
        <ListGroup.Item>
          <h4>Home</h4>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button>Tweet</Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default TweetList;
