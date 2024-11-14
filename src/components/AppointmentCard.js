import React from 'react';

const AppointmentCard = ({ cita, mascota, idVeterinario, onCardClick, onOpenModal }) => {
  return (
    <div
      onClick={() => onCardClick(cita.id)}
      className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${cita.isSelected ? 'border-blue-500 border-2' : ''}`}
    >
      <h3 className="text-lg font-semibold text-blue-600">
        {mascota ? mascota.nombre_mascota : 'Mascota desconocida'}
      </h3>
      <p className="text-gray-500 text-sm mt-1">
        <span className="font-semibold">Fecha:</span> {new Date(cita.fecha_cita).toLocaleDateString()}
      </p>
      <p className="text-gray-500 text-sm">
        <span className="font-semibold">Hora:</span> {cita.hora_cita}
      </p>
      <p className="text-gray-500 text-sm">
        <span className="font-semibold">Veterinario ID:</span> {idVeterinario}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(cita.id);
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Completar Cita
      </button>
    </div>
  );
};

export default AppointmentCard;
