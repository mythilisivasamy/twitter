import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import RouteGuard from './components/RouteGuard';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
