import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './Home';
import Login from './Login';
import Register from './Register';

import ProfileImg from './components/ProfileImg';
import RouteGuard from './components/RouteGuard';
import TweetList from './components/TweetList';
import UserProfile from './components/UserProfile';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />}></Route>

          <Route
            path="home"
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          >
            <Route index element={<TweetList />} />
            <Route path="tweet/:id" element={<UserProfile />} />
            <Route path="upload" element={<ProfileImg />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path='upload' element={<ProfileImg/>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
