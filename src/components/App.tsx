import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Detail from './Details';
import Posts from './Posts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/" element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default App;
