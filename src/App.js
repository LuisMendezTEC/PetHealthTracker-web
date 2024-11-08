import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Appointments from './pages/Appointments';
import Histories from './pages/Histories';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import SupportChat from './components/SupportChat';

// Función para decodificar el token JWT y obtener el payload
const decodeToken = (token) => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Componente para proteger las rutas y verificar el rol
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      userRole = decodedToken.role;
    } else {
      return <Navigate to="/login" />;
    }
  }

  if (token && allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/login" />;
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
          <Route path="/" element={<PrivateRoute allowedRoles={['Administrador', 'Recepcionista', 'Veterinario']}><Clients /></PrivateRoute>} />
          <Route path="/citas" element={<PrivateRoute allowedRoles={['Administrador', 'Recepcionista', 'Veterinario']}><Appointments /></PrivateRoute>} />
          <Route path="/historiales" element={<PrivateRoute allowedRoles={['Administrador', 'Recepcionista', 'Veterinario']}><Histories /></PrivateRoute>} />
          <Route path='/user-profile' element={<PrivateRoute allowedRoles={['Administrador', 'Recepcionista', 'Veterinario']}><UserProfile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute allowedRoles={['Administrador']}><Dashboard /></PrivateRoute>} />
        </Routes>
        {token && <SupportChat />} {/* Muestra el soporte solo si hay un usuario autenticado */}
      </div>
    </Router>
  );
}

export default App;