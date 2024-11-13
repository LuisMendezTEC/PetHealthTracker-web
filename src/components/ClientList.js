import React, { useState } from 'react';

const ClientList = ({ usuarios, mascotas }) => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCardClick = (usuario, event) => {
    event.stopPropagation(); // Evita que el evento se propague al contenedor principal
    if (selectedClient === usuario.id) {
      setSelectedClient(null); // Si el mismo usuario se selecciona de nuevo, cierra la tarjeta
    } else {
      setSelectedClient(usuario.id); // Muestra detalles del cliente seleccionado
    }
  };

  const handleContainerClick = () => {
    setSelectedClient(null); // Cierra todas las tarjetas
  };

  return (
    <div className="p-4" onClick={handleContainerClick}>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            onClick={(event) => handleCardClick(usuario, event)}
            className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${selectedClient === usuario.id ? 'border-blue-500 border-2' : ''}`}
          >
            <h3 className="text-lg font-semibold">{usuario.nombre_usuario}</h3>
            <p className="text-gray-500">{usuario.correo}</p>
            
            {/* Detalles de mascotas solo visibles si este usuario está seleccionado */}
            {selectedClient === usuario.id && (
              <div className="mt-4 p-2 bg-gray-100 rounded-lg">
                <h4 className="text-md font-semibold mb-2">Mascotas:</h4>
                {mascotas.filter(mascota => mascota.id_dueño === usuario.id).map((mascota) => (
                  <div key={mascota.id} className="flex items-center gap-4 mb-2">
                    <img
                      src={mascota.image_url}
                      alt={mascota.nombre_mascota}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">{mascota.nombre_mascota} ({mascota.especie})</p>
                      <p className="text-gray-500 text-sm">Raza: {mascota.raza}</p>
                      <p className="text-gray-500 text-sm">Nacimiento: {mascota.fecha_nacimiento}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
