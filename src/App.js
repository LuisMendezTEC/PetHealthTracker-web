import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Appointments from './pages/Appointments';
import Histories from './pages/Histories';

// Componente que protege las rutas privadas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Obtenemos el token de localStorage
  return token ? children : <Navigate to="/login" />;  // Si no hay token, redirige a login
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {token && <Navbar />}  
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<PrivateRoute><Clients /></PrivateRoute>} />
          <Route path="/citas" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/historiales" element={<PrivateRoute><Histories /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
