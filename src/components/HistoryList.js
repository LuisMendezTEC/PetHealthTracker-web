import React from 'react';

const HistoryList = ({ historiales }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historiales de Mascotas</h2>
      <ul className="space-y-2">
        {historiales.map((historial) => (
          <li key={historial.id} className="p-2 bg-white shadow rounded">
            Mascota ID: {historial.id_mascota}, Fecha: {historial.fecha}, Descripción: {historial.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;