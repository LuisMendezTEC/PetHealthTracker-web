import React from 'react';

const AppointmentList = ({ citas }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Citas</h2>
      <ul className="space-y-2">
        {citas.map((cita) => (
          <li key={cita.id} className="p-2 bg-white shadow rounded">
            Mascota ID: {cita.id_mascota}, Fecha: {cita.fecha_cita}, Hora: {cita.hora_cita}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;