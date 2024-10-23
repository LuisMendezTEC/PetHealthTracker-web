import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clients from './pages/Clients';
import Appointments from './pages/Appointments';
import Histories from './pages/Histories';
import Login from './pages/Login';

// Componente que protege las rutas privadas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Obtenemos el token de localStorage
  return token ? children : <Navigate to="/login" />;  // Si no hay token, redirige a login
};

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Clients /></PrivateRoute>} />
          <Route path="/citas" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/historiales" element={<PrivateRoute><Histories /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;