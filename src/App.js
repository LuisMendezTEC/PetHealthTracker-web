import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Appointments from './pages/Appointments';
import Histories from './pages/Histories';
import Reports from './pages/Reports'; // Importa la página de reportes

// Función para decodificar el token JWT y obtener el payload
const decodeToken = (token) => {
  try {
    const payloadBase64 = token.split('.')[1]; // El payload es la segunda parte del token
    const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodifica de Base64 y convierte a JSON
    return decodedPayload;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Componente que protege las rutas privadas y verifica roles
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  let userRole = null;

  // Decodifica el token para extraer el rol
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      userRole = decodedToken.role; // Asegúrate de que el token contenga un campo 'role'
    } else {
      return <Navigate to="/login" />;
    }
  }

  // Verifica si el token existe y si el rol está permitido
  if (token && allowedRoles.includes(userRole)) {
    return children;
  }

  // Si no hay token o el rol no es permitido, redirige a login
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
          <Route path="/reportes" element={<PrivateRoute allowedRoles={['Administrador', 'Recepcionista']}><Reports /></PrivateRoute>} /> {/* Ruta protegida */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
