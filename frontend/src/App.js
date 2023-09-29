import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ProfileImg from './components/ProfileImg';
import RouteGuard from './components/RouteGuard';
import TweetList from './components/TweetList';
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
            <Route
              index
              element={
                <RouteGuard>
                  <TweetList />
                </RouteGuard>
              }
            />
            <Route path="profile" element={<Profile />} />
            <Route path="upload" element={<ProfileImg />} />
          </Route>
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
