import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clients from './pages/Clients';
import Appointments from './pages/Appointments';
import Histories from './pages/Histories';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Clients />} />
          <Route path="/citas" element={<Appointments />} />
          <Route path="/historiales" element={<Histories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;