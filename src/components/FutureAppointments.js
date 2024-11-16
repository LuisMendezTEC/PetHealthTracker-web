import React from 'react';

const FutureAppointments = ({ citas }) => {
  const now = new Date();

  const citasFuturas = citas.filter((cita) => new Date(cita.fecha) > now);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Citas Futuras</h2>
      {citasFuturas.length > 0 ? (
        <ul>
          {citasFuturas.map((cita) => (
            <li key={cita.id} className="p-4 border rounded mb-2">
              <p className="text-gray-800 dark:text-gray-200">Fecha: {new Date(cita.fecha).toLocaleString()}</p>
              <p className="text-gray-600 dark:text-gray-400">Descripción: {cita.descripcion}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay citas futuras</p>
      )}
    </div>
  );
};

export default FutureAppointments;
