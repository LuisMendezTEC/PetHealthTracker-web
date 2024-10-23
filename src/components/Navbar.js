import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;