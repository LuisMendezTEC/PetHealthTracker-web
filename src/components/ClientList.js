import React from 'react';

const ClientList = ({ usuarios }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <ul className="space-y-2">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="p-2 bg-white shadow rounded">
            {usuario.nombre_usuario} - {usuario.correo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;