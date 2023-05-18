import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Posts from './Posts';
import Detail from './Details';

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
