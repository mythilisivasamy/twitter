import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser,selectUser } from './features/authSlice';

const Profile = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const user=useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUser(id));
    
  }, [id, dispatch]);
  return (
    <div>
      <h1>User Profile<br/>
      {JSON.stringify(user)}
      </h1>
    </div>
  );
};

export default Profile;
