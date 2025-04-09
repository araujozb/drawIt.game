import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Rules from './pages/Rules';
import Register from './pages/Register';
import Game from './pages/Game';
import EndGame from './pages/EndGame';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/end" element={<EndGame />} />
      </Routes>
    </Router>
  );
};

export default App;
