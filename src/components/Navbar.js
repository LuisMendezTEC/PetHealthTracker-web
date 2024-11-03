import React from 'react';
import { Link } from 'react-router-dom';
import useDecodedToken from '../hooks/UseDecodedToken'; // Importa el hook

const Navbar = () => {
  const decodedToken = useDecodedToken(); // Usa el hook para obtener el token decodificado

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminamos el token de localStorage
    window.location.href = '/login'; // Redirigimos al login después de cerrar sesión
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">Clientes</Link>
        </li>
        <li>
          <Link to="/citas" className="text-white hover:text-gray-200">Citas</Link>
        </li>
        <li>
          <Link to="/historiales" className="text-white hover:text-gray-200">Historiales</Link>
        </li>
        {/* Mostrar el enlace a Reportes solo si el rol es 'Administrador' o 'Recepcionista' */}
        {decodedToken && (decodedToken.role === 'Administrador' || decodedToken.role === 'Recepcionista') && (
          <li>
            <Link to="/reportes" className="text-white hover:text-gray-200">Reportes</Link>
          </li>
        )}
        <li>
          <button onClick={handleLogout} className="text-white hover:text-gray-200">
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
