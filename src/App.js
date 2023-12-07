// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoutineList from './routineList';
import Rating from './rating';

const App = () => {
  console.log("App");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoutineList />} />
        <Route path="/Rating" element={<Rating />} />
      </Routes>
    </Router>
  );
};

export default App;
