import React, { useState } from 'react';

const ClientList = ({ usuarios, mascotas }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null); // Almacena la mascota seleccionada
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

  const handleCardClick = (usuario, event) => {
    event.stopPropagation(); // Evita que el evento se propague al contenedor principal
    setSelectedClient(selectedClient === usuario.id ? null : usuario.id);
  };

  const handleContainerClick = () => {
    setSelectedClient(null); // Cierra todas las tarjetas
  };

  const handleImageClick = (mascota, event) => {
    event.stopPropagation(); // Evita cerrar la tarjeta del cliente al hacer clic en la imagen
    setSelectedPet(mascota);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  return (
    <div className="p-4" onClick={handleContainerClick}>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            onClick={(event) => handleCardClick(usuario, event)}
            className={`p-4 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${
              selectedClient === usuario.id ? 'border-blue-500 dark:border-blue-400 border-2' : ''
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{usuario.nombre_usuario}</h3>
            <p className="text-gray-600 dark:text-gray-300">{usuario.correo}</p>

            {/* Detalles de mascotas solo visibles si este usuario está seleccionado */}
            {selectedClient === usuario.id && (
              <div className="mt-4 p-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                <h4 className="text-md font-semibold mb-2 text-gray-900 dark:text-gray-100">Mascotas:</h4>
                {mascotas
                  .filter((mascota) => mascota.id_dueño === usuario.id)
                  .map((mascota) => (
                    <div key={mascota.id} className="flex items-center gap-4 mb-2">
                      <img
                        src={mascota.image_url}
                        alt={mascota.nombre_mascota}
                        className="w-12 h-12 rounded-full object-cover cursor-pointer"
                        onClick={(event) => handleImageClick(mascota, event)}
                      />
                      <div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">
                          {mascota.nombre_mascota} ({mascota.especie})
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Raza: {mascota.raza}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Nacimiento: {mascota.fecha_nacimiento}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal para mostrar la imagen grande */}
      {showModal && selectedPet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-red-500"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedPet.image_url}
              alt={selectedPet.nombre_mascota}
              className="w-full h-auto rounded-lg object-cover"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {selectedPet.nombre_mascota}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{selectedPet.especie}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
