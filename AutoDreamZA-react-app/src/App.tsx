import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './FRONTEND/Pages/Home';
import About from './FRONTEND/Pages/About';
import Products from './FRONTEND/Pages/Product';
import Contact from './FRONTEND/Pages/Contact';
import Upload from './FRONTEND/Pages/Upload';

const App: React.FC = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Upload" element={<Upload />} />
    </Routes>
    </Router>
  );
};

export default App;
