import React, { useState, useEffect } from 'react';

const AppointmentList = ({ citas }) => {
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCita, setSelectedCita] = useState(null); // Controla la cita expandida
  const [showFutureAppointments, setShowFutureAppointments] = useState(false); // Controla la vista de citas futuras

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mascotasRes, veterinariosRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/check-table/?tabla=Mascotas'),
          fetch('http://127.0.0.1:8000/check-table/?tabla=Funcionario') // Suponiendo que esta es la tabla de veterinarios
        ]);

        if (!mascotasRes.ok || !veterinariosRes.ok) {
          throw new Error('Error al cargar los datos');
        }

        const mascotasData = await mascotasRes.json();
        const veterinariosData = await veterinariosRes.json();

        setMascotas(mascotasData.data || []);
        setVeterinarios(veterinariosData.data || []);
      } catch (err) {
        setError(err.message || 'Error de conexión al servidor');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    setSelectedCita(selectedCita === id ? null : id);
  };

  const toggleFutureAppointments = () => {
    setShowFutureAppointments(!showFutureAppointments);
  };

  const filteredCitas = citas.filter(cita => {
    if (!showFutureAppointments) return true;
    const now = new Date();
    const citaDate = new Date(`${cita.fecha_cita}T${cita.hora_cita}`);
    return citaDate > now;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Citas</h2>
      <button
        onClick={toggleFutureAppointments}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showFutureAppointments ? 'Ver Todas las Citas' : 'Ver Solo Citas Futuras'}
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCitas.map((cita) => {
            const mascota = mascotas.find(m => m.id === cita.id_mascota);
            const veterinario = veterinarios.find(v => v.id === cita.id_veterinario);

            return (
              <div
                key={cita.id}
                onClick={() => handleCardClick(cita.id)}
                className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${selectedCita === cita.id ? 'border-blue-500 border-2' : ''}`}
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
                {veterinario && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Veterinario:</span> {veterinario.nombre}
                  </p>
                )}

                {/* Detalles adicionales solo visibles al hacer clic */}
                {selectedCita === cita.id && (
                  <div className="mt-4">
                    {mascota && (
                      <>
                        <p className="text-gray-500 text-sm">
                          <span className="font-semibold">Especie:</span> {mascota.especie}
                        </p>
                        <p className="text-gray-500 text-sm">
                          <span className="font-semibold">Raza:</span> {mascota.raza}
                        </p>
                      </>
                    )}
                    <p className="text-gray-700 mt-2">
                      <span className="font-semibold">Motivo:</span> {cita.motivo || 'No especificado'}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <span className="font-semibold">Notas:</span> {cita.notas || 'No hay notas adicionales'}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
